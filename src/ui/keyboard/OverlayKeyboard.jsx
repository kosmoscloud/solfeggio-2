import React from "react";
import Key from "./key/Key.jsx";
import "./style.css";

function OverlayKeyboard({ keyRange, onNotePlayed, markedNotes }) {
    const [ lowNote, highNote ] = [keyRange.low, keyRange.high];
    const keys = generateKeys(lowNote, highNote);
    
    function generateKeys(lowNote, highNote) {
        const whiteKeyOffsets = [0, 2, 4, 5, 7, 9, 11], blackKeyOffsets = [1, 3, 6, 8, 10];
        const whiteKeys_notes = [], blackKeys_notes = [];

        const whiteKeys_length =
            Array.from({ length: highNote - lowNote + 1 }, (_, i) => lowNote + i).filter(note => whiteKeyOffsets.includes(note % 12)).length;

        for (let i = lowNote; i <= highNote; i++) {
            if (whiteKeyOffsets.includes(i % 12)) {
                whiteKeys_notes.push(
                    <Key 
                        isWhite={true}
                        left={`${100 / whiteKeys_length * whiteKeys_notes.length}%`}
                        width={`${100 / whiteKeys_length}%`}
                        midiNote={i}
                        key={i}
                        onClick={onNotePlayed}
                        isMarked={markedNotes ? markedNotes.includes(i): false}
                    />
                );
            } else if (blackKeyOffsets.includes(i % 12)) {
                blackKeys_notes.push(
                    <Key 
                        isWhite={false}
                        midiNote={i}
                        left={`${100 / whiteKeys_length * whiteKeys_notes.length - (100 / whiteKeys_length / 3.5)}%`}
                        width={`${100 / whiteKeys_length * 3 / 5}%`}
                        key={i}
                        onClick={onNotePlayed}
                        isMarked={markedNotes ? markedNotes.includes(i) : false}
                    />
                );
            }
        }

        return [whiteKeys_notes, blackKeys_notes];
    }

    return (
        <div className="keyboard" style = {{ zIndex: 99 }}>
            {keys.flat().map(key => key)}
        </div>
    );
}

export default OverlayKeyboard;
