import React, {useContext} from "react";

import { OverlaysContext } from "../../managers/OverlaysManager";
import Overlay from "./Overlay.jsx";
import Button from "../../components/button/Button.jsx";
import Column from "../../components/table/column/Column";

import Text from "../../components/text/Text";

import "./style.css";

function About() {

    const { hideAlert } = useContext(OverlaysContext);

    return (
        <Overlay minHeight="20%" minWidth="50%">
            <Column>
                <Text wrap={true}>Program Solfeggio-2 służy do ćwiczenia słuchu muzycznego.</Text>
                <Button label='OK' onClick={hideAlert}/>
            </Column>
        </Overlay>
    );
}

export default About;
