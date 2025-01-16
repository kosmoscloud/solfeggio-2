import React from 'react';

import './style.css';

function Title({children}) {
    return (
        <div className="title">
            {children}
        </div>
    );
}

export default Title;
