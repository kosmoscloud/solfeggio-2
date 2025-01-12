import React from 'react';
import './style.css';

class MenuItem extends React.Component {
    render() {
        return <li 
            className="menu-item"
            onClick={this.props.onClick}
        >{this.props.name}</li>;
    }
}

export { MenuItem };
