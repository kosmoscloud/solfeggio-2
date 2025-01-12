import React from "react";
import "./style.css";
import Header from "../../../components/header/Header.jsx";
import Button from "../../../components/button/Button.jsx";
import { ExerciseContext } from "../../../managers/ExercisesManager";
import { ExerciseManager } from "../../../managers/ExercisesManager";
import { ResultsContext } from "../../../managers/ExercisesManager";
import SettingsIcon from "../../../assets/gear.png";

function LeftPanel() {
    const { exerciseName, hasStarted, startExercise, nextExample, repeatExample, undoNote, showHint, enabledComponents, openSettings } = React.useContext(ExerciseContext);
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
                    {/* this is NEVER enabled, as I still haven't figured what it should be used for */}
                    <Button label="KONTYNUUJ" isEnabled={false}/>
                    {/* this is ALWAYS enabled, as the user should always be able to exit the exercise */}
                    <Button label="WYJŚCIE" onClick={() => {stopExercise(); resetNotesResults(); resetExamplesResults()}} isEnabled={hasStarted}/>
                </div>
                <div className="buttons-column">
                    <div className="buttons-row">
                        <Button label="NASTĘPNY" onClick={() => nextExample()} isEnabled={hasStarted && nextExample !== undefined}/>
                        <Button label="POWTÓRZ" onClick={() => repeatExample()} isEnabled={hasStarted && repeatExample !== undefined}/>
                    </div>
                    <Button label="COFNIJ" onClick={() => undoNote()} isEnabled={hasStarted && undoNote !== undefined}/>
                    <Button label="PODPOWIEDZ" onClick={() => showHint()} isEnabled={hasStarted && showHint !== undefined}/>
                </div>
            </div>
        </div>;
}

export default LeftPanel;