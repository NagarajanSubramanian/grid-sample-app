import React from 'react';
import './emptyData.css';

const emptyData = (props) => {
    const emptyDataClass = props.emptyDataShow ? 'emptyDataClass' : 'hide ';
    return (
        <div className={emptyDataClass}>
        <div className='emptyDataCircle'>
        <div className='circleDiv'></div>
            <label className='emptyDataHeader'>{props.emptyDataHeader}</label>
            <label className='emptyDataDescription'>{props.emptyDataDescription}</label>
        </div>
        </div>
    )
}

export default emptyData;