import React from 'react';
import './style.css'

class Undefined extends React.Component {

  render() {
    return (
      <div className={"box"+this.props.number}>
        <h1>Undefined</h1>
      </div>
    );
  }
}

export default Undefined;
