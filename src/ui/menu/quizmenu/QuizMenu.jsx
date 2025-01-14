import React, { useContext } from 'react';

import { UIContext } from '../../../managers/UILayer.jsx';

import MainMenu from '../mainmenu/MainMenu.jsx';

import IntervalsQuiz from '../../../exercises/choose/IntervalsQuiz.jsx';
import TriadsQuiz from '../../../exercises/choose/TriadsQuiz.jsx';
import TriadsInversionsQuiz from '../../../exercises/choose/TriadsInversionsQuiz.jsx';
import SeventhsQuiz from '../../../exercises/choose/SeventhsQuiz.jsx';
import SeventhsInversionsQuiz from '../../../exercises/choose/SeventhsInversionsQuiz.jsx';

import MenuOption from '../../../components/menuoption/MenuOption.jsx';
import Overlay from '../../overlays/Overlay.jsx';
import Table from '../../../components/table/Table.jsx';
import Column from '../../../components/table/column/Column.jsx';

function QuizMenu() {

    const { showElement } = useContext(UIContext);

    return (
        <Overlay minWidth="60%">
            <Column alignItems="center">
                <Table>
                    <Column>
                        <MenuOption label="interwały" onClick={() => showElement(<IntervalsQuiz />)}/>
                        <MenuOption label="powrót" onClick={() => showElement(<MainMenu />)}/>
                    </Column>
                    <Column>
                        <MenuOption label="trójdźwięki" onClick={() => showElement(<TriadsQuiz />)}/>
                        <MenuOption label="przewroty trójdźwieków" onClick={() => showElement(<TriadsInversionsQuiz />)}/>
                    </Column>
                    <Column>
                        <MenuOption label="trójdźwięki z septymą" onClick={() => showElement(<SeventhsQuiz />)}/>
                        <MenuOption label="przewroty trójdźwieków z septymą" onClick={() => showElement(<SeventhsInversionsQuiz />)}/>
                    </Column>
                </Table>
            </Column>
        </Overlay>
    )

}

export default QuizMenu;