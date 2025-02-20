import React, { useState, useContext } from "react";

import { UIContext } from "../layers/UILayer";

import Text from "./Text";

function Button({label, isEnabled = true, onClick, icon, shadow = true, children}) {

    const [isHovered, setIsHovered] = useState(false);
    const { styleSheet } = useContext(UIContext);
    let isClickable = isEnabled && onClick

    const style = {
        backgroundColor: isEnabled ? (isClickable && isHovered ? styleSheet.selected : styleSheet.enabled) : styleSheet.disabled,
        boxShadow: shadow ? "1vmin 1vmin 0 " + styleSheet.disabled : "none",
        cursor: isClickable ? "pointer" : "default",
        border: "2px solid " + styleSheet.text,
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "0.5vmin",
    };

    return (
        <div style={style} onClick={isEnabled ? onClick : null} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {label && <Text center={true} isSelected={isHovered && isEnabled}>{label}</Text>}
            {icon && <img src={icon} className={"icon"} alt="button with icon" />}
            {children && children}
        </div>
    );
}

export default Button;
