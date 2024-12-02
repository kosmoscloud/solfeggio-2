import React from 'react';
import './style.css';

function MenuItem({ name, onClick }) {
    return <li 
            className="menu-item"
            onClick={onClick}
        >{name}</li>;
}

function MenuSeparator() {
    return <hr className="menu-separator"/>;
}

const menus = { 
    'Pliki': [
                MenuItem({'name': 'Załaduj konfigurację'}),
                MenuItem({'name': 'Zapisz konfigurację'}),
                MenuSeparator(),
                MenuItem({'name': 'Koniec'})
            ],
    'Ćwiczenia': [
                MenuItem({'name': 'Pojedynczy dźwięk'}),
                MenuItem({'name': 'Interwał'}),
                MenuItem({'name': 'Melodia rosnąca'}),
                MenuItem({'name': 'Melodia'}),
                MenuItem({'name': 'Trójdźwięk'}),
                MenuItem({'name': 'Akord z septymą'}),
                MenuItem({'name': 'Akord z noną'}),
                MenuItem({'name': 'Akord z undecymą'}),
                MenuItem({'name': 'Akord przypadkowy'})
            ],
    'Zapytania': [
                MenuItem({'name': 'Interwały'}),
                MenuItem({'name': 'Rodzaje trójdźwięków'}),
                MenuItem({'name': 'Rodzaje akordów z septymą'}),
                MenuItem({'name': 'Przewroty trójdźwięków'}),
                MenuItem({'name': 'Przewroty trójdźwięków z septymą'})
            ],
    'Zakresy': [
                MenuItem({'name': 'C1 - C2'}),
                MenuItem({'name': 'C2 - C3'}),
                MenuItem({'name': 'C3 - C4'}),
                MenuItem({'name': 'C4 - C5'}),
                MenuItem({'name': 'C5 - C6'}),
                MenuItem({'name': 'C6 - C7'}),
                MenuItem({'name': 'C7 - C8'})
            ],

    'Opcje': [ 
                MenuItem({'name': 'Ustawienia'}),
                MenuItem({'name': 'Pomoc'}),
                MenuItem({'name': 'O programie'})
            ]
};


function MenuBar() {

    const [ openedMenu, setOpenedMenu ] = React.useState(null);

    const onClick = (menuName) => {
        if (openedMenu === menuName) {
            setOpenedMenu(null);
        }
        else {
            setOpenedMenu(menuName);
        }
    }

    return  <div className="menu-bar">
                {Object.keys(menus).map((menuName) =>
                        <div className="menu-container" key={menuName}>
                            <p 
                                className={openedMenu===menuName ? 'opened-menu' : 'closed-menu'}
                                onClick={() => onClick(menuName)}
                            >
                                {menuName}
                            </p>
                            {openedMenu===menuName && (
                                <div className="menu-list">
                                    {menus[menuName].map((menuItem, index) =>
                                        <div>
                                            {menuItem}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
            </div>
}


export default MenuBar;
