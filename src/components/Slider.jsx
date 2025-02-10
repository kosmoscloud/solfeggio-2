import React from "react";

import Header from "./Header";
import FlexContainer from "./FlexContainer";
import SliderTrack from "./SliderTrack";

function Slider({ text, isEnabled = true, onChange, min, max, value }) {

    return (
        <FlexContainer gap={0.5}>
            {text && <FlexContainer length={1} padding={false}>
                <Header text={text} isEnabled={isEnabled}/>
            </FlexContainer>}
            <FlexContainer length={2} padding={false}>
                <SliderTrack isEnabled={isEnabled} value={value} onChange={onChange} min={min} max={max}/>
            </FlexContainer>
        </FlexContainer>
    );
}

export default Slider;
