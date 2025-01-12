import React from 'react';

import './style.css';

function Counter({isEnabled, value}) {
    return (
        <div className={isEnabled ? "counter" : "disabled-counter"}>
            {value}
        </div>
    );
}

export default Counter;
