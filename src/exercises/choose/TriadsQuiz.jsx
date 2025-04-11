import React, { useContext, useState } from 'react';
import { GlobalSettingsContext } from '../../layers/GlobalSettingsLayer';
import { LanguageContext } from '../../layers/UILayer';

import Exercise from '../Exercise';
import Triads from '../../ui/overlays/chords/Triads';
import TriadsInput from '../../ui/quizinput/TriadsInput';

import chordTypes from '../../exercises/data/ChordTypes';
import ChordExercise from '../play/ChordExercise';
import { IOContext } from '../../layers/IOLayer';

function TriadsQuiz() {

    const { effectiveScale, triadsN } = useContext(GlobalSettingsContext);
    const enabledTriads = useContext(GlobalSettingsContext).enabledChords.triads;
    const enabledInversions = useContext(GlobalSettingsContext).enabledInversions.triads;
    const { dictionary } = useContext(LanguageContext);
    const { setMarkedAnswers } = useContext(IOContext);
    const [ answerQueue, setAnswerQueue ] = useState({chord: null, inversion: null});

    React.useEffect(() => {
        console.log('answerQueue: ', answerQueue);
    }, [answerQueue]);

    function generateTriad() {
        const randomTriads = Array.from({ length: triadsN }, () => enabledTriads[Math.floor(Math.random() * enabledTriads.length)]);
        const randomNotes = Array.from({ length: triadsN }, () => effectiveScale[Math.floor(Math.random() * effectiveScale.length)]);
        const randomInversions = Array.from({ length: triadsN }, () => enabledInversions[Math.floor(Math.random() * enabledInversions.length)]);

        return randomTriads.map((triad, i) => [
            randomNotes[i],
            randomNotes[i] + chordTypes['triads'][triad][randomInversions[i]][0],
            randomNotes[i] + chordTypes['triads'][triad][randomInversions[i]][0] + chordTypes['triads'][triad][randomInversions[i]][1]
        ]);
    }

    function convertExampleToAnswers(example) {
        return example.map(triad => {
            for (const chord in chordTypes['triads']) {
                for (const inversion in chordTypes['triads'][chord]) {
                    if (chordTypes['triads'][chord][inversion].toString() === [triad[1] - triad[0], triad[2] - triad[1]].toString()) {
                        return { chord: chord, inversion: parseInt(inversion) };
                    }
                }
            }
        });
    }

    function convertInputToAnswer(input) {
        let tempAnswerQueue = answerQueue;
        if (typeof input === 'number') tempAnswerQueue.inversion = input;
        else if (typeof input === 'string') tempAnswerQueue.chord = input;
        if (tempAnswerQueue.chord !== null && tempAnswerQueue.inversion !== null) {
            setAnswerQueue({chord: null, inversion: null});
            setMarkedAnswers([]);
            return tempAnswerQueue;
        }
        setAnswerQueue(tempAnswerQueue);
        setMarkedAnswers([tempAnswerQueue.chord, tempAnswerQueue.inversion]);
        return
    }

    return <Exercise 
        name={dictionary.triads}
        inputElement={<TriadsInput/>}
        generateExample={generateTriad}
        convertExampleToAnswers={convertExampleToAnswers}
        convertInputToAnswer={convertInputToAnswer}
        settingsComponent={<Triads sliderEnabled={true} />}
        showHintEnabled={false}
        undoNoteEnabled={false}
        altVersion={<ChordExercise type='triads'/>}
    />
}

export default TriadsQuiz;
