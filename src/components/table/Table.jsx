import React from 'react';

import Spacer from '../spacer/Spacer';

import './style.css';

function Table({ children }) {
    return (
        <div className="table">
            <Spacer length={0.1} />
                {children}
            <Spacer length={0.1} />
        </div>
    );
}

export default Table;
