import React from 'react';
import './style.css';
import LeftPanel from './leftpanel/LeftPanel.jsx';
import RightPanel from './rightpanel/RightPanel.jsx';

function ControlPanel() {
    return (
        <div className="control-panel">
            <LeftPanel/>
            <RightPanel/>
        </div>
    );
}

export default ControlPanel;
