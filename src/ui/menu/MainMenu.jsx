import { useContext } from 'react';

import { UIContext, LanguageContext } from '../../layers/UILayer.jsx';

import IntervalsQuiz from '../../exercises/choose/IntervalsQuiz.jsx';
import TriadsQuiz from '../../exercises/choose/TriadsQuiz.jsx';

import ChordMenu from './ChordMenu.jsx';
import Ranges from '../overlays/Ranges.jsx';

import Overlay from '../overlays/Overlay.jsx';
import Text from '../../components/Text.jsx';
import Title from '../../components/Title.jsx';
import Button from '../../components/Button.jsx';
import Grid from '../../components/Grid.jsx';
import FlexContainer from '../../components/FlexContainer.jsx';
import LanguageSelector from '../languageselector/LanguageSelector.jsx';
import MelodyExercise from '../../exercises/play/MelodyExercise.jsx';
import PerfectPitchExercise from '../../exercises/play/PerfectPitchExercise.jsx';
import ColorChooser from '../colorchooser/ColorChooser.jsx';


function MainMenu() {

    const { showElement, styleSheets } = useContext(UIContext);
    const { dictionary } = useContext(LanguageContext);

    return (
        <div>
        <Overlay minWidth="60%" minHeight="50%">
            <FlexContainer gap={2}>
                <FlexContainer length={1} alignItems="center">
                    <Title>Solfeggio-2</Title>
                    <Text>v0.0.1</Text>
                </FlexContainer>
                <LanguageSelector />
                <FlexContainer length={3}>
                    <Grid dimx={3} dimy={2} padding={false}>
                        <Button label={dictionary.intervals} onClick={() => showElement(<IntervalsQuiz />)}/>
                        <Button label={dictionary.triads} onClick={() => showElement(<TriadsQuiz />)}/>
                        <Button label={dictionary.chords} onClick={() => showElement(<ChordMenu />)}/>
                        <Button label={dictionary.melody} onClick={() => showElement(<MelodyExercise />)}/>
                        <Button label={dictionary.perfectpitch} onClick={() => showElement(<PerfectPitchExercise />)}/>
                        <Button label={dictionary.rangeandscale} onClick={() => showElement(<Ranges />)}/>
                    </Grid>
                </FlexContainer>
            </FlexContainer>
        </Overlay>
        <ColorChooser styleSheets={styleSheets} />
        </div>
    )

}

export default MainMenu;