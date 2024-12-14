import React, { createContext, useState, useEffect } from 'react';

export const GlobalSettingsContext = createContext();

function GlobalSettingsManager({ children }) {
    
    const [ firstNote, setFirstNote ] = useState(60);
    const [ lastNote, setLastNote ] = useState(72);
    const [ scale, setScale ] = useState('major');
    const [ effectiveScale, setEffectiveScale ] = useState([]);
    const [ melodyLength, setMelodyLength ] = useState(5);

    useEffect(() => {
        const newEffectiveScale = calculateEffectiveScale(firstNote, lastNote, scale);
        setEffectiveScale(newEffectiveScale);
    }, [firstNote, lastNote, scale]);

    return (
        <GlobalSettingsContext.Provider value={{ firstNote, setFirstNote, lastNote, setLastNote, scale, setScale, effectiveScale, melodyLength, setMelodyLength }}>
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
    console.log(effectiveScale);
    return effectiveScale;
}

export default GlobalSettingsManager;
export { calculateEffectiveScale };
