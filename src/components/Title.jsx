import React from 'react';

function Title({children}) {

    const style = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 'auto',
        height: '100%',
        margin: '0.5rem',
        fontSize: 'clamp(1.5rem, 2.5vmax, 3rem)',
        webkitTextSizeAdjust: 'none',
    }

    return (
        <div style={style}>
            {children}
        </div>
    );
}

export default Title;
