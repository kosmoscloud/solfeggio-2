import React from "react";
import "./style.css";
import { ExerciseContext } from "../../../../managers/ExercisesManager";
import { ActiveExerciseContext } from "../../../../managers/ExercisesManager";

function PanelButton(props) {

    const { enabledComponents, startExercise, nextExample, repeatExample } = React.useContext(ExerciseContext);
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
            case "exit":
                stopExercise();
                break;
            default:
                break;
        }
    }

    return (
        <div className={"box"+props.number}>
            <div className={enabledComponents.includes(props.buttonid) ? "panel-button" : "disabled-panel-button"} key={props.buttonid} onClick={onClick}>{props.text}</div>
        </div>
    );
}

export default PanelButton;
