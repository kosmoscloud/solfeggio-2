import React, { createContext, useState, useEffect } from 'react';

export const GlobalSettingsContext = createContext();

function GlobalSettingsManager({ children }) {
    
    const [ firstNote, setFirstNote ] = useState(60);
    const [ lastNote, setLastNote ] = useState(72);
    const [ scale, setScale ] = useState('chromatic');
    const [ effectiveScale, setEffectiveScale ] = useState([]);
    const [ melodyLength, setMelodyLength ] = useState(5);
    const [ enabledChords, setEnabledChords ] = useState({
        'triads': ['maj', 'min'],
        'sevenths': ['maj7', 'dom7', 'min7'],
        'ninths': ['maj9', 'dom9', 'min9'],
        'elevenths': ['maj11', 'dom11', 'min11'],
        'thirteenths': ['maj13', 'dom13', 'min13']
    });
    const [ enabledInversions, setEnabledInversions ] = useState({
        'triads': [1],
        'sevenths': [1],
        'ninths': [1],
        'elevenths': [1],
        'thirteenths': [1]
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
        const newEffectiveScale = calculateEffectiveScale(firstNote, lastNote, scale);
        setEffectiveScale(newEffectiveScale);
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
        major: [0, 2, 4, 5, 7, 9, 11],
        minor: [0, 2, 3, 5, 7, 8, 10],
        blues: [0, 3, 5, 6, 7, 10],
        pentatonic: [0, 2, 4, 7, 9],
        chromatic: Array.from({ length: 12 }, (_, i) => i),
        harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
        melodicMinor: [0, 2, 3, 5, 7, 9, 11],
        wholeTone: [0, 2, 4, 6, 8, 10]
    };
    const scaleOffsets = scaleIntervals[scale];
    const effectiveScale = [];
    for (let i = firstNote; i <= lastNote; i++) {
        if (scaleOffsets.includes(i % 12)) {
            effectiveScale.push(i);
        }
    }
    return effectiveScale;
}

export default GlobalSettingsManager;
export { calculateEffectiveScale };
