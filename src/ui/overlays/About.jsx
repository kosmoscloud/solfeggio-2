import { useContext } from "react";

import { UIContext } from "../../layers/UILayer";
import { LanguageContext } from "../../layers/UILayer";

import OK from "./ok/OK";
import FlexContainer from "../../components/FlexContainer";
import Text from "../../components/Text";

import Overlay from "./Overlay";

function About() {

    const { showElement, lastOpenedElement } = useContext(UIContext);
    const { dictionary } = useContext(LanguageContext);

    return (
        <div>
            <Overlay minWidth="60%" minHeight="30%">
                <FlexContainer>
                    <Text center={false}>{dictionary.outputinterface}:</Text>
                </FlexContainer>
            </Overlay>
            <OK onOK={() => showElement(lastOpenedElement)} top='75%'/>
        </div>)
}

export default About;
