import React, { useContext, useEffect, useState, useRef } from 'react';

import { ResultsContext, ExerciseContext } from '../../managers/ExercisesManager';
import { GlobalSettingsContext } from '../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../managers/OverlaysManager';
import { IOContext } from '../../managers/IOManager';

import Keyboard from '../../components/keyboard/Keyboard';
import ControlPanel from '../../components/controlpanel/ControlPanel';

function Exercise({ name, inputType, generateExample, predicate, settingsComponent }) {
    const exerciseName = name;
    const { noteLength, noteSpacing } = useContext(GlobalSettingsContext);
    const { playNotes, lastPlayedNote, lastQuizAnswer, markedNotes, setMarkedNotes, playedNotes, setPlayedNotes } = useContext(IOContext);
    const { updateNotesResults, updateExamplesResults, resetNotesResults, resetExamplesResults } = useContext(ResultsContext);
    const { showOverlay } = useContext(OverlaysContext);

    const [generatedExample, setGeneratedExample] = useState([]);
    const [answers, setAnswers] = useState([]);
    const prevAnswersLengthRef = useRef(playedNotes.length);
    const [enabledComponents, setEnabledComponents] = useState([]);

    useEffect(() => {
        if (lastPlayedNote) {
            setAnswers([...answers, lastPlayedNote]);
            setPlayedNotes([...playedNotes, lastPlayedNote]);
            updateNotesResults(lastPlayedNote === generatedExample[answers.length]);
        }
    }, [lastPlayedNote]);

    const resetResults = () => {
        resetNotesResults();
        resetExamplesResults();
    };

    const startExercise = () => {
        setEnabledComponents(['next', 'repeat', 'undo', 'hint', 'notespacing', 'notelength']);
        resetResults();
        nextExample();
    };

    const nextExample = () => {
        setAnswers([]);
        setPlayedNotes([]);
        setMarkedNotes([]);
        const newExample = generateExample();
        if (newExample.length > 1) setMarkedNotes(Array.isArray(newExample[0]) ? newExample[0] : [newExample[0]]);
        setGeneratedExample(newExample);
        playExample(newExample);
    };

    const playExample = (example) => {
        playNotes(example, noteSpacing, noteLength);
    };

    const repeatExample = () => {
        setAnswers([]);
        setPlayedNotes([]);
        playExample(generatedExample);
    };

    const undoNote = () => {
        setAnswers(answers.slice(0, -1));
        setPlayedNotes(playedNotes.slice(0, -1));
    };

    const showHint = () => {
        if (markedNotes.length === generatedExample.length) return;
        setMarkedNotes([...markedNotes, Array.isArray(generatedExample[0]) ? generatedExample[markedNotes.length][0] : generatedExample[markedNotes.length]]);
    };

    useEffect(() => {
        if (prevAnswersLengthRef.current !== answers.length && answers.length === generatedExample.length) {
            const isCorrect = predicate(answers, generatedExample);
            updateExamplesResults(isCorrect);
            if (isCorrect) {
                setTimeout(() => nextExample(), 500);
                setMarkedNotes([]);
            } else {
                setTimeout(() => repeatExample(), 500);
            }
        }
        prevAnswersLengthRef.current = answers.length;
    }, [answers, generatedExample]);

    const openSettings = () => {
        showOverlay(settingsComponent);
    };

    return (
        <ExerciseContext.Provider value={{ exerciseName, enabledComponents, answers, startExercise, nextExample, repeatExample, undoNote, showHint, openSettings }}>
            {inputType === 'keyboard' && <Keyboard />}
            <ControlPanel />
        </ExerciseContext.Provider>
    );
}

export default Exercise;
