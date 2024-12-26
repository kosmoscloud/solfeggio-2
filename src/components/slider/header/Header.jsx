import React from "react";
import "./style.css";

function Header (props) {
    return (
        <div className={props.enabled ? "header" : "disabled-header"}>
            <div className={props.enabled ? "filler" : "disabled-filler"}/>
            <div className="text">
                <div>{props.text}</div>
            </div>
            <div className={props.enabled ? "filler" : "disabled-filler"}/>
        </div>
    );
}

export default Header;
