import React, { useRef } from 'react';

function GridPositioner({children, x=1, y=1}) {

    let style = useRef();

    style.current = {
        gridColumnStart: x,
        gridColumnEnd: x,
        gridRowStart: y,
        gridRowEnd: y,
        display: 'flex',
        alignItems: 'stretch',
    }

    React.useEffect(() => {
        style.current = {
            ...style.current,
            gridRowStart: y,
            gridRowEnd: y
        };
    }, [y]);

    return (
        <div style={style.current}>
            {children}
        </div>
    )
}

export default GridPositioner;
