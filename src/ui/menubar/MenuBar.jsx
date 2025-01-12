import React, { useContext } from 'react';

import { MenuItem } from './menuitem/MenuItem';
import { OverlaysContext } from '../../managers/OverlaysManager';
import { ExerciseManager } from '../../managers/ExercisesManager';

import About from '../overlays/About';
import Ranges from '../overlays/Ranges';
import SelectInstruments from '../overlays/SelectInstruments';
import AudioMIDISettings from '../overlays/AudioMIDISettings';

import IntervalsQuiz from '../../exercises/choose/IntervalsQuiz';
import TriadsQuiz from '../../exercises/choose/TriadsQuiz';
import SeventhsQuiz from '../../exercises/choose/SeventhsQuiz';
import TriadsInversionsQuiz from '../../exercises/choose/TriadsInversionsQuiz';
import SeventhsInversionsQuiz from '../../exercises/choose/SeventhsInversionsQuiz';

import SingleNoteExercise from '../../exercises/play/SingleNoteExercise';
import IntervalExercise from '../../exercises/play/IntervalExercise';
import MelodyExercise from '../../exercises/play/MelodyExercise';
import ChordExercise from '../../exercises/play/ChordExercise';

import './style.css';

function MenuBar() {
    const { showOverlay } = useContext(OverlaysContext);
    const { startExercise } = useContext(ExerciseManager);
    const [ openedMenu, setOpenedMenu ] = React.useState(null);

    const menus = {
        'S2': {
            'O programie': () => showOverlay(<About/>),
        },
        'Ustawienia': {
            'Zakres i skala muzyczna': () => showOverlay(<Ranges/>),
            'Instrumenty': () => showOverlay(<SelectInstruments/>),
            'Audio/MIDI': () => showOverlay(<AudioMIDISettings/>),
        },
        'Quizy': {
            'Interwały': () => startExercise(<IntervalsQuiz />),
            'Rodzaje trójdźwięków': () => startExercise(<TriadsQuiz />),
            'Rodzaje akordów z septymą': () => startExercise(<SeventhsQuiz />),
            'Przewroty trójdźwięków': () => startExercise(<TriadsInversionsQuiz />),
            'Przewroty trójdźwięków z septymą': () => startExercise(<SeventhsInversionsQuiz />),
        },
        'Ćwiczenia': {
            'Pojedynczy dźwięk': () => startExercise(<SingleNoteExercise />),
            'Interwał': () => startExercise(<IntervalExercise />),
            'Melodia': () => startExercise(<MelodyExercise />),
            'Trójdźwięk': () => startExercise(<ChordExercise type='triads'/>),
            'Akord z septymą': () => startExercise(<ChordExercise type='sevenths'/>),
            'Akord z noną': () => startExercise(<ChordExercise type='ninths'/>),
            'Akord z undecymą': () => startExercise(<ChordExercise type='elevenths'/>),
            'Akord z tercdecymą': () => startExercise(<ChordExercise type='thirteenths'/>),
            'Akord przypadkowy': () => startExercise(<ChordExercise type='random'/>),
        },
    };

    const updateOpenedMenu = (menuName) => {
        if (openedMenu === menuName) {
            setOpenedMenu(null);
        } else {
            setOpenedMenu(menuName);
        }
    }

    return (
        <div className="menu-bar">
            {Object.keys(menus).map((menuName) =>
                <div className="menu-container" key={menuName}>
                    <p
                        className={openedMenu === menuName ? 'opened-menu' : 'closed-menu'}
                        onClick={() => {
                            updateOpenedMenu(menuName);
                        }}
                    >
                        {menuName}
                    </p>
                    {openedMenu === menuName && (
                        <div className="menu-list">
                            {Object.keys(menus[menuName]).map((menuItemName) => {
                                return <MenuItem key={menuItemName} name={menuItemName} onClick={() => {
                                    if (menus[menuName][menuItemName] !== null) {
                                        menus[menuName][menuItemName]();
                                    }
                                    setOpenedMenu(null);
                                }} />
                            }
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );

}

export default MenuBar;
