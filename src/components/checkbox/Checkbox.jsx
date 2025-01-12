import React, { useEffect } from 'react';

import Text from '../text/Text';

import './style.css';

function Checkbox({ isChecked, onClick, label }) {

    return (
        <div className="checkbox-container">
            <div className={'checkbox' + (isChecked ? '-checked' : "")} onClick={onClick} />
            <Text>{label}</Text>
        </div>
        
    );
}

export default Checkbox;
