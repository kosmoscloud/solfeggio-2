import React from "react";
import "./style.css";

function Header({isEnabled = true, text}) {
    return (
        <div className={isEnabled ? "header" : "disabled-header"}>
            <div className={isEnabled ? "header-filler" : "disabled-header-filler"}/>
            <div className="header-text">{text}</div>
            <div className={isEnabled ? "header-filler" : "disabled-header-filler"}/>
        </div>
    );
}

export default Header;
