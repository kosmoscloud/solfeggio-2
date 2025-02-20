import React, { useContext } from 'react';

import { UIContext } from '../layers/UILayer';

import Text from './Text';

function Checkbox({ isChecked, onClick, label }) {

    const { styleSheet } = useContext(UIContext)

    const containerstyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '1vmax',
        flex: 1,
        width: 'fit-content',
    }

    const buttonstyle = {
        backgroundColor: isChecked ? styleSheet.text : styleSheet.enabled,
        height: '3vmin',
        aspectRatio: 1,
        cursor: 'pointer',
        fontSize: '100%',
        border: '3px solid ' + styleSheet.text,
        display: 'flex',
        alignItems: 'flex-start',
        boxShadow: '1vmin 1vmin' + (isChecked ? styleSheet.enabled : styleSheet.text),
    }

    return (
        <div style={containerstyle}>
            <div style={buttonstyle} onClick={onClick} />
            <Text>{label}</Text>
        </div>
        
    );
}

export default Checkbox;
