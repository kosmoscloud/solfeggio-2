import React, { useContext } from 'react';

import { UIContext } from '../../../managers/UILayer.jsx';
import { LanguageContext } from '../../../managers/UILayer.jsx';

import ChordExercise from '../../../exercises/play/ChordExercise.jsx';

import Overlay from '../../overlays/Overlay.jsx';
import Grid from '../../../components/Grid.jsx';
import Button from '../../../components/Button.jsx';
import ExerciseMenu from '../exercisemenu/ExerciseMenu.jsx';

function ChordMenu() {

    const { showElement, aspectRatio } = useContext(UIContext);
    const { dictionary } = useContext(LanguageContext);

    const dimx = aspectRatio >= 1.25 ? 3 : aspectRatio < 0.8 ? 1 : 2;

    return (
        <Overlay minWidth="60%" minHeight="30%">
            <Grid dimx={dimx} dimy={2}>
                <Button label={dictionary.seventhchord} onClick={() => showElement(<ChordExercise type='sevenths' />)}/>
                <Button label={dictionary.ninthchord} onClick={() => showElement(<ChordExercise type='ninths' />)}/>
                <Button label={dictionary.eleventhchord} onClick={() => showElement(<ChordExercise type='elevenths' />)}/>
                <Button label={dictionary.back} onClick={() => showElement(<ExerciseMenu />)}/>
                <Button label={dictionary.thirteenthchord} onClick={() => showElement(<ChordExercise type='thirteenths' />)}/>
                <Button label={dictionary.randomchord} onClick={() => showElement(<ChordExercise type='random' />)}/>
            </Grid>
        </Overlay>
    )

}

export default ChordMenu;