import React, { useContext } from "react";
import "./style.css";
import Slider from "../../../components/slider/Slider.jsx";
import Timer from "./timer/Timer.jsx";
import Results from "./results/Results.jsx"
import Alarm from "./alarm/Alarm.jsx";
import { ExerciseContext } from "../../../managers/ExerciseLayer.jsx";
import { GlobalSettingsContext } from "../../../managers/GlobalSettingsLayer.jsx";

function RightPanel() {
    const { hasStarted } = useContext(ExerciseContext);
    const { noteLength, setNoteLength, noteSpacing, setNoteSpacing } = useContext(GlobalSettingsContext);
    
    const setScaledNoteLength = (value) => {
        setNoteLength(0.1 + value / 100 * 0.9);
    }

    const setScaledNoteSpacing = (value) => {
        setNoteSpacing(0.1 + value / 100 * 0.9);
    }

    const invertedNoteLength = (noteLength - 0.1) / 0.9 * 100;
    const invertedNoteSpacing = (noteSpacing - 0.1) / 0.9 * 100;

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
                    {/* spacing slider - 0 means 0.1 second, 100 means 1 second */}
                    <Slider text="ODSTĘP" isEnabled={hasStarted} onChange={setScaledNoteSpacing} initialValue={invertedNoteSpacing} />
                    {/* note length slider - 0 means 0.1 second, 100 means 1 seconds */}
                    <Slider text="DŁUGOŚĆ DŹWIĘKU" isEnabled={hasStarted} onChange={setScaledNoteLength} initialValue = {invertedNoteLength}/>
                </div>
            </div>
            <Timer isEnabled={false}/>
        </div>
    );
}

export default RightPanel;
