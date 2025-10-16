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

    const linkCapture = /(https?:\/\/[^\s]+|www\.[^\s]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/;
    const urlExact = /^(https?:\/\/[^\s]+|www\.[^\s]+)$/;
    const emailExact = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const stripTrailingPunct = (text) => {
        const m = text.match(/^(.*?)([.,!?;:)\]]*)$/);
        return { core: m ? m[1] : text, trailing: m ? m[2] : "" };
    };

    return (
        <div>
            <Overlay minWidth="60%" minHeight="30%">
                <FlexContainer>
                    <Text center={false} wrap={true}>
                        {dictionary.app_description.split('\n').map((line, i, arr) => (
                            <span key={i}>
                                {line.split(linkCapture).map((part, j) => {
                                    if (!part) return null;

                                    const { core, trailing } = stripTrailingPunct(part);

                                    if (emailExact.test(core)) {
                                        return (
                                            <span key={j}>
                                                <a
                                                    href={`mailto:${core}`}
                                                >
                                                    {core}
                                                </a>
                                                {trailing}
                                            </span>
                                        );
                                    }

                                    if (urlExact.test(core)) {
                                        const href = core.startsWith('http') ? core : `http://${core}`;
                                        return (
                                            <span key={j}>
                                                <a
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {core}
                                                </a>
                                                {trailing}
                                            </span>
                                        );
                                    }

                                    return <span key={j}>{part}</span>;
                                })}
                                {i < arr.length - 1 && <br />}
                            </span>
                        ))}
                    </Text>
                </FlexContainer>
            </Overlay>
            <OK onOK={() => showElement(lastOpenedElement)} top='75%'/>
        </div>
    )
}

export default About;
