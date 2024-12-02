import React from 'react';
import './style.css';

function Results(props) {
    return (
            <div className={"box"+props.number}>
                <div className="results-display">
                    <div className="results-header">
                        <div className="results-title">
                            WYNIKI
                        </div>
                        <div className="results-description">
                            DOBRZE:ŹLE
                        </div>
                    </div>
                    <div className="results-table">
                        <div className="sounds-title">Dźwięki</div>
                        <div className="examples-title">Przykłady</div>
                        <div className="sounds-value">0:0</div>
                        <div className="examples-value">0:0</div>
                    </div>
                </div>
            </div>
)}

export default Results;
