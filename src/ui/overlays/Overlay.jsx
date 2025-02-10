import React from 'react';

function Overlay({children, minWidth, minHeight, type='center', padding=true}) {

    let style = {
        position: 'fixed',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        width: 'fit-content',
        maxWidth: '85%',
        height: 'auto',
        zIndex: 99,
        border: '2px solid black',
        boxShadow: '1vmin 1vmin',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: '1vmin',
        left: '50%',
        top: type==='top' ? '75%' : type==='bottom' ? '25%' : '50%',
        minHeight: minHeight || 'auto',
        minWidth: minWidth || 'auto',
    };

    return (
        <div style={style}>
            {children}
        </div>
    );
}

export default Overlay;
