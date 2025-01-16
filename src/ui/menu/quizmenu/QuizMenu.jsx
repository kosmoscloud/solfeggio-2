import React, { useContext, useMemo } from 'react';

import { LanguageContext, UIContext } from '../../../managers/UILayer.jsx';

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
import Grid from '../../../components/grid/Grid.jsx';

function QuizMenu() {

    const { showElement, aspectRatio } = useContext(UIContext);
    const { dictionary } = useContext(LanguageContext);

    const dimx = aspectRatio >= 1.25 ? 3 : aspectRatio <= 0.8 ? 1 : 2;

    return (
        <Overlay minWidth="60%">
            <Grid dimx={dimx}>
                    <MenuOption label={dictionary.intervals} onClick={() => showElement(<IntervalsQuiz />)}/>
                    <MenuOption label={dictionary.triads} onClick={() => showElement(<TriadsQuiz />)}/>
                    <MenuOption label={dictionary.seventhchords} onClick={() => showElement(<SeventhsQuiz />)}/>
                    <MenuOption label={dictionary.back} onClick={() => showElement(<MainMenu />)}/>
                    <MenuOption label={dictionary.triadsinversions} onClick={() => showElement(<TriadsInversionsQuiz />)}/>
                    <MenuOption label={dictionary.seventhsinversions} onClick={() => showElement(<SeventhsInversionsQuiz />)}/>
            </Grid>
        </Overlay>
    )

}

export default QuizMenu;