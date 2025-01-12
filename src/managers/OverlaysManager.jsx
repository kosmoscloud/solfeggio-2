import React, { createContext } from 'react';

export const OverlaysContext = createContext();

function OverlaysManager({ children }) {
    
    const [ activeOverlay, setActiveOverlay ] = React.useState(null);
    const [ activeAlert, setActiveAlert ] = React.useState(null);

    const showOverlay = (overlay) => {
        setActiveOverlay(overlay);
    };

    const showAlert = (alert) => {
        setActiveAlert(alert);
    };

    const hideOverlay = () => {
        setActiveOverlay(null);
    };

    const hideAlert = () => {
        setActiveAlert(null);
    }

    const renderActiveOverlay = () => {
        if (activeOverlay) {
            return activeOverlay;
        }
    };

    const renderActiveAlert = () => {
        if (activeAlert) {
            return activeAlert;
        }
    }

    return (
        <OverlaysContext.Provider value={{ showOverlay, hideOverlay, showAlert, hideAlert }}>
            {children}
            {renderActiveOverlay()}
            {renderActiveAlert()}
        </OverlaysContext.Provider>
    );
}

export default OverlaysManager;
