import React, { useContext } from 'react';

import { UIContext } from '../../../managers/UILayer.jsx';

import MainMenu from '../mainmenu/MainMenu.jsx';
import ChordMenu from '../chordmenu/ChordMenu.jsx';

import SingleNoteExercise from '../../../exercises/play/SingleNoteExercise.jsx';
import IntervalExercise from '../../../exercises/play/IntervalExercise.jsx';
import MelodyExercise from '../../../exercises/play/MelodyExercise.jsx';
import ChordExercise from '../../../exercises/play/ChordExercise.jsx';

import Overlay from '../../overlays/Overlay.jsx';
import Table from '../../../components/table/Table.jsx';
import Column from '../../../components/table/column/Column.jsx';
import MenuOption from '../../../components/menuoption/MenuOption.jsx';

function ExerciseMenu() {

    const { showElement } = useContext(UIContext);

    return (
        <Overlay minWidth="60%" minHeight="60%">
            <Column alignItems="center">
                <Table>
                    <Column>
                        <MenuOption label="słuch absolutny" onClick={() => showElement(<SingleNoteExercise />)}/>
                        <MenuOption label="powrót" onClick={() => showElement(<MainMenu />)}/>
                    </Column>
                    <Column>
                        <MenuOption label="interwał" onClick={() => showElement(<IntervalExercise />)}/>
                        <MenuOption label="melodia" onClick={() => showElement(<MelodyExercise />)}/>
                    </Column>
                    <Column>
                        <MenuOption label="trójdźwięk" onClick={() => showElement(<ChordExercise type='triads' />)}/>
                        <MenuOption label="wielodźwięki" onClick={() => showElement(<ChordMenu />)}/>
                    </Column>
                </Table>
            </Column>
        </Overlay>
    )

}

export default ExerciseMenu;