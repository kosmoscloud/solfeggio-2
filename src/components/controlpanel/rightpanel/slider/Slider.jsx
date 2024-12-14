import React from "react";
import "./style.css";
import Header from "./header/Header";
import Bar from "./bar/Bar";
import { ExerciseContext } from "../../../../managers/ExercisesManager";

function Slider(props) {
    const { enabledComponents } = React.useContext(ExerciseContext);
    const enabled = enabledComponents.includes(props.sliderid);

    return (
        <div className={"box"+props.number} sliderid={props.sliderId}>
                <div className="slider">
                    <Header text={props.text} enabled={enabled}/>
                    <Bar enabled={enabled} initialValue={50} onChange={props.onChange}/>
                </div>
            </div>
    );
}

export default Slider;
