import React, { useContext } from 'react';

import { UIContext } from '../layers/UILayer';

function Title({children}) {

    const { styleSheet } = useContext(UIContext);

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
        color: styleSheet.text,
        WebkitTextSizeAdjust: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
    }

    return (
        <div style={style}>
            {children}
        </div>
    );
}

export default Title;
