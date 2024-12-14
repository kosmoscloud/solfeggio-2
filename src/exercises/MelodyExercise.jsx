import React, { useContext, useEffect, useState } from 'react';
import { ResultsContext } from '../managers/ExercisesManager';
import Keyboard from '../components/keyboard/Keyboard';
import ControlPanel from '../components/controlpanel/ControlPanel';
import { ExerciseContext } from '../managers/ExercisesManager';
import SoundGenerator from '../generators/SoundGenerator';

function MelodyExercise(props) {
    const exerciseName = 'Melodia' + (props.type === 'ascending' ? ' rosnąca' : props.type === 'descending' ? ' opadająca' : '');
    const { updateNotesResults, updateExamplesResults,
        resetNotesResults, resetExamplesResults } = useContext(ResultsContext);

    const melodyLength = 3;
    const [generatedMelody, setGeneratedMelody] = useState([]);
    const [playedMelody, setPlayedMelody] = useState([]);
    const [markedNotes, setMarkedNotes] = useState([]);

    const enabledComponents = ['startreset', 'exit', 'next', 'repeat', 'undo', 'hint', 'notespacing', 'notelength'];
    const keyRange = { low: 48, high: 90 };
    const [noteSpacing, setNoteSpacing] = useState(50);
    const [noteLength, setNoteLength] = useState(50);

    const soundGenerator = new SoundGenerator();

    // one time effect on render
    useEffect(() => {
        startExercise();
        // eslint-disable-next-line
    }, [props.type]);

    const startExercise = () => {
        resetNotesResults();
        resetExamplesResults();
        nextExample();
    }

    const playMelody = (melody) => {
        soundGenerator.playSequence(melody, noteSpacing + 30, noteLength / 50 + 0.02);
    }

    const nextExample = () => {
        const randomMelody = Array.from({ length: melodyLength }, () => Math.floor(Math.random() * (keyRange.high - keyRange.low + 1)) + keyRange.low);
        if (props.type === 'ascending') randomMelody.sort((a, b) => a - b)
        if (props.type === 'descending') randomMelody.sort((a, b) => b - a)
        setGeneratedMelody(randomMelody);
        setMarkedNotes([randomMelody[0]]);
        playMelody(randomMelody);
    }

    const repeatExample = () => {
        playMelody(generatedMelody);
    }

    const handleNotePlayed = (midiNote) => {
        setPlayedMelody([...playedMelody, midiNote]);
        updateNotesResults(midiNote === generatedMelody[playedMelody.length]);
    };

    const undoNote = () => {
        setPlayedMelody(playedMelody.slice(0, -1));
    }

    const showHint = () => {
        if (markedNotes.length === generatedMelody.length) return;
        setMarkedNotes([...markedNotes, generatedMelody[markedNotes.length]]);
    }

    useEffect(() => {
        if (playedMelody.length === melodyLength) {
            const isCorrect = generatedMelody.every((note, index) => note === playedMelody[index]);
            updateExamplesResults(isCorrect);
            setPlayedMelody([]);
            if (isCorrect) setTimeout(() => nextExample(), 500) 
            else {
                setTimeout(() => repeatExample(), 500)
            }
        }
        // disabling because the lack of better solution
        // eslint-disable-next-line
    }, [playedMelody]);

    return (
        <ExerciseContext.Provider value={{exerciseName, enabledComponents, keyRange, markedNotes, playedMelody, startExercise, nextExample, repeatExample, undoNote, showHint, setNoteSpacing, setNoteLength}}>
            <Keyboard onNotePlayed={handleNotePlayed} />
            <ControlPanel/>
        </ExerciseContext.Provider>
    );
}

export default MelodyExercise;
