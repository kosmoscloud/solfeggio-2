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
        <Overlay minWidth="50%" minHeight="20%">
            <FlexContainer>
                <FlexContainer direction='row'>
                    <FlexContainer length={3} alignItems="flex-start">
                        <Title>Solfeggio-2</Title>
                        <Text>alpha</Text>
                    </FlexContainer>
                    <LanguageSelector />
                </FlexContainer>
                <Grid dimx={3} dimy={1}>
                    <Button label={dictionary.exercises} onClick={() => showElement(<ExerciseMenu />)}/>
                    <Button label={dictionary.quizzes} onClick={() => showElement(<QuizMenu />)}/>
                    <Button label={dictionary.settings} onClick={() => showElement(<SettingsMenu />)}/>
                </Grid>
            </FlexContainer>
        </Overlay>
    )

}

export default MainMenu;