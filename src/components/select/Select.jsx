import React from 'react';

import Text from '../text/Text';

import './style.css';

function Select(props) {
    return (
        <div className="select">
            <select value={props.value} onChange={props.onChange}>
                {props.children}
            </select>
        </div>
    );
}

export default Select;
