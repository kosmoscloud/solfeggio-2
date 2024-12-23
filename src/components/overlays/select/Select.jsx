import React from 'react';
import './style.css';

function Select(props) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '10%' }}>
            <select value={props.value} onChange={props.onChange}>
                {props.children}
            </select>
            <div className="select-label">{props.label}</div>
        </div>
    );
}

export default Select;
