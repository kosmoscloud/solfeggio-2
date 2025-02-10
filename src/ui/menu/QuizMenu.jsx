import React, { useContext, useMemo } from 'react';

import { LanguageContext, UIContext } from '../../layers/UILayer.jsx';

import MainMenu from './MainMenu.jsx';

import IntervalsQuiz from '../../exercises/choose/IntervalsQuiz.jsx';
import TriadsQuiz from '../../exercises/choose/TriadsQuiz.jsx';
import TriadsInversionsQuiz from '../../exercises/choose/TriadsInversionsQuiz.jsx';
import SeventhsQuiz from '../../exercises/choose/SeventhsQuiz.jsx';
import SeventhsInversionsQuiz from '../../exercises/choose/SeventhsInversionsQuiz.jsx';

import Button from '../../components/Button.jsx';
import Overlay from '../overlays/Overlay.jsx';
import Grid from '../../components/Grid.jsx';
import GridPositioner from '../../components/GridPositioner.jsx';

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
        <Overlay minWidth="60%" minHeight="30%">
            <Grid dimx={dimx} dimy={dimy}>
                    <Button label={dictionary.intervals} onClick={() => showElement(<IntervalsQuiz />)}/>
                    <Button label={dictionary.triads} onClick={() => showElement(<TriadsQuiz />)}/>
                    <Button label={dictionary.seventhchords} onClick={() => showElement(<SeventhsQuiz />)}/>
                    <GridPositioner x={1} y={dimy}>
                        <Button label={dictionary.back} onClick={() => showElement(<MainMenu />)}/>
                    </GridPositioner>
                    <Button label={dictionary.triadsinversions} onClick={() => showElement(<TriadsInversionsQuiz />)}/>
                    <Button label={dictionary.seventhsinversions} onClick={() => showElement(<SeventhsInversionsQuiz />)}/>
            </Grid>
        </Overlay>
    )

}

export default QuizMenu;