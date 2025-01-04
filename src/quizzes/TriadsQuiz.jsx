import React, { useContext, useEffect, useState } from 'react';
import { GlobalSettingsContext } from '../managers/GlobalSettingsManager';
import { ResultsContext } from '../managers/ExercisesManager';
import { ExerciseContext } from '../managers/ExercisesManager';
import { OverlaysContext } from '../managers/OverlaysManager';

import Triads from '../overlays/chords/triads/Triads';
import chordTypes from '../exercises/data/ChordTypes';
import ControlPanel from '../components/controlpanel/ControlPanel';
import TriadsInput from '../components/quizinput/TriadsInput';

function TriadsQuiz() {
    const exerciseName = 'Zapytanie: Rodzaje trójdźwięków';
    const { updateExamplesResults, resetExamplesResults } = useContext(ResultsContext);
    const [generatedTriads, setGeneratedTriads] = useState([]);
    const [triadsToPlay, setTriadsToPlay] = useState([]);
    const [guessedTriads, setGuessedTriads] = useState([]);
    const { triadsN } = useContext(GlobalSettingsContext);
    const enabledTriads = useContext(GlobalSettingsContext).enabledChords['triads'];

    const [enabledComponents, setEnabledComponents] = useState(['startreset']);
    const effectiveScale = Array.from({length: 24}, (_, i) => i + 52);

    const [noteSpacing, setNoteSpacing] = useState(50);
    const [noteLength, setNoteLength] = useState(50);
    const { soundGenerator } = useContext(GlobalSettingsContext);

    const { showOverlay } = useContext(OverlaysContext);

    const startExercise = () => {
        resetExamplesResults();
        nextExample();
        setEnabledComponents(['startreset', 'exit', 'next', 'repeat', 'undo', 'notespacing', 'notelength']);
    }

    const playTriads = (triads) => {
        soundGenerator.playChords(triads, noteSpacing * 10 + 50, noteLength / 50 + 0.02);
    }

    const nextExample = () => {
        const randomTriads = []
        const randomNotes = []
        const randomInversions = []
        for (let i = 0; i < triadsN; i++) {
            randomTriads.push(enabledTriads[Math.floor(Math.random() * enabledTriads.length)]);
            randomNotes.push(effectiveScale[Math.floor(Math.random() * effectiveScale.length)]);
            randomInversions.push(Math.floor(Math.random() * 3));
        }
        setGeneratedTriads(randomTriads);

        const triadsToPlayTemp = []
        for (let i = 0; i < triadsN; i++) {
            triadsToPlayTemp.push([randomNotes[i],
                                    randomNotes[i] + chordTypes['triads'][randomTriads[i]][randomInversions[i]][0],
                                    randomNotes[i] + chordTypes['triads'][randomTriads[i]][randomInversions[i]][0] + chordTypes['triads'][randomTriads[i]][randomInversions[i]][1]]);
        }
        setTriadsToPlay(triadsToPlayTemp);
        playTriads(triadsToPlayTemp);
    }

    const repeatExample = () => {
        playTriads(triadsToPlay);
    }

    const handleResponseMade = (option) => {
        setGuessedTriads([...guessedTriads, option]);
    };

    const undoNote = () => {
        const newGuessedTriads = guessedTriads.slice(0, guessedTriads.length - 1);
        setGuessedTriads(newGuessedTriads);
    }

    useEffect(() => {
        if (guessedTriads.length === triadsN) {
            const isCorrect = guessedTriads.toString() === generatedTriads.toString();
            updateExamplesResults(isCorrect);
            setGuessedTriads([]);
            if (isCorrect) setTimeout(() => nextExample(), 500) 
            else {
                setTimeout(() => repeatExample(), 500)
            }
        }
        // disabling because the lack of better solution
        // eslint-disable-next-line
    }, [guessedTriads]);

    const openSettings = () => {
        showOverlay(<Triads />);
    }

    return (
        <ExerciseContext.Provider value={{exerciseName, enabledComponents, guessedTriads, enabledTriads, startExercise, nextExample, repeatExample, undoNote, setNoteSpacing, setNoteLength, openSettings}}>
            <TriadsInput onResponseSelected={handleResponseMade} />
            <ControlPanel/>
        </ExerciseContext.Provider>
    );
}

export default TriadsQuiz;
