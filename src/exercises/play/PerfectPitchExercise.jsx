import React, { useContext } from 'react';

import { GlobalSettingsContext } from '../../layers/GlobalSettingsLayer';
import { IOContext } from '../../layers/IOLayer';
import { LanguageContext } from '../../layers/UILayer';

import Exercise from '../Exercise';
import Keyboard from '../../ui/keyboard/Keyboard';

function SingleNoteExercise() {

    const { effectiveScale, noteSpacing, setNoteSpacing } = useContext(GlobalSettingsContext);
    const { playNotes } = useContext(IOContext);
    const { dictionary } = useContext(LanguageContext);

    async function generateSingleNote() {
        playDistractor();
        await new Promise(resolve => setTimeout(resolve, 500));
        return [effectiveScale[Math.floor(Math.random() * effectiveScale.length)]];
    }

    function convertExampleToAnswers(example) {
        return [example];
    }

    function convertInputToAnswer(input) {
        return [input];
    }

    async function playDistractor() {
        const tempNoteSpacing = noteSpacing;
        setNoteSpacing(0.5);
        const randomNote = effectiveScale[Math.floor(Math.random() * effectiveScale.length)];
        await playNotes([randomNote], noteSpacing, 0.5);
        setNoteSpacing(tempNoteSpacing);
    }


    return <Exercise 
        name={dictionary.perfectpitch}
        inputElement={<Keyboard/>}
        generateExample={generateSingleNote}
        convertExampleToAnswers={convertExampleToAnswers}
        convertInputToAnswer={convertInputToAnswer}
    />
}

export default SingleNoteExercise;
