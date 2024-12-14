import React, { useContext } from "react";
import "./style.css";
import { OverlaysContext } from "../../../managers/OverlaysManager";
import CloseButton from "../buttons/closebutton/CloseButton";

function About() {

    const { hideOverlay } = useContext(OverlaysContext);

    return (
        <div className="about">
            <CloseButton onClick={hideOverlay} />
            <h1>O programie</h1>
            <p>
                Program <i>Solfeggio-2</i> służy do ćwiczenia słuchu muzycznego. 
                Umożliwia rozpoznawanie dźwięków, interwałów, melodii, akordów i innych struktur muzycznych.
            </p>
        </div>
    );
}

export default About;
