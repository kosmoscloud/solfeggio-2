import React from "react";

import Text from "../text/Text";

import "./style.css";

function MenuOption({label, onClick, icon, children}) {

    if (!icon) {
        icon = require("../../assets/icons/placeholder.webp");
    }

    return (
        <div className="menuoption" onClick={onClick}>
            {icon && <img src={icon} className={"icon"} alt="button with icon" />}
            {label && <Text center={true} wrap={true}>{label}</Text>}
        </div>
    );
}

export default MenuOption;
