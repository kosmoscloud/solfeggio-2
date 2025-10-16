import { render, screen } from '@testing-library/react';

import LanguageSelector from './LanguageSelector';

jest.mock('../../layers/UILayer.jsx', () => {
    const React = require('react');
    const mockLanguage = 'en';
    const mockDictionary = {
        language: 'language',
    }
    return {
        LanguageContext: React.createContext({ dictionary: mockDictionary, language: mockLanguage }),
    };
});

jest.mock('../../components/FlexContainer.jsx', () => {
    return { __esModule: true, default: ({ children }) => <div>{children}</div> };
});

jest.mock('../../components/Text.jsx', () => {
    return { __esModule: true, default: ({ children }) => <div>{children}</div> };
});

jest.mock('../../components/Select.jsx', () => {
    return { __esModule: true, default: ({ children, ...props }) => <select {...props}>{children}</select> };
});

describe('LanguageSelector', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the language selector with the correct options', () => {
        render(<LanguageSelector />);
        expect(screen.getByText('language')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Polski' })).toBeInTheDocument();
        //expect(screen.getByRole('option', { name: 'Español' })).toBeInTheDocument();
    });
});
