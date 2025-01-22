import React from 'react';

import Header from '../header/Header';

import './style.css';

function Banner({text}) {
    return (
        <div className="banner">
            <Header text={text} />
        </div>
    )
}

export default Banner;
