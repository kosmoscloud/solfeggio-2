import React, { useContext } from 'react';

import { GlobalSettingsContext } from '../../layers/GlobalSettingsLayer';
import { IOContext } from '../../layers/IOLayer';
import { LanguageContext } from '../../layers/UILayer';

import Exercise from '../Exercise';
import Keyboard from '../../ui/keyboard/Keyboard';

function SingleNoteExercise() {

    const { effectiveScale } = useContext(GlobalSettingsContext);
    const { playNotes } = useContext(IOContext);
    const { dictionary } = useContext(LanguageContext);

    async function generateSingleNote() {
        return [effectiveScale[Math.floor(Math.random() * effectiveScale.length)]];
    }

    function convertExampleToAnswers(example) {
        return [example];
    }

    function convertInputToAnswer(input) {
        return [input];
    }

    async function playDistractor() {
        const noteCount = 10;
        const randomNotes = Array.from({ length: noteCount }, () => effectiveScale[Math.floor(Math.random() * effectiveScale.length)]);
        await playNotes(randomNotes, 0.1, 0.1);
        await new Promise(resolve => setTimeout(resolve, 500));
    }    


    return <Exercise 
        name={dictionary.perfectpitch}
        inputElement={<Keyboard/>}
        generateExample={generateSingleNote}
        convertExampleToAnswers={convertExampleToAnswers}
        convertInputToAnswer={convertInputToAnswer}
        doBeforePlayExample={playDistractor}
    />
}

export default SingleNoteExercise;
