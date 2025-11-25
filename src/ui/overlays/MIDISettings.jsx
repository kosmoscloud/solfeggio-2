import { useContext } from "react";

import { IOContext } from "../../layers/IOLayer";
import { UIContext } from "../../layers/UILayer";
import { LanguageContext } from "../../layers/UILayer";

import FlexContainer from "../../components/FlexContainer";
import Text from "../../components/Text";
import Select from "../../components/Select";

import Overlay from "./Overlay";
import OKCancel from "./okcancel/OKCancel";
import { useMIDIInputs } from "@react-midi/hooks";
import { useRef } from "react";


function AudioMIDISettings() {

    const { inputs, selectInput, selectedInputId } = useMIDIInputs();
    const { isMidiAvailable } = useContext(IOContext);
    const isMidiInputListEmpty = useRef(inputs.length === 0).current;

    const { showElement, lastOpenedElement, showAlert } = useContext(UIContext);
    const { dictionary } = useContext(LanguageContext);

    const acceptChanges = () => {
        showElement(lastOpenedElement);
    }

    const setMidiInput = (input) => {
        selectInput(input);
    }

    return (
        <div>
            <Overlay minWidth="30%" minHeight="20%">
                {(isMidiAvailable && !isMidiInputListEmpty) && <FlexContainer>
                    <Text center={false}>{dictionary.midiinputsettings}:</Text>
                        <Select value={selectedInputId} onChange={(e) => setMidiInput(e.target.value)}>
                            {isMidiInputListEmpty && <option value="">{dictionary.nomidiinputs}</option>}
                            {inputs.map((midiInput) => (
                                <option key={midiInput.id} value={midiInput.id}>
                                    {midiInput.name}
                                </option>
                            ))}
                        </Select>
                </FlexContainer>}
                {!isMidiAvailable && <Text wrap={true}>{dictionary.midinotavailable}</Text>}
            </Overlay>
            <OKCancel onOK={acceptChanges} onCancel={() => showElement(lastOpenedElement)} top="70%" />
        </div>
    )

}

export default AudioMIDISettings;
