import { useEffect, useContext, useState, createContext } from 'react';

import Alert from '../ui/overlays/alert/Alert';
import MainMenu from '../ui/menu/MainMenu';

import Background from '../components/Background';

import { IOContext } from './IOLayer';
export const UIContext = createContext();
export const LanguageContext = createContext();

function UILayer() {
    
    const { stopPlaying } = useContext(IOContext);
    const [ activeElement, setActiveElement ] = useState(<MainMenu />);
    const [ activeOverlay, setActiveOverlay ] = useState(null);
    const [ activeAlert, setActiveAlert ] = useState(null);
    const [ lastOpenedElement, setLastOpenedElement ] = useState(null);
    const [ aspectRatio, setAspectRatio ] = useState(window.innerWidth / window.innerHeight);
    const [ language, setLanguage ] = useState('pl');
    const [ dictionary, setDictionary ] = useState({});
    const [ symbols, setSymbols ] = useState({})
    const [ styleSheet, setStyleSheet ] = useState(() => {
        const savedStyleSheet = localStorage.getItem('styleSheet');
        return savedStyleSheet ? JSON.parse(savedStyleSheet) : {};
    });
    const [ styleSheets, setStyleSheets ] = useState([]);

    useEffect(() => {
        localStorage.setItem('styleSheet', JSON.stringify(styleSheet));
    }, [styleSheet]);

    useEffect(() => {
        setLanguageAndFetchDictionary(language);
        fetchAndSetSymbols();
        fetchStyleSheets();

        const handleResize = () => {
            setAspectRatio(window.innerWidth / window.innerHeight);
        };
        
        window.addEventListener('resize', handleResize);
    }, [language]);
    
    const setLanguageAndFetchDictionary = async (language) => {
        const json = require(`./languages/${language}.json`);
        setDictionary(json);
        setLanguage(language);
    }

    const fetchAndSetSymbols = () => {
        const json = require(`./languages/symbols.json`);
        setSymbols(json);
    }

    const fetchStyleSheets = () => {
        const context = require.context('./stylesheets', false, /\.json$/);
        const sheets = context.keys().map(context);
        setStyleSheets(sheets);
        setStyleSheet(sheets[0]);
    }

    const showElement = (element) => {
        stopPlaying();
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
                aspectRatio, styleSheet,
                styleSheets, setStyleSheet }}>
            <LanguageContext.Provider value={{ dictionary, symbols, language, setLanguageAndFetchDictionary }}>
                <Background/>
                {renderActiveElement()}
                {renderActiveOverlay()}
                {renderActiveAlert()}
            </LanguageContext.Provider>
        </UIContext.Provider>
    );
}

export default UILayer;
