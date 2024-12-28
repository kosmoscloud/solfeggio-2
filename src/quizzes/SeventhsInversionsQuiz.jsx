import React, { useContext, useEffect, useState } from 'react';
import { ResultsContext } from '../managers/ExercisesManager';
import ControlPanel from '../components/controlpanel/ControlPanel';
import { ExerciseContext } from '../managers/ExercisesManager';
import SoundGenerator from '../generators/SoundGenerator';
import SeventhsInversionsInput from '../components/quizinput/SeventhsInversionsInput';
import { GlobalSettingsContext } from '../managers/GlobalSettingsManager';
import chordTypes from '../exercises/ChordTypes';

function SeventhsInversionsQuiz() {
    const exerciseName = 'Przewroty akordów z septymą';
    const { updateExamplesResults, resetExamplesResults } = useContext(ResultsContext);
    const [generatedInversions, setGeneratedInversions] = useState([]);
    const [inversionsToPlay, setInversionsToPlay] = useState([]);
    const [guessedInversions, setGuessedInversions] = useState([]);
    const { seventhsN } = useContext(GlobalSettingsContext);
    const enabledSevenths = useContext(GlobalSettingsContext).enabledChords['sevenths'];
    const enabledSeventhsInversions = useContext(GlobalSettingsContext).enabledInversions['sevenths'];

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
        const randomSevenths = [];
        const randomNotes = [];
        const randomInversions = [];
        for (let i = 0; i < seventhsN; i++) {
            randomSevenths.push(enabledSevenths[Math.floor(Math.random() * enabledSevenths.length)]);
            randomNotes.push(effectiveScale[Math.floor(Math.random() * effectiveScale.length)]);
            randomInversions.push(enabledSeventhsInversions[Math.floor(Math.random() * enabledSeventhsInversions.length)]);
        }
        setGeneratedInversions(randomInversions);

        const inversionsToPlayTemp = [];
        for (let i = 0; i < seventhsN; i++) {
            const baseNote = randomNotes[i];
            const intervals = chordTypes['sevenths'][randomSevenths[i]][randomInversions[i]];
            inversionsToPlayTemp.push(intervals.reduce((acc, interval) => {
                acc.push(acc[acc.length - 1] + interval);
                return acc;
            }, [baseNote]));
        }
        setInversionsToPlay(inversionsToPlayTemp);
        playSevenths(inversionsToPlayTemp);
    }

    const repeatExample = () => {
        playSevenths(inversionsToPlay);
    }

    const handleResponseMade = (option) => {
        setGuessedInversions([...guessedInversions, option]);
    };

    const undoNote = () => {
        const newGuessedSevenths = guessedInversions.slice(0, guessedInversions.length - 1);
        setGuessedInversions(newGuessedSevenths);
    }

    useEffect(() => {
        if (guessedInversions.length === seventhsN) {
            const isCorrect = guessedInversions.toString() === generatedInversions.toString();
            updateExamplesResults(isCorrect);
            setGuessedInversions([]);
            if (isCorrect) setTimeout(() => nextExample(), 500) 
            else {
                setTimeout(() => repeatExample(), 500)
            }
        }
        // disabling because the lack of better solution
        // eslint-disable-next-line
    }, [guessedInversions]);

    return (
        <ExerciseContext.Provider value={{exerciseName, enabledComponents, guessedInversions, enabledSeventhsInversions, startExercise, nextExample, repeatExample, undoNote, setNoteSpacing, setNoteLength}}>
            <SeventhsInversionsInput onResponseSelected={handleResponseMade} />
            <ControlPanel/>
        </ExerciseContext.Provider>
    );
}

export default SeventhsInversionsQuiz;
