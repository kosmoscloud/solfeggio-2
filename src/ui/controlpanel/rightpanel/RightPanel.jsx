import React, { useContext } from "react";

import { ExerciseContext } from "../../../managers/ExerciseLayer.jsx";
import { GlobalSettingsContext } from "../../../managers/GlobalSettingsLayer.jsx";
import { LanguageContext } from "../../../managers/UILayer.jsx";

import Slider from "../../../components/slider/Slider.jsx";
import Column from "../../../components/table/column/Column.jsx";
import Results from "./results/Results.jsx";
import Spacer from "../../../components/spacer/Spacer.jsx";

import "./style.css";

function RightPanel() {
    const { hasStarted } = useContext(ExerciseContext);
    const { noteLength, setNoteLength, noteSpacing, setNoteSpacing } = useContext(GlobalSettingsContext);
    const { dictionary } = useContext(LanguageContext);
    
    const setScaledNoteLength = (value) => {
        setNoteLength(0.1 + value / 100 * 0.9);
    }

    const setScaledNoteSpacing = (value) => {
        setNoteSpacing(0.1 + value / 100 * 0.9);
    }

    const invertedNoteLength = (noteLength - 0.1) / 0.9 * 100;
    const invertedNoteSpacing = (noteSpacing - 0.1) / 0.9 * 100;

    return (
        <Column padding={false}>
            <Spacer length={1}>
                <Results />
            </Spacer>
            <Column width={1} padding={false} >
                {/* spacing slider - 0 means 0.1 second, 100 means 1 second */}
                <Slider text={dictionary.notespacing} isEnabled={hasStarted} onChange={setScaledNoteSpacing} initialValue={invertedNoteSpacing} />
                {/* note length slider - 0 means 0.1 second, 100 means 1 seconds */}
                <Slider text={dictionary.notelength} isEnabled={hasStarted} onChange={setScaledNoteLength} initialValue = {invertedNoteLength}/>
            </Column>
        </Column>
    );
}

export default RightPanel;
