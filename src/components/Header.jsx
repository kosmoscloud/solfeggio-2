import React from "react";

import Text from "./Text";

function Header({isEnabled = true, text}) {

    const style = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        border: '2px solid #000',
        cursor: 'default',
        whiteSpace: 'nowrap',
        flex: 1,
        boxSizing: 'border-box',
        backgroundColor: isEnabled ? '#fff' : '#333',
    };

    return (
        <div style={style}>
            <Text size='small'>{text}</Text>
        </div>
    );
}

export default Header;
