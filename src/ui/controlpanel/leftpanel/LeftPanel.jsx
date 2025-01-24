import React from "react";

import { ResultsContext } from "../../../managers/ExerciseLayer.jsx";
import { ExerciseContext } from "../../../managers/ExerciseLayer.jsx";
import { LanguageContext } from "../../../managers/UILayer.jsx";

import Button from "../../../components/button/Button.jsx";

import "./style.css";

function LeftPanel() {
    const { hasStarted, startExercise, nextExample, repeatExample, undoNote, showHint, openSettings, returnToMenu } = React.useContext(ExerciseContext);
    const { resetNotesResults, resetExamplesResults } = React.useContext(ResultsContext);
    const { dictionary } = React.useContext(LanguageContext);

    return <div className="left-panel">
            <div className="buttons-panel">
                <div className="buttons-column">
                    {/* this is ALWAYS enabled, as the user should always be able to reset the exercise */}
                    <Button label={dictionary.startreset.toUpperCase()} onClick={() => startExercise()}/>
                    <Button label={dictionary.hint.toUpperCase()} onClick={() => showHint()} isEnabled={hasStarted && showHint !== undefined}/>
                    {/* this is ALWAYS enabled, as the user should always be able to exit the exercise */}
                    <Button label={dictionary.exit.toUpperCase()} onClick={() => {returnToMenu(); resetNotesResults(); resetExamplesResults()}} />
                </div>
                <div className="buttons-column">
                    <div className="buttons-row">
                        <Button label={dictionary.next.toUpperCase()} onClick={() => nextExample()} isEnabled={hasStarted && nextExample !== undefined}/>
                        <Button label={dictionary.repeat.toUpperCase()} onClick={() => repeatExample()} isEnabled={hasStarted && repeatExample !== undefined}/>
                    </div>
                    <Button label={dictionary.undo.toUpperCase()} onClick={() => undoNote()} isEnabled={hasStarted && undoNote !== undefined}/>
                    {/* this is NEVER enabled, as I still haven't figured what it should be used for */}
                    <Button label={dictionary.settings.toUpperCase()} isEnabled={openSettings !== undefined} onClick={() => openSettings()}/>
                </div>
            </div>
        </div>;
}

export default LeftPanel;