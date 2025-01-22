import React from 'react';

import './style.css';

function Column({ children, width=1, alignItems='flex-start', gap=true, padding=true}) {

    let style = {
        flex: width
    };

    if (gap) {
        style = {
            ...style,
            gap: '2vmin'
        }
    }

    if (padding) {
        style = {
            ...style,
            paddingLeft: '2vmin',
            paddingRight: '2vmin'
        }
    }

    return (
        <div className='column' style={style}>
            {children}
        </div>
    );
}

export default Column;
