import React from 'react';

import Header from './Header';

function Banner({text}) {

    let style = {
        position: 'absolute',
        top: '3%',
        left: '10%',
        width: '80%',
        height: '15%',
    }

    return (
        <div style={style}>
            <Header text={text} />
        </div>
    )
}

export default Banner;
