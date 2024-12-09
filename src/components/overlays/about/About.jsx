import React from "react";
import Overlay from "../Overlay";
import "./style.css";

class About extends React.Component {
    render() {
        return (
            <Overlay>
                <h1>O programie</h1>
                <p>
                    Program <i>Solfeggio-2</i> służy do ćwiczenia słuchu muzycznego. 
                    Umożliwia rozpoznawanie dźwięków, interwałów, melodii, akordów i innych struktur muzycznych.
                </p>
            </Overlay>
        );
    }
}

export function openAboutOverlay() {
    document.querySelector('.overlay').style.visibility = 'visible';
}

export default About;
