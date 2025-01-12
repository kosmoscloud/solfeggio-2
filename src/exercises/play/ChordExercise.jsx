import React, { useContext, useEffect } from 'react';
import { GlobalSettingsContext } from '../../managers/GlobalSettingsManager';
import { OverlaysContext } from '../../managers/OverlaysManager';
import { ExerciseManager } from '../../managers/ExercisesManager';

import Exercise from '../model/Exercise';
import chordTypes from '../data/ChordTypes';

import Triads from '../../ui/overlays/chords/Triads';
import Sevenths from '../../ui/overlays/chords/Sevenths';
import Ninths from '../../ui/overlays/chords/Ninths';
import Elevenths from '../../ui/overlays/chords/Elevenths';
import Thirteenths from '../../ui/overlays/chords/Thirteenths';
import Random from '../../ui/overlays/chords/Random';

import Alert from '../../ui/overlays/alert/Alert';

function ChordExercise({type}) {

    const { showAlert, showOverlay } = useContext(OverlaysContext);
    const { stopExercise } = useContext(ExerciseManager);
    const { enabledChords, enabledInversions } = useContext(GlobalSettingsContext);
    const { effectiveScale } = useContext(GlobalSettingsContext);
    const possibleChords = React.useMemo(() => {
            return calculatePossibleChords(effectiveScale, enabledChords[type], enabledInversions[type]);
            // eslint-disable-next-line
        }, [effectiveScale, enabledChords, enabledInversions, type]);

    useEffect(() => {
        if (possibleChords.length === 0) {
            showAlert(<Alert text="Nie odnaleziono żadnego akordu w tej skali. Zmień zakres dźwięków." afterAlert={stopExercise}/>);
        }
    }, [possibleChords, effectiveScale]);

    const name = {
        'triads': 'Trójdźwięk',
        'sevenths': 'Akord z septymą',
        'ninths': 'Akord z noną',
        'elevenths': 'Akord z undecymą',
        'thirteenths': 'Akord z tercdecymą',
        'random': 'Akord przypadkowy'
    }[type] || '???';


    function generateChord() {
        const randomChord = [possibleChords[Math.floor(Math.random() * possibleChords.length)]];
        randomChord.sort((a, b) => a - b);
        return randomChord;
    }

    function calculatePossibleChords(effectiveScale, enabledChords, enabledInversions) {

        let options = [];
        const chords = [];
        if (type === 'random') {
            enabledChords.forEach(chordLength => {
                for (let j = 0; j < 512; j++) {
                    const randomNotes = new Set();
                    while (randomNotes.size < chordLength) {
                        const randomNote = effectiveScale[Math.floor(Math.random() * effectiveScale.length)];
                        randomNotes.add(randomNote);
                    }
                    chords.push([...randomNotes]);
                }
            });
        } else {
            options = chordTypes[type];
            options = Object.keys(options)
            .filter(chordType => enabledChords.includes(chordType))
            .reduce((arr, key) => {
                Object.keys(options[key])
                    .filter(inversion => enabledInversions.includes(parseInt(inversion)))
                    .forEach(invKey => {
                    arr.push(options[key][invKey]);
                    });
                return arr;
                }, []);

            for (let i = 0; i < effectiveScale.length; i++) {
                options.forEach(option => {
                    const root = effectiveScale[i];
                    const chord = option.reduce((acc, interval) => {
                        const lastNote = acc[acc.length - 1] || root;
                        acc.push(lastNote + interval);
                        return acc;
                    }, [root]);
                    if (chord.every(note => effectiveScale.includes(note))) chords.push(chord);                        
                });
            }
        }
        return chords;
    }

    function isChordCorrect(answers, generatedExample) {
        return answers.sort().toString() === generatedExample.sort().toString();
    }

    const settingsComponents = {
        'triads': <Triads />,
        'sevenths': <Sevenths />,
        'ninths': <Ninths />,
        'elevenths': <Elevenths />,
        'thirteenths': <Thirteenths />,
        'random': <Random />
    };

    const settingsComponent = settingsComponents[type] || null;

    return <Exercise 
    name={name}
    inputType='keyboard'
    generateExample={generateChord}
    predicate={isChordCorrect}
    settingsComponent={settingsComponent}
    />
}

export default ChordExercise;