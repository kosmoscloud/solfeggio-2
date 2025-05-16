import React, { useContext } from "react";

import { UIContext } from "../layers/UILayer";

import Text from "./Text";

function Header({isEnabled = true, text, children}) {

    const { styleSheet } = useContext(UIContext);

    const style = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        border: '2px solid ' + styleSheet.text,
        cursor: 'default',
        whiteSpace: 'nowrap',
        flex: 1,
        boxSizing: 'border-box',
        backgroundColor: isEnabled ? styleSheet.enabled : styleSheet.disabled,
    };

    return (
        <div style={style}>
            <Text size='small'>{text}</Text>
            {children}
        </div>
    );
}

export default Header;
