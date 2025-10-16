import { useContext } from 'react'

import { UIContext } from '../layers/UILayer'

function Background() {

    const { styleSheet } = useContext(UIContext)

    const style = {
        backgroundColor: styleSheet.background,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    }

    return <div style={style}/>
}

export default Background
