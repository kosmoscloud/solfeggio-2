import React from 'react';

import './style.css';

function Column({ children, width=1, alignItems='flex-start' }) {
    return (
        <div className="column" style={{ flex: width, alignItems: alignItems }}>
            {children}
        </div>
    );
}

export default Column;
