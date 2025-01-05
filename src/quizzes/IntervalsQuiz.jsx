import React, { useContext } from 'react';
import { GlobalSettingsContext } from '../managers/GlobalSettingsManager';

import Exercise from '../exercises/model/Exercise';
import Intervals from '../overlays/intervals/Intervals';

function IntervalQuiz() {

    const { effectiveScale, enabledIntervals, intervalsN } = useContext(GlobalSettingsContext);

    function generateInterval() {
        const intervalsToPlay = Array.from({ length: intervalsN }, () => {
            const interval = enabledIntervals[Math.floor(Math.random() * enabledIntervals.length)];
            const note = effectiveScale[Math.floor(Math.random() * effectiveScale.length)];
            return [note, note + interval];
        });
        return intervalsToPlay;
    }

    function isIntervalCorrect(answers, generatedExample) {
        // answers will be just an array of numbers and generatedExample will be an array of pairs of numbers.
        // we need to compare answers with the difference between the pairs
        const correctAnswers = generatedExample.map(pair => pair[1] - pair[0]);
        return answers.toString() === correctAnswers.toString();
    }

    return <Exercise 
        name='Interwał'
        inputType='intervals'
        generateExample={generateInterval}
        predicate={isIntervalCorrect}
        settingsComponent={<Intervals sliderEnabled={true}/>}
        showHintEnabled={false}
        undoNoteEnabled={false}
    />
}

export default IntervalQuiz;
