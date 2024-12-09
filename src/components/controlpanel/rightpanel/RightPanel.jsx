import React from "react";
import "./style.css";
import Slider from "./slider/Slider.jsx";
import Timer from "./timer/Timer.jsx";
import Results from "./results/Results.jsx"
import Undefined from "./undefined/Undefined.jsx";

class RightPanel extends React.Component {

    render() {
        return <div className="rightPanel">
                <Undefined number={9}/> 
                <Results number={10}/>
                <Slider text="ODSTĘP" number={11}/>
                <Slider text="DŁUGOŚĆ DŹWIĘKU" number={12}/>
                <Timer number={13}/>
            </div>;
    }
}

export default RightPanel;
