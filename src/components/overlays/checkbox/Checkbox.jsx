import React, { useEffect } from 'react';
import './style.css';

function Checkbox(props) {

    useEffect(() => {
        console.log('Checkbox checked:', props.isChecked);
    }, [props.isChecked]);

    return (
        <div className={'checkbox' + (props.isChecked ? '-checked' : "")} onClick={props.onClick} />
    );
}

export default Checkbox;
