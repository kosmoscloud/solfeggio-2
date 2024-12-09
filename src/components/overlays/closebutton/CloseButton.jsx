import React from 'react';
import './style.css';

class CloseButton extends React.Component {
    render() {
        return (
            <div className="close-button" onClick={this.props.onClick}>
                x
            </div>
        );
    }
}

export default CloseButton;
