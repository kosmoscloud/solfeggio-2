import React from "react";
import "./style.css";
import Header from "./header/Header";
import Bar from "./bar/Bar";

class Slider extends React.Component {

    render() {
        return (
            <div className={"box"+this.props.number} onClick={this.handleMouseDown}>
                <div className="slider">
                    <Header text={this.props.text}/>
                    <Bar />
                </div>
            </div>
        );
    };
}

export default Slider;
