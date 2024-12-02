import React from "react";
import "./style.css";
import BlackKey from "./blackkey/BlackKey.jsx"
import WhiteKey from "./whitekey/WhiteKey.jsx"

const generateWhiteKeys = (notes) => {
    const keys = [];

    const offset = 100 / (notes.length);

    for (let i in notes) {
        let noteName = recognizeNoteName(notes[i]);
    
        const key = <WhiteKey
            left={offset * i + "%"}
            width={offset + "%"}
            note={noteName}
        />;
        keys.push(key);
    }

    return keys;
};

const generateBlackKeys = (notes, offset) => {
    const keys = [];

    let i = 0;

    for (let note in notes) {
        let noteName = recognizeNoteName(notes[note]);

        if (noteName === "C#" || noteName === "F#") {
            i += 1;
        }

        const key = <BlackKey
            left={offset * i - offset * 0.275 + "%"}
            width={offset * 3 / 5 + "%"}
            note={noteName}    
        />;
        keys.push(key);
        i += 1;
    }

    return keys;
}

function recognizeNoteName(note) {
    const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    return noteNames[note % 12];
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

    const keys = [];

    keys.push(generateWhiteKeys(whiteKeys_notes));
    keys.push(generateBlackKeys(blackKeys_notes, offset));

    return keys;
}

function Keyboard(props) {
    return (
        <div className="keyboard">
            {generateKeys(45, 80).map((key) => key)}
        </div>
    );
}

export default Keyboard;
