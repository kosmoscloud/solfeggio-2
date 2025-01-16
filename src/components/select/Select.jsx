import React from 'react';

import './style.css';

function Select({value, onChange, children}) {
    return (
        <div className="select">
            <select value={value} onChange={onChange}>
                {children}
            </select>
        </div>
    );
}

export default Select;
