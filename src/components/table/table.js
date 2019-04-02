import React from 'react';
import './table.css';
import GridHeader from './tableheader/tableheader';
import GridContent from './tablecontent/tablecontent';

const grid = (props) => {
    const gridShow = props.gridShow ? 'gridDiv' : 'hide';
    return (
        <div className={gridShow}>
        <table>
            <thead>
            <GridHeader gridHeader={props.gridHeader}/>
            </thead>
            <tbody>
            <GridContent gridData={props.gridData}/>
            </tbody>
        </table>
    </div>
        )
    }

export default grid;