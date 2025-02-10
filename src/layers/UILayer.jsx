import React, { useEffect, createContext } from 'react';

import Alert from '../ui/overlays/alert/Alert';
import MainMenu from '../ui/menu/MainMenu';

export const UIContext = createContext();
export const LanguageContext = createContext();

function UILayer() {
    
    const [ activeElement, setActiveElement ] = React.useState(<MainMenu />);
    const [ activeOverlay, setActiveOverlay ] = React.useState(null);
    const [ activeAlert, setActiveAlert ] = React.useState(null);
    const [ lastOpenedElement, setLastOpenedElement ] = React.useState(null);
    const [ aspectRatio, setAspectRatio ] = React.useState(window.innerWidth / window.innerHeight);
    const [ language, setLanguage ] = React.useState('pl');
    const [ dictionary, setDictionary ] = React.useState({});
    const [ symbols, setSymbols ] = React.useState({})

    
    useEffect(() => {
        setLanguageAndFetchDictionary(language);
        fetchAndSetSymbols();

        const handleResize = () => {
            setAspectRatio(window.innerWidth / window.innerHeight);
        };
        
        window.addEventListener('resize', handleResize);
    }, []);
    
    const setLanguageAndFetchDictionary = async (language) => {
        const json = require(`../ui/languages/${language}.json`);
        setDictionary(json);
        setLanguage(language);
    }

    const fetchAndSetSymbols = () => {
        const json = require(`../ui/languages/symbols.json`);
        setSymbols(json);
    }

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
                showAlert, hideAlert,
                aspectRatio }}>
            <LanguageContext.Provider value={{ dictionary, symbols, language, setLanguageAndFetchDictionary }}>
                {renderActiveElement()}
                {renderActiveOverlay()}
                {renderActiveAlert()}
            </LanguageContext.Provider>
        </UIContext.Provider>
    );
}

export default UILayer;
