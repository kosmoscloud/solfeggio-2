import React from "react";

import Text from "../text/Text";

import "./style.css";

function MenuOption({label, onClick, enabled=true}) {

    let className = "menuoption"

    if (!enabled) {
        className += " disabled"
    } else {
        className += " enabled"
    }

    return (
        <div className={className} onClick={enabled ? onClick : null}>
            {label && <Text center={true} wrap={true}>{label}</Text>}
        </div>
    );
}

export default MenuOption;
