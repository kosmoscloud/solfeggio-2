import React from 'react';
import './style.css'

function Timer(props) {

  return (
      <div className={"box"+props.number}>
        <div className="timer">
          <div className="timer-background"/> 
          <div className="timer-progress-bar"/>
          <div className="timer-text">CZAS</div>
        </div>
      </div>
  );
}

export default Timer;
