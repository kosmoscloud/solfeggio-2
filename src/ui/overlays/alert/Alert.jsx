import React, { useContext } from "react";

import { UIContext } from "../../../layers/UILayer";

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
        <Overlay minHeight='15%'>
            <FlexContainer>
                <Text wrap={true}>{text}</Text>
                <FlexContainer>
                    <Button label="OK" onClick={handleClick}/>
                </FlexContainer>
            </FlexContainer>
        </Overlay>
    );
}

export default Alert;
