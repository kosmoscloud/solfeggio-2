import React from "react";
import "./style.css";

function Header({enabled = true, text}) {
    return (
        <div className={enabled ? "header" : "disabled-header"}>
            <div className={enabled ? "header-filler" : "disabled-header-filler"}/>
            <div className="header-text">{text}</div>
            <div className={enabled ? "header-filler" : "disabled-header-filler"}/>
        </div>
    );
}

export default Header;
