import React from "react";
import "./style.css";

class Button extends React.Component {

    render() {
        return (
            <div className={this.props.direction} onClick={this.props.onClick}/>
        );
    }
}

export default Button;
