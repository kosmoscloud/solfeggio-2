import { useMemo, useContext, useState } from 'react';

import { GlobalSettingsContext } from '../../layers/GlobalSettingsLayer';
import { LanguageContext, UIContext } from '../../layers/UILayer';
import { IOContext } from '../../layers/IOLayer';

import Exercise from '../Exercise';
import TriadsQuiz from '../choose/TriadsQuiz';
import chordTypes from '../data/ChordTypes';

import Triads from '../../ui/overlays/chords/Triads';
import Sevenths from '../../ui/overlays/chords/Sevenths';
import Ninths from '../../ui/overlays/chords/Ninths';
import Elevenths from '../../ui/overlays/chords/Elevenths';
import Thirteenths from '../../ui/overlays/chords/Thirteenths';
import Random from '../../ui/overlays/chords/Random';

import Ranges from '../../ui/overlays/Ranges';
import Alert from '../../ui/overlays/alert/Alert';
import Keyboard from '../../ui/keyboard/Keyboard';

function ChordExercise({type}) {

    const { showAlert, showOverlay } = useContext(UIContext);
    const { enabledChords, enabledInversions } = useContext(GlobalSettingsContext);
    const { effectiveScale } = useContext(GlobalSettingsContext);
    const { dictionary } = useContext(LanguageContext);
    const { setMarkedNotes, playedNotes, setPlayedNotes } = useContext(IOContext);
    const [generatedExample, setGeneratedExample] = useState(null);
    const possibleChords = useMemo(() => {
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
            let possibleChords = calculatePossibleChords(effectiveScale, enabledChords[type], enabledInversions[type]);
            if (possibleChords.length === 0) {
                showAlert(<Alert text="Nie odnaleziono żadnego akordu w wybranej skali. Zmień zakres dźwięków." afterAlert={showOverlay(<Ranges />)}/>);
            }
            return possibleChords;
        }, [effectiveScale, enabledChords, enabledInversions, type, showAlert, showOverlay]);
    const [ inputQueue, setInputQueue ] = useState([]);

    const name = {
        'triads': dictionary.triads,
        'sevenths': dictionary.seventhchord,
        'ninths': dictionary.ninthchord,
        'elevenths': dictionary.eleventhchord,
        'thirteenths': dictionary.thirteenthchord,
        'random': dictionary.randomchord
    }[type] || '???';


    function generateChord() {
        const randomChord = possibleChords[Math.floor(Math.random() * possibleChords.length)];
        randomChord.sort((a, b) => a - b);
        setMarkedNotes([randomChord[0]]);
        setPlayedNotes([]);
        setInputQueue([randomChord[0]]);
        setGeneratedExample(randomChord);
        return [randomChord];
    }

    function convertExampleToAnswers(example) {
        let chordType = translateChordToType(example[0]);
        if (type === 'random') {
            return example;
        }

        return [chordType];
    }

    function translateChordToType(chord) {
        let diffchord = chord.map((note, index) => {
            if (index === 0) return null;
            return note - chord[index - 1];
        }).filter(interval => interval !== null);

        for (let chordType in chordTypes[type]) {
            for (let inversion in chordTypes[type][chordType]) {
                if (JSON.stringify(chordTypes[type][chordType][inversion]) === JSON.stringify(diffchord)) {
                    return { chord: chordType, inversion: parseInt(inversion)};
                }
            }
        }
        return { chord: 'unknown', inversion: 0 };
    }

    function convertInputToAnswer(input) {
        let tempInputQueue = inputQueue.includes(input) ? [...inputQueue] : [...inputQueue, input];
        setPlayedNotes([...playedNotes, input]);
        if (tempInputQueue.length === generatedExample.length) {
            setInputQueue([]);
            tempInputQueue = tempInputQueue.sort((a, b) => a - b);
            if (type === 'random') {
                return tempInputQueue;
            }
            return convertExampleToAnswers([tempInputQueue])[0];
        }
        setInputQueue(tempInputQueue);
        return;
    }

    function clearInputQueue() {
        setPlayedNotes([]);
        setInputQueue([]);
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
        inputElement={<Keyboard />}
        generateExample={generateChord}
        convertExampleToAnswers={convertExampleToAnswers}
        convertInputToAnswer={convertInputToAnswer}
        settingsComponent={settingsComponent}
        altVersion={type==='triads' ? <TriadsQuiz /> : null}
        repeat={clearInputQueue}
    />
}

export default ChordExercise;
