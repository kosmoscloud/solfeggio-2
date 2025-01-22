import React, { useContext, useState } from 'react';

import { IOContext } from '../../managers/IOLayer.jsx';
import { UIContext } from '../../managers/UILayer.jsx';
import { LanguageContext } from '../../managers/UILayer.jsx';

import Table from '../../components/table/Table.jsx';
import Column from '../../components/table/column/Column.jsx';
import Text from '../../components/text/Text.jsx';
import Checkbox from '../../components/checkbox/Checkbox.jsx';
import Button from '../../components/button/Button.jsx';
import Spacer from '../../components/spacer/Spacer.jsx';

import Overlay from './Overlay.jsx';
import OKCancel from './okcancel/OKCancel.jsx';

function SelectInstruments() {

    const { enabledInstruments, setEnabledInstruments, currentInstrument, setCurrentInstrument } = useContext(IOContext);
    const [ tempEnabledInstruments, setTempEnabledInstruments ] = useState(enabledInstruments);
    const [ tempCurrentInstrument, setTempCurrentInstrument ] = useState(currentInstrument);
    const { shuffleInstruments, setShuffleInstruments } = useContext(IOContext);
    const [ tempShuffleInstruments, setTempShuffleInstruments ] = useState(shuffleInstruments);
    const { showElement, lastOpenedElement, showAlert } = useContext(UIContext);

    const { dictionary } = useContext(LanguageContext);

    const acceptChanges = () => {
        setEnabledInstruments(tempEnabledInstruments);
        setCurrentInstrument(tempCurrentInstrument);
        setShuffleInstruments(tempShuffleInstruments);
        showElement(lastOpenedElement);
    }

    const toggleInstrument = (instrument) => {
        if (tempEnabledInstruments.length === 1 && tempEnabledInstruments.includes(instrument)) {
            showAlert("Musisz wybrać przynajmniej jeden instrument.");
            return;
        }
        if (tempShuffleInstruments) {
            if (tempEnabledInstruments.includes(instrument)) {
                setTempEnabledInstruments(tempEnabledInstruments.filter(i => i !== instrument));
            } else {
                setTempEnabledInstruments([...tempEnabledInstruments, instrument]);
            }
        } else {
            setTempCurrentInstrument(instrument);
        }  
    }

    const toggleShuffle = () => {
        setTempShuffleInstruments(!tempShuffleInstruments);
        if (!tempShuffleInstruments) {
            setTempCurrentInstrument('piano');
        }
    }

    const isChecked = (instrument) => {
        return tempShuffleInstruments ? tempEnabledInstruments.includes(instrument) : tempCurrentInstrument === instrument;
    }

    return (
        <Overlay>
            <Table>
                <Column>
                    <Text>
                        {tempShuffleInstruments && dictionary.selectedinstruments}
                        {!tempShuffleInstruments && dictionary.selectedinstrument}
                    </Text>
                    <Checkbox label={dictionary.piano} isChecked={isChecked('piano')} onClick={() => toggleInstrument('piano')} />
                    <Checkbox label={dictionary.guitar} isChecked={isChecked('guitar')} onClick={() => toggleInstrument('guitar')} />
                    <Checkbox label={dictionary.marimba} isChecked={isChecked('marimba')} onClick={() => toggleInstrument('marimba')} />
                    <Checkbox label={dictionary.violin} isChecked={isChecked('violin')} onClick={() => toggleInstrument('violin')} />
                </Column>
                <Column>
                    <Spacer length={1}/>
                    <Checkbox label={dictionary.flute} isChecked={isChecked('flute')} onClick={() => toggleInstrument('flute')} />
                    <Checkbox label={dictionary.trombone} isChecked={isChecked('trombone')} onClick={() => toggleInstrument('trombone')} />
                    <Spacer length={1}/>
                    <Text>{dictionary.selectrandom}</Text>
                    <Checkbox label={dictionary.yes} isChecked={tempShuffleInstruments} onClick={toggleShuffle}/>
                </Column>
                <Column width={0.5}>
                    <OKCancel onOK={acceptChanges} onCancel={() => showElement(lastOpenedElement)}/>
                    <Spacer length={3}/>
                </Column>
            </Table>
        </Overlay>
    )
}

export default SelectInstruments;
