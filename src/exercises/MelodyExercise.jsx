import React, { useContext, useEffect, useState } from 'react';
import { ResultsContext } from '../managers/ExercisesManager';
import Keyboard from '../components/keyboard/Keyboard';
import ControlPanel from '../components/controlpanel/ControlPanel';
import { ExerciseContext } from '../managers/ExercisesManager';
import SoundGenerator from '../generators/SoundGenerator';
import { GlobalSettingsContext } from '../managers/GlobalSettingsManager';
import { OverlaysContext } from '../managers/OverlaysManager';
import MelodyLength from '../components/overlays/melodylength/MelodyLength';

function MelodyExercise() {
    const { melodyType: type } = useContext(GlobalSettingsContext);
    const exerciseName = 'Melodia' + (type === 'ascending' ? ' rosnąca' : type === 'descending' ? ' opadająca' : ' swobodna');
    const { updateNotesResults, updateExamplesResults,
        resetNotesResults, resetExamplesResults } = useContext(ResultsContext);
    const { showOverlay } = useContext(OverlaysContext);

    const { melodyLength } = useContext(GlobalSettingsContext);
    const [generatedMelody, setGeneratedMelody] = useState([]);
    const [playedNotes, setPlayedNotes] = useState([]);
    const [markedNotes, setMarkedNotes] = useState([]);

    const [ enabledComponents, setEnabledComponents ] = useState(['startreset', 'settings']);
    const { effectiveScale } = useContext(GlobalSettingsContext);
    const keyRange = { low: effectiveScale[0], high: effectiveScale[effectiveScale.length - 1] };
    const [noteSpacing, setNoteSpacing] = useState(50);
    const [noteLength, setNoteLength] = useState(50);

    const soundGenerator = new SoundGenerator();

    const startExercise = () => {
        setEnabledComponents(['startreset', 'exit', 'next', 'repeat', 'undo', 'hint', 'notespacing', 'notelength', 'settings']);
        resetNotesResults();
        resetExamplesResults();
        nextExample();
    }

    const playMelody = (melody) => {
        soundGenerator.playSequence(melody, noteSpacing * 10 + 50, noteLength / 50 + 0.02);
    }

    const nextExample = () => {
        const randomMelody = Array.from({ length: melodyLength }, () => effectiveScale[Math.floor(Math.random() * effectiveScale.length)]);
        if (type === 'ascending') randomMelody.sort((a, b) => a - b)
        if (type === 'descending') randomMelody.sort((a, b) => b - a)
        setGeneratedMelody(randomMelody);
        setPlayedNotes([]);
        setMarkedNotes([randomMelody[0]]);
        playMelody(randomMelody);
    }

    const repeatExample = () => {
        playMelody(generatedMelody);
    }

    const handleNotePlayed = (midiNote) => {
        setPlayedNotes([...playedNotes, midiNote]);
        updateNotesResults(midiNote === generatedMelody[playedNotes.length]);
    };

    const undoNote = () => {
        setPlayedNotes(playedNotes.slice(0, -1));
    }

    const showHint = () => {
        if (markedNotes.length === generatedMelody.length) return;
        setMarkedNotes([...markedNotes, generatedMelody[markedNotes.length]]);
    }

    useEffect(() => {
        if (playedNotes.length === melodyLength) {
            const isCorrect = generatedMelody.every((note, index) => note === playedNotes[index]);
            updateExamplesResults(isCorrect);
            setPlayedNotes([]);
            if (isCorrect) setTimeout(() => nextExample(), 500) 
            else {
                setTimeout(() => repeatExample(), 500)
            }
        }
        // disabling because the lack of better solution
        // eslint-disable-next-line
    }, [playedNotes]);

    const openSettings = () => {
        showOverlay(<MelodyLength />);
    }

    return (
        <ExerciseContext.Provider value={{exerciseName, enabledComponents, keyRange, markedNotes, playedNotes, startExercise, nextExample, repeatExample, undoNote, showHint, setNoteSpacing, setNoteLength, openSettings}}>
            <Keyboard onNotePlayed={handleNotePlayed} context={ExerciseContext} />
            <ControlPanel/>
        </ExerciseContext.Provider>
    );
}

export default MelodyExercise;
