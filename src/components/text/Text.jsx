import React from 'react';

import './style.css';

function Text({children, wrap=false, center=true, lineHeight="1.5", size='normal'}) {

    const style = {
        whiteSpace: wrap ? "normal" : "nowrap",
        alignItems: center ? "center" : "flex-start",
        lineHeight: lineHeight,
        fontSize: size === 'small' ? 'clamp(0.6em, 1.5vmax, 1rem)' : 'clamp(0.75rem, 1vmax, 1rem)'
    };

    return (
        <div className="text" style={style}>
            {children}
        </div>
    );
}

export default Text;
