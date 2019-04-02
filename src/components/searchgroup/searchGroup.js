import React from 'react';
import './searchGroup.css';

const searchGroup = React.forwardRef((props, ref) => {
    return (
        <div className='searchGroup'>
            <input disabled={props.searchDisable ? true: false} ref={ref} className='inputGroup' onChange={()=>props.onChange()} placeholder='Search Ex:) EmpId, EmpName, SeatNo, LabLead, Pmo'></input>
        </div>
    );
})

export default searchGroup;