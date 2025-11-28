import React, { useContext, useState } from 'react';

import { GlobalSettingsContext } from '../../layers/GlobalSettingsLayer';
import { LanguageContext } from '../../layers/UILayer';
import { IOContext } from '../../layers/IOLayer';

import Exercise from '../Exercise';
import IntervalsQuiz from '../choose/IntervalsQuiz';
import Intervals from '../../ui/overlays/Intervals';
import Keyboard from '../../ui/keyboard/Keyboard';

import IntervalPlayingMode from '../../layers/enums/IntervalPlayingMode';

function IntervalExercise() {

    const { effectiveScale, enabledIntervals, intervalPlayingMode:settingsIntervalPlayingMode } = useContext(GlobalSettingsContext);
    const { setMarkedNotes } = useContext(IOContext);
    const [ firstNote, setFirstNote ] = useState(0);
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

        let randomInterval = Array.from({ length: 2 }, () => effectiveScale[Math.floor(Math.random() * effectiveScale.length)]);
        randomInterval.sort((a, b) => a - b);

        if (enabledIntervals.includes(Math.abs(randomInterval[1] - randomInterval[0]))) {
            setMarkedNotes([randomInterval[0]]);
            setFirstNote(randomInterval[0]);
            return [randomInterval];
        }

        else return generateInterval();
    }

    function convertExampleToAnswers(example) {
        let answers = []
        example.forEach((interval) => {
            answers.push({ halftones: Math.abs(interval[1] - interval[0]) });
        });
        return answers;
    }

    function convertInputToAnswer(input) {
        if (input === firstNote) return null;
        const answer = Math.abs(input - firstNote);
        return { halftones: answer };
    }

    return <Exercise 
        name={dictionary.interval}
        inputElement={<Keyboard/>}
        generateExample={generateInterval}
        convertExampleToAnswers={convertExampleToAnswers}
        convertInputToAnswer={convertInputToAnswer}
        settingsComponent={<Intervals nExamplesSliderEnabled={false} />}
        includeFirstNoteInAnswers={true}
        altVersion={<IntervalsQuiz/>}
    />
}

export default IntervalExercise;
