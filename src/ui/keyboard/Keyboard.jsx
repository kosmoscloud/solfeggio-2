import { useContext, useEffect } from "react";
import { useMIDINotes } from "@react-midi/hooks";
import { GlobalSettingsContext } from "../../layers/GlobalSettingsLayer.jsx";
import { IOContext } from "../../layers/IOLayer.jsx";
import { UIContext } from "../../layers/UILayer.jsx";

import Key from "./key/Key.jsx";

import "./style.css";

function Keyboard() {
    const { playNotes, triggerLastInput, markedNotes, playedNotes } = useContext(IOContext); 
    const { styleSheet } = useContext(UIContext);
    const { effectiveScale } = useContext(GlobalSettingsContext);
    const [ lowNote, highNote ] = [ effectiveScale[0] - 2, effectiveScale[effectiveScale.length - 1] + 2 ];
    const keys = generateKeys(lowNote, highNote);
    const activeNotes = useMIDINotes({ channel: 1 });

    useEffect(() => {
        for (let note of activeNotes) {
            handleKeyClick(note.note);
        }
    }, [activeNotes]);

    const keyboardStyle = {
        display: 'block',
        position: 'absolute',
        top: '14%',
        left: '10%',
        height: '40%',
        width: '80%',
        overflow: 'hidden',
        border: "2px solid " + styleSheet.text, 
    }

    function handleKeyClick(midiNote) {
        playNotes([midiNote]);
        triggerLastInput(midiNote);
    }
    
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
                        onClick={handleKeyClick}
                        isMarked={markedNotes ? markedNotes.includes(i): false}
                        isPlayed={playedNotes ? playedNotes.includes(i): false}
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
                        onClick={handleKeyClick}
                        isMarked={markedNotes ? markedNotes.includes(i) : false}
                        isPlayed={playedNotes ? playedNotes.includes(i) : false}
                    />
                );
            }
        }

        return [whiteKeys_notes, blackKeys_notes];
    }

    return (
        <div style={keyboardStyle}>
            {keys.flat().map(key => key)}
        </div>
    );
}

export default Keyboard;
