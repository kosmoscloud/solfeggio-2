import React from "react";
import "./style.css";
import Key from "./key/Key.jsx";
import SoundGenerator from "../../generators/SoundGenerator.js";

class Keyboard extends React.Component {

    constructor(props) {
        super(props);
        this.soundGenerator = new SoundGenerator();
        this.state = {
            visible: false,
            keys: this.generateKeys(48, 90),
        };
    }

    handleKeyClick = (midiNote) => {
        this.soundGenerator.playSineWave(midiNote);
    }

    generateWhiteKeys = (notes) => {
        return notes.map((note, i) =>
            new Key({
                isWhite: true,
                left: `${100 / notes.length * i}%`,
                width: `${100 / notes.length}%`,
                midiNote: note,
                key: i,
                onClick: this.handleKeyClick,
                isMarked: false
            }));
    };
    
    generateBlackKeys = (notes, offset) => {
        let blanks = 0;
        return notes.map((note, i) => {
            if (note % 12 === 1 || note % 12 === 6) blanks++;
            return new Key({
                isWhite: false,
                midiNote: note,
                left: `${offset * (i + blanks) - offset * 0.275}%`,
                width: `${offset * 3 / 5}%`,
                key: blanks + i++,
                onClick: this.handleKeyClick,
                isMarked: false
            });
        });
    }
    
    generateKeys(lowNote, highNote) {
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
        return [ this.generateWhiteKeys(whiteKeys_notes, offset), this.generateBlackKeys(blackKeys_notes, offset) ];
    }

    render() {
        return (
            <div className="keyboard" style={{visibility: this.state.visible ? 'visible' : 'hidden'}}>
                {this.state.keys.flat().map(key => key.render())}
            </div>
        );
    }
}

export function openKeyboard() {
    document.querySelector('.keyboard').style.visibility = 'visible';
}

export default Keyboard;
