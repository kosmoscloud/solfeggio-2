import React, { useContext, useEffect, useState, useRef } from 'react';

import { ResultsContext, ExerciseContext } from '../layers/ExerciseLayer.jsx';
import { UIContext } from '../layers/UILayer.jsx';
import { IOContext } from '../layers/IOLayer.jsx';

import Banner from '../components/Banner.jsx';
import ControlPanel from '../ui/controlpanel/ControlPanel.jsx';

function Exercise({ name, inputElement, generateExample, convertExampleToAnswers, convertInputToAnswer, settingsComponent, repeatEnabled = true, showHintEnabled = true, reproductionMode, altVersion, repeat }) {
    const exerciseName = name;
    const { playNotes, shuffleInstruments, triggerInstrumentChange, trigger, lastInput, markedNotes, setMarkedNotes, playedNotes, setPlayedNotes, setReproductionMode } = useContext(IOContext);
    const { updateExamplesResults, resetExamplesResults } = useContext(ResultsContext);
    const [ hasStarted, setHasStarted ] = useState(false);
    const { showElement } = useContext(UIContext);

    const [ generatedExample, setGeneratedExample ] = useState([]);
    const [ correctAnswers, setCorrectAnswers ] = useState([]);
    const [ answers, setAnswers ] = useState([]);
    const prevAnswersLengthRef = useRef(playedNotes.length);

    useEffect(() => {
        setHasStarted(false);
    }, [name]);

    useEffect(() => {
        console.log('generated example: ', generatedExample);
    }, [generatedExample]);

    useEffect(() => {
        console.log('correct answers: ', correctAnswers);
    }, [correctAnswers]);

    useEffect(() => {
        console.log('answers: ', answers);
    }, [answers]);

    useEffect(() => {
        if (hasStarted) {
            const newAnswer = convertInputToAnswer ? convertInputToAnswer(lastInput) : lastInput;
            if (newAnswer) setAnswers([...answers, newAnswer]);
        }
    }, [trigger, answers, convertInputToAnswer, hasStarted, lastInput]);

    const resetResults = () => {
        resetExamplesResults();
    };

    const startExercise = () => {
        setReproductionMode(reproductionMode);
        resetResults();
        setHasStarted(true);
        nextExample();
    };

    const nextExample = async () => {
        setAnswers([]);
        if (shuffleInstruments) await triggerInstrumentChange();
        const newExample = await generateExample();
        const newCorrectAnswers = await convertExampleToAnswers(newExample);
        setGeneratedExample(newExample);
        setCorrectAnswers(newCorrectAnswers);
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
        if (repeat) repeat();
        playExample(generatedExample);
    } : undefined;

    const showHint = showHintEnabled ? () => {
        if (markedNotes.length === generatedExample.length) return;
        setMarkedNotes([...markedNotes, Array.isArray(generatedExample[0]) ? generatedExample[markedNotes.length][0] : generatedExample[markedNotes.length]]);
    } : undefined;

    useEffect(() => {
        if (hasStarted && prevAnswersLengthRef.current !== answers.length && answers.length === correctAnswers.length) {
            const isCorrect = JSON.stringify(answers) === JSON.stringify(correctAnswers);
            console.log('isCorrect: ', isCorrect, 'answers: ', JSON.stringify(answers), 'correctAnswers: ', JSON.stringify(correctAnswers));
            updateExamplesResults(isCorrect);
            if (isCorrect) {
                setMarkedNotes([]);
                setTimeout(() => {
                    nextExample();
                }, 900);
            } else {
                setAnswers([]);
                if (repeatEnabled) setTimeout(() => repeatExample(), 900);
                else setTimeout(() => nextExample(), 900);
            }
        }
        prevAnswersLengthRef.current = answers.length;
    }, [answers, correctAnswers, hasStarted, nextExample, repeatExample, updateExamplesResults]);

    const openSettings = (settingsComponent !== undefined) ? (() => {
        showElement(settingsComponent);
    }) : undefined;

    return (
        <ExerciseContext.Provider value={{ answers, hasStarted, startExercise, nextExample, repeatExample, showHint, openSettings }}>
            <Banner text={exerciseName} onClick={altVersion ? () => showElement(altVersion) : undefined} />
            {inputElement}
            <ControlPanel />
        </ExerciseContext.Provider>
    );
}

export default Exercise;
