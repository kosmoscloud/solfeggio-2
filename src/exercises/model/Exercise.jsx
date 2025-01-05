import React, { useContext, useEffect, useState, useRef } from 'react';

import { ResultsContext, ExerciseContext } from '../../managers/ExercisesManager';
import { GlobalSettingsContext } from '../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../managers/OverlaysManager';
import { IOContext } from '../../managers/IOManager';

import Keyboard from '../../components/keyboard/Keyboard';
import ControlPanel from '../../components/controlpanel/ControlPanel';
import IntervalsInput from '../../components/quizinput/IntervalsInput';
import TriadsInput from '../../components/quizinput/TriadsInput';
import TriadsInversionsInput from '../../components/quizinput/TriadsInversionsInput';
import SeventhsInput from '../../components/quizinput/SeventhsInput';
import SeventhsInversionsInput from '../../components/quizinput/SeventhsInversionsInput';

function Exercise({ name, inputType, generateExample, predicate, settingsComponent, showHintEnabled = true, undoNoteEnabled = true }) {
    const exerciseName = name;
    const { noteLength, noteSpacing } = useContext(GlobalSettingsContext);
    const { playNotes, lastPlayedNote, lastQuizAnswer, markedNotes, setMarkedNotes, playedNotes, setPlayedNotes } = useContext(IOContext);
    const { updateNotesResults, updateExamplesResults, resetNotesResults, resetExamplesResults } = useContext(ResultsContext);
    const [hasStarted, setHasStarted] = useState(false);
    const { showOverlay } = useContext(OverlaysContext);

    const [generatedExample, setGeneratedExample] = useState([]);
    const [answers, setAnswers] = useState([]);
    const prevAnswersLengthRef = useRef(playedNotes.length);

    useEffect(() => {
        if (lastPlayedNote) {
            setAnswers([...answers, lastPlayedNote]);
            setPlayedNotes([...playedNotes, lastPlayedNote]);
            updateNotesResults(lastPlayedNote === generatedExample[answers.length]);
        }
    }, [lastPlayedNote]);

    useEffect(() => {
        if (lastQuizAnswer) {
            setAnswers([...answers, lastQuizAnswer]);
        }
    }, [lastQuizAnswer]);

    const resetResults = () => {
        resetNotesResults();
        resetExamplesResults();
    };

    const startExercise = () => {
        resetResults();
        setHasStarted(true);
        nextExample();
    };

    const nextExample = () => {
        setAnswers([]);
        const newExample = generateExample();
        if (inputType === 'keyboard') {
            setPlayedNotes([]);
            setMarkedNotes([]);
            if (newExample.length > 1) setMarkedNotes(Array.isArray(newExample[0]) ? newExample[0] : [newExample[0]]);
        }
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

    const undoNote = undoNoteEnabled ? () => {
        setAnswers(answers.slice(0, -1));
        setPlayedNotes(playedNotes.slice(0, -1));
    } : undefined;

    const showHint = showHintEnabled ? () => {
        if (markedNotes.length === generatedExample.length) return;
        setMarkedNotes([...markedNotes, Array.isArray(generatedExample[0]) ? generatedExample[markedNotes.length][0] : generatedExample[markedNotes.length]]);
    } : undefined;

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
        <ExerciseContext.Provider value={{ exerciseName, answers, hasStarted, startExercise, nextExample, repeatExample, undoNote, showHint, openSettings }}>
            {inputType === 'keyboard' && <Keyboard />}
            {inputType === 'intervals' && <IntervalsInput />}
            {inputType === 'triads' && <TriadsInput />}
            {inputType === 'triadsInversions' && <TriadsInversionsInput />}
            {inputType === 'sevenths' && <SeventhsInput />}
            {inputType === 'seventhsInversions' && <SeventhsInversionsInput />}
            <ControlPanel />
        </ExerciseContext.Provider>
    );
}

export default Exercise;
