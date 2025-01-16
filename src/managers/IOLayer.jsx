import React, { createContext, useState, useRef, useEffect } from 'react';

import SoundGenerator from '../generators/SoundGenerator';
import MidiGenerator from '../generators/MidiGenerator';

export const IOContext = createContext();

function IOLayer({children}) {
    
    const soundGenerator = useRef(SoundGenerator());

    const doesBrowserSupportMIDI = useRef(navigator.requestMIDIAccess !== undefined);
    const midiGenerator = useRef(doesBrowserSupportMIDI ? MidiGenerator() : null);

    const instruments = ['piano', 'guitar', 'marimba', 'violin', 'flute', 'trombone'];
    const [ enabledInstruments, setEnabledInstruments ] = useState(instruments);
    const [ currentInstrument, setCurrentInstrument ] = useState('piano');
    const [ shuffleInstruments, setShuffleInstruments ] = useState(false);

    // trigger is used to make sure the useEffect is called when the state is updated
    const [ trigger, setTrigger ] = useState(false);
    const [ lastAnswer, setLastAnswer ] = useState(null);
    const [ lastQuizAnswer, setLastQuizAnswer ] = useState(null);
    
    const [ markedNotes, setMarkedNotes ] = useState([]);
    const [ playedNotes, setPlayedNotes ] = useState([]);
    const [ markedAnswers, setMarkedAnswers ] = useState([]);

    const [ midiAccess, setMidiAccess ] = useState(null);
    const [ midiInput, setMidiInput ] = useState(null);
    const [ midiOutput, setMidiOutput ] = useState(null);
    const [ isMidiEnabled, setIsMidiEnabled ] = useState(false);

    const [ noteQueue, setNoteQueue ] = useState([]);
    const [ isChangingInstrument, setIsChangingInstrument ] = useState(false);

    useEffect(() => {
        setIsChangingInstrument(false);
    }, [currentInstrument]);

    useEffect(() => {
        if (noteQueue.length > 0 && !isChangingInstrument) {
            const { notes, spacing, duration } = noteQueue[0];
            if (!isMidiEnabled) {
                soundGenerator.current.playNotes(notes, spacing, duration, currentInstrument);
            } else {
                midiGenerator.current.playNotes(notes, spacing, duration);
            } 
            setNoteQueue(noteQueue.slice(1));
        }
    }, [currentInstrument, isChangingInstrument, noteQueue]);

    const playNotes = async (notes, spacing = 1.2, duration = 0.4) => {
        if (isMidiEnabled === false) {
            setNoteQueue([...noteQueue, { notes, spacing, duration }]);
        } else {
            midiGenerator.current.playNotes(notes, spacing, duration);
        }
    }

    const triggerLastAnswer = (answer) => {
        setLastAnswer(answer);
        setTrigger(!trigger);
    }

    const stopPlaying = () => {
        soundGenerator.current.stopPlaying();
    }

    function setCurrentInstrumentSync(instrument) {
        return new Promise((resolve) => {
            setCurrentInstrument(instrument);
            resolve();
        });
    }

    const triggerInstrumentChange = async () => {
        setIsChangingInstrument(true);
        const randomInstrument = enabledInstruments[Math.floor(Math.random() * enabledInstruments.length)];
        if (randomInstrument === currentInstrument) {
            return triggerInstrumentChange();
        }
        if (!isMidiEnabled) {
            await setCurrentInstrumentSync(randomInstrument);
        } else {
            //midiGenerator.current.setRandomInstrument();
        }
    }

    return (
        <IOContext.Provider value={{
            playNotes, stopPlaying, triggerInstrumentChange,
            shuffleInstruments, setShuffleInstruments,
            currentInstrument, setCurrentInstrument,
            enabledInstruments, setEnabledInstruments,
            trigger,
            lastAnswer, triggerLastAnswer,
            markedNotes, setMarkedNotes,
            playedNotes, setPlayedNotes,
            lastQuizAnswer, setLastQuizAnswer,
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
