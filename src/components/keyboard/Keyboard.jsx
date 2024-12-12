import React, { useContext, useEffect } from "react";
import "./style.css";
import Key from "./key/Key.jsx";
import SoundGenerator from "../../generators/SoundGenerator.js";
import { VisibilityContext } from "../../managers/VisibilityManager.jsx";
import { UserHistoryContext } from "../../managers/ExercisesManager.jsx";
import { ExerciseContext } from "../../managers/ExercisesManager.jsx";

function Keyboard({ onNotePlayed }) {
    const { visibleComponents } = useContext(VisibilityContext);
    const soundGenerator = new SoundGenerator();
    const { keyRange } = useContext(ExerciseContext);
    const keys = generateKeys(50, 90);
    const isVisible = visibleComponents.includes('Keyboard');
    const { userHistory, updateHistory } = React.useContext(UserHistoryContext);

    function handleKeyClick(midiNote) {
        soundGenerator.playSineWave(midiNote);
        updateHistory(midiNote);
        if (onNotePlayed) {
            onNotePlayed(midiNote);
        }
    }

    function generateWhiteKeys(notes) {
        return notes.map((note, i) =>
            <Key
                isWhite={true}
                left={`${100 / notes.length * i}%`}
                width={`${100 / notes.length}%`}
                midiNote={note}
                key={'w'+i}
                onClick={handleKeyClick}
                isMarked={false}
            />);
    }
    
    function generateBlackKeys(notes, offset) {
        let blanks = 0;
        return notes.map((note, i) => {
            if (note % 12 === 1 || note % 12 === 6) blanks++;
            return <Key
                isWhite={false}
                midiNote={note}
                left={`${offset * (i + blanks) - offset * 0.275}%`}
                width={`${offset * 3 / 5}%`}
                key={'b'+blanks + i++}
                onClick={handleKeyClick}
                isMarked={false}
            />;
        });
    }
    
    function generateKeys(lowNote, highNote) {
        const whiteKeyOffsets = [0, 2, 4, 5, 7, 9, 11];
        const blackKeyOffsets = [1, 3, 6, 8, 10];
    
        const whiteKeys_notes = [];
        const blackKeys_notes = [];
    
        for (let i = lowNote; i <= highNote; i++) {
            if (whiteKeyOffsets.includes(i % 12)) {
                whiteKeys_notes.push(i);
            } else if (blackKeyOffsets.includes(i % 12)) {
                blackKeys_notes.push(i);
            }
        }
    
        const offset = 100 / whiteKeys_notes.length;
        return [ generateWhiteKeys(whiteKeys_notes, offset), generateBlackKeys(blackKeys_notes, offset) ];
    }

    return (
        <div className="keyboard">
            {keys.flat().map(key => key)}
        </div>
    );
}

export default Keyboard;
