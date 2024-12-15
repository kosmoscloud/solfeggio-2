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
            <Alarm />
            <Results />
            <Slider text="ODSTĘP" sliderid="notespacing" onChange={setNoteSpacing} context={ExerciseContext}/>
            <Slider text="DŁUGOŚĆ DŹWIĘKU" sliderid="notelength" onChange={setNoteLength} context={ExerciseContext}/>
            <Timer />
        </div>
    );
}

export default RightPanel;
