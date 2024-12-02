import React from "react";
import "./style.css";

function Header(props) {
    return (
            <div className="header">
                <div className="filler"/>
                <div className="text">
                    <div>{props.text}</div>
                </div>
                <div className="filler"/>
            </div>
    );
}

export default Header;
