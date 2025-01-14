import React from "react";

import Button from "../button/Button";
import Counter from "./counter/Counter";

import "./style.css";

function Stepper({ isEnabled = true, onChange, min, max, initialValue }) {

    const [ value, setValue ] = React.useState(initialValue);

    const changeValue = (addValue) => {
        if (!isEnabled) return;
        const newValue = Math.min(max, Math.max(min, value + addValue));
        setValue(newValue);
        onChange(newValue);
    }

    return (
        <div className="stepper">
            <div className="slider-content">
                <Button isEnabled={isEnabled} onClick={() => changeValue(-1)} shadow={false} />
                <Counter isEnabled={isEnabled} value={value} />
                <Button isEnabled={isEnabled} onClick={() => changeValue(1)} shadow={false} />
            </div>
        </div>
    );
}

export default Stepper;
