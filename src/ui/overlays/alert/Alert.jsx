import React, { useContext } from "react";

import { UIContext } from "../../../managers/UILayer";

import Overlay from "../Overlay";
import Text from "../../../components/text/Text";
import Column from "../../../components/table/column/Column";
import Button from "../../../components/button/Button";
import Spacer from "../../../components/spacer/Spacer";

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
            <Column alignItems="center">
                <Text wrap={true}>{text}</Text>
                <div style={{display: 'flex', justifyContent: 'center', height: '5vmin', width: '10vmax', flex: 1}}>
                    <Button label="OK" onClick={handleClick}/>
                </div>
            </Column>
        </Overlay>
    );
}

export default Alert;
