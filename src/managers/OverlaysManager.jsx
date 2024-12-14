import React, { createContext } from 'react';

export const OverlaysContext = createContext();

function OverlaysManager({ children }) {
    
    const [ activeOverlay, setActiveOverlay ] = React.useState(null);

    const showOverlay = (overlay) => {
        setActiveOverlay(overlay);
    };

    const hideOverlay = () => {
        setActiveOverlay(null);
    };

    const renderActiveOverlay = () => {
        if (activeOverlay) {
            return activeOverlay;
        }
    };

    return (
        <OverlaysContext.Provider value={{ showOverlay, hideOverlay }}>
            {children}
            {renderActiveOverlay()}
        </OverlaysContext.Provider>
    );
}

export default OverlaysManager;
