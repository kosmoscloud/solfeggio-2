import React, { useContext, useEffect, useState } from 'react';
import { ResultsContext } from '../managers/ExercisesManager';
import Keyboard from '../components/keyboard/Keyboard';
import ControlPanel from '../components/controlpanel/ControlPanel';
import { ExerciseContext } from '../managers/ExercisesManager';
import SoundGenerator from '../generators/SoundGenerator';
import { GlobalSettingsContext } from '../managers/GlobalSettingsManager';

function IntervalQuiz() {
    const quizName = 'Zapytanie: Interwały';
    const { updateNotesResults, updateExamplesResults,
        resetNotesResults, resetExamplesResults } = useContext(ResultsContext);

    const [generatedInterval, setGeneratedInterval] = useState([]);
    const [playedInterval, setPlayedInterval] = useState([]);
    const [markedNotes, setMarkedNotes] = useState([]);

    const enabledComponents = ['startreset', 'exit', 'next', 'repeat', 'undo', 'hint', 'notespacing', 'notelength'];
    const { effectiveScale } = useContext(GlobalSettingsContext);
    const keyRange = { low: effectiveScale[0], high: effectiveScale[effectiveScale.length - 1] };
    const [noteSpacing, setNoteSpacing] = useState(50);
    const [noteLength, setNoteLength] = useState(50);

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

    const playInterval = (interval) => {
        soundGenerator.playSimultaneously(interval, noteSpacing * 10 + 50, noteLength / 50 + 0.02);
    }

    const nextExample = () => {
        const randomInterval = Array.from({ length: 2 }, () => effectiveScale[Math.floor(Math.random() * effectiveScale.length)]);
        randomInterval.sort((a, b) => a - b);
        setGeneratedInterval(randomInterval);
        setMarkedNotes([randomInterval[0]]);
        playInterval(randomInterval);
        console.log(randomInterval);
    }

    const repeatExample = () => {
        playInterval(generatedInterval);
    }

    const handleNotePlayed = (midiNote) => {
        setPlayedInterval([...playedInterval, midiNote]);
        updateNotesResults(midiNote === generatedInterval[playedInterval.length]);
    };

    const undoNote = () => {
        setPlayedInterval(playedInterval.slice(0, -1));
    }

    const showHint = () => {
        if (markedNotes.length === generatedInterval.length) return;
        setMarkedNotes([...markedNotes, generatedInterval[markedNotes.length]]);
    }

    useEffect(() => {
        if (playedInterval.length === 2) {
            const isCorrect = playedInterval.sort().toString() === generatedInterval.sort().toString();
            updateExamplesResults(isCorrect);
            setPlayedInterval([]);
            if (isCorrect) setTimeout(() => nextExample(), 500) 
            else {
                setTimeout(() => repeatExample(), 500)
            }
        }
        // disabling because the lack of better solution
        // eslint-disable-next-line
    }, [playedInterval]);

    return (
        <ExerciseContext.Provider value={{exerciseName, enabledComponents, keyRange, markedNotes, playedInterval, startExercise, nextExample, repeatExample, undoNote, showHint, setNoteSpacing, setNoteLength}}>
            <Keyboard onNotePlayed={handleNotePlayed} context={ExerciseContext} />
            <ControlPanel/>
        </ExerciseContext.Provider>
    );
}

export default IntervalQuiz;
