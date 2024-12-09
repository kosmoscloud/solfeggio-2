import React from "react";
import "./style.css";

class BlackKey extends React.Component {
    render() {
        return (
            <div className="black-key" style={{left: this.props.left, width: this.props.width}}/>
        );
    }
}

export default BlackKey;
