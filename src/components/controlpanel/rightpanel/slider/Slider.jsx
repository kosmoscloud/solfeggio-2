import React from "react";
import "./style.css";
import Header from "./header/Header";
import Bar from "./bar/Bar";

function Slider({ text, number, sliderid, onChange, min, max, initialValue, context }) {
    const { enabledComponents } = React.useContext(context);
    const enabled = enabledComponents ? enabledComponents.includes(sliderid) : true;

    return (
        <div className="slider">
            <Header text={text} enabled={enabled}/>
            <Bar enabled={enabled} initialValue={initialValue} onChange={onChange} min={min} max={max}/>
        </div>
    );
}

export default Slider;
