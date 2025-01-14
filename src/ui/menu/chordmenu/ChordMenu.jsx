import React, { useContext } from 'react';

import { UIContext } from '../../../managers/UILayer.jsx';

import MainMenu from '../mainmenu/MainMenu.jsx';

import SingleNoteExercise from '../../../exercises/play/SingleNoteExercise.jsx';
import IntervalExercise from '../../../exercises/play/IntervalExercise.jsx';
import MelodyExercise from '../../../exercises/play/MelodyExercise.jsx';
import ChordExercise from '../../../exercises/play/ChordExercise.jsx';

import Overlay from '../../overlays/Overlay.jsx';
import Table from '../../../components/table/Table.jsx';
import Column from '../../../components/table/column/Column.jsx';
import MenuOption from '../../../components/menuoption/MenuOption.jsx';
import ExerciseMenu from '../exercisemenu/ExerciseMenu.jsx';

function ChordMenu() {

    const { showElement } = useContext(UIContext);

    return (
        <Overlay minWidth="60%" minHeight="60%">
            <Column alignItems="center">
                <Table>
                    <Column>
                        <MenuOption label="akord z septymą" onClick={() => showElement(<SingleNoteExercise />)}/>
                        <MenuOption label="powrót" onClick={() => showElement(<ExerciseMenu />)}/>
                    </Column>
                    <Column>
                        <MenuOption label="akord z noną" onClick={() => showElement(<ChordExercise type='ninths' />)}/>
                        <MenuOption label="akord z undecymą" onClick={() => showElement(<ChordExercise type='elevenths' />)}/>
                    </Column>
                    <Column>
                        <MenuOption label="akord z tercdecymą" onClick={() => showElement(<ChordExercise type='thirteenths' />)}/>
                        <MenuOption label="akord przypadkowy" onClick={() => showElement(<ChordExercise type='random' />)}/>
                    </Column>
                </Table>
            </Column>
        </Overlay>
    )

}

export default ChordMenu;