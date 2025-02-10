import React from "react";

import Text from "./Text";

function Button({label, isEnabled = true, onClick, icon, shadow = true, children}) {

    const [isHovered, setIsHovered] = React.useState(false);
    let isClickable = isEnabled && onClick

    const style = {
        backgroundColor: isEnabled ? (isClickable && isHovered ? "#000" : "#fff") : "#333",
        color: (isClickable && isHovered) ? "#fff" : "#000",
        boxShadow: shadow ? "1vmin 1vmin 0 #333" : "none",
        cursor: isClickable ? "pointer" : "default",
        border: "2px solid black",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "0.5vmin",
    };

    return (
        <div style={style} onClick={isEnabled ? onClick : null} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {label && <Text center={true}>{label}</Text>}
            {icon && <img src={icon} className={"icon"} alt="button with icon" />}
            {children && children}
        </div>
    );
}

export default Button;
