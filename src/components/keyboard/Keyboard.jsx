import React from "react";
import "./style.css";
import Key from "./key/Key.jsx";

class Keyboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keys: this.generateKeys(48, 90)
        };
    }

    generateWhiteKeys = (notes) => {
        const keys = [];
    
        const offset = 100 / (notes.length);
    
        for (let i in notes) {
            const key = <Key isWhite={true}
                left={offset * i + "%"}
                width={offset + "%"}
                key={i}
            />;
            keys.push(key);
        }
    
        return keys;
    };
    
    generateBlackKeys = (notes, offset) => {
        const keys = [];
    
        let i = 0;
    
        for (let note in notes) {

            if (note % 12 === 1 || note % 12 === 3 || note % 12 === 6 || note % 12 === 8 || note % 12 === 10) {
                i += 1;
            }
    
            const key = <Key isWhite={false}
                left={offset * i - offset * 0.275 + "%"}
                width={offset * 3 / 5 + "%"}
                key={i}
            />;
            keys.push(key);
            i += 1;
        }
    
        return keys;
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
    
        const keys = {
            whiteKeys: this.generateWhiteKeys(whiteKeys_notes),
            blackKeys: this.generateBlackKeys(blackKeys_notes, offset)
        };
    
        return keys;
    }

    render() {
        return (
            <div className="keyboard">
                {this.state.keys.whiteKeys}
                {this.state.keys.blackKeys}
            </div>
        );
    }
}

export default Keyboard;
