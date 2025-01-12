import React, { createContext, useState, useEffect } from 'react';

export const GlobalSettingsContext = createContext();

function GlobalSettingsManager({ children }) {
    const [firstNote, setFirstNote] = useState(48);
    const [lastNote, setLastNote] = useState(72);
    const [scale, setScale] = useState('chromatic');
    const [effectiveScale, setEffectiveScale] = useState([]);
    const [melodyLength, setMelodyLength] = useState(5);
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
    const [triadsN, setTriadsN] = useState(2);
    const [seventhsN, setSeventhsN] = useState(2);
    const [melodyType, setMelodyType] = useState('random');

    const setEnabledChordsByType = (type, chords) => {
        setEnabledChords({ ...enabledChords, [type]: chords });
    };

    const setEnabledInversionsByType = (type, inversions) => {
        setEnabledInversions({ ...enabledInversions, [type]: inversions });
    };

    useEffect(() => {
        setEffectiveScale(calculateEffectiveScale(firstNote, lastNote, scale));
    }, [firstNote, lastNote, scale]);

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
            melodyType, setMelodyType
        }}>
            {children}
        </GlobalSettingsContext.Provider>
    );
}

function calculateEffectiveScale(firstNote, lastNote, scale) {
    const scaleIntervals = {
        major: [2, 2, 1, 2, 2, 2, 1],
        minor: [2, 1, 2, 2, 1, 2, 2],
        blues: [3, 2, 1, 1, 3, 2],
        pentatonic: [2, 2, 3, 2, 3],
        chromatic: [1],
        harmonicMinor: [2, 1, 2, 2, 1, 3, 1],
        melodicMinor: [2, 1, 2, 2, 2, 2, 1],
        wholeTone: [2, 2, 2, 2, 2, 2]
    };
    const scaleOffsets = scaleIntervals[scale];
    const effectiveScale = [];
    for (let currentNote = firstNote; currentNote <= lastNote; currentNote += scaleOffsets[effectiveScale.length % scaleOffsets.length]) {
        effectiveScale.push(currentNote);
    }
    return effectiveScale;
}

export default GlobalSettingsManager;
export { calculateEffectiveScale };
