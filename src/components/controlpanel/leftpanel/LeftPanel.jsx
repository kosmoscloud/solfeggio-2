import React from "react";
import "./style.css";
import PanelHeader from "./header/PanelHeader.jsx";
import PanelButton from "./button/PanelButton.jsx";
import { ExerciseContext } from "../../../managers/ExercisesManager";

function LeftPanel() {
    const { exerciseName } = React.useContext(ExerciseContext);

    return <div className="left-panel">
            <PanelHeader text={"Ćwiczenie: "+exerciseName}/>
            <div className="buttons-panel">
                <div className="buttons-column">
                    <PanelButton text="START / RESET" buttonid="startreset"/>
                    <PanelButton text="KONTYNUUJ" buttonid="continue"/>
                    <PanelButton text="WYJŚCIE" buttonid="exit"/>
                </div>
                <div className="buttons-column">
                    <div className="buttons-row">
                        <PanelButton text="NASTĘPNY" buttonid="next"/>
                        <PanelButton text="POWTÓRZ" buttonid="repeat"/>
                    </div>
                    <PanelButton text="COFNIJ NUTĘ" buttonid="undo"/>
                    <PanelButton text="PODPOWIEDZ" buttonid="hint"/>
                </div>
            </div>
        </div>;
}

export default LeftPanel;