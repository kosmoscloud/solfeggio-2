import React from "react";
import Overlay from "../Overlay";
import "./style.css";

const About = () => {
    return (
        <Overlay>
            <h1>About</h1>
            <p>
                This is a simple React app that demonstrates how to use overlays.
            </p>
        </Overlay>
    );
}

export function openAboutOverlay() {
    document.querySelector('.overlay').style.visibility = 'visible';
}

export default About;
