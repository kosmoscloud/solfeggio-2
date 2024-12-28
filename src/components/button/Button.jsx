import React from "react";
import "./style.css";

function Button({label, isEnabled = true, onClick, icon, shadow = true}) {

    let className = isEnabled ? "button" : "disabled-button";
    if (shadow) {
        className += " shadow";
    }

    return (
        <div className={className} onClick={isEnabled ? onClick : null}>
            {label}
            {icon && <img src={icon} className={isEnabled ? "icon" : ""} alt="button with icon" />}
        </div>
    );
}

export default Button;
