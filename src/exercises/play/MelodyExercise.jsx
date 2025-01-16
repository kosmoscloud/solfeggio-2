import React, { useContext } from 'react';

import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';
import { LanguageContext } from '../../managers/UILayer';

import Exercise from '../model/Exercise';
import MelodyLength from '../../ui/overlays/MelodyLength';

function MelodyExercise() {

    const { effectiveScale, melodyType: type, melodyLength } = useContext(GlobalSettingsContext);
    const { dictionary } = useContext(LanguageContext);

    const name = type === 'ascending' ? dictionary.ascendingmelody : type === 'descending' ? dictionary.descendingmelody : dictionary.freemelody;

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
        if (type === 'ascending') randomMelody.sort((a, b) => a[0] - b[0])
        if (type === 'descending') randomMelody.sort((a, b) => b[0] - a[0])
        return randomMelody;
    }

    function isMelodyCorrect(answers, generatedExample) {
        return answers.toString() === generatedExample.toString();
    }

    return <Exercise 
        name={name}
        inputType='keyboard'
        generateExample={generateMelody}
        predicate={isMelodyCorrect}
        settingsComponent={<MelodyLength/>}
    />
}

export default MelodyExercise;
