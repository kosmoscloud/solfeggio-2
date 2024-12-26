import React, { useContext } from "react";
import "./style.css";
import Slider from "../../slider/Slider.jsx";
import Timer from "./timer/Timer.jsx";
import Results from "./results/Results.jsx"
import Alarm from "./alarm/Alarm.jsx";
import { ExerciseContext } from "../../../managers/ExercisesManager";

function RightPanel() {
    const { enabledComponents, setNoteSpacing, setNoteLength } = useContext(ExerciseContext);

    return (
        <div className="rightPanel">
            <div className="results-sliders-column">
                <div className="alarm-results-row">
                    <div className="alarm-flex">
                        <Alarm />
                    </div>
                    <div className="results-flex">
                        <Results />
                    </div>
                </div>
                <div className="slider-column">
                    <Slider text="ODSTĘP" enabled={enabledComponents.includes('notespacing')} onChange={setNoteSpacing} />
                    <Slider text="DŁUGOŚĆ DŹWIĘKU" enabled={enabledComponents.includes('notelength')} onChange={setNoteLength} />
                </div>
            </div>
            <Timer />
        </div>
    );
}

export default RightPanel;
