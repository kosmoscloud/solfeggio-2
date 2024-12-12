import React, { useContext, useEffect, useState } from 'react';
import { ActiveExerciseContext, ResultsContext } from '../managers/ExercisesManager';
import Keyboard from '../components/keyboard/Keyboard';
import ControlPanel from '../components/controlpanel/ControlPanel';
import { ExerciseContext } from '../managers/ExercisesManager';
import SoundGenerator from '../generators/SoundGenerator';

function SingleNoteExercise() {
    const { activeExercise, stopExercise } = useContext(ActiveExerciseContext);
    const { updateNotesResults, updateExamplesResults,
        resetNotesResults, resetExamplesResults } = useContext(ResultsContext);

    const [generatedNote, setGeneratedNote] = useState(null);
    const [playedNote, setPlayedNote] = useState(null);

    const enabledComponents = ['startreset', 'exit', 'next', 'repeat'];
    const keyRange = { low: 50, high: 80 };

    const soundGenerator = new SoundGenerator();

    useEffect(() => {
        if (activeExercise !== 'SingleNote') {
            stopExercise();
        }
    }, [activeExercise, stopExercise]);

    const startExercise = () => {
        resetNotesResults();
        resetExamplesResults();
        console.log('Starting exercise');
        nextExample();
    }

    const nextExample = () => {
        const randomMidiNote = Math.floor(Math.random() * (keyRange.high - keyRange.low + 1)) + keyRange.low;
        setGeneratedNote(randomMidiNote);
    }

    const repeatExample = () => {
        soundGenerator.playSineWave(generatedNote);
    }

    useEffect(() => {
        console.log('Generated note:', generatedNote);
        if (generatedNote) {
            soundGenerator.playSineWave(generatedNote);
        } else {
            console.log('Generated note is null', generatedNote);
            setTimeout(() => {
                nextExample();
            }, 500);
        }
    }, [generatedNote]);

    const handleNotePlayed = (midiNote) => {
        setPlayedNote(midiNote);
    };

    useEffect(() => {
        if (generatedNote) {
            const isCorrect = checkNoteCorrectness(playedNote);
            updateNotesResults(isCorrect);
            updateExamplesResults(isCorrect);
        }
    }, [playedNote]);

    const checkNoteCorrectness = (midiNote) => {
        if (!generatedNote) {
            return false;
        }
        const correctNote = generatedNote;
        const isCorrect = midiNote === correctNote;
        if (isCorrect) {
            setGeneratedNote(null);
        }
        return isCorrect;
    };

    return (
        <ExerciseContext.Provider value={{enabledComponents, keyRange, startExercise, nextExample, repeatExample}}>
            <Keyboard onNotePlayed={handleNotePlayed} />
            <ControlPanel/>
        </ExerciseContext.Provider>
    );
}

export default SingleNoteExercise;
