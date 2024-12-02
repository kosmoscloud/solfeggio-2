import React from "react";
import "./style.css";

function PanelHeader(props) {
    return (
        <div className={"box"+props.number}>
            <div className="panel-header">
                <div className="header-filler-left"/>
                <p className="header-text">{props.text}</p>
                <div className="header-filler-right"/>
            </div>
        </div>
    );
}

export default PanelHeader;
