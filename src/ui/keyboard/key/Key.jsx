import React from "react";
import "./style.css";
import Dot from "../dot/Dot.jsx";

function Key({onClick, isWhite, left, width, midiNote, isMarked, isPlayed}) {
    
        const [isPlaying, setIsPlaying] = React.useState(false);
        const isC = midiNote % 12 === 0;
        const octave = Math.floor(midiNote / 12) - 1;
        const subscript = ["₄", "₃", "₂", "₁"];
        const superscript = ["¹", "²", "³", "⁴"];
        const label = isC ? `C${subscript[octave + 1] || superscript[octave - 4] || ""}` : "";
    
        function playNote() {
            setIsPlaying(true);

            if (onClick) {
                onClick(midiNote);
            }
            
            setTimeout(() => {
                setIsPlaying(false);
            }, 300);
        }
    
        return (
            <div className={isWhite ? 'white-key' : 'black-key'} style={{left: left, width: width}} onClick={playNote}>
                {isPlaying && <Dot/>}
                {isMarked && <Dot type="marked"/>}
                {(isPlayed && isWhite) && <div style={{position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.1)"}}/>}
                {(isPlayed && !isWhite) && <div style={{position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.3)"}}/>}
                {label && <div className="label">{label}</div>}
            </div>
        );
}

export default Key;

