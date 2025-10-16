import { render, screen } from '@testing-library/react';

import SettingsMenu from './SettingsMenu';

jest.mock('../../layers/UILayer.jsx', () => {
    const React = require('react');
    const mockDictionary = {
        rangeandscale: 'range and scale',
        instruments: 'instruments',
        audiomidi: 'audio/midi',
        back: 'back'
    };
    const mockStyleSheet = {
        background: "#aaa",
        disabled: "#333",
        enabled: "#fff",
        lightbackground: "#ccc",
        text: "#000",
        selected: "#000"
    };

    return {
        UIContext: React.createContext({ showElement: jest.fn(), styleSheet: mockStyleSheet }),
        LanguageContext: React.createContext({ dictionary: mockDictionary }),
    };
});

jest.mock('../overlays/Ranges.jsx', () => {
    return { __esModule: true, default: () => <div>Ranges</div> };
});
jest.mock('../overlays/SelectInstruments.jsx', () => {
    return { __esModule: true, default: () => <div>Instruments</div> };
});
jest.mock('../overlays/AudioMIDISettings.jsx', () => {
    return { __esModule: true, default: () => <div>AudioMidi</div> };
});
jest.mock('./MainMenu.jsx', () => {
    return { __esModule: true, default: () => <div>MainMenu</div> };
});

describe('SettingsMenu', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders all settings menu buttons', () => {
        render(<SettingsMenu />);
        expect(screen.getByText('range and scale')).toBeInTheDocument();
        //expect(screen.getByText('instruments')).toBeInTheDocument();
        //expect(screen.getByText('audio/midi')).toBeInTheDocument();
        expect(screen.getByText('back')).toBeInTheDocument();
    });

    it('switches to range and scale element when range and scale button is clicked', () => {
        // arrange
        const { showElement } = require('../../layers/UILayer.jsx').UIContext._currentValue;
        const { default: Ranges } = require('../overlays/Ranges.jsx');
        // act
        render(<SettingsMenu />);
        screen.getByText('range and scale').click();
        // assert
        expect(showElement).toHaveBeenCalledWith(<Ranges />);
    });

    // it('switches to Instruments element when instruments button is clicked', () => {
    //     // arrange
    //     const { showElement } = require('../../layers/UILayer.jsx').UIContext._currentValue;
    //     const { default: SelectInstruments } = require('../overlays/SelectInstruments.jsx');
    //     // act
    //     render(<SettingsMenu />);
    //     screen.getByText('instruments').click();
    //     // assert
    //     expect(showElement).toHaveBeenCalledWith(<SelectInstruments />);
    // });

    // it('switches to AudioMidi element when audio/midi button is clicked', () => {
    //     // arrange
    //     const { showElement } = require('../../layers/UILayer.jsx').UIContext._currentValue;
    //     const { default: AudioMIDISettings } = require('../overlays/AudioMIDISettings.jsx');
    //     // act
    //     render(<SettingsMenu />);
    //     screen.getByText('audio/midi').click();
    //     // assert
    //     expect(showElement).toHaveBeenCalledWith(<AudioMIDISettings />);
    // });

    it('switches to MainMenu when back button is clicked', () => {
        // arrange
        const { showElement } = require('../../layers/UILayer.jsx').UIContext._currentValue;
        const { default: MainMenu } = require('./MainMenu.jsx');
        // act
        render(<SettingsMenu />);
        screen.getByText('back').click();
        // assert
        expect(showElement).toHaveBeenCalledWith(<MainMenu />);
    });

});
