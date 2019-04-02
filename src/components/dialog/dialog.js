import React from 'react';
import MyContext from '../../context/context'
import './dialog.css';

const dataInput = React.forwardRef((props, ref) => {
    const dialogData = (props.dialogShow ? ' ' : 'hide ') + 'newDataDialog';
    const backDrop = (props.dialogShow ? ' ' : 'hide ') + 'backDrop';

    return(
        <MyContext.Consumer>
            {consumer => 
            <React.Fragment>
                <div className={backDrop}></div>
                <div className={dialogData}>
                    <div className="initialCloseButton">
                    <label className="closeButton" onClick={()=>props.onCancelClick()}>X</label>
                  </div>
                  <div className='dialogBody'>
                  <div className="empIdDiv align">
                    <label className="" >Emp ID</label>
                    <input autofocus='true' ref={ref.empIdRef}></input>
                  </div>
                  <div className="empNameDiv align">
                    <label className="">Emp Name</label>
                    <input ref={ref.empNameRef}></input>
                  </div>
                  <div className="seatNoDiv align">
                    <label className="">Seat No</label>
                    <input ref={ref.seatNoRef}></input>
                  </div>
                  <div className="llNameDiv align">
                    <label className="">Lab Lead</label>
                    <input ref={ref.labLeadRef}></input>
                  </div>
                  <div className="pmoDiv align">
                    <label className="">PMO</label>
                    <input ref={ref.pmoRef}></input>
                  </div>
                  </div>
                  <div className='dialogFooter'>
                    <button onClick={()=>props.onSaveClick()}>Save</button>
                    <button onClick={()=>props.onCancelClick()}>Cancel</button>
                  </div>
            </div>
        </React.Fragment>
            }
        </MyContext.Consumer>
    );
});

export default dataInput;