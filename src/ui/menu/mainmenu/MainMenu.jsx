import React, { useState, useContext } from 'react';

import { UIContext } from '../../../managers/UILayer.jsx';

import ExerciseMenu from '../exercisemenu/ExerciseMenu.jsx';
import QuizMenu from '../quizmenu/QuizMenu.jsx';
import SettingsMenu from '../settingsmenu/SettingsMenu';

import Button from '../../../components/button/Button.jsx';
import Overlay from '../../overlays/Overlay.jsx';
import Text from '../../../components/text/Text.jsx';
import Table from '../../../components/table/Table.jsx';
import Column from '../../../components/table/column/Column.jsx';
import MenuOption from '../../../components/menuoption/MenuOption.jsx';

function MainMenu() {

    const { showElement } = useContext(UIContext);

    return (
        <Overlay minWidth="60%">
            <Column alignItems="center">
                <Text>Solfeggio-2</Text>
                <Table>
                    <Column width={1}>
                        <MenuOption label="ćwiczenie" onClick={() => showElement(<ExerciseMenu />)}/>
                    </Column>
                    <Column width={1}>
                        <MenuOption label="quiz" onClick={() => showElement(<QuizMenu />)}/>
                    </Column>
                    <Column width={1}>
                        <MenuOption label="ustawienia" onClick={() => showElement(<SettingsMenu />)}/>
                    </Column>
                </Table>
            </Column>
        </Overlay>
    )

}

export default MainMenu;