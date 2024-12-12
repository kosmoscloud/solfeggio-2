import React from "react";
import Overlay from "../Overlay";
import "./style.css";

function About() {

    return (
        <Overlay parentComponent="About">
            <h1>O programie</h1>
            <p>
                Program <i>Solfeggio-2</i> służy do ćwiczenia słuchu muzycznego. 
                Umożliwia rozpoznawanie dźwięków, interwałów, melodii, akordów i innych struktur muzycznych.
            </p>
        </Overlay>
    );
}

export default About;
