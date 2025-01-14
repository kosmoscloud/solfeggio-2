import React from 'react';

import './style.css';

function Text({children, wrap=false, center=false, size='normal'}) {
    return (
        <div className="text" style={{whiteSpace: wrap ? "normal" : "nowrap", alignItems: center ? "center" : "flex-start"}}>
            {children}
        </div>
    );
}

export default Text;
