import React from "react";
import "./style.css";

function Overlay({children, parentOverlay}) {
    return <div className="overlay">
            <div className="overlay-content">
                {children}
            </div>
        </div>;
}

export default Overlay;
