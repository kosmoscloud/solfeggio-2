import { useContext } from 'react';

import { UIContext, showElement } from '../layers/UILayer';
import About from '../ui/overlays/About.jsx';

function Title({children}) {

    const { styleSheet, showElement } = useContext(UIContext);

    const style = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 'auto',
        height: '100%',
        margin: '0.5rem',
        fontSize: 'clamp(1.5rem, 2.5vmax, 3rem)',
        color: styleSheet.text,
        WebkitTextSizeAdjust: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        textShadow: "0.5vmin 0.5vmin 0 " + styleSheet.background,
        cursor: 'help'
    }

    return (
        <div style={style} onClick={() => showElement(<About />)}>
            {children}
        </div>
    );
}

export default Title;
