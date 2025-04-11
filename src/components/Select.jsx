import React, { useContext } from 'react';

import { UIContext } from '../layers/UILayer'

function Select({value, onChange, children}) {

    const { styleSheet } = useContext(UIContext)

    const containerstyle = {
        flex: 1,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        border: '2px solid ' + styleSheet.text,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: "1vmin 1vmin 0 " + styleSheet.disabled
    }

    const selectstyle = {
        fontFamily: '"Press Start 2P"',
        fontSize: '1vmax',
        padding: '0.5vmax',
        cursor: 'pointer',
        border: 0,
        backgroundColor: styleSheet.enabled,
        borderRadius: 0,
        color: styleSheet.text,
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
