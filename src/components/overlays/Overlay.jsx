import React from "react";
import "./style.css";
import CloseButton from "./closebutton/CloseButton";

class Overlay extends React.Component {
    render() {
        return (
        <div className="overlay">
            <div className="overlay-content">
                <CloseButton onClick={this.toggleVisibility}/>
                {this.props.children}
            </div>
        </div>
        );
    }

    toggleVisibility() {
        const overlay = document.querySelector('.overlay');
        overlay.style.visibility = overlay.style.visibility === 'hidden' ? 'visible' : 'hidden';
    }
}

export default Overlay;
