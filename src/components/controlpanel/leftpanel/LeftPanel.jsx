import React from "react";
import "./style.css";
import PanelHeader from "./header/PanelHeader.jsx";
import PanelButton from "./button/PanelButton.jsx";

class LeftPanel extends React.Component {
    render() {
        return <div className="left-panel">
                <PanelHeader text="Ćwiczenie: Pojedyncze dźwięki" number={0}/>
                <PanelButton text="START / RESET" number={1}/>
                <PanelButton text="NASTĘPNY" number={2}/>
                <PanelButton text="POWTÓRZ" number={3}/>
                <PanelButton text="KONTYNUUJ" number={4}/>
                <PanelButton text="COFNIJ NUTĘ" number={5}/>
                <PanelButton text="WYJŚCIE" number={6}/>
                <PanelButton text="PODPOWIEDZ" number={7}/>
            </div>;
    }
}

export default LeftPanel;