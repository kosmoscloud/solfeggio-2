import React, { useContext } from "react";
import { OverlaysContext } from "../../managers/OverlaysManager";
import Button from "../../components/button/Button"
import AlertIcon from "./icon/AlertIcon";
import "./style.css";

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
            <div className="alert-button-container">
                    <Button label="OK" onClick={hideAlert}/>
            </div>
        </div>
    );
}

export default Alert;
