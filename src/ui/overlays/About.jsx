import React, {useContext} from "react";

import { OverlaysContext } from "../../managers/OverlayLayer.jsx";
import Overlay from "./Overlay.jsx";
import Button from "../../components/button/Button.jsx";

import Text from "../../components/text/Text";

import "./style.css";

function About() {

    const { hideAlert } = useContext(OverlaysContext);

    return (
        <Overlay minHeight="20%" minWidth="50%">
            <FlexContainer>
                <Text wrap={true}>Program Solfeggio-2 służy do ćwiczenia słuchu muzycznego.</Text>
                <Button label='OK' onClick={hideAlert}/>
            </FlexContainer>
        </Overlay>
    );
}

export default About;
