import React, { useContext } from 'react';

import { UIContext, LanguageContext } from '../../../managers/UILayer.jsx';

import ExerciseMenu from '../exercisemenu/ExerciseMenu.jsx';
import QuizMenu from '../quizmenu/QuizMenu.jsx';
import SettingsMenu from '../settingsmenu/SettingsMenu';

import Overlay from '../../overlays/Overlay.jsx';
import Text from '../../../components/text/Text.jsx';
import Table from '../../../components/table/Table.jsx';
import Title from '../../../components/title/Title.jsx';
import Column from '../../../components/table/column/Column.jsx';
import MenuOption from '../../../components/menuoption/MenuOption.jsx';
import Select from '../../../components/select/Select.jsx';
import Grid from '../../../components/grid/Grid.jsx';
import Spacer from '../../../components/spacer/Spacer.jsx';

function MainMenu() {

    const { showElement, aspectRatio } = useContext(UIContext);
    const { dictionary, language, setLanguageAndFetchDictionary } = useContext(LanguageContext);

    const { dimx } = aspectRatio >= 1.25 ? { dimx: 3 } : { dimx: 1 };

    return (
        <Overlay minWidth="50%">
            <Column alignItems="center">
                <Table>
                    <Spacer length={3} alignItems="flex-start">
                        <Title>Solfeggio-2</Title>
                    </Spacer>
                    {aspectRatio >= 1.25 && <Column width={1} alignItems='flex-start' gap={false}>
                        <Text center={false} >{dictionary.language}</Text>
                        <Select onChange={(e) => setLanguageAndFetchDictionary(e.target.value)} value={language}>
                            <option value="en">English</option>
                            <option value="pl">Polski</option>
                            <option value="es">Español</option>
                        </Select>
                    </Column>}
                </Table>
                <Grid dimx={dimx}>
                    {aspectRatio < 1.25 && <Column width={1} alignItems='flex-start' gap={false}>
                        <Text center={false} >{dictionary.language}</Text>
                        <Select onChange={(e) => setLanguageAndFetchDictionary(e.target.value)} value={language}>
                            <option value="en">English</option>
                            <option value="pl">Polski</option>
                            <option value="es">Español</option>
                        </Select>
                    </Column>}
                    <MenuOption label={dictionary.exercises} onClick={() => showElement(<ExerciseMenu />)}/>
                    <MenuOption label={dictionary.quizzes} onClick={() => showElement(<QuizMenu />)}/>
                    <MenuOption label={dictionary.settings} onClick={() => showElement(<SettingsMenu />)}/>
                </Grid>
            </Column>
        </Overlay>
    )

}

export default MainMenu;