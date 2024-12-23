import React, { useContext } from 'react';
import './style.css';
import { MenuItem } from './menuitem/MenuItem';
import { OverlaysContext } from '../../managers/OverlaysManager';
import { ActiveExerciseContext } from '../../managers/ExercisesManager';
import About from '../overlays/about/About';
import Ranges from '../overlays/ranges/Ranges';
import MelodyLength from '../overlays/melodylength/MelodyLength';
import Triads from '../overlays/triads/Triads';
import Sevenths from '../overlays/sevenths/Sevenths';
import SingleNoteExercise from '../../exercises/SingleNoteExercise';
import MelodyExercise from '../../exercises/MelodyExercise';
import IntervalExercise from '../../exercises/IntervalExercise';
import ChordExercise from '../../exercises/ChordExercise';

function MenuBar() {
    const { showOverlay } = useContext(OverlaysContext);
    const { startExercise } = useContext(ActiveExerciseContext);
    const [ openedMenu, setOpenedMenu ] = React.useState(null);

    const menus = {
        'solfeggio-2': {
            'Ustawienia': null,
            'Pomoc': null,
            'O programie': () => showOverlay(<About/>),
        },
        'Ćwiczenia': {
            'Pojedynczy dźwięk': () => startExercise(<SingleNoteExercise />),
            'Interwał': () => startExercise(<IntervalExercise />),
            'Melodia rosnąca': () => startExercise(<MelodyExercise type='ascending'/>),
            'Melodia opadająca': () => startExercise(<MelodyExercise type='descending'/>),
            'Melodia': () => startExercise(<MelodyExercise type='random'/>),
            'Trójdźwięk': () => startExercise(<ChordExercise type='triads'/>),
            'Akord z septymą': () => startExercise(<ChordExercise type='sevenths'/>),
            'Akord z noną': null,
            'Akord z undecymą': null,
            'Akord z tercdecymą': null,
            'Akord przypadkowy': null,
        },
        'Zapytania': {
            'Interwały': null,
            'Rodzaje trójdźwięków': null,
            'Rodzaje akordów z septymą': null,
            'Przewroty trójdźwięków': null,
            'Przewroty trójdźwięków z septymą': null,
        },
        'Ustawienia': {
            'Zakres i skala muzyczna': () => showOverlay(<Ranges/>),
            'Długość melodii': () => showOverlay(<MelodyLength/>),
            '--': null,
            'Trójdźwięki': () => showOverlay(<Triads/>),
            'Akordy z septymą': () => showOverlay(<Sevenths/>),
            'Akordy z noną': null,
            'Akordy z undecymą': null,
            'Akordy z tercdecymą': null,
            'Akordy przypadkowe': null
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
