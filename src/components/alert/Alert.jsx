import React, { useContext } from "react";
import "./style.css";
import { OverlaysContext } from "../../managers/OverlaysManager";
import AlertIcon from "./icon/AlertIcon";

function Alert(props) {

    const { hideAlert } = useContext(OverlaysContext);

    return (
        <div className="alert">
            <div className="alert-content">
                <div className="alert-icon-container">
                    <AlertIcon />
                </div>
                <div className="alert-text">
                    {props.text}
                </div>
            </div>
        </div>
    );
}

export default Alert;
