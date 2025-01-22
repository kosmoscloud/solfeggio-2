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
import Grid from '../../../components/grid/Grid.jsx';
import GridPositioner from '../../../components/grid/gridpositioner/GridPositioner.jsx';

function QuizMenu() {

    const { showElement, aspectRatio } = useContext(UIContext);
    const { dictionary } = useContext(LanguageContext);

    const dimensions = useMemo(() => {
        const dimx = aspectRatio >= 1.25 ? 3 : aspectRatio <= 0.8 ? 1 : 2;
        const dimy = aspectRatio >= 1.25 ? 2 : aspectRatio <= 0.8 ? 6 : 3;
        return { dimx, dimy };
    }, [aspectRatio]);

    const { dimx, dimy } = dimensions;

    return (
        <Overlay minWidth="60%">
            <Grid dimx={dimx} dimy={dimy}>
                    <MenuOption label={dictionary.intervals} onClick={() => showElement(<IntervalsQuiz />)}/>
                    <MenuOption label={dictionary.triads} onClick={() => showElement(<TriadsQuiz />)}/>
                    <MenuOption label={dictionary.seventhchords} onClick={() => showElement(<SeventhsQuiz />)}/>
                    <GridPositioner x={1} y={dimy}>
                        <MenuOption label={dictionary.back} onClick={() => showElement(<MainMenu />)}/>
                    </GridPositioner>
                    <MenuOption label={dictionary.triadsinversions} onClick={() => showElement(<TriadsInversionsQuiz />)}/>
                    <MenuOption label={dictionary.seventhsinversions} onClick={() => showElement(<SeventhsInversionsQuiz />)}/>
            </Grid>
        </Overlay>
    )

}

export default QuizMenu;