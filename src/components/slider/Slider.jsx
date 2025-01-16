import React from "react";

import Header from "../header/Header";
import Bar from "./bar/Bar";
import Spacer from "../spacer/Spacer";

function Slider({ text, isEnabled = true, onChange, min, max, initialValue }) {

    return (
        <Spacer>
            <Spacer length={1}>
                <Header text={text} isEnabled={isEnabled} fontsize={'0.5rem'}/>
            </Spacer>
            <Spacer length={0.1}/>
            <Spacer length={2}>
                <Bar isEnabled={isEnabled} initialValue={initialValue} onChange={onChange} min={min} max={max}/>
            </Spacer>
        </Spacer>
    );
}

export default Slider;
