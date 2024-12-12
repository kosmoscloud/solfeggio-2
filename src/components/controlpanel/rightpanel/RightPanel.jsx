import React from "react";
import "./style.css";
import Slider from "./slider/Slider.jsx";
import Timer from "./timer/Timer.jsx";
import Results from "./results/Results.jsx"
import Alarm from "./alarm/Alarm.jsx";

function RightPanel() {
    return (
        <div className="rightPanel">
            <Alarm number={9}/>
            <Results number={10}/>
            <Slider text="ODSTĘP" number={11} sliderid="notespacing"/>
            <Slider text="DŁUGOŚĆ DŹWIĘKU" number={12} sliderid="notelength"/>
            <Timer number={13}/>
        </div>
    );
}

export default RightPanel;
