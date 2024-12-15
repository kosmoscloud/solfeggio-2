import React from "react";
import "./style.css";
import PanelHeader from "./header/PanelHeader.jsx";
import PanelButton from "./button/PanelButton.jsx";
import { ExerciseContext } from "../../../managers/ExercisesManager";

function LeftPanel() {
    const { exerciseName } = React.useContext(ExerciseContext);

    return <div className="left-panel">
            <PanelHeader text={"Ćwiczenie: "+exerciseName} number={0}/>
            <div className="buttons-panel">
                <div className="buttons-column">
                    <PanelButton text="START / RESET" number={1} buttonid="startreset"/>
                    <PanelButton text="KONTYNUUJ" number={4} buttonid="continue"/>
                    <PanelButton text="WYJŚCIE" number={6} buttonid="exit"/>
                </div>
                <div className="buttons-column">
                    <div className="buttons-row">
                        <PanelButton text="NASTĘPNY" number={2} buttonid="next"/>
                        <PanelButton text="POWTÓRZ" number={3} buttonid="repeat"/>
                    </div>
                    <PanelButton text="COFNIJ NUTĘ" number={5} buttonid="undo"/>
                    <PanelButton text="PODPOWIEDZ" number={7} buttonid="hint"/>
                </div>
            </div>
        </div>;
}

export default LeftPanel;