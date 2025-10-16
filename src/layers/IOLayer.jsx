import { createContext, useState, useRef, useContext } from 'react';

import { GlobalSettingsContext } from './GlobalSettingsLayer';

import SoundGenerator from '../generators/SoundGenerator';
import ReproductionMode from './enums/ReproductionMode';

export const IOContext = createContext();

function IOLayer({children}) {
    
    const { noteLength, noteSpacing } = useContext(GlobalSettingsContext);
    
    const doesBrowserSupportMIDI = useRef(navigator.requestMIDIAccess !== undefined);
    //const midiGenerator = useRef(doesBrowserSupportMIDI ? MidiGenerator() : null);
    
    const instruments = ['piano', 'guitar', 'marimba', 'violin', 'flute', 'trombone'];
    const [ enabledInstruments, setEnabledInstruments ] = useState(instruments);
    
    const [ reproductionMode, setReproductionMode ] = useState(ReproductionMode.SIMULTANEOUS);
    const soundGenerator = useRef(SoundGenerator(reproductionMode));

    // trigger is used to make sure the useEffect is called when the state is updated
    const [ trigger, setTrigger ] = useState(false);
    const [ lastInput, setLastInput ] = useState(null);
    
    const [ markedNotes, setMarkedNotes ] = useState([]);
    const [ playedNotes, setPlayedNotes ] = useState([]);
    const [ markedAnswers, setMarkedAnswers ] = useState([]);

    const [ midiAccess, setMidiAccess ] = useState(null);
    const [ midiInput, setMidiInput ] = useState(null);
    const [ midiOutput, setMidiOutput ] = useState(null);
    const [ isMidiEnabled, setIsMidiEnabled ] = useState(false);


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
            doesBrowserSupportMIDI: doesBrowserSupportMIDI.current,
            midiAccess, setMidiAccess,
            midiInput, setMidiInput,
            midiOutput, setMidiOutput,
            isMidiEnabled, setIsMidiEnabled}}>
            {children}
        </IOContext.Provider>
    );
}

export default IOLayer;
