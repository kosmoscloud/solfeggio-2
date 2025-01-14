import React, { useContext } from "react";

import { UIContext } from "../../../managers/UILayer";

import Overlay from "../Overlay";
import Table from "../../../components/table/Table";
import Column from "../../../components/table/column/Column";
import Button from "../../../components/button/Button";

import "./style.css";

function Alert({text, afterAlert}) {

    const { hideAlert } = useContext(UIContext);

    const handleClick = () => {
        hideAlert();
        if (afterAlert) {
            afterAlert();
        }
    };

    return (
        <Overlay>
            <Table>
                <Column alignItems="center">
                    <p>{text}</p>
                    <div style={{display: 'flex', justifyContent: 'center', height: '5vh', width: '10vw'}}>
                        <Button label="OK" onClick={handleClick}>OK</Button>
                    </div>
                </Column>
            </Table>
        </Overlay>
    );
}

export default Alert;
