import React from "react";
import "./style.css";

class Header extends React.Component {

    render() {
        return (
            <div className="header">
                <div className="filler"/>
                <div className="text">
                    <div>{this.props.text}</div>
                </div>
                <div className="filler"/>
            </div>
        );
    }
}

export default Header;
