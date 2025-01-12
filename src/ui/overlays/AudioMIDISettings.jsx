import { useContext, useState } from "react";

import { OverlaysContext } from "../../managers/OverlaysManager";

import Checkbox from "../../components/checkbox/Checkbox";
import Column from "../../components/table/column/Column";
import Table from "../../components/table/Table";
import Button from "../../components/button/Button";
import Spacer from "../../components/spacer/Spacer";
import Text from "../../components/text/Text";

import Overlay from "./Overlay";

function AudioMIDISettings() {

    const [ isAudioSelected, setIsAudioSelected ] = useState(true);
    const { hideOverlay } = useContext(OverlaysContext);

    const acceptChanges = () => {
        hideOverlay();
    }

    return (
        <Overlay>
            <Table>
                <Column>
                    <Text>Interfejs wyjściowy:</Text>
                    <Checkbox label="Audio" isChecked={isAudioSelected} onClick={() => setIsAudioSelected(true)}/>
                    <Checkbox label="MIDI" isChecked={!isAudioSelected} onClick={() => setIsAudioSelected(false)}/>
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
