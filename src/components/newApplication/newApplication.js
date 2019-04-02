import React from 'react';
import './newApplication.css';

const newApplication = (props) => (
    <div className="newApplication">
        <button className="newApplicationButton" onClick={() => props.onClick()}>+</button>
    </div>
);

export default newApplication;