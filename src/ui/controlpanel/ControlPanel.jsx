import React, { useContext } from 'react';

import { UIContext } from '../../managers/UILayer.jsx';

import LeftPanel from './leftpanel/LeftPanel.jsx';
import RightPanel from './rightpanel/RightPanel.jsx';
import Row from '../../components/table/row/Row.jsx';
import Spacer from '../../components/spacer/Spacer.jsx';

import './style.css';

function ControlPanel() {

    const { aspectRatio } = useContext(UIContext);

    return (
        <div className="control-panel">
            <Row>
                <Spacer length={2}>
                    <LeftPanel/>
                </Spacer>
                {aspectRatio >= 1.25 && <Spacer length={1}>
                    <RightPanel/>
                </Spacer>}   
            </Row>
        </div>
    );
}

export default ControlPanel;
