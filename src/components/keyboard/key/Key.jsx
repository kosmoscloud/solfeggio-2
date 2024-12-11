import React from "react";
import "./style.css";
import Dot from "../dot/Dot.jsx";

class Key extends React.Component {

    constructor(props) {
        super(props);
        this.isWhite = props.isWhite;
        this.midiNote = props.midiNote;
        this.state = {
            isMarked: props.isMarked
        };
    }

    get isMarked() {
        return this.state.isMarked;
    }

    set isMarked(value) {
        this.setState({isMarked: value});
    }

    playNote = () => {
        this.toggleIsMarked();

        if (this.props.onClick) {
            this.props.onClick(this.midiNote);
        }

        setTimeout(() => {
            this.toggleIsMarked();
        }, 300);
    }

    toggleIsMarked = () => {
        this.setState({isMarked: !this.state.isMarked});
    }

    render() {
        return (
            <div className={this.isWhite ? 'white-key' : 'black-key'} style={{left: this.props.left, width: this.props.width}} onClick={this.playNote}>
                {this.state.isMarked && <Dot/>}
            </div>
        );
    }
}

export default Key;

