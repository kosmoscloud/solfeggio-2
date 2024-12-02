import React from "react";
import "./style.css";

function PanelButton(props) {
    return (
        <div className={"box"+props.number}>
            <div className="panel-button">{props.text}</div>
        </div>
    );
}

export default PanelButton;
