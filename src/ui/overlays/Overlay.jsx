import React, { useContext } from 'react';

import { UIContext } from '../../layers/UILayer';

function Overlay({children, minWidth, minHeight, type='center', padding=true}) {

    const { styleSheet } = useContext(UIContext);

    let style = {
        position: 'fixed',
        transform: 'translate(-50%, -50%)',
        backgroundColor: styleSheet.enabled,
        width: 'fit-content',
        maxWidth: '85%',
        height: 'auto',
        zIndex: 99,
        border: '2px solid ' + styleSheet.text,
        boxShadow: '1vmin 1vmin' + styleSheet.disabled,
        cursor: 'default',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: padding ? '1vmin' : '0',
        paddingBottom: padding ? '1vmin' : '0',
        paddingLeft: padding ? '2vmin' : '0',
        paddingRight: padding ? '2vmin' : '0',
        left: '50%',
        top: type==='top' ? '25%' : type==='bottom' ? '70%' : '50%',
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
