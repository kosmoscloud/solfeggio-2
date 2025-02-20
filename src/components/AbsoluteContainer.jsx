import React from 'react';

function AbsoluteContainer({children, top, left, minHeight, minWidth}) {

    const style = {
        position: 'absolute',
        top: top,
        left: left,
        minHeight: minHeight,
        minWidth: minWidth,
        transform: `translate(-50%, -50%)`,
        display: 'flex'
    }

    return <div style={style}>
        {children}
    </div>;
}

export default AbsoluteContainer
