import React from "react";
import "./style.css";
import { ReactComponent as Arrow } from "../../assets/svg/arrow.svg"

function Button(props) {

    const svgProps = {
        flex: 1,
        className: "arrow",
    }

    return (
        <div className={props.enabled ? props.direction : ("disabled-" + props.direction)} onClick={props.onClick}>
            <Arrow {...svgProps} />
        </div>
    );
}

export default Button;
