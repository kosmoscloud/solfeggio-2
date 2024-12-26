import React from "react";
import "./style.css";

function Header({enabled = true, text}) {
    return (
        <div className={enabled ? "header" : "disabled-header"}>
            <div className={enabled ? "header-filler" : "disabled-header-filler"}/>
            <p className="header-text">{text}</p>
            <div className={enabled ? "header-filler" : "disabled-header-filler"}/>
        </div>
    );
}

export default Header;
