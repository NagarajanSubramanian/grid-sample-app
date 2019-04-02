import React from 'react';
import './tablecontent.css';

const gridContent = (props) => {
    return (
        <React.Fragment>
            {
                props.gridData.map(data => (
                    <tr key={data.empNo}>
                        <td>{data.empNo}</td>
                        <td>{data.empName}</td>
                        <td>{data.seatNo}</td>
                        <td>{data.labLead}</td>
                        <td>{data.pmo}</td>
                    </tr>
                ))
            }
        </React.Fragment>
    );
};

export default gridContent;
