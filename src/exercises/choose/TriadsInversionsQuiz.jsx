import React, { useContext } from 'react';

import { GlobalSettingsContext } from '../../layers/GlobalSettingsLayer';
import { LanguageContext } from '../../layers/UILayer';

import Exercise from '../Exercise';
import Triads from '../../ui/overlays/chords/Triads';

import chordTypes from '../../exercises/data/ChordTypes';

function TriadsInversionsQuiz() {

    const { effectiveScale, triadsN } = useContext(GlobalSettingsContext);
    const enabledTriads = useContext(GlobalSettingsContext).enabledChords.triads;
    const enabledInversions = useContext(GlobalSettingsContext).enabledInversions.triads;
    const { dictionary } = useContext(LanguageContext);

    function generateTriadsInversions() {
        const randomTriadsInversions = Array.from({ length: triadsN }, () => enabledTriads[Math.floor(Math.random() * enabledTriads.length)]);
        const randomNotes = Array.from({ length: triadsN }, () => effectiveScale[Math.floor(Math.random() * effectiveScale.length)]);
        const randomInversions = Array.from({ length: triadsN }, () => enabledInversions[Math.floor(Math.random() * enabledInversions.length)]);

        return randomTriadsInversions.map((triad, i) => [
            randomNotes[i],
            randomNotes[i] + chordTypes['triads'][triad][randomInversions[i]][0],
            randomNotes[i] + chordTypes['triads'][triad][randomInversions[i]][0] + chordTypes['triads'][triad][randomInversions[i]][1]
        ]);
    }

    function isTriadCorrect(answers, generatedExample) {
        // calculate the answers the same way they are generated, eg. [[0, 4, 7], [0, 3, 7]] => [[4, 3], [3, 4]]
        const correctAnswers = generatedExample.map(triad => [triad[1] - triad[0], triad[2] - triad[1]]);
        // now find the name of the chord in chordTypes, the inversion does not matter
        const correctChords = generatedExample.map((triad, i) => {
            for (const chord in chordTypes['triads']) {
                for (const inversion in chordTypes['triads'][chord]) {
                    if (chordTypes['triads'][chord][inversion].toString() === correctAnswers[i].toString()) {
                    return inversion;
                    }
                }
            }
        });
        return answers.toString() === correctChords.toString();
    }

    return <Exercise 
        name={dictionary.triadinversions}
        inputType='triadsinversions'
        generateExample={generateTriadsInversions}
        predicate={isTriadCorrect}
        settingsComponent={<Triads sliderEnabled={true} />}
        showHintEnabled={false}
        undoNoteEnabled={false}
    />
}

export default TriadsInversionsQuiz;
