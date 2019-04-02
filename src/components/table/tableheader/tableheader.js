import React from 'react';
import './tableheader.css';

const gridHeader = (props) => (
    <React.Fragment>
        <tr>
            {
              props.gridHeader.map(data => (
               <th key={data}>{data}</th>
            ))
            }
        </tr>
    </React.Fragment>
);

export default gridHeader;