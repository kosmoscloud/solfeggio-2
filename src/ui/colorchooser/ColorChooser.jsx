import React from 'react';

import { UIContext } from '../../layers/UILayer';

const ColorChooserButton = ({color1, color2, onClick}) => {
    
    const [ isHovered, setIsHovered ] = React.useState(false);

    const squareStyle = {
        position: "relative",
        width: '3vmin',
        height: '3vmin',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        border: '1px solid black',
        cursor: 'pointer',
    }

    const triangleStyle = {
        position: 'absolute',
        width: '0',
        height: '0',
        borderLeft: '3vmin solid transparent',
        borderRight: '3vmin solid transparent',
    }

    const topLeft = {
        borderBottom: '3vmin solid ' + (isHovered ? color2 : color1),
        top: '0',
        left: '0',
        transform: 'translate(-50%, 0)',
    }

    const bottomRight = {
        borderTop: '3vmin solid ' + (isHovered ? color1 : color2),
        bottom: '0',
        right: '0',
        transform: 'translate(50%, 0)',
    }

    return (
        <div style={squareStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={onClick}>
            <div style={Object.assign({}, triangleStyle, topLeft)}></div>
            <div style={Object.assign({}, triangleStyle, bottomRight)}></div>
        </div>
    );
};

const ColorChooser = ({ styleSheets }) => {

    const { setStyleSheet } = React.useContext(UIContext);

    const colorChooserStyle = {
        position: 'absolute',
        bottom: '1vmin',
        right: '1vmin',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5vmin',
    }

    return (
        <div style={colorChooserStyle}>
            {styleSheets.map((styleSheet, index) => (
                <ColorChooserButton key={index} color1={styleSheet.background} color2={styleSheet.enabled} onClick={() => setStyleSheet(styleSheet)} />
            ))}
        </div>
    )
}

export default ColorChooser;
