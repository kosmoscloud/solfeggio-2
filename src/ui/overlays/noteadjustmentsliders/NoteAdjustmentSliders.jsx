import React, {useContext} from 'react';

import { GlobalSettingsContext } from '../../../managers/GlobalSettingsLayer';
import { LanguageContext } from '../../../managers/UILayer';

import Column from '../../../components/table/column/Column';
import Slider from '../../../components/slider/Slider';
import Text from '../../../components/text/Text';

function NoteAdjustmentSliders() {
    const { noteLength, setNoteLength, noteSpacing, setNoteSpacing } = useContext(GlobalSettingsContext);
    const { dictionary } = useContext(LanguageContext);
    
    const setScaledNoteLength = (value) => {
        setNoteLength(0.1 + value / 100 * 0.9);
    }

    const setScaledNoteSpacing = (value) => {
        setNoteSpacing(0.1 + value / 100 * 0.9);
    }

    const invertedNoteLength = (noteLength - 0.1) / 0.9 * 100;
    const invertedNoteSpacing = (noteSpacing - 0.1) / 0.9 * 100;

    return (
        <Column width={1} padding={false} >
            <Text>{dictionary.playbacksettings}</Text>
            {/* spacing slider - 0 means 0.1 second, 100 means 1 second */}
            <Slider text={dictionary.notespacing} onChange={setScaledNoteSpacing} value={invertedNoteSpacing} />
            {/* note length slider - 0 means 0.1 second, 100 means 1 seconds */}
            <Slider text={dictionary.notelength} onChange={setScaledNoteLength} value={invertedNoteLength}/>
        </Column>
    );
}

export default NoteAdjustmentSliders;
