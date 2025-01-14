import React, { useContext } from 'react';
import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';

import Exercise from '../model/Exercise';
import MelodyLength from '../../ui/overlays/MelodyLength';

function MelodyExercise() {

    const { effectiveScale, melodyType: type, melodyLength } = useContext(GlobalSettingsContext);

    const name = 'Melodia' + (type === 'ascending' ? ' rosnąca' : type === 'descending' ? ' opadająca' : ' swobodna');

    function generateMelody() {
        const randomMelody = Array.from({ length: melodyLength }, () => effectiveScale[Math.floor(Math.random() * effectiveScale.length)]);
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
