import { useContext, useState } from "react";

import { IOContext } from "../../layers/IOLayer";
import { UIContext } from "../../layers/UILayer";
import { LanguageContext } from "../../layers/UILayer";

import Checkbox from "../../components/Checkbox";
import FlexContainer from "../../components/FlexContainer";
import Text from "../../components/Text";

import Overlay from "./Overlay";
import OKCancel from "./okcancel/OKCancel";

function AudioMIDISettings() {

    const { isMidiEnabled, setIsMidiEnabled, doesBrowserSupportMIDI } = useContext(IOContext);
    const [ tempIsMidiEnabled, tempSetIsMidiEnabled ] = useState(isMidiEnabled);

    const { showElement, lastOpenedElement, showAlert } = useContext(UIContext);
    const { dictionary } = useContext(LanguageContext);

    const acceptChanges = () => {
        setIsMidiEnabled(tempIsMidiEnabled);
        showElement(lastOpenedElement);
    }

    const setMidi = (value) => {
        if (!doesBrowserSupportMIDI) {
            showAlert("Twoja przeglądarka nie obsługuje MIDI.");
            return;
        }
        tempSetIsMidiEnabled(value);
    }

    return (
        <div>
            <Overlay minWidth="30%" minHeight="20%">
                <FlexContainer>
                    <Text center={false}>{dictionary.outputinterface}:</Text>
                    <Checkbox label="Audio" isChecked={!tempIsMidiEnabled} onClick={() => tempSetIsMidiEnabled(false)}/>
                    <Checkbox label="MIDI" isChecked={tempIsMidiEnabled} onClick={() => setMidi(true)} />
                </FlexContainer>
            </Overlay>
            <OKCancel onOK={acceptChanges} onCancel={() => showElement(lastOpenedElement)} top='70%'/>
        </div>)

}

export default AudioMIDISettings;
