import React, { useContext, useMemo } from 'react';

import { UIContext, LanguageContext } from '../../../managers/UILayer.jsx';

import MainMenu from '../mainmenu/MainMenu.jsx';
import ChordMenu from '../chordmenu/ChordMenu.jsx';

import SingleNoteExercise from '../../../exercises/play/SingleNoteExercise.jsx';
import IntervalExercise from '../../../exercises/play/IntervalExercise.jsx';
import MelodyExercise from '../../../exercises/play/MelodyExercise.jsx';
import ChordExercise from '../../../exercises/play/ChordExercise.jsx';

import Overlay from '../../overlays/Overlay.jsx';
import Button from '../../../components/Button.jsx';
import Grid from '../../../components/Grid.jsx';
import GridPositioner from '../../../components/GridPositioner.jsx';

function ExerciseMenu() {

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
                <Button label={dictionary.perfectpitch} onClick={() => showElement(<SingleNoteExercise />)} enabled={false}/>
                <Button label={dictionary.interval} onClick={() => showElement(<IntervalExercise />)}/>
                <Button label={dictionary.triad} onClick={() => showElement(<ChordExercise type='triads' />)}/>
                <GridPositioner x={1} y={dimy}>
                    <Button label={dictionary.back} onClick={() => showElement(<MainMenu />)}/>
                </GridPositioner>
                <Button label={dictionary.melody} onClick={() => showElement(<MelodyExercise />)}/>
                <Button label={dictionary.chords} onClick={() => showElement(<ChordMenu />)}/>
            </Grid>
        </Overlay>
    )

}

export default ExerciseMenu;