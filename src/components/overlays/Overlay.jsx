import React from "react";
import "./style.css";
import CloseButton from "./closebutton/CloseButton";
import { VisibilityContext } from "../../managers/VisibilityManager";

function Overlay({children, parentComponent}) {
    const { visibleComponents, showComponent, hideComponent } = React.useContext(VisibilityContext);

    return <div className="overlay" style={{visibility: visibleComponents.includes(parentComponent) ? 'visible' : 'hidden'}}>
            <div className="overlay-content">
                <CloseButton onClick={() => hideComponent(parentComponent)} />
                {children}
            </div>
        </div>;
}

export default Overlay;
