import { useContext, useState } from "react";

import { OverlaysContext } from "../../managers/OverlaysManager";
import { IOContext } from "../../managers/IOManager";

import Checkbox from "../../components/checkbox/Checkbox";
import Column from "../../components/table/column/Column";
import Table from "../../components/table/Table";
import Button from "../../components/button/Button";
import Spacer from "../../components/spacer/Spacer";
import Text from "../../components/text/Text";

import Overlay from "./Overlay";

function AudioMIDISettings() {

    const { isMidiEnabled, setIsMidiEnabled, doesBrowserSupportMIDI } = useContext(IOContext);
    const [ tempIsMidiEnabled, tempSetIsMidiEnabled ] = useState(isMidiEnabled);

    const { hideOverlay, showAlert } = useContext(OverlaysContext);

    const acceptChanges = () => {
        if (tempIsMidiEnabled !== isMidiEnabled && doesBrowserSupportMIDI) {
            setIsMidiEnabled(tempIsMidiEnabled);
        }
        hideOverlay();
    }

    const setMidi = (value) => {
        console.log('doesBrowserSupportMidi', doesBrowserSupportMIDI);
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
                    <Text>Interfejs wyjściowy:</Text>
                    <Checkbox label="Audio" isChecked={!tempIsMidiEnabled} onClick={() => tempSetIsMidiEnabled(false)}/>
                    <Checkbox label="MIDI" isChecked={tempIsMidiEnabled} onClick={() => setMidi(true)} />
                </Column>
                <Column>
                    <Button label="OK" onClick={acceptChanges}/>
                    <Button label="Anuluj" onClick={hideOverlay}/>
                    <Spacer length={0.5}/>
                </Column>
            </Table>
        </Overlay>)

}

export default AudioMIDISettings;
