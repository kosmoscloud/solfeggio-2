import React, { useContext } from 'react';

import { GlobalSettingsContext } from '../../layers/GlobalSettingsLayer';
import { LanguageContext } from '../../layers/UILayer';

import Exercise from '../Exercise';
import IntervalExercise from '../play/IntervalExercise';
import IntervalsInput from '../../ui/quizinput/IntervalsInput';
import Intervals from '../../ui/overlays/Intervals';

function IntervalQuiz() {

    const { effectiveScale, enabledIntervals, intervalsN } = useContext(GlobalSettingsContext);
    const { dictionary } = useContext(LanguageContext);

    function generateInterval() {
        const intervalsToPlay = Array.from({ length: intervalsN }, () => {
            const interval = enabledIntervals[Math.floor(Math.random() * enabledIntervals.length)];
            const note = effectiveScale[Math.floor(Math.random() * effectiveScale.length)];
            return [note, note + interval];
        });
        return intervalsToPlay;
    }

    function convertExampleToAnswers(example) {
        return example.map(pair => { 
            return  { halftones: Math.abs(pair[1] - pair[0]) }
        });
    }

    function convertInputToAnswer(input) {
        return { halftones: input };
    }

    return <Exercise 
        name={dictionary.interval}
        inputElement={<IntervalsInput/>}
        generateExample={generateInterval}
        convertExampleToAnswers={convertExampleToAnswers}
        convertInputToAnswer={convertInputToAnswer}
        settingsComponent={<Intervals sliderEnabled={true}/>}
        showHintEnabled={false}
        undoNoteEnabled={true}
        altVersion={<IntervalExercise />}
    />
}

export default IntervalQuiz;
