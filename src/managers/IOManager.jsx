import React, { createContext, useState, useEffect } from 'react';

import SoundGenerator from '../generators/SoundGenerator';
import MidiGenerator from '../generators/MidiGenerator';

export const IOContext = createContext();

function IOManager({children}) {
    const [ soundGenerator ] = useState(new SoundGenerator());
    const [ midiGenerator ] = useState(new MidiGenerator());
    
    const [ lastPlayedNote, setLastPlayedNote ] = useState(null);
    const [ markedNotes, setMarkedNotes ] = useState([]);
    const [ playedNotes, setPlayedNotes ] = useState([]);
    const [ lastQuizAnswer, setLastQuizAnswer ] = useState(null);
    const [ markedAnswers, setMarkedAnswers ] = useState([]);

    const [ midiAccess, setMidiAccess ] = useState(null);
    const [ midiInput, setMidiInput ] = useState(null);
    const [ midiOutput, setMidiOutput ] = useState(null);

    const playNotes = (notes, spacing = 1, duration = 1) => {
        if (midiOutput === null) soundGenerator.playNotes(notes, spacing, duration);
        else midiGenerator.playNotes(notes, spacing, duration);
    }

    return (
        <IOContext.Provider value={{
            playNotes,
            lastPlayedNote, setLastPlayedNote,
            markedNotes, setMarkedNotes,
            playedNotes, setPlayedNotes,
            lastQuizAnswer, setLastQuizAnswer,
            markedAnswers, setMarkedAnswers,
            midiAccess, setMidiAccess,
            midiInput, setMidiInput,
            midiOutput, setMidiOutput}}>
            {children}
        </IOContext.Provider>
    );
}

export default IOManager;
