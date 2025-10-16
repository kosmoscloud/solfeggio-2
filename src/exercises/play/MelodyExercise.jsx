import React, { useContext, useState, useEffect } from 'react';

import { GlobalSettingsContext } from '../../layers/GlobalSettingsLayer';
import { IOContext } from '../../layers/IOLayer';
import { LanguageContext } from '../../layers/UILayer';

import Exercise from '../Exercise';
import MelodyLength from '../../ui/overlays/MelodyLength';
import Keyboard from '../../ui/keyboard/Keyboard';

import MelodyType from '../../layers/enums/MelodyType';
import ReproductionMode from '../../layers/enums/ReproductionMode';

function MelodyExercise() {

    const { effectiveScale, melodyType, melodyLength } = useContext(GlobalSettingsContext);
    const { markedNotes, setMarkedNotes, setPlayedNotes, setReproductionMode } = useContext(IOContext);
    const [ inputQueue, setInputQueue ] = useState([]);
    const { dictionary } = useContext(LanguageContext);

    const name = melodyType === MelodyType.ASCENDING ? dictionary.ascendingmelody : melodyType === MelodyType.DESCENDING ? dictionary.descendingmelody : dictionary.freemelody;
    
    useEffect(() => {
        setReproductionMode(ReproductionMode.SEQUENTIAL);
    }, [setReproductionMode]);

    useEffect(() => {
        setPlayedNotes(inputQueue);
    }, [inputQueue, setPlayedNotes]);

    function generateMelody() {
        const randomMelody = [];
        const usedNotes = new Set();
        while (randomMelody.length < melodyLength) {
            const note = effectiveScale[Math.floor(Math.random() * effectiveScale.length)];
            if (!usedNotes.has(note)) {
                usedNotes.add(note);
                randomMelody.push(note);
            }
        }

        if (melodyType === MelodyType.ASCENDING) {
            randomMelody.sort((a, b) => a - b)
        } else if (melodyType === MelodyType.DESCENDING) {
            randomMelody.sort((a, b) => b - a)
        }
        
        setMarkedNotes([randomMelody[0]]);
        setInputQueue([]);
        return [randomMelody];
    }

    function convertExampleToAnswers(example) {
        return example;
    }

    function convertInputToAnswer(input) {
        // if user plays the first note again, ignore
        if (inputQueue.length === 1 && input === inputQueue[0]) {
            return
        }
        const tempInputQueue = [...inputQueue, input];
        if (tempInputQueue.length === melodyLength) {
            return tempInputQueue;
        }
        setInputQueue(tempInputQueue);
    }

    function clearInputQueue() {
        setInputQueue([]);
    }

    return <Exercise
        name={name}
        inputElement={<Keyboard/>}
        generateExample={generateMelody}
        convertExampleToAnswers={convertExampleToAnswers}
        convertInputToAnswer={convertInputToAnswer}
        settingsComponent={<MelodyLength/>}
        repeat={clearInputQueue}
    />
}

export default MelodyExercise;
