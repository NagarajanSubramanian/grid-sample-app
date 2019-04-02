import React, { Component } from 'react';
import './App.css';
import MyContext from './context/context';
import Dialog from './components/dialog/dialog';
import Toastr from './components/toastr/toastr';
import NewApplication from './components/newApplication/newApplication';
import EmptyData from './components/emptydata/emptyData';
import SearchData from './components/searchgroup/searchGroup'

import {addEmployee, loadEmployee} from './redux/action/action';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import Table from './components/table/table';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      headerValue : ['EmpId', 'EmpName', 'Seat No', 'Lab Leader', 'PMO'],
      toastData : '',
      toastShow: false,
      toastColor: 'black',
      emptyDataShow: true,
      emptyDataHeader: 'No data found',
      emptyDataDescription: 'Add new data using + button',
      dialogShow: false,
      gridShow: false,
      screenShow: false,
      searchDisable: true
    };
    this.onToastrClick = this.onToastrClick.bind(this);
    this.newApplicationClick = this.newApplicationClick.bind(this);
    this.dialogSaveClick = this.dialogSaveClick.bind(this);
    this.dialogCancelClick = this.dialogCancelClick.bind(this);
    this.clearDialogValue = this.clearDialogValue.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

    this.refsData = {
      empIdRef: React.createRef(),
      empNameRef: React.createRef(),
      seatNoRef: React.createRef(),
      labLeadRef: React.createRef(),
      pmoRef: React.createRef(),
      searchRef: React.createRef()
    }
  }

  onSearchChange(){
    const formMap = {searchData: this.refsData.searchRef.current.value};
        fetch('http://localhost:2030/findEmployee', {
      headers,
      method: 'POST',
      body: JSON.stringify(formMap)
    }).then(function(response){
      response.json().then(function(data){
        this.props.loadEmployee(JSON.parse(data))
        if(JSON.parse(data).length > 0){
          this.setState({gridShow: true, 
            emptyDataShow: false});
        } else {
          this.setState({gridShow: false, 
            emptyDataShow: true, emptyDataHeader: 'No Data Found',
          emptyDataDescription: 'Please try with different keyword'} )
        }
      }.bind(this));
    }.bind(this));
  }

  dialogSaveClick (){
    const empNo = this.refsData.empIdRef.current.value;
    const empName = this.refsData.empNameRef.current.value;
    const seatNo = this.refsData.seatNoRef.current.value;
    const labLead = this.refsData.labLeadRef.current.value;
    const pmo = this.refsData.pmoRef.current.value;

    if(empNo && empName && seatNo && labLead && pmo){
      let empNoCheck = false;
      this.props.employeeData.map(data => {
        if(data.empNo === empNo){
          empNoCheck = true;
        }
      })
      if(empNoCheck){
        this.setState({toastData: 'Enter unique EmpId', toastColor: 'red', 
        toastShow:true});
      } else {
        const formMap = {empNo: empNo, empName: empName, seatNo: seatNo, labLead: labLead, pmo: pmo};
        fetch('http://localhost:2030/insertOne', {
      headers,
      method: 'POST',
      body: JSON.stringify(formMap)
    });
    this.props.addEmployee(formMap);
    this.clearDialogValue();
    this.setState({toastData: 'Data Added Successfully', toastColor: 'black', 
    toastShow:true, dialogShow:false, emptyDataShow: false, gridShow: true, searchDisable:false});
      }
    } else {
      this.setState({toastData: 'Enter all Data.', toastColor: 'red', toastShow:true});
    }
    setTimeout(function(){
      this.setState({toastData: '', toastShow:false})
    }.bind(this), 3000);
  }
  
  clearDialogValue = () => {
    this.refsData.empIdRef.current.value = '';
    this.refsData.empNameRef.current.value = '';
    this.refsData.seatNoRef.current.value = '';
    this.refsData.labLeadRef.current.value = '';
    this.refsData.pmoRef.current.value = '';
  }

  componentWillMount(){
    fetch('http://localhost:2030/findAllEmployeeData', {
      headers,
      method: 'POST',
      body: ''
    }).then(response => {
      response.json().then(function(data){
        this.props.loadEmployee(JSON.parse(data));
        var gridLengthFlag = JSON.parse(data).length > 0;
        this.setState({gridShow:gridLengthFlag ? true : false, 
          emptyDataShow: gridLengthFlag ? false: true, screenShow:true,
          searchDisable:gridLengthFlag?false:true} )
      }.bind(this));
    }); 
  }
  
  dialogCancelClick(){
    this.setState({dialogShow: false});
    this.clearDialogValue();
  }
  
  onToastrClick(){
    this.setState({toastShow: false});
  }
  
  newApplicationClick(){
    this.setState({dialogShow: true});
  }
  
  render() {
    const { employeeData } = this.props;
    if(!this.state.screenShow){
      return(<div className='loader'></div>)
    } else {
      return (
      <React.Fragment>
        <MyContext.Provider value={this.state}>
        <SearchData onChange={()=>this.onSearchChange()} ref={this.refsData.searchRef}
        searchDisable={this.state.searchDisable}/>
          <Table gridHeader = {this.state.headerValue} gridData={employeeData} 
          gridShow={this.state.gridShow}/>
          <NewApplication onClick={() => this.newApplicationClick()}/>
          <Dialog ref={this.refsData} dialogShow={this.state.dialogShow} 
          onSaveClick={()=>this.dialogSaveClick()} onCancelClick={()=>this.dialogCancelClick()}/>
          <Toastr toastShow={this.state.toastShow} toastData={this.state.toastData}  
            onClick={() => this.onToastrClick()} toastColor={this.state.toastColor}/>
          <EmptyData emptyDataShow={this.state.emptyDataShow} emptyDataHeader={this.state.emptyDataHeader}
            emptyDataDescription={this.state.emptyDataDescription}/>
        </MyContext.Provider>
      </React.Fragment>
    );
      }
  }
}

const  mapStateToProps = (state) => {
  return {
    employeeData: state.addEmployeeData
  }
}

  const mapDispatchToProps = (dispatch) => {
    return ({
        addEmployee: article => dispatch(addEmployee(article)),
        loadEmployee: employeeDatas => dispatch(loadEmployee(employeeDatas))
    })
  };
  
  App.propTypes = {
    employeeData : PropTypes.array
  };

export default connect(mapStateToProps, mapDispatchToProps)(App);