import React from 'react';

function GridPositioner({children, x=1, y=1}) {

    let style = {
        gridColumnStart: x,
        gridColumnEnd: x,
        gridRowStart: y,
        gridRowEnd: y
    }

    React.useEffect(() => {
        style = {
            ...style,
            gridRowStart: y,
            gridRowEnd: y
        };
        console.log('new y', y);
    }, [y]);

    return (
        <div style={style}>
            {children}
        </div>
    )
}

export default GridPositioner;
