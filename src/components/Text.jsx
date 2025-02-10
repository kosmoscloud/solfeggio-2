import React from 'react';

function Text({children, wrap=false, center=true, lineHeight="1.5", size='normal'}) {

    const style = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        justifyContent: 'center',
        alignItems: 'stretch',
        webkitTextSizeAdjust: '80%',
        whiteSpace: wrap ? "normal" : "nowrap",
        alignItems: center ? "center" : "flex-start",
        lineHeight: lineHeight,
        fontSize: size === 'small' ? 'clamp(0.6em, 1.5vmax, 1rem)' : 'clamp(0.75rem, 1vmax, 1rem)'
    };

    return (
        <div style={style}>
            {children}
        </div>
    );
}

export default Text;
