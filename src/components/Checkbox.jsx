import React from 'react';

import Text from './Text';

function Checkbox({ isChecked, onClick, label }) {

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
        backgroundColor: isChecked ? 'black' : 'white',
        color: isChecked ? 'white' : 'black',
        height: '3vmin',
        aspectRatio: 1,
        cursor: 'pointer',
        fontSize: '100%',
        border: '3px solid black',
        display: 'flex',
        alignItems: 'flex-start',
        boxShadow: '1vmin 1vmin',
    }

    return (
        <div style={containerstyle}>
            <div style={buttonstyle} onClick={onClick} />
            <Text>{label}</Text>
        </div>
        
    );
}

export default Checkbox;
