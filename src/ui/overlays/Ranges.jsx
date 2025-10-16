import React, { createContext, useContext, useState } from 'react';

import { UIContext } from '../../layers/UILayer';
import { IOContext } from '../../layers/IOLayer';
import { LanguageContext } from '../../layers/UILayer';

import { calculateEffectiveScale, GlobalSettingsContext } from '../../layers/GlobalSettingsLayer';
import OverlayKeyboard from '../keyboard/OverlayKeyboard';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Select from '../../components/Select';
import FlexContainer from '../../components/FlexContainer';
import Spacer from '../../components/FlexContainer';
import Text from '../../components/Text';

import Overlay from './Overlay';
import OKCancel from './okcancel/OKCancel';

const RangesContext = createContext();

function Ranges() {

    const { firstNote, setFirstNote, lastNote, setLastNote, scale, setScale, effectiveScale, isMobile } = useContext(GlobalSettingsContext);
    const { playNotes } = useContext(IOContext);
    const centerNote = effectiveScale[Math.floor(effectiveScale.length / 2)];
    const keyRange = { low: Math.max(centerNote - (isMobile ? 12 : 24), 0), high: Math.min(centerNote + (isMobile ? 12 : 24), 127) };
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
                <Overlay type='bottom' minWidth="50%" minHeight="20%">
                    <FlexContainer direction='row' gap={2}>
                        <FlexContainer>
                            <Text>{dictionary.firstnote}</Text>
                            <Checkbox value={tempFirstNote} label={dictionary.choose} onClick={() => setIsListeningForFirstNote(true)} isChecked={isListeningForFirstNote}/>
                            <Spacer length={2}/>
                            <Text>{dictionary.lastnote}</Text>
                            <Checkbox value={tempLastNote} label={dictionary.choose} onClick={() => setIsListeningForLastNote(true)} isChecked={isListeningForLastNote}/>
                        </FlexContainer>
                        <FlexContainer >
                            <Text>{dictionary.scale}</Text>
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
                        </FlexContainer>
                    </FlexContainer>
                </Overlay>
                <OKCancel onOK={acceptChanges} onCancel={() => showElement(lastOpenedElement)} top='90%'/>
            </RangesContext.Provider>
        </div>
    );

}

export default Ranges;
