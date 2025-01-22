import React from "react";

import Text from "../text/Text";

import "./style.css";

function Header({isEnabled = true, text, small=false}) {

    return (
        <div className={isEnabled ? "header" : "disabled-header"}>
            <Text size='small'>{text}</Text>
        </div>
    );
}

export default Header;
