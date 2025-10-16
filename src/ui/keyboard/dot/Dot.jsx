import React from 'react'
import { UIContext } from '../../../layers/UILayer'
import './style.css'

function Dot () {

    const {styleSheet} = React.useContext(UIContext);


    const dotStyle = {
        position: "absolute",
        bottom: "5%",
        width: "1em",
        aspectRatio: "1",
        backgroundColor: styleSheet.background,
        borderRadius: "50%"
    };

    return <div style={dotStyle}/>
}

export default Dot;
