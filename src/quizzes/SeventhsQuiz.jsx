import React, { useContext, useEffect, useState } from 'react';
import { GlobalSettingsContext } from '../managers/GlobalSettingsManager';
import { ResultsContext } from '../managers/ExercisesManager';
import { ExerciseContext } from '../managers/ExercisesManager';

import ControlPanel from '../components/controlpanel/ControlPanel';
import SeventhsInput from '../components/quizinput/SeventhsInput';
import chordTypes from '../exercises/ChordTypes';

function SeventhsQuiz() {
    const exerciseName = 'Rodzaje akordów z septymą';
    const { updateExamplesResults, resetExamplesResults } = useContext(ResultsContext);
    const [generatedSevenths, setGeneratedSevenths] = useState([]);
    const [seventhsToPlay, setSeventhsToPlay] = useState([]);
    const [guessedSevenths, setGuessedSevenths] = useState([]);
    const { seventhsN } = useContext(GlobalSettingsContext);
    const enabledSevenths = useContext(GlobalSettingsContext).enabledChords['sevenths'];

    const [enabledComponents, setEnabledComponents] = useState(['startreset']);
    const effectiveScale = Array.from({length: 24}, (_, i) => i + 52);

    const [noteSpacing, setNoteSpacing] = useState(50);
    const [noteLength, setNoteLength] = useState(50);
    const { soundGenerator } = useContext(GlobalSettingsContext);

    const startExercise = () => {
        resetExamplesResults();
        nextExample();
        setEnabledComponents(['startreset', 'exit', 'next', 'repeat', 'undo', 'notespacing', 'notelength']);
    }

    const playSevenths = (sevenths) => {
        soundGenerator.playChords(sevenths, noteSpacing * 10 + 50, noteLength / 50 + 0.02);
    }

    const nextExample = () => {
        const randomSevenths = []
        const randomNotes = []
        const randomInversions = []
        for (let i = 0; i < seventhsN; i++) {
            randomSevenths.push(enabledSevenths[Math.floor(Math.random() * enabledSevenths.length)]);
            randomNotes.push(effectiveScale[Math.floor(Math.random() * effectiveScale.length)]);
            randomInversions.push(Math.floor(Math.random() * 4));
        }
        setGeneratedSevenths(randomSevenths);

        const seventhsToPlayTemp = []
        for (let i = 0; i < seventhsN; i++) {
            const baseNote = randomNotes[i];
            const intervals = chordTypes['sevenths'][randomSevenths[i]][randomInversions[i]];
            seventhsToPlayTemp.push(intervals.reduce((acc, interval) => {
                acc.push(acc[acc.length - 1] + interval);
                return acc;
            }, [baseNote]));
        }
        setSeventhsToPlay(seventhsToPlayTemp);
        playSevenths(seventhsToPlayTemp);
    }

    const repeatExample = () => {
        playSevenths(seventhsToPlay);
    }

    const handleResponseMade = (option) => {
        setGuessedSevenths([...guessedSevenths, option]);
    };

    const undoNote = () => {
        const newGuessedSevenths = guessedSevenths.slice(0, guessedSevenths.length - 1);
        setGuessedSevenths(newGuessedSevenths);
    }

    useEffect(() => {
        if (guessedSevenths.length === seventhsN) {
            const isCorrect = guessedSevenths.toString() === generatedSevenths.toString();
            updateExamplesResults(isCorrect);
            setGuessedSevenths([]);
            if (isCorrect) setTimeout(() => nextExample(), 500) 
            else {
                setTimeout(() => repeatExample(), 500)
            }
        }
        // disabling because the lack of better solution
        // eslint-disable-next-line
    }, [guessedSevenths]);

    return (
        <ExerciseContext.Provider value={{exerciseName, enabledComponents, guessedSevenths, enabledSevenths, startExercise, nextExample, repeatExample, undoNote, setNoteSpacing, setNoteLength}}>
            <SeventhsInput onResponseSelected={handleResponseMade} />
            <ControlPanel/>
        </ExerciseContext.Provider>
    );
}

export default SeventhsQuiz;
