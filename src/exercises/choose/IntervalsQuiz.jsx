import React, { useContext, useState } from 'react';

import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';
import { LanguageContext } from '../../managers/UILayer';

import Exercise from '../model/Exercise';
import Intervals from '../../ui/overlays/Intervals';
import QuizMenu from '../../ui/menu/quizmenu/QuizMenu';

import IntervalPlayingMode from '../../managers/enums/IntervalPlayingMode';

function IntervalQuiz() {

    const { effectiveScale, enabledIntervals, intervalsN, intervalPlayingMode: settingsIntervalPlayingMode } = useContext(GlobalSettingsContext);
    const [ currentIntervalPlayingMode, setCurrentIntervalPlayingMode ] = useState(settingsIntervalPlayingMode);
    const { dictionary } = useContext(LanguageContext);

    function generateInterval() {
        let intervalPlayingMode = currentIntervalPlayingMode;
        if (settingsIntervalPlayingMode === IntervalPlayingMode.RANDOM) {
            const modes = [
                IntervalPlayingMode.SEQUENTIAL_ASCENDING,
                IntervalPlayingMode.SEQUENTIAL_DESCENDING,
                IntervalPlayingMode.SIMULTANEOUS
            ];
            intervalPlayingMode = modes[Math.floor(Math.random() * modes.length)];
            setCurrentIntervalPlayingMode(intervalPlayingMode);
        }
        const intervalsToPlay = Array.from({ length: intervalsN }, () => {
            const interval = enabledIntervals[Math.floor(Math.random() * enabledIntervals.length)];
            const note = effectiveScale[Math.floor(Math.random() * effectiveScale.length)];
            return [note, note + interval];
        });
        if (intervalPlayingMode === IntervalPlayingMode.SIMULTANEOUS) 
            return intervalsToPlay;
        if (intervalPlayingMode === IntervalPlayingMode.SEQUENTIAL_ASCENDING)
            return intervalsToPlay.flat();
        if (intervalPlayingMode === IntervalPlayingMode.SEQUENTIAL_DESCENDING)
            return intervalsToPlay.flat().sort((a, b) => b - a);
    }

    function isIntervalCorrect(answers, generatedExamples) {
        // answers will be just an array of numbers and generatedExample will be an array of pairs of numbers.
        // we need to compare answers with the difference between the pairs
        if (currentIntervalPlayingMode === IntervalPlayingMode.SIMULTANEOUS) {
            return answers.toString() === generatedExamples.map(pair => pair[1] - pair[0]).toString();
        } else if (currentIntervalPlayingMode === IntervalPlayingMode.SEQUENTIAL_ASCENDING) {
            return answers[1].toString() === (generatedExamples[1] - generatedExamples[0]).toString();
        } else if (currentIntervalPlayingMode === IntervalPlayingMode.SEQUENTIAL_DESCENDING) {
            return answers[1].toString() === (generatedExamples[0] - generatedExamples[1]).toString();
        }
    }

    return <Exercise 
        name={dictionary.interval}
        inputType='intervals'
        generateExample={generateInterval}
        predicate={isIntervalCorrect}
        settingsComponent={<Intervals sliderEnabled={true}/>}
        showHintEnabled={false}
        undoNoteEnabled={true}
        includeFirstNoteInAnswers={currentIntervalPlayingMode !== IntervalPlayingMode.SIMULTANEOUS}
        menu={<QuizMenu/>}
    />
}

export default IntervalQuiz;
