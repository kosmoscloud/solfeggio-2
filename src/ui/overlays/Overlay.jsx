import React from 'react';

import './style.css';

function Overlay({children, minHeight, minWidth, type="center"}) {

    let className = "overlay";
    let style = {};

    if (type === "center") {
        className += " center";
    } else if (type === "top") {
        className += " top";
    } else if (type === "bottom") {
        className += " bottom";
    }

    if (minHeight) {
        style = {minHeight: minHeight};
    }

    if (minWidth) {
        style = {...style, minWidth: minWidth};
    }

    return (
        <div className={className} style={style}>
            {children}
        </div>
    );
}

export default Overlay;
