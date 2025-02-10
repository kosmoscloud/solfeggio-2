import React, { useContext } from 'react';

import { UIContext, LanguageContext } from '../../layers/UILayer.jsx';

import ExerciseMenu from './ExerciseMenu.jsx';
import QuizMenu from './QuizMenu.jsx';
import SettingsMenu from './SettingsMenu.jsx';

import Overlay from '../overlays/Overlay.jsx';
import Text from '../../components/Text.jsx';
import Title from '../../components/Title.jsx';
import Button from '../../components/Button.jsx';
import Grid from '../../components/Grid.jsx';
import FlexContainer from '../../components/FlexContainer.jsx';
import LanguageSelector from '../languageselector/LanguageSelector.jsx';

function MainMenu() {

    const { showElement } = useContext(UIContext);
    const { dictionary } = useContext(LanguageContext);

    return (
        <Overlay minWidth="50%" minHeight="40%">
            <FlexContainer gap={2}>
                <FlexContainer length={1} alignItems="center">
                    <Title>Solfeggio-2</Title>
                    <Text>alpha-1</Text>
                </FlexContainer>
                <LanguageSelector />
                <Grid dimx={3} dimy={1} padding={false}>
                    <Button label={dictionary.exercises} onClick={() => showElement(<ExerciseMenu />)}/>
                    <Button label={dictionary.quizzes} onClick={() => showElement(<QuizMenu />)}/>
                    <Button label={dictionary.settings} onClick={() => showElement(<SettingsMenu />)}/>
                </Grid>
            </FlexContainer>
        </Overlay>
    )

}

export default MainMenu;