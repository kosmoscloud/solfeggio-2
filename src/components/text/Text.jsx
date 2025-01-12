import React from 'react';

import './style.css';

function Text({children, wrap}) {
    return (
        <div className="text" style={{whiteSpace: wrap ? "normal" : "nowrap"}}>
            {children}
        </div>
    );
}

export default Text;
