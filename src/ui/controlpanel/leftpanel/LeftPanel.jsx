import React, { useContext } from "react";

import { ResultsContext } from "../../../layers/ExerciseLayer.jsx";
import { ExerciseContext } from "../../../layers/ExerciseLayer.jsx";
import { LanguageContext } from "../../../layers/UILayer.jsx";
import { UIContext } from "../../../layers/UILayer.jsx";

import MainMenu from "../../menu/MainMenu.jsx";

import Button from "../../../components/Button.jsx";
import Grid from "../../../components/Grid.jsx";
import FlexContainer from "../../../components/FlexContainer.jsx";
import Results from "../../results/Results.jsx";

import "./style.css";

function LeftPanel() {
    const { hasStarted, startExercise, nextExample, repeatExample, showHint, openSettings } = useContext(ExerciseContext);
    const { showElement } = useContext(UIContext)
    const { resetNotesResults, resetExamplesResults } = useContext(ResultsContext);
    const { dictionary } = useContext(LanguageContext);

    return <div className="left-panel">
            <Grid dimx={2} dimy={3}>
                <Button label={dictionary.startreset.toUpperCase()} onClick={() => startExercise()}/>
                <FlexContainer direction='row' padding={false} gap={2}>
                    <Button label={dictionary.next.toUpperCase()} onClick={() => nextExample()} isEnabled={hasStarted && nextExample !== undefined}/>
                    <Button label={dictionary.repeat.toUpperCase()} onClick={() => repeatExample()} isEnabled={hasStarted && repeatExample !== undefined}/>
                </FlexContainer>
                <Button label={dictionary.hint.toUpperCase()} onClick={() => showHint()} isEnabled={hasStarted && showHint !== undefined}/>
                <Button>
                    <Results/>
                </Button>
                <Button label={dictionary.mainmenu.toUpperCase()} onClick={() => {resetNotesResults(); resetExamplesResults(); showElement(<MainMenu/>)}} />
                <Button label={dictionary.settings.toUpperCase()} isEnabled={openSettings !== undefined} onClick={() => openSettings()}/>
            </Grid>
        </div>;
}

export default LeftPanel;