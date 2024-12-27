import React, { useContext, useEffect, useState } from 'react';
import { ResultsContext } from '../managers/ExercisesManager';
import ControlPanel from '../components/controlpanel/ControlPanel';
import { ExerciseContext } from '../managers/ExercisesManager';
import SoundGenerator from '../generators/SoundGenerator';
import QuizInput from '../components/quizinput/QuizInput';
import { GlobalSettingsContext } from '../managers/GlobalSettingsManager';
import chordTypes from '../exercises/ChordTypes';

function SeventhsQuiz() {
    const exerciseName = 'Zapytanie: Rodzaje trójdźwięków';
    const { updateExamplesResults, resetExamplesResults } = useContext(ResultsContext);
    const [generatedSevenths, setGeneratedSevenths] = useState([]);
    const [seventhsToPlay, setSeventhsToPlay] = useState([]);
    const [guessedSevenths, setGuessedSevenths] = useState([]);
    const { seventhsN } = useContext(GlobalSettingsContext);
    const possibleChords = ['maj7', 'dom7', 'min7', 'min7b5', 'minmaj7', 'dim7', 'aug7', 'augmaj7'];

    const [enabledComponents, setEnabledComponents] = useState(['startreset']);
    const effectiveScale = Array.from({length: 24}, (_, i) => i + 52);

    const [noteSpacing, setNoteSpacing] = useState(50);
    const [noteLength, setNoteLength] = useState(50);
    const soundGenerator = new SoundGenerator();

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
            randomSevenths.push(possibleChords[Math.floor(Math.random() * possibleChords.length)]);
            randomNotes.push(effectiveScale[Math.floor(Math.random() * effectiveScale.length)]);
            randomInversions.push(Math.floor(Math.random() * 4));
        }
        setGeneratedSevenths(randomSevenths);

        const seventhsToPlayTemp = []
        for (let i = 0; i < seventhsN; i++) {
            seventhsToPlayTemp.push([randomNotes[i],
                                    randomNotes[i] + chordTypes['sevenths'][randomSevenths[i]][randomInversions[i]][0],
                                    randomNotes[i] + chordTypes['sevenths'][randomSevenths[i]][randomInversions[i]][0] + chordTypes['sevenths'][randomSevenths[i]][randomInversions[i]][1],
                                    randomNotes[i] + chordTypes['sevenths'][randomSevenths[i]][randomInversions[i]][0] + chordTypes['sevenths'][randomSevenths[i]][randomInversions[i]][1] + chordTypes['sevenths'][randomSevenths[i]][randomInversions[i]][2]]);
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
        <ExerciseContext.Provider value={{exerciseName, enabledComponents, guessedSevenths, startExercise, nextExample, repeatExample, undoNote, setNoteSpacing, setNoteLength}}>
            <QuizInput onResponseSelected={handleResponseMade} layout='sevenths' />
            <ControlPanel/>
        </ExerciseContext.Provider>
    );
}

export default SeventhsQuiz;
