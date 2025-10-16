import { render, screen } from '@testing-library/react';

import MainMenu from './MainMenu';

jest.mock('../../layers/UILayer.jsx', () => {
    const React = require('react');
    const mockDictionary = {
        solfeggio2: 'Solfeggio-2',
        settings: 'Settings',
        intervals: 'Intervals',
        triads: 'Triads',
        chords: 'Chords',
        melody: 'Melody',
        perfectpitch: 'Perfect Pitch',
        rangeandscale: 'Range and Scale'
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

jest.mock('../../exercises/choose/IntervalsQuiz.jsx', () => {
    return { __esModule: true, default: () => <div>IntervalsQuiz</div> };
});
jest.mock('../../exercises/choose/TriadsQuiz.jsx', () => {
    return { __esModule: true, default: () => <div>TriadsQuiz</div> };
});
jest.mock('../../exercises/play/ChordExercise.jsx', () => {
    return { __esModule: true, default: () => <div>ChordExercise</div> };
});
jest.mock('../overlays/chords/Triads.jsx', () => {
    return { __esModule: true, default: () => <div>Triads</div> };
});
jest.mock('../../exercises/play/MelodyExercise.jsx', () => {
    return { __esModule: true, default: () => <div>MelodyExercise</div> };
});
jest.mock('../../exercises/play/PerfectPitchExercise.jsx', () => {
    return { __esModule: true, default: () => <div>PerfectPitchExercise</div> };
});
jest.mock('../languageselector/LanguageSelector.jsx', () => () => <div>LanguageSelector</div>);
jest.mock('../colorchooser/ColorChooser.jsx', () => () => <div>ColorChooser</div>);

describe('MainMenu', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders all main menu buttons', () => {
        // arrange
        let mockDictionary = require('../../layers/UILayer.jsx').LanguageContext._currentValue.dictionary;
        // act
        render(<MainMenu />);
        // assert
        expect(screen.getByText(mockDictionary.solfeggio2)).toBeInTheDocument();
        expect(screen.getByText(mockDictionary.intervals)).toBeInTheDocument();
        expect(screen.getByText(mockDictionary.triads)).toBeInTheDocument();
        expect(screen.getByText(mockDictionary.chords)).toBeInTheDocument();
        expect(screen.getByText(mockDictionary.melody)).toBeInTheDocument();
        expect(screen.getByText(mockDictionary.perfectpitch)).toBeInTheDocument();
        expect(screen.getByText(mockDictionary.rangeandscale)).toBeInTheDocument();
    });

    it('renders ColorChooser if feature flag is enabled', () => {
        // act
        render(<MainMenu />);
        // assert
        expect(screen.getByText('ColorChooser')).toBeInTheDocument();
    });

    it('does not render ColorChooser if feature flag is disabled', () => {
        // act
        render(<MainMenu />);
        // assert
        expect(screen.queryByText('ColorChooser')).not.toBeInTheDocument();
    });

    it('switches to IntervalsQuiz when Intervals button is clicked', () => {
        // arrange
        const showElementMock = jest.fn();
        const { UIContext } = require('../../layers/UILayer.jsx');
        let mockDictionary = require('../../layers/UILayer.jsx').LanguageContext._currentValue.dictionary;
        const { default: IntervalsQuiz } = require('../../exercises/choose/IntervalsQuiz.jsx');
        // act
        render(
            <UIContext.Provider value={{ showElement: showElementMock, styleSheet: {}, styleSheets: [] }}>
                <MainMenu />
            </UIContext.Provider>
        );
        screen.getByText(mockDictionary.intervals).click();
        // assert
        expect(showElementMock).toHaveBeenCalledWith(<IntervalsQuiz />);
    });

    it('switches to TriadsQuiz when Triads button is clicked', () => {
        // arrange
        const showElementMock = jest.fn();
        const { UIContext } = require('../../layers/UILayer.jsx');
        let mockDictionary = require('../../layers/UILayer.jsx').LanguageContext._currentValue.dictionary;
        const { default: TriadsQuiz } = require('../../exercises/choose/TriadsQuiz.jsx');
        // act
        render(
            <UIContext.Provider value={{ showElement: showElementMock, styleSheet: {}, styleSheets: [] }}>
                <MainMenu />
            </UIContext.Provider>
        );
        screen.getByText(mockDictionary.triads).click();
        // assert
        expect(showElementMock).toHaveBeenCalledWith(<TriadsQuiz />);
    });

    it('switches to ChordMenu when Chords button is clicked', () => {
        // arrange
        const showElementMock = jest.fn();
        const { UIContext } = require('../../layers/UILayer.jsx');
        let mockDictionary = require('../../layers/UILayer.jsx').LanguageContext._currentValue.dictionary;
        const { default: ChordMenu } = require('./ChordMenu.jsx');
        // act
        render(
            <UIContext.Provider value={{ showElement: showElementMock, styleSheet: {}, styleSheets: [] }}>
                <MainMenu />
            </UIContext.Provider>
        );
        screen.getByText(mockDictionary.chords).click();
        // assert
        expect(showElementMock).toHaveBeenCalledWith(<ChordMenu />);
    });

    it('switches to MelodyExercise when Melody button is clicked', () => {
        // arrange
        const showElementMock = jest.fn();
        const { UIContext } = require('../../layers/UILayer.jsx');
        let mockDictionary = require('../../layers/UILayer.jsx').LanguageContext._currentValue.dictionary;
        const { default: MelodyExercise } = require('../../exercises/play/MelodyExercise.jsx');
        // act
        render(
            <UIContext.Provider value={{ showElement: showElementMock, styleSheet: {}, styleSheets: [] }}>
                <MainMenu />
            </UIContext.Provider>
        );
        screen.getByText(mockDictionary.melody).click();
        // assert
        expect(showElementMock).toHaveBeenCalledWith(<MelodyExercise />);
    });

    it('switches to PerfectPitchExercise when Perfect Pitch button is clicked', () => {
        // arrange
        const showElementMock = jest.fn();
        const { UIContext } = require('../../layers/UILayer.jsx');
        let mockDictionary = require('../../layers/UILayer.jsx').LanguageContext._currentValue.dictionary;
        const { default: PerfectPitchExercise } = require('../../exercises/play/PerfectPitchExercise.jsx');
        // act
        render(
            <UIContext.Provider value={{ showElement: showElementMock, styleSheet: {}, styleSheets: [] }}>
                <MainMenu />
            </UIContext.Provider>
        );
        screen.getByText(mockDictionary.perfectpitch).click();
        // assert
        expect(showElementMock).toHaveBeenCalledWith(<PerfectPitchExercise />);
    });

    it('switches to Ranges context window when Ranges button is clicked', () => {
        // arrange
        const showElementMock = jest.fn();
        const { UIContext } = require('../../layers/UILayer.jsx');
        let mockDictionary = require('../../layers/UILayer.jsx').LanguageContext._currentValue.dictionary;
        const { default: Ranges } = require('../overlays/Ranges.jsx');
        // act
        render(
            <UIContext.Provider value={{ showElement: showElementMock, styleSheet: {}, styleSheets: [] }}>
                <MainMenu />
            </UIContext.Provider>
        );
        screen.getByText(mockDictionary.rangeandscale).click();
        // assert
        expect(showElementMock).toHaveBeenCalledWith(<Ranges />);
    });

    it('renders LanguageSelector', () => {
        // arrange
        // act
        render(<MainMenu />);
        // assert
        expect(screen.getByText('LanguageSelector')).toBeInTheDocument();
    });
});
