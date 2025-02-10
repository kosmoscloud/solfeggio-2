import React from 'react';

function Spacer({ length=1, children, direction='column', padding=true, gap=0 }) {

    const style = {
        flex: `${length}`,
        display: 'flex',
        flexDirection: direction,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        padding: padding ? '0.5vmin' : '0',
        gap: `${gap}vmin`,
    }

    return <div style={style}>
        {children}
    </div>;
}

export default Spacer;
