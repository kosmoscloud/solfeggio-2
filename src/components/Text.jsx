import { useContext } from 'react';

import { UIContext } from '../layers/UILayer';

function Text({children, wrap=false, center=true, lineHeight="1.5", size='normal', isSelected}) {

    const { styleSheet } = useContext(UIContext)

    const style = {
        flex: 1,
        color: isSelected ? styleSheet.enabled : styleSheet.text,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        justifyContent: 'center',
        WebkitTextSizeAdjust: '80%',
        whiteSpace: wrap ? "normal" : "nowrap",
        alignItems: center ? "center" : "flex-start",
        lineHeight: lineHeight,
        fontSize: size === 'small' ? 'clamp(0.6em, 1.5vmax, 1rem)' : 'clamp(0.75rem, 1vmax, 1rem)',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
    };

    return (
        <div style={style}>
            {children}
        </div>
    );
}

export default Text;
