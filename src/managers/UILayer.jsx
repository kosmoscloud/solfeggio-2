import React, { createContext } from 'react';

import Alert from '../ui/overlays/alert/Alert';
import MainMenu from '../ui/menu/mainmenu/MainMenu';

export const UIContext = createContext();

function UILayer() {
    
    const [ activeElement, setActiveElement ] = React.useState(<MainMenu />);
    const [ activeOverlay, setActiveOverlay ] = React.useState(null);
    const [ activeAlert, setActiveAlert ] = React.useState(null);
    const [ lastOpenedElement, setLastOpenedElement ] = React.useState(null);

    const showElement = (element) => {
        if (activeElement) {
            setLastOpenedElement(activeElement);
        }
        setActiveElement(element);
    };

    const showOverlay = (overlay) => {
        setActiveOverlay(overlay);
    }

    const showAlert = (text, afterAlert) => {
        setActiveAlert(<Alert text={text} afterAlert={afterAlert} />);
    };

    const hideElement = () => {
        setActiveElement(null);
    };

    const hideOverlay = () => {
        setActiveOverlay(null);
    }

    const hideAlert = () => {
        setActiveAlert(null);
    }

    const renderActiveElement = () => {
        if (activeElement) {
            return activeElement;
        }
    };

    const renderActiveOverlay = () => {
        if (activeOverlay) {
            return activeOverlay;
        }
    }

    const renderActiveAlert = () => {
        if (activeAlert) {
            return activeAlert;
        }
    }

    return (
        <UIContext.Provider value={{ 
                showElement, hideElement, lastOpenedElement,
                showOverlay, hideOverlay,
                showAlert, hideAlert }}>
            {renderActiveElement()}
            {renderActiveOverlay()}
            {renderActiveAlert()}
        </UIContext.Provider>
    );
}

export default UILayer;
