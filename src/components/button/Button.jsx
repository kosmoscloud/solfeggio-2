import React from "react";
import "./style.css";

function Button({label, isEnabled = true, onClick}) {

    return (
        <div className={isEnabled ? "button" : "disabled-button"} onClick={isEnabled ? onClick : null}>{label}</div>
    );
}

export default Button;
