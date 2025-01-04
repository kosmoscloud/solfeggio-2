import React, { useContext } from 'react';
import { GlobalSettingsContext } from '../managers/GlobalSettingsManager';

import Exercise from './model/Exercise';
import MelodyLength from '../overlays/melodylength/MelodyLength';

function MelodyExercise() {

    const { effectiveScale, melodyType: type, melodyLength } = useContext(GlobalSettingsContext);

    const name = 'Melodia' + (type === 'ascending' ? ' rosnąca' : type === 'descending' ? ' opadająca' : ' swobodna');

    function generateMelody() {
        const randomMelody = Array.from({ length: melodyLength }, () => [effectiveScale[Math.floor(Math.random() * effectiveScale.length)]]);
        if (type === 'ascending') randomMelody.sort((a, b) => a[0] - b[0])
        if (type === 'descending') randomMelody.sort((a, b) => b[0] - a[0])
        console.log(randomMelody);
        return randomMelody;
    }

    function isMelodyCorrect(answers, generatedExample) {
        return answers.toString() === generatedExample.toString();
    }

    return <Exercise 
    name={name}
    inputType='keyboard'
    generateExample={generateMelody}
    predicate={isMelodyCorrect}
    settingsComponent={<MelodyLength/>}
    />
}

export default MelodyExercise;



// import React, { useContext, useEffect, useState } from 'react';
// import { GlobalSettingsContext } from '../managers/GlobalSettingsManager';
// import { ResultsContext } from '../managers/ExercisesManager';
// import { ExerciseContext } from '../managers/ExercisesManager';
// import { OverlaysContext } from '../managers/OverlaysManager';

// import Keyboard from '../components/keyboard/Keyboard';
// import ControlPanel from '../components/controlpanel/ControlPanel';

// import MelodyLength from '../overlays/melodylength/MelodyLength';

// function MelodyExercise() {
//     const { melodyType: type } = useContext(GlobalSettingsContext);
//     const exerciseName = 'Melodia' + (type === 'ascending' ? ' rosnąca' : type === 'descending' ? ' opadająca' : ' swobodna');
//     const { updateNotesResults, updateExamplesResults,
//         resetNotesResults, resetExamplesResults } = useContext(ResultsContext);
//     const { showOverlay } = useContext(OverlaysContext);

//     const { melodyLength } = useContext(GlobalSettingsContext);
//     const [generatedMelody, setGeneratedMelody] = useState([]);
//     const [playedNotes, setPlayedNotes] = useState([]);
//     const [markedNotes, setMarkedNotes] = useState([]);

//     const [ enabledComponents, setEnabledComponents ] = useState(['startreset']);
//     const { effectiveScale } = useContext(GlobalSettingsContext);
//     const keyRange = { low: effectiveScale[0], high: effectiveScale[effectiveScale.length - 1] };
//     const [noteSpacing, setNoteSpacing] = useState(50);
//     const [noteLength, setNoteLength] = useState(50);

//     const { soundGenerator } = useContext(GlobalSettingsContext);

//     const startExercise = () => {
//         setEnabledComponents(['startreset', 'exit', 'next', 'repeat', 'undo', 'hint', 'notespacing', 'notelength']);
//         resetNotesResults();
//         resetExamplesResults();
//         nextExample();
//     }

//     const playMelody = (melody) => {
//         soundGenerator.playSequence(melody, noteSpacing * 10 + 50, noteLength / 50 + 0.02);
//     }

//     const nextExample = () => {
//         const randomMelody = Array.from({ length: melodyLength }, () => effectiveScale[Math.floor(Math.random() * effectiveScale.length)]);
//         if (type === 'ascending') randomMelody.sort((a, b) => a - b)
//         if (type === 'descending') randomMelody.sort((a, b) => b - a)
//         setGeneratedMelody(randomMelody);
//         setPlayedNotes([]);
//         setMarkedNotes([randomMelody[0]]);
//         playMelody(randomMelody);
//     }

//     const repeatExample = () => {
//         playMelody(generatedMelody);
//     }

//     const handleNotePlayed = (midiNote) => {
//         setPlayedNotes([...playedNotes, midiNote]);
//         updateNotesResults(midiNote === generatedMelody[playedNotes.length]);
//     };

//     const undoNote = () => {
//         setPlayedNotes(playedNotes.slice(0, -1));
//     }

//     const showHint = () => {
//         if (markedNotes.length === generatedMelody.length) return;
//         setMarkedNotes([...markedNotes, generatedMelody[markedNotes.length]]);
//     }

//     useEffect(() => {
//         if (playedNotes.length === melodyLength) {
//             const isCorrect = generatedMelody.every((note, index) => note === playedNotes[index]);
//             updateExamplesResults(isCorrect);
//             setPlayedNotes([]);
//             if (isCorrect) setTimeout(() => nextExample(), 500) 
//             else {
//                 setTimeout(() => repeatExample(), 500)
//             }
//         }
//         // disabling because the lack of better solution
//         // eslint-disable-next-line
//     }, [playedNotes]);

//     const openSettings = () => {
//         showOverlay(<MelodyLength />);
//     }

//     return (
//         <ExerciseContext.Provider value={{exerciseName, enabledComponents, keyRange, markedNotes, playedNotes, startExercise, nextExample, repeatExample, undoNote, showHint, setNoteSpacing, setNoteLength, openSettings}}>
//             <Keyboard onNotePlayed={handleNotePlayed} context={ExerciseContext} />
//             <ControlPanel/>
//         </ExerciseContext.Provider>
//     );
// }

// export default MelodyExercise;
