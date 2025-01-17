import React, { useContext, useEffect, useState, useRef } from 'react';

import { ResultsContext, ExerciseContext } from '../../managers/ExerciseLayer.jsx';
import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer.jsx';
import { UIContext } from '../../managers/UILayer.jsx';
import { IOContext } from '../../managers/IOLayer.jsx';

import Keyboard from '../../ui/keyboard/Keyboard';
import ControlPanel from '../../ui/controlpanel/ControlPanel';
import IntervalsInput from '../../ui/quizinput/IntervalsInput.jsx';
import TriadsInput from '../../ui/quizinput/TriadsInput.jsx';
import TriadsInversionsInput from '../../ui/quizinput/TriadsInversionsInput.jsx';
import SeventhsInput from '../../ui/quizinput/SeventhsInput.jsx';
import SeventhsInversionsInput from '../../ui/quizinput/SeventhsInversionsInput.jsx';

function Exercise({ name, inputType, generateExample, predicate, settingsComponent, repeatEnabled = true, showHintEnabled = true, undoNoteEnabled = true }) {
    const exerciseName = name;
    const { playNotes, shuffleInstruments, triggerInstrumentChange, trigger, lastAnswer, lastQuizAnswer, markedNotes, setMarkedNotes, playedNotes, setPlayedNotes } = useContext(IOContext);
    const { updateNotesResults, updateExamplesResults, resetNotesResults, resetExamplesResults } = useContext(ResultsContext);
    const [ hasStarted, setHasStarted ] = useState(false);
    const { showOverlay, showElement, lastOpenedElement } = useContext(UIContext);

    const [ generatedExample, setGeneratedExample ] = useState([]);
    const [ answers, setAnswers ] = useState([]);
    const prevAnswersLengthRef = useRef(playedNotes.length);

    useEffect(() => {
        setHasStarted(false);
    }, [name]);

    useEffect(() => {
        if (hasStarted) {
            const correctAnswer = generatedExample[answers.length];
            if (correctAnswer) {
                updateNotesResults(predicate([lastAnswer], [correctAnswer]));
                setAnswers([...answers, lastAnswer]);
                setPlayedNotes([...playedNotes, lastAnswer]);
            }
        }
    }, [trigger]);

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

    const nextExample = async () => {
        setAnswers([]);
        if (shuffleInstruments) await triggerInstrumentChange();
        const newExample = await generateExample();
        if (inputType === 'keyboard') {
            setPlayedNotes([]);
            setMarkedNotes([]);
            if (newExample.length > 1) setMarkedNotes(Array.isArray(newExample[0]) ? newExample[0] : [newExample[0]]);
        }
        setGeneratedExample(newExample);
        playExample(newExample);
    };

    const playExample = (example) => {
        if (Array.isArray(example[0]) && example[0].length === 1) {
            playNotes([example.flat()]);
        } else {
            playNotes(example);
        }    
    };

    const repeatExample = repeatEnabled ?  () => {
        setAnswers([]);
        setPlayedNotes([]);
        playExample(generatedExample);
    } : undefined;

    const undoNote = undoNoteEnabled ? () => {
        setAnswers(answers.slice(0, -1));
        setPlayedNotes(playedNotes.slice(0, -1));
    } : undefined;

    const showHint = showHintEnabled ? () => {
        if (markedNotes.length === generatedExample.length) return;
        setMarkedNotes([...markedNotes, Array.isArray(generatedExample[0]) ? generatedExample[markedNotes.length][0] : generatedExample[markedNotes.length]]);
    } : undefined;

    useEffect(() => {
        if (hasStarted && prevAnswersLengthRef.current !== answers.length && answers.length === generatedExample.length) {
            const isCorrect = predicate(answers, generatedExample);
            updateExamplesResults(isCorrect);
            if (isCorrect) {
                setMarkedNotes([]);
                setTimeout(() => {
                    nextExample();
                }, 500);
            } else {
                if (repeatEnabled) setTimeout(() => repeatExample(), 500);
                else setTimeout(() => nextExample(), 500);
            }
        }
        prevAnswersLengthRef.current = answers.length;
    }, [answers, generatedExample]);

    const openSettings = (settingsComponent !== undefined) ? (() => {
        showOverlay(settingsComponent);
    }) : undefined;

    const returnToMenu = () => {
        resetResults();
        setHasStarted(false);
        showElement(lastOpenedElement);
    }

    return (
        <ExerciseContext.Provider value={{ exerciseName, answers, hasStarted, startExercise, nextExample, repeatExample, undoNote, showHint, openSettings, returnToMenu }}>
            {inputType === 'keyboard' && <Keyboard />}
            {inputType === 'intervals' && <IntervalsInput />}
            {inputType === 'triads' && <TriadsInput />}
            {inputType === 'triadsinversions' && <TriadsInversionsInput />}
            {inputType === 'sevenths' && <SeventhsInput />}
            {inputType === 'seventhsinversions' && <SeventhsInversionsInput />}
            <ControlPanel />
        </ExerciseContext.Provider>
    );
}

export default Exercise;
