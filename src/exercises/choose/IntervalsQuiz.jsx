import React, { useContext } from 'react';

import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';
import { LanguageContext } from '../../managers/UILayer';

import Exercise from '../model/Exercise';
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

    function isIntervalCorrect(answers, generatedExamples) {
        // answers will be just an array of numbers and generatedExample will be an array of pairs of numbers.
        // we need to compare answers with the difference between the pairs
        const correctAnswers = generatedExamples.map(pair => pair[1] - pair[0]);
        return answers.toString() === correctAnswers.toString();
    }

    return <Exercise 
        name={dictionary.interval}
        inputType='intervals'
        generateExample={generateInterval}
        predicate={isIntervalCorrect}
        settingsComponent={<Intervals stepperEnabled={true}/>}
        showHintEnabled={false}
        undoNoteEnabled={true}
    />
}

export default IntervalQuiz;
