import React from 'react';

import './style.css'

function Grid({dimx=1, padding=true, children}) {

    let style = {
        gridTemplateColumns: `repeat(${dimx}, 1fr)`,
        padding: padding ? '2vmin' : 0
    }

    return (
        <div className="grid" style={style}>
            {children}
        </div>
    )
}

export default Grid;
