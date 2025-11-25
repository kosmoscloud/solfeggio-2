import { createContext, useState, useRef, useContext, useEffect } from 'react';

import { GlobalSettingsContext } from './GlobalSettingsLayer';

import SoundGenerator from '../generators/SoundGenerator';
import ReproductionMode from './enums/ReproductionMode';

export const IOContext = createContext();

function IOLayer({children}) {
    
    const { noteLength, noteSpacing } = useContext(GlobalSettingsContext);
    
    const instruments = ['piano', 'guitar', 'marimba', 'violin', 'flute', 'trombone'];
    const [ enabledInstruments, setEnabledInstruments ] = useState(instruments);
    
    const [ reproductionMode, setReproductionMode ] = useState(ReproductionMode.SIMULTANEOUS);
    const soundGenerator = useRef(SoundGenerator(reproductionMode));

    const isMidiAvailable = useRef(navigator.requestMIDIAccess !== undefined).current;
    // trigger is used to make sure the useEffect is called when the state is updated
    const [ trigger, setTrigger ] = useState(false);
    const [ lastInput, setLastInput ] = useState(null);
    
    const [ markedNotes, setMarkedNotes ] = useState([]);
    const [ playedNotes, setPlayedNotes ] = useState([]);
    const [ markedAnswers, setMarkedAnswers ] = useState([]);

    const [ isMidiInputEnabled, setIsMidiInputEnabled ] = useState(false);

    const playNotes = async (notes, length = noteLength, spacing = noteSpacing) => {
        for (let i = 0; i < notes.length; i++) {
            await soundGenerator.current.playNotes(notes[i], length, reproductionMode);
            if (i < notes.length - 1) await new Promise(resolve => setTimeout(resolve, spacing * 1000));
        }
    }

    const triggerLastInput = (input) => {
        setLastInput(input);
        setTrigger(!trigger);
    }

    const stopPlaying = () => {
        soundGenerator.current.stopPlaying();
    }

    return (
        <IOContext.Provider value={{
            playNotes, stopPlaying,
            enabledInstruments, setEnabledInstruments,
            reproductionMode, setReproductionMode,
            trigger,
            lastInput, triggerLastInput,
            markedNotes, setMarkedNotes,
            playedNotes, setPlayedNotes,
            markedAnswers, setMarkedAnswers,
            isMidiInputEnabled, setIsMidiInputEnabled,
            isMidiAvailable }}>
            {children}
        </IOContext.Provider>
    );
}

export default IOLayer;
