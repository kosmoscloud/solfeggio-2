import React from 'react';
import './style.css';

function Select(props) {
    return (
        <div className="select-container">
            <div className="select-label">{props.label}</div>
            <div className="select">
                <select value={props.value} onChange={props.onChange}>
                    {props.children}
                </select>
            </div>
        </div>
    );
}

export default Select;
