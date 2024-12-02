import React from "react";
import "./style.css";

function WhiteKey(props) {
    return (
        <div className='white-key' style={{left: props.left, width: props.width}}/>
    );
}

export default WhiteKey;
