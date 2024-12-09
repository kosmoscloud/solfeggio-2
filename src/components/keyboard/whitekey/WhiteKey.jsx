import React from "react";
import "./style.css";

class WhiteKey extends React.Component {
    render() {
        return (
            <div className='white-key' style={{left: this.props.left, width: this.props.width}}/>
        );
    }
}

export default WhiteKey;
