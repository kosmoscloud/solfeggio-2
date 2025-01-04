import React from "react";
import "./style.css";
import Header from "../../header/Header.jsx";
import Button from "../../button/Button.jsx";
import { ExerciseContext } from "../../../managers/ExercisesManager";
import { ExerciseManager } from "../../../managers/ExercisesManager";
import { ResultsContext } from "../../../managers/ExercisesManager";
import SettingsIcon from "../../../assets/gear.png";

function LeftPanel() {
    const { exerciseName, startExercise, nextExample, repeatExample, undoNote, showHint, enabledComponents, openSettings } = React.useContext(ExerciseContext);
    const { stopExercise } = React.useContext(ExerciseManager);
    const { resetNotesResults, resetExamplesResults } = React.useContext(ResultsContext);

    return <div className="left-panel">
            <div className="header-container">
                <Header text={exerciseName}/>
                <div className="header-container-button">                
                    <Button icon={SettingsIcon} isEnabled={openSettings !== undefined} shadow={false} onClick={() => openSettings()}/>
                </div>
            </div>
            <div className="buttons-panel">
                <div className="buttons-column">
                    {/* this is ALWAYS enabled, as the user should always be able to reset the exercise */}
                    <Button label="START / RESET" onClick={() => startExercise()}/>
                    {/* this is NEVER enabled, as I still haven't figured what it was used for */}
                    <Button label="KONTYNUUJ" isEnabled={false}/>
                    {/* this is ALWAYS enabled, as the user should always be able to exit the exercise */}
                    <Button label="WYJŚCIE" onClick={() => {stopExercise(); resetNotesResults(); resetExamplesResults()}}/>
                </div>
                <div className="buttons-column">
                    <div className="buttons-row">
                        <Button label="NASTĘPNY" onClick={() => nextExample()} isEnabled={enabledComponents.includes('next')}/>
                        <Button label="POWTÓRZ" onClick={() => repeatExample()} isEnabled={enabledComponents.includes('repeat')}/>
                    </div>
                    <Button label="COFNIJ" onClick={() => undoNote()} isEnabled={enabledComponents.includes('undo')}/>
                    <Button label="PODPOWIEDZ" onClick={() => showHint()} isEnabled={enabledComponents.includes('hint')}/>
                </div>
            </div>
        </div>;
}

export default LeftPanel;