import { render, screen } from '@testing-library/react';

import ChordMenu from './ChordMenu';

jest.mock('posthog-js/react', () => ({
    useFeatureFlagEnabled: jest.fn(),
}));

jest.mock('../../layers/UILayer.jsx', () => {
    const React = require('react');
    const mockDictionary = {
        seventhchord: 'seventh chord',
        ninthchord: 'ninth chord',
        eleventhchord: 'eleventh chord',
        thirteenthchord: 'thirteenth chord',
        randomchord: 'random chord',
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

jest.mock('../../exercises/play/ChordExercise.jsx', () => {
    return { __esModule: true, default: () => <div>ChordExercise</div> };
});
jest.mock('./MainMenu.jsx', () => {
    return { __esModule: true, default: () => <div>MainMenu</div> };
});

describe('ChordMenu', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders all chord menu buttons', () => {
        render(<ChordMenu />);
        expect(screen.getByText('seventh chord')).toBeInTheDocument();
        expect(screen.getByText('ninth chord')).toBeInTheDocument();
        expect(screen.getByText('eleventh chord')).toBeInTheDocument();
        expect(screen.getByText('thirteenth chord')).toBeInTheDocument();
        expect(screen.getByText('random chord')).toBeInTheDocument();
        expect(screen.getByText('back')).toBeInTheDocument();
    });

    it('switches to sevenths ChordExercise when seventh chord button is clicked', () => {
        // arrange
        const { showElement } = require('../../layers/UILayer.jsx').UIContext._currentValue;
        const { default: ChordExercise } = require('../../exercises/play/ChordExercise.jsx');
        // act
        render(<ChordMenu />);
        screen.getByText('seventh chord').click();
        // assert
        expect(showElement).toHaveBeenCalledWith(<ChordExercise type='sevenths' />);
    });

    it('switches to ninths ChordExercise when ninth chord button is clicked', () => {
        // arrange
        const { showElement } = require('../../layers/UILayer.jsx').UIContext._currentValue;
        const { default: ChordExercise } = require('../../exercises/play/ChordExercise.jsx');
        // act
        render(<ChordMenu />);
        screen.getByText('ninth chord').click();
        // assert
        expect(showElement).toHaveBeenCalledWith(<ChordExercise type='ninths' />);
    });

    it('switches to elevenths ChordExercise when eleventh chord button is clicked', () => {
        // arrange
        const { showElement } = require('../../layers/UILayer.jsx').UIContext._currentValue;
        const { default: ChordExercise } = require('../../exercises/play/ChordExercise.jsx');
        // act
        render(<ChordMenu />);
        screen.getByText('eleventh chord').click();
        // assert
        expect(showElement).toHaveBeenCalledWith(<ChordExercise type='elevenths' />);
    });

    it('switches to thirteenths ChordExercise when thirteenth chord button is clicked', () => {
        // arrange
        const { showElement } = require('../../layers/UILayer.jsx').UIContext._currentValue;
        const { default: ChordExercise } = require('../../exercises/play/ChordExercise.jsx');
        // act
        render(<ChordMenu />);
        screen.getByText('thirteenth chord').click();
        // assert
        expect(showElement).toHaveBeenCalledWith(<ChordExercise type='thirteenths' />);
    });

    it('switches to random ChordExercise when random chord button is clicked', () => {
        // arrange
        const { showElement } = require('../../layers/UILayer.jsx').UIContext._currentValue;
        const { default: ChordExercise } = require('../../exercises/play/ChordExercise.jsx');
        // act
        render(<ChordMenu />);
        screen.getByText('random chord').click();
        // assert
        expect(showElement).toHaveBeenCalledWith(<ChordExercise type='random' />);
    });

    it('calls showElement with MainMenu on back button click', () => {
        // arrange
        const { showElement } = require('../../layers/UILayer.jsx').UIContext._currentValue;
        const { default: MainMenu } = require('./MainMenu.jsx');
        // act
        render(<ChordMenu />);
        screen.getByText('back').click();
        // assert
        expect(showElement).toHaveBeenCalledWith(<MainMenu />);
    });


});
