import React, { useContext } from 'react';

import { UIContext } from '../../managers/UILayer.jsx';

import LeftPanel from './leftpanel/LeftPanel.jsx';

import './style.css';

function ControlPanel() {

    const { aspectRatio } = useContext(UIContext);

    return (
        <div className="control-panel">
            <LeftPanel/>
        </div>
    );
}

export default ControlPanel;
