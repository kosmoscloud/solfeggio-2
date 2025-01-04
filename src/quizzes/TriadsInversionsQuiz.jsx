import React, { useContext, useEffect, useState } from 'react';
import { GlobalSettingsContext } from '../managers/GlobalSettingsManager';
import { ResultsContext } from '../managers/ExercisesManager';
import { ExerciseContext } from '../managers/ExercisesManager';

import ControlPanel from '../components/controlpanel/ControlPanel';
import TriadsInversionsInput from '../components/quizinput/TriadsInversionsInput';
import chordTypes from '../exercises/ChordTypes';

function TriadsInversionsQuiz() {
    const exerciseName = 'Przewroty trójdźwięków';
    const { updateExamplesResults, resetExamplesResults } = useContext(ResultsContext);
    const [generatedInversions, setGeneratedInversions] = useState([]);
    const [inversionsToPlay, setInversionsToPlay] = useState([]);
    const [guessedInversions, setGuessedInversions] = useState([]);
    const { triadsN } = useContext(GlobalSettingsContext);
    const enabledTriads = useContext(GlobalSettingsContext).enabledChords['triads'];
    const enabledTriadsInversions = useContext(GlobalSettingsContext).enabledInversions['triads'];

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

    const playTriads = (triads) => {
        soundGenerator.playChords(triads, noteSpacing * 10 + 50, noteLength / 50 + 0.02);
    }

    const nextExample = () => {
        const randomTriads = [];
        const randomNotes = [];
        const randomInversions = [];
        for (let i = 0; i < triadsN; i++) {
            randomTriads.push(enabledTriads[Math.floor(Math.random() * enabledTriads.length)]);
            randomNotes.push(effectiveScale[Math.floor(Math.random() * effectiveScale.length)]);
            randomInversions.push(enabledTriadsInversions[Math.floor(Math.random() * enabledTriadsInversions.length)]);
        }
        setGeneratedInversions(randomInversions);

        const inversionsToPlayTemp = [];
        for (let i = 0; i < triadsN; i++) {
            inversionsToPlayTemp.push([randomNotes[i],
                                    randomNotes[i] + chordTypes['triads'][randomTriads[i]][randomInversions[i]][0],
                                    randomNotes[i] + chordTypes['triads'][randomTriads[i]][randomInversions[i]][0] + chordTypes['triads'][randomTriads[i]][randomInversions[i]][1]]);
        }
        setInversionsToPlay(inversionsToPlayTemp);
        playTriads(inversionsToPlayTemp);
    }

    const repeatExample = () => {
        playTriads(inversionsToPlay);
    }

    const handleResponseMade = (option) => {
        setGuessedInversions([...guessedInversions, option]);
    };

    const undoNote = () => {
        const newGuessedTriads = guessedInversions.slice(0, guessedInversions.length - 1);
        setGuessedInversions(newGuessedTriads);
    }

    useEffect(() => {
        if (guessedInversions.length === triadsN) {
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
        <ExerciseContext.Provider value={{exerciseName, enabledComponents, guessedInversions, enabledTriadsInversions, startExercise, nextExample, repeatExample, undoNote, setNoteSpacing, setNoteLength}}>
            <TriadsInversionsInput onResponseSelected={handleResponseMade} />
            <ControlPanel/>
        </ExerciseContext.Provider>
    );
}

export default TriadsInversionsQuiz;
