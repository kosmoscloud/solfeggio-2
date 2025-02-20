import React, { useContext } from 'react';

import { GlobalSettingsContext } from '../../layers/GlobalSettingsLayer';
import { LanguageContext } from '../../layers/UILayer';

import Exercise from '../Exercise';
import IntervalsQuiz from '../choose/IntervalsQuiz';
import Intervals from '../../ui/overlays/Intervals';

import IntervalPlayingMode from '../../layers/enums/IntervalPlayingMode';

function IntervalExercise() {

    const { effectiveScale, enabledIntervals, intervalPlayingMode:settingsIntervalPlayingMode } = useContext(GlobalSettingsContext);
    const { dictionary } = useContext(LanguageContext);

    function generateInterval() {
        let intervalPlayingMode = settingsIntervalPlayingMode;
        if (intervalPlayingMode === IntervalPlayingMode.RANDOM) {
            const modes = [
                IntervalPlayingMode.SEQUENTIAL_ASCENDING,
                IntervalPlayingMode.SEQUENTIAL_DESCENDING,
                IntervalPlayingMode.SIMULTANEOUS
            ];
            intervalPlayingMode = modes[Math.floor(Math.random() * modes.length)];
        }

        let randomInterval = Array.from({ length: 2 }, () => [effectiveScale[Math.floor(Math.random() * effectiveScale.length)]]);
        if (intervalPlayingMode === IntervalPlayingMode.SEQUENTIAL_ASCENDING || intervalPlayingMode === IntervalPlayingMode.SEQUENTIAL_DESCENDING) {
            randomInterval = randomInterval.flat();
        }
        if (intervalPlayingMode === IntervalPlayingMode.SEQUENTIAL_DESCENDING) {
            randomInterval.sort((a, b) => b - a);
        } else {
            randomInterval.sort((a, b) => a - b);
        }
        if (enabledIntervals.includes(Math.abs(randomInterval[1] - randomInterval[0]))) return randomInterval;
        else return generateInterval();
    }

    function isIntervalCorrect(answers, generatedExample) {
        return answers.toSorted().toString() === generatedExample.toSorted().toString();
    }

    return <Exercise 
        name={dictionary.interval}
        inputType='keyboard'
        generateExample={generateInterval}
        predicate={isIntervalCorrect}
        settingsComponent={<Intervals/>}
        includeFirstNoteInAnswers={true}
        altVersion={<IntervalsQuiz/>}
    />
}

export default IntervalExercise;
