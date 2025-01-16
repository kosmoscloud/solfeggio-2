import React, { createContext, useContext, useState } from 'react';

import { UIContext } from '../../managers/UILayer';
import { IOContext } from '../../managers/IOLayer';
import { LanguageContext } from '../../managers/UILayer';

import { calculateEffectiveScale, GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';
import OverlayKeyboard from '../keyboard/OverlayKeyboard';
import Button from '../../components/button/Button';
import Checkbox from '../../components/checkbox/Checkbox';
import Select from '../../components/select/Select';
import Table from '../../components/table/Table';
import Column from '../../components/table/column/Column';
import Spacer from '../../components/spacer/Spacer';
import Text from '../../components/text/Text';

import Overlay from './Overlay';

const RangesContext = createContext();

function Ranges() {

    const { firstNote, setFirstNote, lastNote, setLastNote, scale, setScale, effectiveScale } = useContext(GlobalSettingsContext);
    const { playNotes, setCurrentInstrument } = useContext(IOContext);
    const centerNote = effectiveScale[Math.floor(effectiveScale.length / 2)];
    const keyRange = { low: Math.max(centerNote - 12, 0), high: Math.min(centerNote + 12, 127) };
    const [ tempFirstNote, setTempFirstNote ] = useState(firstNote);
    const [ tempLastNote, setTempLastNote ] = useState(lastNote);
    const [ tempScale, setTempScale ] = useState(scale);
    const [ isPlayingBack, setIsPlayingBack ] = useState(false);
    const markedNotes = calculateEffectiveScale(tempFirstNote, tempLastNote, tempScale);
    const [ isListeningForFirstNote, setIsListeningForFirstNote ] = useState(false);
    const [ isListeningForLastNote, setIsListeningForLastNote ] = useState(false);

    const { showAlert, showElement, lastOpenedElement } = useContext(UIContext);

    const { dictionary } = useContext(LanguageContext);

    const acceptChanges = () => {
        if (tempFirstNote < tempLastNote) {
            console.log('akceptowando, tempFirstNote:', tempFirstNote, 'tempLastNote:', tempLastNote, 'tempScale:', tempScale);
            setFirstNote(tempFirstNote);
            setLastNote(tempLastNote);
            setScale(tempScale);
            showElement(lastOpenedElement);
        } else {
            showAlert("Pierwsza nuta musi być niższa od ostatniej");
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
                            <Text>{dictionary.firstnote}</Text>
                            <Checkbox value={tempFirstNote} label={dictionary.choose} onClick={() => setIsListeningForFirstNote(true)} isChecked={isListeningForFirstNote}/>
                            <Spacer length={2}/>
                            <Text>{dictionary.lastnote}</Text>
                            <Checkbox value={tempLastNote} label={dictionary.choose} onClick={() => setIsListeningForLastNote(true)} isChecked={isListeningForLastNote}/>
                        </Column>
                        <Column>
                            <Text>Skala</Text>
                            <Select value={tempScale} onChange={e => setTempScale(e.target.value)}>
                                <option value="major">{dictionary.major}</option>
                                <option value="minor">{dictionary.minor}</option>
                                <option value="blues">{dictionary.blues}</option>
                                <option value="pentatonic">{dictionary.pentatonic}</option>
                                <option value="chromatic">{dictionary.chromatic}</option>
                                <option value="harmonicMinor">{dictionary.harmonicminor}</option>
                                <option value="dorianMinor">{dictionary.jazzminor}</option>
                                <option value="wholeTone">{dictionary.wholetone}</option>
                            </Select>
                            <Spacer length={5}/>
                            <Button label={dictionary.playscale} onClick={playTempScale} isEnabled={!isPlayingBack}/>
                        </Column>
                        <Column width={0.5}>
                            <Button label={dictionary.ok} onClick={acceptChanges}/>
                            <Button label={dictionary.cancel} onClick={() => showElement(lastOpenedElement)}/>
                            <Spacer length={3}/>
                        </Column>
                    </Table>
                </Overlay>
            </RangesContext.Provider>
        </div>
    );

}

export default Ranges;
