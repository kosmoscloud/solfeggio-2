import React, { useContext } from "react";
import "./style.css";
import Slider from "./slider/Slider.jsx";
import Timer from "./timer/Timer.jsx";
import Results from "./results/Results.jsx"
import Alarm from "./alarm/Alarm.jsx";
import { ExerciseContext } from "../../../managers/ExercisesManager";

function RightPanel() {
    const { setNoteSpacing, setNoteLength } = useContext(ExerciseContext);

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
                    <Slider text="ODSTĘP" sliderid="notespacing" onChange={setNoteSpacing} context={ExerciseContext}/>
                    <Slider text="DŁUGOŚĆ DŹWIĘKU" sliderid="notelength" onChange={setNoteLength} context={ExerciseContext}/>
                </div>
            </div>
            <Timer />
        </div>
    );
}

export default RightPanel;
