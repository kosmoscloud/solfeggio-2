import React from "react";
import "./style.css";
import { ReactComponent as Arrow } from "../../assets/svg/arrow.svg"

function Button({ isEnabled, direction, onClick }) {

    const svgProps = {
        flex: 1,
        className: "arrow",
    }

    return (
        <div className={isEnabled ? direction : ("disabled-" + direction)} onClick={onClick}>
            <Arrow {...svgProps} />
        </div>
    );
}

export default Button;
