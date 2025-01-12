import React, { createContext, useContext, useEffect, useState } from 'react';

import { OverlaysContext } from '../../managers/OverlaysManager';
import { IOContext } from '../../managers/IOManager';

import { calculateEffectiveScale, GlobalSettingsContext } from '../../managers/GlobalSettingsManager';
import OverlayKeyboard from '../keyboard/OverlayKeyboard';
import Button from '../../components/button/Button';
import Checkbox from '../../components/checkbox/Checkbox';
import Select from '../../components/select/Select';
import Table from '../../components/table/Table';
import Column from '../../components/table/column/Column';
import Spacer from '../../components/spacer/Spacer';
import Text from '../../components/text/Text';

import Overlay from './Overlay';

import Alert from './alert/Alert';

const RangesContext = createContext();

function Ranges() {

    const { firstNote, setFirstNote, lastNote, setLastNote, scale, setScale, effectiveScale } = useContext(GlobalSettingsContext);
    const { playNotes, setCurrentInstrument } = useContext(IOContext);
    const centerNote = effectiveScale[Math.floor(effectiveScale.length / 2)];
    const keyRange = { low: Math.max(centerNote - 30, 0), high: Math.min(centerNote + 30, 127) };
    const [ tempFirstNote, setTempFirstNote ] = useState(firstNote);
    const [ tempLastNote, setTempLastNote ] = useState(lastNote);
    const [ tempScale, setTempScale ] = useState(scale);
    const { hideOverlay } = useContext(OverlaysContext);
    const [ isPlayingBack, setIsPlayingBack ] = useState(false);
    const markedNotes = calculateEffectiveScale(tempFirstNote, tempLastNote, tempScale);
    const [ isListeningForFirstNote, setIsListeningForFirstNote ] = useState(false);
    const [ isListeningForLastNote, setIsListeningForLastNote ] = useState(false);

    const { showAlert } = useContext(OverlaysContext);
    
    useEffect(() => {
        console.log('firstNote', firstNote);
        console.log('lastNote', lastNote);
    }, [firstNote, lastNote]);

    const acceptChanges = () => {
        if (tempFirstNote < tempLastNote) {
            const temp = tempFirstNote;
            setTempFirstNote(tempLastNote);
            setTempLastNote(temp);
            setScale(tempScale);
            hideOverlay();
        } else {
            showAlert(<Alert text="Pierwsza nuta musi być niższa od ostatniej" />);
        }
    };

    const playTempScale = async () => {
        setIsPlayingBack(true);
        setCurrentInstrument('piano');
        await playNotes(calculateEffectiveScale(tempFirstNote, tempLastNote, tempScale), 0.1, 0.1);
        setIsPlayingBack(false);
    }

    const onNotePlayed = async (midiNote) => {
        if (isListeningForFirstNote) {
            await setTempFirstNote(midiNote);
            setIsListeningForFirstNote(false);
        }
        if (isListeningForLastNote) {
            await setTempLastNote(midiNote);
            setIsListeningForLastNote(false);
        }
    }

    return (
        <div className="ranges">
            <RangesContext.Provider value={{ firstNote, setFirstNote, lastNote, setLastNote, scale, setScale, keyRange, markedNotes }}>
                <OverlayKeyboard keyRange={keyRange} onNotePlayed={onNotePlayed} markedNotes={markedNotes} />
                <Overlay type='bottom'>
                    <Table>
                        <Column>
                            <Text>Pierwsza nuta</Text>
                            <Checkbox value={tempFirstNote} label="wybierz" onClick={() => setIsListeningForFirstNote(true)} isChecked={isListeningForFirstNote}/>
                            <Spacer length={1}/>
                            <Text>Skala</Text>
                            <Select value={tempScale} onChange={e => setTempScale(e.target.value)}>
                                <option value="major">Dur</option>
                                <option value="minor">Moll</option>
                                <option value="blues">Blues</option>
                                <option value="pentatonic">Pięciotonowa</option>
                                <option value="chromatic">Chromatyczna</option>
                                <option value="harmonicMinor">Moll Harm.</option>
                                <option value="melodicMinor">Moll Mel.</option>
                                <option value="wholeTone">Całotonowa</option>
                            </Select>
                        </Column>
                        <Column>
                            <Text>Ostatnia nuta</Text>
                            <Checkbox value={tempLastNote} label="wybierz" onClick={() => setIsListeningForLastNote(true)} isChecked={isListeningForLastNote}/>
                            <Spacer length={1}/>
                            <Button label="Graj skalę" onClick={playTempScale} isEnabled={!isPlayingBack}/>
                        </Column>
                        <Column width={0.5}>
                            <Button label="OK" onClick={acceptChanges}/>
                            <Button label="Anuluj" onClick={hideOverlay}/>
                            <Spacer length={3}/>
                        </Column>
                    </Table>
                </Overlay>
            </RangesContext.Provider>
        </div>
    );

}

export default Ranges;
