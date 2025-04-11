import React from "react";
import { UIContext } from "../../../layers/UILayer.jsx";
import Dot from "../dot/Dot.jsx";

function Key({onClick, isWhite, left, width, midiNote, isMarked, isPlayed}) {
    
        const [isPlaying, setIsPlaying] = React.useState(false);
        const [isHovered, setIsHovered] = React.useState(false);
        const { styleSheet } = React.useContext(UIContext);
        const isC = midiNote % 12 === 0;
        const octave = Math.floor(midiNote / 12) - 1;
        const subscript = ["₄", "₃", "₂", "₁"];
        const superscript = ["¹", "²", "³", "⁴"];
        const label = isC ? `C${subscript[octave + 1] || superscript[octave - 4] || ""}` : "";

        const whiteKeyStyle = {
            position: "absolute",
            left: left,
            width: width,
            backgroundColor: isHovered ? styleSheet.selected : styleSheet.enabled,
            border: "1px solid " + styleSheet.text,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            cursor: "pointer"
        };

        const blackKeyStyle = {
            position: "absolute",
            left: left,
            width: width,
            height: "63%",
            backgroundColor: isHovered ? styleSheet.selected : styleSheet.text,
            borderRadius: "0 0 5px 5px",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            cursor: "pointer"
        };

        const labelStyle = {
            position: "absolute",
            bottom: "1%",
            left: "30%",
            fontSize: "0.7em",
            color: styleSheet.text,
            width: "100%",
            height: "auto"
        };
    
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
            <div style={isWhite ? whiteKeyStyle : blackKeyStyle} onClick={playNote} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                {isPlaying && <Dot/>}
                {isMarked && <Dot type="marked"/>}
                {(isPlayed && isWhite) && <div style={{position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.1)"}}/>}
                {(isPlayed && !isWhite) && <div style={{position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.3)"}}/>}
                {label && <div style={labelStyle}>{label}</div>}
            </div>
        );
}

export default Key;

