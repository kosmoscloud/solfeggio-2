import React from "react";
import "./style.css";

class PanelButton extends React.Component {

    render() {
        return (
            <div className={"box"+this.props.number}>
                <div className="panel-button">{this.props.text}</div>
            </div>
        );
    }
}

export default PanelButton;
