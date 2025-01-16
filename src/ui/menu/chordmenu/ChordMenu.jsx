import React, { useContext } from 'react';

import { UIContext } from '../../../managers/UILayer.jsx';
import { LanguageContext } from '../../../managers/UILayer.jsx';

import ChordExercise from '../../../exercises/play/ChordExercise.jsx';

import Overlay from '../../overlays/Overlay.jsx';
import Grid from '../../../components/grid/Grid.jsx';
import MenuOption from '../../../components/menuoption/MenuOption.jsx';
import ExerciseMenu from '../exercisemenu/ExerciseMenu.jsx';

function ChordMenu() {

    const { showElement, aspectRatio } = useContext(UIContext);
    const { dictionary } = useContext(LanguageContext);

    const dimx = aspectRatio >= 1.25 ? 3 : aspectRatio < 0.8 ? 1 : 2;

    return (
        <Overlay minWidth="60%" minHeight="60%">
            <Grid dimx={dimx}>
                <MenuOption label={dictionary.seventhchord} onClick={() => showElement(<ChordExercise type='seventh' />)}/>
                <MenuOption label={dictionary.ninthchord} onClick={() => showElement(<ChordExercise type='ninths' />)}/>
                <MenuOption label={dictionary.eleventhchord} onClick={() => showElement(<ChordExercise type='elevenths' />)}/>
                <MenuOption label={dictionary.back} onClick={() => showElement(<ExerciseMenu />)}/>
                <MenuOption label={dictionary.thirteenthchord} onClick={() => showElement(<ChordExercise type='thirteenths' />)}/>
                <MenuOption label={dictionary.randomchord} onClick={() => showElement(<ChordExercise type='random' />)}/>
            </Grid>
        </Overlay>
    )

}

export default ChordMenu;