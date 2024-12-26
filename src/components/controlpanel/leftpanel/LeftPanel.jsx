import React from "react";
import "./style.css";
import Header from "../../header/Header.jsx";
import Button from "../../button/Button.jsx";
import { ExerciseContext } from "../../../managers/ExercisesManager";
import { ExerciseManager } from "../../../managers/ExercisesManager";

function LeftPanel() {
    const { exerciseName, startExercise, nextExample, repeatExample, undoNote, showHint, enabledComponents } = React.useContext(ExerciseContext);
    const { stopExercise } = React.useContext(ExerciseManager);

    return <div className="left-panel">
            <div className="header-container">
                <Header text={"Ćwiczenie: "+exerciseName}/>
            </div>
            <div className="buttons-panel">
                <div className="buttons-column">
                    <Button label="START / RESET" onClick={() => startExercise()} isEnabled={enabledComponents.includes('startreset')}/>
                    <Button label="KONTYNUUJ" isEnabled={enabledComponents.includes('continue')}/>
                    <Button label="WYJŚCIE" onClick={() => stopExercise()} isEnabled={enabledComponents.includes('exit')}/>
                </div>
                <div className="buttons-column">
                    <div className="buttons-row">
                        <Button label="NASTĘPNY" onClick={() => nextExample()} isEnabled={enabledComponents.includes('next')}/>
                        <Button label="POWTÓRZ" onClick={() => repeatExample()} isEnabled={enabledComponents.includes('repeat')}/>
                    </div>
                    <Button label="COFNIJ NUTĘ" onClick={() => undoNote()} isEnabled={enabledComponents.includes('undo')}/>
                    <Button label="PODPOWIEDZ" onClick={() => showHint()} isEnabled={enabledComponents.includes('hint')}/>
                </div>
            </div>
        </div>;
}

export default LeftPanel;