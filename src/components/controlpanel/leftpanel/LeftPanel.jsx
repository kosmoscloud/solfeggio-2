import React from "react";
import "./style.css";
import PanelHeader from "./header/PanelHeader.jsx";
import PanelButton from "./button/PanelButton.jsx";

function LeftPanel() {
    
    return <div className="left-panel">
            <PanelHeader text="Ćwiczenie: Pojedyncze dźwięki" number={0}/>
            <PanelButton text="START / RESET" number={1} buttonid="startreset"/>
            <PanelButton text="NASTĘPNY" number={2} buttonid="next"/>
            <PanelButton text="POWTÓRZ" number={3} buttonid="repeat"/>
            <PanelButton text="KONTYNUUJ" number={4} buttonid="continue"/>
            <PanelButton text="COFNIJ NUTĘ" number={5} buttonid="undo"/>
            <PanelButton text="WYJŚCIE" number={6} buttonid="exit"/>
            <PanelButton text="PODPOWIEDZ" number={7} buttonid="hint"/>
        </div>;
}

export default LeftPanel;