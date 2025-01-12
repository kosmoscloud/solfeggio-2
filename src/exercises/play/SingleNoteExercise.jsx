import React, { useContext } from 'react';
import { GlobalSettingsContext } from '../../managers/GlobalSettingsManager';

import Exercise from '../model/Exercise';

function SingleNoteExercise() {

    const { effectiveScale } = useContext(GlobalSettingsContext);

    function generateSingleNote() {
        return [effectiveScale[Math.floor(Math.random() * effectiveScale.length)]];
    }

    function isSingleNoteCorrect(answers, generatedExample) {
        return answers[0] === generatedExample[0];
    }

    return <Exercise 
    name='Pojedynczy dźwiek'
    inputType='keyboard'
    generateExample={generateSingleNote}
    predicate={isSingleNoteCorrect}
    settingsComponent={undefined}
    />
}

export default SingleNoteExercise;
