import React from 'react';
import './style.css';
import LeftPanel from './leftpanel/LeftPanel.jsx';
import RightPanel from './rightpanel/RightPanel.jsx';

class ControlPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
    }

    toggleVisibility() {
        this.setState(prevState => ({
            isVisible: !prevState.isVisible
        }));
    }

    render() {
        return (
            <div className="control-panel" style={{visibility: this.state.isVisible ? 'visible' : 'hidden'}}>
                <LeftPanel/>
                <RightPanel/>
            </div>
        );
    }

}

export default ControlPanel;
export function openControlPanel() {
    document.querySelector('.control-panel').style.visibility = 'visible';
}

export function closeControlPanel() {
    document.querySelector('.control-panel').style.visibility = 'hidden';
}
