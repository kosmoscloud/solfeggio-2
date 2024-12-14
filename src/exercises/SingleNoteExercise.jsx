import React, { useContext, useEffect, useState } from 'react';
import { ResultsContext } from '../managers/ExercisesManager';
import Keyboard from '../components/keyboard/Keyboard';
import ControlPanel from '../components/controlpanel/ControlPanel';
import { ExerciseContext } from '../managers/ExercisesManager';
import SoundGenerator from '../generators/SoundGenerator';

function SingleNoteExercise() {
    const exerciseName = 'Pojedynczy dźwięk';
    const { updateNotesResults, updateExamplesResults,
        resetNotesResults, resetExamplesResults } = useContext(ResultsContext);

    const [generatedNote, setGeneratedNote] = useState(null);
    const [playedNote, setPlayedNote] = useState(null);

    const enabledComponents = ['startreset', 'exit', 'next', 'repeat'];
    const keyRange = { low: 48, high: 90 };

    const soundGenerator = new SoundGenerator();

    // one time effect on render
    useEffect(() => {
        startExercise();
        // eslint-disable-next-line
    }, []);

    const startExercise = () => {
        resetNotesResults();
        resetExamplesResults();
        nextExample();
    }

    const nextExample = () => {
        const randomMidiNote = Math.floor(Math.random() * (keyRange.high - keyRange.low + 1)) + keyRange.low;
        console.log(randomMidiNote);
        setGeneratedNote(randomMidiNote);
        soundGenerator.playSineWave(randomMidiNote);
    }

    const repeatExample = () => {
        soundGenerator.playSineWave(generatedNote);
    }

    const handleNotePlayed = (midiNote) => {
        setPlayedNote(midiNote);
    };

    useEffect(() => {
        if (generatedNote && playedNote !== null) {
            const isCorrect = playedNote === generatedNote
            updateNotesResults(isCorrect);
            updateExamplesResults(isCorrect);
            setPlayedNote(null);
            if (isCorrect) setTimeout(() => nextExample(), 500);
        }
        // disabling because the lack of better solution
        // eslint-disable-next-line
    }, [playedNote]);

    return (
        <ExerciseContext.Provider value={{exerciseName, enabledComponents, keyRange, startExercise, nextExample, repeatExample}}>
            <Keyboard onNotePlayed={handleNotePlayed} />
            <ControlPanel/>
        </ExerciseContext.Provider>
    );
}

export default SingleNoteExercise;
