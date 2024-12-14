import React, { useContext } from 'react';
import Overlay from '../Overlay';
import { OverlaysContext } from '../../../managers/OverlaysManager';
import OKButton from '../buttons/okbutton/OKButton';
//import CancelButton from '../buttons/cancelbutton/CancelButton';

function Ranges() {

    const { hideOverlay } = useContext(OverlaysContext);

    const acceptChanges = () => {
        // some code
    }

    return (
        <Overlay parentComponent="Ranges">
            <OKButton onClick={() => acceptChanges()}/>
            {/* <CancelButton onClick={() => hideOverlay('Ranges')}/> */}
            <h1>Zakresy</h1>
        </Overlay>
    );

}

export default Ranges;
