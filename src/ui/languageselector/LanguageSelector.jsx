import { useContext } from 'react';

import { LanguageContext } from '../../layers/UILayer.jsx';

import FlexContainer from '../../components/FlexContainer.jsx';
import Text from '../../components/Text.jsx';
import Select from '../../components/Select.jsx';

function LanguageSelector() {
    const { dictionary, language, setLanguageAndFetchDictionary } = useContext(LanguageContext);

    return (
        <FlexContainer>
            <Text center={false} >{dictionary.language}</Text>
            <Select onChange={(e) => setLanguageAndFetchDictionary(e.target.value)} value={language}>
                <option value="en">English</option>
                <option value="pl">Polski</option>
            </Select>
        </FlexContainer>
    );
}

export default LanguageSelector;
