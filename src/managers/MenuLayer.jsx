import React, { createContext } from 'react';

import MainMenu from '../ui/menu/mainmenu/MainMenu';

export const MenuContext = createContext();

function MenuLayer() {
    const [activeMenu, setActiveMenu] = React.useState(<MainMenu />);

    const showMenu = (menu) => {
        setActiveMenu(menu);
    };

    const hideMenu = () => {
        setActiveMenu(null);
    };

    const renderActiveMenu = () => {
        if (activeMenu) {
            return activeMenu;
        }
    };

    return (
        <MenuContext.Provider value={{ showMenu, hideMenu }}>
            {renderActiveMenu()}
        </MenuContext.Provider>
    );
}

export default MenuLayer;
