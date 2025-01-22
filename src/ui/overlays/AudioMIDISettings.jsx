import { useContext, useState } from "react";

import { IOContext } from "../../managers/IOLayer";
import { UIContext } from "../../managers/UILayer";
import { LanguageContext } from "../../managers/UILayer";

import Checkbox from "../../components/checkbox/Checkbox";
import Column from "../../components/table/column/Column";
import Table from "../../components/table/Table";
import Button from "../../components/button/Button";
import Spacer from "../../components/spacer/Spacer";
import Text from "../../components/text/Text";

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
        <Overlay>
            <Table>
                <Column>
                    <Text>{dictionary.outputinterface}:</Text>
                    <Checkbox label="Audio" isChecked={!tempIsMidiEnabled} onClick={() => tempSetIsMidiEnabled(false)}/>
                    <Checkbox label="MIDI" isChecked={tempIsMidiEnabled} onClick={() => setMidi(true)} />
                </Column>
                <Column>
                    <OKCancel onOK={acceptChanges} onCancel={() => showElement(lastOpenedElement)}/>
                    <Spacer length={0.5}/>
                </Column>
            </Table>
        </Overlay>)

}

export default AudioMIDISettings;
