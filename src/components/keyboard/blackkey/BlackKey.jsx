import React from "react";
import "./style.css";

function BlackKey(props) {
    return (
        <div className="black-key" style={{left: props.left, width: props.width}}/>
    );
}

export default BlackKey;
