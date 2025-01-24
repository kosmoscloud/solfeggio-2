import React from "react";

import Text from "../text/Text";

import "./style.css";

function Button({label, isEnabled = true, onClick, icon, shadow = true, children}) {

    let className = isEnabled ? "button" : "disabled-button";

    let style = {};

    if (shadow) {
        className += " shadow";
    }

    if (onClick && isEnabled) {
        className += " clickable";
    }

    return (
        <div className={className} onClick={isEnabled ? onClick : null}>
            {label && <Text center={true}>{label}</Text>}
            {icon && <img src={icon} className={"icon"} alt="button with icon" />}
            {children && children}
        </div>
    );
}

export default Button;
