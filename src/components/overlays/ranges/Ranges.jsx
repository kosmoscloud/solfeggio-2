import React, { createContext, useContext, useState } from 'react';
import Button from '../buttons/button/Button';
import Checkbox from '../checkbox/Checkbox';
import { calculateEffectiveScale, GlobalSettingsContext } from '../../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../../managers/OverlaysManager';
import Keyboard from '../../keyboard/Keyboard';
import './style.css';
import SoundGenerator from '../../../generators/SoundGenerator';
import Select from '../select/Select';

const RangesContext = createContext();

function Ranges() {

    const { firstNote, setFirstNote, lastNote, setLastNote, scale, setScale, effectiveScale } = useContext(GlobalSettingsContext);
    const centerNote = effectiveScale[Math.floor(effectiveScale.length / 2)];
    const keyRange = { low: Math.max(centerNote - 30, 0), high: Math.min(centerNote + 30, 127) };
    const [ tempFirstNote, setTempFirstNote ] = useState(firstNote);
    const [ tempLastNote, setTempLastNote ] = useState(lastNote);
    const [ tempScale, setTempScale ] = useState(scale);
    const { hideOverlay } = useContext(OverlaysContext); 
    const soundGenerator = new SoundGenerator();
    const [ isPlaybackChecked, setIsPlaybackChecked ] = useState(false);
    const markedNotes = calculateEffectiveScale(tempFirstNote, tempLastNote, tempScale);
    const [ isListeningForFirstNote, setIsListeningForFirstNote ] = useState(false);
    const [ isListeningForLastNote, setIsListeningForLastNote ] = useState(false);

    const acceptChanges = () => {
        setFirstNote(tempFirstNote);
        setLastNote(tempLastNote);
        setScale(tempScale);
        hideOverlay();
    };

    const playTempScale = () => {
        setIsPlaybackChecked(true);
        soundGenerator.playSequence(calculateEffectiveScale(tempFirstNote, tempLastNote, tempScale), 200, 1).then(() => {
            setIsPlaybackChecked(false);
        });
    }

    const onNotePlayed = (midiNote) => {
        if (isListeningForFirstNote) {
            setTempFirstNote(midiNote);
            setIsListeningForFirstNote(false);
        }
        if (isListeningForLastNote) {
            setTempLastNote(midiNote);
            setIsListeningForLastNote(false);
        }
    }

    return (
        <div>
            <RangesContext.Provider value={{ firstNote, setFirstNote, lastNote, setLastNote, scale, setScale, keyRange, markedNotes }}>
                <Keyboard context={RangesContext} onNotePlayed={onNotePlayed} overlay={true}/>
                <div className = "ranges">
                    <div className = "settingscolumn">
                        <div className = "rangelimits">
                            <Checkbox value={tempFirstNote} label="Pierwsza nuta" onClick={() => setIsListeningForFirstNote(true)} isChecked={isListeningForFirstNote}/>
                            <Checkbox value={tempLastNote} label="Ostatnia nuta" onClick={() => setIsListeningForLastNote(true)} isChecked={isListeningForLastNote}/>
                        </div>
                        <div className="rangescale">
                            <Select value={tempScale} label="Skala" onChange={e => setTempScale(e.target.value)}>
                                <option value="major">Dur</option>
                                <option value="minor">Moll</option>
                                <option value="blues">Blues</option>
                                <option value="pentatonic">Pięciotonowa</option>
                                <option value="chromatic">Chromatyczna</option>
                                <option value="harmonicMinor">Moll Harm.</option>
                                <option value="melodicMinor">Moll Mel.</option>
                                <option value="wholeTone">Całotonowa</option>
                            </Select>
                        </div>
                    </div>
                    <div className="acceptcancelplay">
                        <Button label="OK" onClick={acceptChanges}/>
                        <Button label="Anuluj" onClick={hideOverlay}/>
                        <Checkbox label="Graj skalę" onClick={playTempScale} isChecked={isPlaybackChecked}/>
                        
                    </div>
                </div>
            </RangesContext.Provider>
        </div>
    );

}

export default Ranges;
