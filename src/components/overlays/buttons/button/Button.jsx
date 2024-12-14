import React from 'react';
import './style.css';

function Button(props) {

    return (
        <div className='button' onClick={props.onClick}>
            {props.label}
        </div>
    );
}

export default Button;
