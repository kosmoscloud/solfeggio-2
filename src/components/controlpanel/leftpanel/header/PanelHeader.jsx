import React from "react";
import "./style.css";

class PanelHeader extends React.Component {

    render() {
        return (
            <div className="panel-header">
                <div className="header-filler-left"/>
                <p className="header-text">{this.props.text}</p>
                <div className="header-filler-right"/>
            </div>
        );
    }
}

export default PanelHeader;
