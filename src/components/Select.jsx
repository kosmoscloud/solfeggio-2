import React from 'react';

function Select({value, onChange, children}) {

    const containerstyle = {
        flex: 1,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        border: '2px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const selectstyle = {
        fontFamily: '"Press Start 2P"',
        fontSize: '1vmax',
        padding: '0.5vmax',
        cursor: 'pointer',
        border: 0,
        backgroundColor: 'white',
        borderRadius: 0,
        color: 'black',
        margin: 0,
        width: '100%',
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
    }

    return (
        <div style={containerstyle}>
            <select value={value} onChange={onChange} style={selectstyle}>
                {children}
            </select>
        </div>
    );
}

export default Select;
