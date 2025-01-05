import React from 'react';
import './style.css'

function Timer({isEnabled}) {

  return (
    <div className={isEnabled ? "timer" : "disabled-timer"}>
      <div className={isEnabled ? "timer-background" : "disabled-timer-background"}/> 
      <div className={isEnabled ? "timer-progress-bar" : "disabled-timer-progress-bar"}/>
      <div className={isEnabled ? "timer-text" : "disabled-timer-text"}>CZAS</div>
    </div>
  );
}

export default Timer;
