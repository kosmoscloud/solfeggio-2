import React, { useContext } from "react";

import { UIContext } from "../../../managers/UILayer";

import Overlay from "../Overlay";
import Text from "../../../components/Text";
import FlexContainer from "../../../components/FlexContainer";
import Button from "../../../components/Button";

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
            <FlexContainer>
                <Text wrap={true}>{text}</Text>
                <div style={{display: 'flex', justifyContent: 'center', height: '5vmin', width: '10vmax', flex: 1}}>
                    <Button label="OK" onClick={handleClick}/>
                </div>
            </FlexContainer>
        </Overlay>
    );
}

export default Alert;
