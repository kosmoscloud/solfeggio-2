import React, { useContext } from 'react';

import { GlobalSettingsContext } from '../../layers/GlobalSettingsLayer';
import { LanguageContext } from '../../layers/UILayer';

import Exercise from '../Exercise';
import MelodyLength from '../../ui/overlays/MelodyLength';

import MelodyType from '../../layers/enums/MelodyType';
import ExerciseMenu from '../../ui/menu/ExerciseMenu';

function MelodyExercise() {

    const { effectiveScale, melodyType, melodyLength } = useContext(GlobalSettingsContext);
    const { dictionary } = useContext(LanguageContext);

    const name = melodyType === MelodyType.ASCENDING ? dictionary.ascendingmelody : melodyType === MelodyType.DESCENDING ? dictionary.descendingmelody : dictionary.freemelody;

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
        menu={<ExerciseMenu/>}
    />
}

export default MelodyExercise;
