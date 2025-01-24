import React from "react";

import Header from "../header/Header";
import Bar from "./bar/Bar";
import Spacer from "../spacer/Spacer";

function Slider({ text, isEnabled = true, onChange, min, max, value }) {

    return (
        <Spacer>
            {text && <Spacer length={1}>
                <Header text={text} isEnabled={isEnabled}/>
            </Spacer>}
            <Spacer length={0.1}/>
            <Spacer length={2}>
                <Bar isEnabled={isEnabled} value={value} onChange={onChange} min={min} max={max}/>
            </Spacer>
        </Spacer>
    );
}

export default Slider;
