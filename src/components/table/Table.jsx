import React from 'react';

import './style.css';

function Table({ children, direction='row' }) {

    let style = {
        flexDirection: direction
    };

    return (
        <div className="table" style={style}>
            {children}
        </div>
    );
}

export default Table;
