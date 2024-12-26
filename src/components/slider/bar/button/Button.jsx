import React from "react";
import "./style.css";

function Button(props) {

    return (
        <div className={props.enabled ? props.direction : ("disabled-" + props.direction)} onClick={props.onClick}/>
    );
}

export default Button;
