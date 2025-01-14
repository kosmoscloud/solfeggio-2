import React from "react";

import Text from "../text/Text";

import "./style.css";

function MenuOption({label, onClick}) {

    return (
        <div className="menuoption" onClick={onClick}>
            {label && <Text center={true} wrap={true}>{label}</Text>}
        </div>
    );
}

export default MenuOption;
