import React, { useEffect } from 'react';
import './style.css';

function Checkbox(props) {

    useEffect(() => {
        console.log('Checkbox checked:', props.isChecked);
    }, [props.isChecked]);

    return (
        <div className="checkbox-container">
            <div className={'checkbox' + (props.isChecked ? '-checked' : "")} onClick={props.onClick} />
            <div className="checkbox-label">{props.label}</div>
        </div>
        
    );
}

export default Checkbox;
