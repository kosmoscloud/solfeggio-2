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
            <Alarm number={9}/>
            <Results number={10}/>
            <Slider text="ODSTĘP" number={11} sliderid="notespacing" onChange={setNoteSpacing} context={ExerciseContext}/>
            <Slider text="DŁUGOŚĆ DŹWIĘKU" number={12} sliderid="notelength" onChange={setNoteLength} context={ExerciseContext}/>
            <Timer number={13}/>
        </div>
    );
}

export default RightPanel;
