import React, { useContext, useEffect, useState } from 'react';
import { GlobalSettingsContext } from '../managers/GlobalSettingsManager';
import { ResultsContext } from '../managers/ExercisesManager';
import { ExerciseContext } from '../managers/ExercisesManager';
import { OverlaysContext } from '../managers/OverlaysManager';

import ControlPanel from '../components/controlpanel/ControlPanel';
import IntervalsInput from '../components/quizinput/IntervalsInput';
import Intervals from '../overlays/intervals/Intervals';

function IntervalsQuiz() {
    const exerciseName = 'Interwały';
    const { updateExamplesResults, resetExamplesResults } = useContext(ResultsContext);
    const { enabledIntervals } = useContext(GlobalSettingsContext);
    const [firstNotes, setFirstNotes] = useState([]);
    const [generatedIntervals, setGeneratedIntervals] = useState([]);
    const [guessedIntervals, setGuessedIntervals] = useState([]);
    const { intervalsN } = useContext(GlobalSettingsContext);
    const { showOverlay } = useContext(OverlaysContext);

    const [enabledComponents, setEnabledComponents] = useState(['startreset']);
    const effectiveScale = Array.from({length: 24}, (_, i) => i + 48);

    const [noteSpacing, setNoteSpacing] = useState(50);
    const [noteLength, setNoteLength] = useState(50);
    const { soundGenerator } = useContext(GlobalSettingsContext);

    const startExercise = () => {
        resetExamplesResults();
        nextExample();
        setEnabledComponents(['startreset', 'exit', 'next', 'repeat', 'undo', 'notespacing', 'notelength']);
    }

    const playIntervals = (intervals) => {
        console.log('intervals', intervals);
        console.log('noteSpacing', noteSpacing);
        console.log('noteLength', noteLength);
        soundGenerator.playChords(intervals, noteSpacing * 10 + 50, noteLength / 50 + 0.02);
    }

    const nextExample = () => {
        const randomIntervals = []
        const randomNotes = []
        for (let i = 0; i < intervalsN; i++) {
            randomIntervals.push(enabledIntervals[Math.floor(Math.random() * enabledIntervals.length)]);
            randomNotes.push(effectiveScale[Math.floor(Math.random() * effectiveScale.length)]);
        }
        setGeneratedIntervals(randomIntervals);
        setFirstNotes(randomNotes);
        const intervalsToPlay = []
        for (let i = 0; i < intervalsN; i++) {
            intervalsToPlay.push([randomNotes[i], randomNotes[i] + randomIntervals[i]]);
        }
        playIntervals(intervalsToPlay);
    }

    const repeatExample = () => {
        const intervalsToPlay = []
        for (let i = 0; i < intervalsN; i++) {
            intervalsToPlay.push([firstNotes[i], firstNotes[i] + generatedIntervals[i]]);
        }
        playIntervals(intervalsToPlay);
    }

    const handleResponseMade = (option) => {
        console.log('guessed intervals', guessedIntervals);
        setGuessedIntervals([...guessedIntervals, option]);
        console.log(option);
    };

    const undoNote = () => {
        const newGuessedIntervals = guessedIntervals.slice(0, guessedIntervals.length - 1);
        setGuessedIntervals(newGuessedIntervals);
    }

    useEffect(() => {
        if (guessedIntervals.length === intervalsN) {
            const isCorrect = guessedIntervals.toString() === generatedIntervals.toString();
            updateExamplesResults(isCorrect);
            setGuessedIntervals([]);
            if (isCorrect) setTimeout(() => nextExample(), 500) 
            else {
                setTimeout(() => repeatExample(), 500)
            }
        }
        // disabling because the lack of better solution
        // eslint-disable-next-line
    }, [guessedIntervals]);

    const openSettings = () => {
        showOverlay(<Intervals sliderEnabled={true}/>);
    }

    return (
        <ExerciseContext.Provider value={{exerciseName, enabledComponents, guessedIntervals, startExercise, nextExample, repeatExample, undoNote, setNoteSpacing, setNoteLength, openSettings}}>
            <IntervalsInput onResponseSelected={handleResponseMade} enabledIntervals={enabledIntervals}/>
            <ControlPanel/>
        </ExerciseContext.Provider>
    );
}

export default IntervalsQuiz;
