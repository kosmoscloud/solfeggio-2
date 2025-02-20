import React, { createContext, useState, useRef, useEffect, useContext } from 'react';

import { GlobalSettingsContext } from './GlobalSettingsLayer';

import SoundGenerator from '../generators/SoundGenerator';
import MidiGenerator from '../generators/MidiGenerator';

export const IOContext = createContext();

function IOLayer({children}) {
    
    const { noteLength, noteSpacing } = useContext(GlobalSettingsContext);
    
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

    const [ isStopped, setIsStopped ] = useState(false);
    const [ isChangingInstrument, setIsChangingInstrument ] = useState(false);

    useEffect(() => {
        setIsChangingInstrument(false);
    }, [currentInstrument]);

    useEffect(() => {
        if (noteQueue.length > 0 && !isChangingInstrument) {
            if (!isMidiEnabled) {
                const notesToPlay = noteQueue.shift();
                for (let note of notesToPlay) {
                    // if (isStopped) {
                    //     setIsStopped(false);
                    //     break;
                    // }
                    setTimeout(() => {
                        soundGenerator.current.playNotes(note, noteLength, currentInstrument);
                    }, notesToPlay.indexOf(note) * noteSpacing * 1000);
                }
            } else {
                midiGenerator.current.playNotes(noteQueue, noteSpacing, noteLength);
            }
        }
    }, [currentInstrument, isChangingInstrument, isStopped, noteQueue ]);

    const playNotes = (notes) => {
        stopPlaying();
        if (isMidiEnabled === false) {
            setNoteQueue([...noteQueue, notes]);
        } else {
            midiGenerator.current.playNotes(notes, noteSpacing, noteLength);
        }
    }

    const triggerLastAnswer = (answer) => {
        setLastAnswer(answer);
        setTrigger(!trigger);
    }

    const stopPlaying = () => {
        setIsStopped(true);
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
