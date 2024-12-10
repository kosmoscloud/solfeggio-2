import React from "react";
import "./style.css";
import Dot from "../dot/Dot.jsx";

class Key extends React.Component {

    constructor(props) {
        super(props);
        this.isWhite = props.isWhite;
        this.state = {
            isMarked: false
        };
    }

    get isMarked() {
        return this.state.isMarked;
    }

    set isMarked(value) {
        this.setState({isMarked: value});
    }

    toggleIsMarked = () => {
        this.setState({isMarked: !this.state.isMarked});
        console.log(this.state.isMarked);
    }

    render() {
        return (
            <div className={this.isWhite ? 'white-key' : 'black-key'} style={{left: this.props.left, width: this.props.width}} onClick={this.toggleIsMarked}>
                {this.state.isMarked && <Dot/>}
            </div>
        );
    }
}

export default Key;
