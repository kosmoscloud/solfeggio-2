import React, { createContext } from 'react';

export const VisibilityContext = createContext();

function VisibilityManager({ children }) {
    const [visibleComponents, setVisibleComponents] = React.useState([]);

    const showComponent = (component) => {
        setVisibleComponents((prev) => [...prev, component]);
        console.log('showComponent', component);
    };

    const hideComponent = (component) => {
        setVisibleComponents((prev) => prev.filter((comp) => comp !== component));
        console.log('hideComponent', component);
    };

    return (
        <VisibilityContext.Provider value={{ visibleComponents, showComponent, hideComponent }}>
            {children}
        </VisibilityContext.Provider>
    );
}

export default VisibilityManager;
