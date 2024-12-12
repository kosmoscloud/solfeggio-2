import React from "react";
import "./style.css";
import Dot from "../dot/Dot.jsx";

function Key({onClick, isWhite, left, width, midiNote}) {
    
        const [isPlaying, setIsPlaying] = React.useState(false);
    
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
                {isWhite && <div className="label">{midiNote}</div>}
                {!isWhite && <div className="label">{midiNote}</div>}
            </div>
        );
}

export default Key;

