import React, { useContext } from 'react';
import './style.css';
import { MenuItem } from './menuitem/MenuItem';
import { OverlaysContext } from '../../managers/OverlaysManager';
import { ExerciseManager } from '../../managers/ExercisesManager';
import About from '../../overlays/about/About';
import Ranges from '../../overlays/ranges/Ranges';
import SingleNoteExercise from '../../exercises/SingleNoteExercise';
import MelodyExercise from '../../exercises/MelodyExercise';
import IntervalExercise from '../../exercises/IntervalExercise';
import ChordExercise from '../../exercises/ChordExercise';
import IntervalsQuiz from '../../quizzes/IntervalsQuiz';
import TriadsQuiz from '../../quizzes/TriadsQuiz';
import SeventhsQuiz from '../../quizzes/SeventhsQuiz';
import TriadsInversionsQuiz from '../../quizzes/TriadsInversionsQuiz';
import SeventhsInversionsQuiz from '../../quizzes/SeventhsInversionsQuiz';

function MenuBar() {
    const { showOverlay } = useContext(OverlaysContext);
    const { startExercise } = useContext(ExerciseManager);
    const [ openedMenu, setOpenedMenu ] = React.useState(null);

    const menus = {
        'S2': {
            'Ustawienia': null,
            'Pomoc': null,
            'O programie': () => showOverlay(<About/>),
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
        'Zapytania': {
            'Interwały': () => startExercise(<IntervalsQuiz />),
            'Rodzaje trójdźwięków': () => startExercise(<TriadsQuiz />),
            'Rodzaje akordów z septymą': () => startExercise(<SeventhsQuiz />),
            'Przewroty trójdźwięków': () => startExercise(<TriadsInversionsQuiz />),
            'Przewroty trójdźwięków z septymą': () => startExercise(<SeventhsInversionsQuiz />),
        },
        'Ustawienia': {
            'Zakres i skala muzyczna': () => showOverlay(<Ranges/>),
        }
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
