import React, { createContext, useState, useRef } from 'react';

import MelodyType from './enums/MelodyType';

export const GlobalSettingsContext = createContext();

function GlobalSettingsLayer({ children }) {
    const {isMobile} = useRef(window.innerWidth < 768);
    const [firstNote, setFirstNote] = useState(isMobile ? 60 : 48);
    const [lastNote, setLastNote] = useState(72);
    const [scale, setScale] = useState('chromatic');
    const effectiveScale = calculateEffectiveScale(firstNote, lastNote, scale);
    const [melodyLength, setMelodyLength] = useState(4);
    const [noteLength, setNoteLength] = useState(0.55);
    const [noteSpacing, setNoteSpacing] = useState(0.55);
    const [enabledIntervals, setEnabledIntervals] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [enabledChords, setEnabledChords] = useState({
        triads: ['maj', 'min'],
        sevenths: ['maj7', 'dom7', 'min7'],
        ninths: ['3w7w9w', '3w7m9w', '3m7w9w', '3m7m9w', '3w7m9m', '3w7m9zw'],
        elevenths: ['3w7w11cz', '3w7m11cz'],
        thirteenths: ['3w13w7w', '3m13w7w', '3w13w7m', '3m13w7m', '3w13w9w'],
        random: [2,3,4]
    });
    const [enabledInversions, setEnabledInversions] = useState({
        triads: [0, 1, 2],
        sevenths: [0, 1, 2, 3],
        ninths: [0],
        elevenths: [0],
        thirteenths: [0]
    });
    const [intervalsN, setIntervalsN] = useState(2);
    const [triadsN, setTriadsN] = useState(1);
    const [seventhsN, setSeventhsN] = useState(1);
    const [melodyType, setMelodyType] = useState(MelodyType.FREE);

    const setEnabledChordsByType = (type, chords) => {
        setEnabledChords({ ...enabledChords, [type]: chords });
    };

    const setEnabledInversionsByType = (type, inversions) => {
        setEnabledInversions({ ...enabledInversions, [type]: inversions });
    };

    return (
        <GlobalSettingsContext.Provider value={{
            firstNote, setFirstNote, lastNote, setLastNote,
            scale, setScale, effectiveScale, melodyLength, setMelodyLength,
            noteLength, setNoteLength, noteSpacing, setNoteSpacing,
            enabledIntervals, setEnabledIntervals,
            enabledChords, setEnabledChordsByType,
            enabledInversions, setEnabledInversionsByType,
            intervalsN, setIntervalsN,
            triadsN, setTriadsN,
            seventhsN, setSeventhsN,
            melodyType, setMelodyType,
            isMobile
        }}>
            {children}
        </GlobalSettingsContext.Provider>
    );
}

function calculateEffectiveScale(firstNote, lastNote, scale) {
    const scaleIntervals = {
        chromatic: [1],
        major: [0, 2, 2, 1, 2, 2, 2, 1],
        minor: [0, 2, 1, 2, 2, 1, 2, 2],
        blues: [0, 3, 2, 2, 3, 2],
        pentatonic: [0, 2, 2, 3, 2, 3],
        harmonicMinor: [0, 2, 1, 2, 2, 1, 3, 1],
        dorianMinor: [0, 2, 1, 2, 2, 2, 2, 1],
        wholeTone: [0, 2, 2, 2, 2, 2, 2]
    };
    const scaleOffsets = scaleIntervals[scale];
    const effectiveScale = [];
    for (let currentNote = firstNote; currentNote <= lastNote; currentNote += scaleOffsets[effectiveScale.length % scaleOffsets.length]) {
        effectiveScale.push(currentNote);
    }
    return effectiveScale;
}

export default GlobalSettingsLayer;
export { calculateEffectiveScale };
