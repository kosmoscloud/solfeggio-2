import React, { useContext } from 'react';
import { GlobalSettingsContext } from '../../managers/GlobalSettingsLayer';

import Exercise from '../model/Exercise';
import Sevenths from '../../ui/overlays/chords/Sevenths';

import chordTypes from '../data/ChordTypes';

function SeventhsQuiz() {

    const { effectiveScale, seventhsN } = useContext(GlobalSettingsContext);
    const enabledSevenths = useContext(GlobalSettingsContext).enabledChords.sevenths;
    const enabledInversions = useContext(GlobalSettingsContext).enabledInversions.sevenths;

    function generateSeventh() {
        const randomSevenths = Array.from({ length: seventhsN }, () => enabledSevenths[Math.floor(Math.random() * enabledSevenths.length)]);
        const randomNotes = Array.from({ length: seventhsN }, () => effectiveScale[Math.floor(Math.random() * effectiveScale.length)]);
        const randomInversions = Array.from({ length: seventhsN }, () => enabledInversions[Math.floor(Math.random() * enabledInversions.length)]);

        const example = randomSevenths.map((seventh, i) => [
            randomNotes[i],
            randomNotes[i] + chordTypes['sevenths'][seventh][randomInversions[i]][0],
            randomNotes[i] + chordTypes['sevenths'][seventh][randomInversions[i]][0] + chordTypes['sevenths'][seventh][randomInversions[i]][1],
            randomNotes[i] + chordTypes['sevenths'][seventh][randomInversions[i]][0] + chordTypes['sevenths'][seventh][randomInversions[i]][1] + chordTypes['sevenths'][seventh][randomInversions[i]][2]
        ]);
        console.log(example);
        return example;
    }

    function isSeventhCorrect(answers, generatedExample) {
        // calculate the answers the same way they are generated, eg. [[0, 4, 7, 10], [0, 3, 7, 10]] => [[4, 3, 3], [3, 4, 3]]
        const correctAnswers = generatedExample.map(seventh => [seventh[1] - seventh[0], seventh[2] - seventh[1], seventh[3] - seventh[2]]);
        // now find the name of the chord in chordTypes, the inversion does not matter
        const correctChords = generatedExample.map((seventh, i) => {
            for (const chord in chordTypes['sevenths']) {
                for (const inversion in chordTypes['sevenths'][chord]) {
                    if (chordTypes['sevenths'][chord][inversion].toString() === correctAnswers[i].toString()) {
                        return chord;
                    }
                }
            }
        });
        return answers.toString() === correctChords.toString();
    }

    return <Exercise 
        name='Rodzaje akordów z septymą'
        inputType='sevenths'
        generateExample={generateSeventh}
        predicate={isSeventhCorrect}
        settingsComponent={<Sevenths stepperEnabled={true} />}
        showHintEnabled={false}
        undoNoteEnabled={false}
    />
}

export default SeventhsQuiz;
