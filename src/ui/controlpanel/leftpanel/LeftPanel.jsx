import React from "react";

import { ResultsContext } from "../../../managers/ExerciseLayer.jsx";
import { ExerciseContext } from "../../../managers/ExerciseLayer.jsx";

import Header from "../../../components/header/Header.jsx";
import Button from "../../../components/button/Button.jsx";

import "./style.css";

function LeftPanel() {
    const { exerciseName, hasStarted, startExercise, nextExample, repeatExample, undoNote, showHint, openSettings, returnToMenu } = React.useContext(ExerciseContext);
    const { resetNotesResults, resetExamplesResults } = React.useContext(ResultsContext);

    return <div className="left-panel">
            <div className="header-container">
                <Header text={exerciseName}/>
            </div>
            <div className="buttons-panel">
                <div className="buttons-column">
                    {/* this is ALWAYS enabled, as the user should always be able to reset the exercise */}
                    <Button label="START / RESET" onClick={() => startExercise()}/>
                    <Button label="PODPOWIEDZ" onClick={() => showHint()} isEnabled={hasStarted && showHint !== undefined}/>
                    {/* this is ALWAYS enabled, as the user should always be able to exit the exercise */}
                    <Button label="WYJŚCIE" onClick={() => {returnToMenu(); resetNotesResults(); resetExamplesResults()}} />
                </div>
                <div className="buttons-column">
                    <div className="buttons-row">
                        <Button label="NASTĘPNY" onClick={() => nextExample()} isEnabled={hasStarted && nextExample !== undefined}/>
                        <Button label="POWTÓRZ" onClick={() => repeatExample()} isEnabled={hasStarted && repeatExample !== undefined}/>
                    </div>
                    <Button label="COFNIJ" onClick={() => undoNote()} isEnabled={hasStarted && undoNote !== undefined}/>
                    {/* this is NEVER enabled, as I still haven't figured what it should be used for */}
                    <Button label="USTAWIENIA" isEnabled={openSettings !== undefined} onClick={() => openSettings()}/>
                </div>
            </div>
        </div>;
}

export default LeftPanel;