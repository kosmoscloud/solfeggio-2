import React, { useContext } from 'react';

import { GlobalSettingsContext } from '../../layers/GlobalSettingsLayer';
import { IOContext } from '../../layers/IOLayer';
import { LanguageContext } from '../../layers/UILayer';

import Exercise from '../Exercise';

function SingleNoteExercise() {

    const { effectiveScale, noteSpacing } = useContext(GlobalSettingsContext);
    const { playNotes } = useContext(IOContext);
    const { dictionary } = useContext(LanguageContext);

    function generateSingleNote() {
        const sequenceLength = Math.ceil(noteSpacing * 100 / 2);
        const randomNotes = Array.from({ length: sequenceLength }, () => effectiveScale[Math.floor(Math.random() * effectiveScale.length)]);
        playNotes(randomNotes, 0.05, 0.05)
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([effectiveScale[Math.floor(Math.random() * effectiveScale.length)]]);
            }, sequenceLength * 50 + 750);
        });
    }

    function isSingleNoteCorrect(answers, generatedExample) {
        return answers[0] === generatedExample[0];
    }

    return <Exercise 
        name={dictionary.perfectpitch}
        inputType='keyboard'
        generateExample={generateSingleNote}
        predicate={isSingleNoteCorrect}
        settingsComponent={undefined}
        repeatEnabled={false}
    />
}

export default SingleNoteExercise;
