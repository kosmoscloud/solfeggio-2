import React from 'react';
import './style.css';
import { openAboutOverlay } from '../overlays/about/About';
import { MenuItem } from './menuitem/MenuItem';
import { MenuSeparator } from './menuseparator/MenuSeparator';

class MenuBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openedMenu: null
        };
        this.menus = { 
            'Pliki': {
                        'Załaduj konfigurację': null,
                        'Zapisz konfigurację': null,
                        '-': null,
                        'Koniec': null
                    },
            'Ćwiczenia': {
                        'Pojedynczy dźwięk': null,
                        'Interwał': null,
                        'Melodia rosnąca': null,
                        'Melodia': null,
                        'Trójdźwięk': null,
                        'Akord z septymą': null,
                        'Akord z noną': null,
                        'Akord z undecymą': null,
                        'Akord przypadkowy': null,
                    },
            'Zapytania': {
                        'Interwały': null,
                        'Rodzaje trójdźwięków': null,
                        'Rodzaje akordów z septymą': null,
                        'Przewroty trójdźwięków': null,
                        'Przewroty trójdźwięków z septymą': null,
                    },
            'Zakresy': {
                        'C1 - C2': null,
                        'C2 - C3': null,
                        'C3 - C4': null,
                        'C4 - C5': null,
                        'C5 - C6': null,
                        'C6 - C7': null,
                        'C7 - C8': null,
            },
            'Opcje': {
                        'Ustawienia': null,
                        'Pomoc': null,
                        'O programie': () => { openAboutOverlay(); this.setState({ openedMenu: null }); },
            }
        };
        this.updateOpenedMenu = (menuName) => {
            if (this.state.openedMenu === menuName) {
                this.setState({ openedMenu: null });
            }
            else {
                this.setState({ openedMenu: menuName });
            }
        }
    }

    render() {
        return  <div className="menu-bar">
                    {Object.keys(this.menus).map((menuName) =>
                            <div className="menu-container" key={menuName}>
                                <p 
                                    className={this.state.openedMenu===menuName ? 'opened-menu' : 'closed-menu'}
                                    onClick={() => {
                                        this.updateOpenedMenu(menuName);
                                    }}
                                >
                                    {menuName}
                                </p>
                                {this.state.openedMenu===menuName && (
                                    <div className="menu-list">
                                        {Object.keys(this.menus[menuName]).map((menuItemName) => {
                                            return <MenuItem name={menuItemName} />
                                        }
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                </div>
    }

}

export default MenuBar;
