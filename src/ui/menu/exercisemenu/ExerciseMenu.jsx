import React, { useContext, useMemo } from 'react';

import { UIContext, LanguageContext } from '../../../managers/UILayer.jsx';

import MainMenu from '../mainmenu/MainMenu.jsx';
import ChordMenu from '../chordmenu/ChordMenu.jsx';

import SingleNoteExercise from '../../../exercises/play/SingleNoteExercise.jsx';
import IntervalExercise from '../../../exercises/play/IntervalExercise.jsx';
import MelodyExercise from '../../../exercises/play/MelodyExercise.jsx';
import ChordExercise from '../../../exercises/play/ChordExercise.jsx';

import Overlay from '../../overlays/Overlay.jsx';
import MenuOption from '../../../components/menuoption/MenuOption.jsx';
import Grid from '../../../components/grid/Grid.jsx';

function ExerciseMenu() {

    const { showElement, aspectRatio } = useContext(UIContext);
    const { dictionary } = useContext(LanguageContext);

    const dimx = aspectRatio >= 1.25 ? 3 : aspectRatio <= 0.8 ? 1 : 2;

    return (
        <Overlay minWidth="60%">
            <Grid dimx={dimx}>
                <MenuOption label={dictionary.perfectpitch} onClick={() => showElement(<SingleNoteExercise />)}/>
                <MenuOption label={dictionary.interval} onClick={() => showElement(<IntervalExercise />)}/>
                <MenuOption label={dictionary.triad} onClick={() => showElement(<ChordExercise type='triads' />)}/>
                <MenuOption label={dictionary.back} onClick={() => showElement(<MainMenu />)}/>
                <MenuOption label={dictionary.melody} onClick={() => showElement(<MelodyExercise />)}/>
                <MenuOption label={dictionary.chords} onClick={() => showElement(<ChordMenu />)}/>
            </Grid>
        </Overlay>
    )

}

export default ExerciseMenu;