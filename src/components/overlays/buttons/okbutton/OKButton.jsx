import React from 'react';
import './style.css';

function OKButton({onClick}) {
    return (
        <div className="ok-button" onClick={onClick}>
            OK
        </div>
    );
}

export default OKButton;
