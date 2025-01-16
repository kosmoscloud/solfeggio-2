import React from 'react';

import './style.css';

function Row({ children, width=1, alignItems='center', gap=true, padding=true}) {

    let style = {
        flex: width,
        alignItems: alignItems
    };

    if (gap) {
        style = {
            ...style,
            gap: '3vmin'
        }
    }

    if (padding) {
        style = {
            ...style,
            paddingTop: '2vmin',
            paddingBottom: '2vmin'
        }
    }

    return (
        <div className='row' style={style}>
            {children}
        </div>
    );
}

export default Row;
