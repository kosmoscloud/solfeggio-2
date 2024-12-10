import React from 'react';
import './style.css';

class Results extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: props.number,
            examplesCorrect: 1,
            examplesAll: 5,
            soundsCorrect: 0,
            soundsAll: 0
        }
    }

    render() {
        return (
            <div className={"box"+this.props.number}>
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
                        <div className="sounds-value">{this.state.soundsCorrect + ":" + this.state.soundsAll}</div>
                        <div className="examples-value">{this.state.examplesCorrect + ":" + this.state.examplesAll}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Results;
