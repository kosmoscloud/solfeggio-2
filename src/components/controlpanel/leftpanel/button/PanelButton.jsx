import React from "react";
import "./style.css";
import { ExerciseContext } from "../../../../managers/ExercisesManager";
import { ActiveExerciseContext } from "../../../../managers/ExercisesManager";

function PanelButton(props) {

    const { enabledComponents, startExercise, nextExample, repeatExample, undoNote, showHint } = React.useContext(ExerciseContext);
    const { stopExercise } = React.useContext(ActiveExerciseContext);

    const onClick = () => {
        switch(props.buttonid) {
            case "startreset":
                startExercise();
                break;
            case "next":
                nextExample();
                break;
            case "repeat":
                repeatExample();
                break;
            case "undo":
                undoNote();
                break;
            case "hint":
                showHint();
                break;
            case "exit":
                stopExercise();
                break;
            default:
                break;
        }
    }

    return (
        <div className={enabledComponents.includes(props.buttonid) ? "panel-button" : "disabled-panel-button"} key={props.buttonid} onClick={onClick}>{props.text}</div>
    );
}

export default PanelButton;
