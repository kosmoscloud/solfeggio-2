import React, { useContext } from 'react';

import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';
import { LanguageContext } from '../../managers/UILayer';

import Exercise from '../model/Exercise';
import Intervals from '../../ui/overlays/Intervals';

function IntervalExercise() {

    const { effectiveScale, enabledIntervals } = useContext(GlobalSettingsContext);
    const { dictionary } = useContext(LanguageContext);

    function generateInterval() {
        const randomInterval = Array.from({ length: 2 }, () => [effectiveScale[Math.floor(Math.random() * effectiveScale.length)]]);
        if (randomInterval[0] === randomInterval[1]) return generateInterval();
        randomInterval.sort((a, b) => a - b);
        if (enabledIntervals.includes(randomInterval[1] - randomInterval[0])) return randomInterval;
        return generateInterval();
    }

    function isIntervalCorrect(answers, generatedExample) {
        return answers.sort().toString() === generatedExample.sort().toString();
    }

    return <Exercise 
    name={dictionary.interval}
    inputType='keyboard'
    generateExample={generateInterval}
    predicate={isIntervalCorrect}
    settingsComponent={<Intervals/>}
    />
}

export default IntervalExercise;
