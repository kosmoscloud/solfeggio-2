import React from 'react';

import Header from './Header';
import Button from './Button';

import FlexContainer from './FlexContainer';

function Banner({text, onClick}) {

    let style = {
        display: 'flex',
        alignItems: 'stretch',
        position: 'absolute',
        top: '5%',
        left: '10%',
        width: '80%',
        height: '6%',
        gap: '1vmin',
    }

    return (
        <div style={style}>
            <Header text={text}/>
            {onClick && <FlexContainer length={0.05} padding={false} >
                <Button label="»" shadow={false} onClick={onClick}/>
            </FlexContainer>}
        </div>
    )
}

export default Banner;
