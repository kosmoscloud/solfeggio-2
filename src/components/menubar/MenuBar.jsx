import React, { useContext } from 'react';
import './style.css';
import { MenuItem } from './menuitem/MenuItem';
import { VisibilityContext } from '../../managers/VisibilityManager';
import { ActiveExerciseContext } from '../../managers/ExercisesManager';

function MenuBar({isOpen}) {
    const { showComponent } = useContext(VisibilityContext);
    const { startExercise } = useContext(ActiveExerciseContext);
    const [visible, setVisible] = React.useState(isOpen);
    const [openedMenu, setOpenedMenu] = React.useState(null);

    React.useEffect(() => {
        setVisible(isOpen);
    }, [isOpen]);

    const menus = {
        'Pliki': {
            'Załaduj konfigurację': null,
            'Zapisz konfigurację': null,
        },
        'Ćwiczenia': {
            'Pojedynczy dźwięk': () => startExercise('SingleNote'),
            'Interwał': null,
            'Melodia rosnąca': null,
            'Melodia': null,
            'Trójdźwięk': null,
            'Akord z septymą': null,
            'Akord z noną': null,
            'Akord z undecymą': null,
            'Akord przypadkowy': null,
        },
        'Zapytania': {
            'Interwały': null,
            'Rodzaje trójdźwięków': null,
            'Rodzaje akordów z septymą': null,
            'Przewroty trójdźwięków': null,
            'Przewroty trójdźwięków z septymą': null,
        },
        'Zakresy': {
            'Ustaw zakres': null
        },
        'Opcje': {
            'Ustawienia': null,
            'Pomoc': null,
            'O programie': () => showComponent('About')
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
