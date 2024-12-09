import React from 'react';
import './style.css'

class Timer extends React.Component {

  render() {
    return (
      <div className={"box"+this.props.number}>
        <div className="timer">
          <div className="timer-background"/> 
          <div className="timer-progress-bar"/>
          <div className="timer-text">CZAS</div>
        </div>
      </div>
    );
  }
}

export default Timer;
