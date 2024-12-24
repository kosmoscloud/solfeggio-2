import React, { createContext, useState, useEffect } from 'react';

export const GlobalSettingsContext = createContext();

function GlobalSettingsManager({ children }) {
    
    const [ firstNote, setFirstNote ] = useState(48);
    const [ lastNote, setLastNote ] = useState(72);
    const [ scale, setScale ] = useState('chromatic');
    const [ effectiveScale, setEffectiveScale ] = useState([]);
    const [ melodyLength, setMelodyLength ] = useState(5);
    const [ enabledChords, setEnabledChords ] = useState({
        'triads': ['maj', 'min'],
        'sevenths': ['maj7', 'dom7', 'min7'],
        'ninths': ['3w7w9w', '3w7m9w', '3m7w9w', '3m7m9w', '3w7m9m', '3w7m9zw'],
        'elevenths': ['maj11', 'dom11', 'min11'],
        'thirteenths': ['maj13', 'dom13', 'min13']
    });
    const [ enabledInversions, setEnabledInversions ] = useState({
        'triads': [0,1,2],
        'sevenths': [0,1,2,3],
        'ninths': [0],
        'elevenths': [0],
        'thirteenths': [0]
    });

    const setEnabledTriads = (enabledTriads) => {
        setEnabledChords({ ...enabledChords, 'triads': enabledTriads });
    }

    const setEnabledSevenths = (enabledSevenths) => {
        setEnabledChords({ ...enabledChords, 'sevenths': enabledSevenths });
    }

    const setEnabledNinths = (enabledNinths) => {
        setEnabledChords({ ...enabledChords, 'ninths': enabledNinths });
    }

    const setEnabledElevenths = (enabledElevenths) => {
        setEnabledChords({ ...enabledChords, 'elevenths': enabledElevenths });
    }

    const setEnabledThirteens = (enabledThirteens) => {
        setEnabledChords({ ...enabledChords, 'thirteenths': enabledThirteens });
    }

    const setEnabledTriadsInversions = (enabledTriadInversions) => {
        setEnabledInversions({ ...enabledInversions, 'triads': enabledTriadInversions });
    }

    const setEnabledSeventhsInversions = (enabledSeventhInversions) => {
        setEnabledInversions({ ...enabledInversions, 'sevenths': enabledSeventhInversions });
    }

    const setEnabledNinthsInversions = (enabledNinthInversions) => {
        setEnabledInversions({ ...enabledInversions, 'ninths': enabledNinthInversions });
    }

    const setEnabledEleventhsInversions = (enabledEleventhInversions) => {
        setEnabledInversions({ ...enabledInversions, 'elevenths': enabledEleventhInversions });
    }

    const setEnabledThirteenthsInversions = (enabledThirteenthInversions) => {
        setEnabledInversions({ ...enabledInversions, 'thirteenths': enabledThirteenthInversions });
    }

    useEffect(() => {
        setEffectiveScale(calculateEffectiveScale(firstNote, lastNote, scale));
    }, [firstNote, lastNote, scale]);

    return (
        <GlobalSettingsContext.Provider value={{ firstNote, setFirstNote, lastNote, setLastNote,
                                                scale, setScale, effectiveScale, melodyLength, setMelodyLength,
                                                enabledChords, setEnabledTriads, setEnabledSevenths, setEnabledNinths, setEnabledElevenths, setEnabledThirteens,
                                                enabledInversions, setEnabledTriadsInversions, setEnabledSeventhsInversions, setEnabledNinthsInversions, setEnabledEleventhsInversions, setEnabledThirteenthsInversions }}>
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
