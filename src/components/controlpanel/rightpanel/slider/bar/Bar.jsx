import React from 'react';
import './style.css';
import Button from './button/Button';

function Bar (props) {
    const [value, setValue] = React.useState(0);
    const sliderAreaRef = React.useRef();
    const sliderBlockRef = React.useRef();

    const changeStateValue = (addValue) => () => {
        if (!props.enabled) return;
        const newValue = Math.min(100, Math.max(0, value + addValue));
        setValue(newValue);
        updateBlockPosition(newValue);
    }

    const updateBlockPosition = (newValue) => {
        const { offsetWidth: areaWidth } = sliderAreaRef.current;
        const { offsetWidth: blockWidth, style } = sliderBlockRef.current;
        style.left = `${(newValue / 100) * (areaWidth - blockWidth)}px`;
    }

    const handleMouseDown = (e) => {
        const sliderArea = sliderAreaRef.current;
        const sliderBlock = sliderBlockRef.current;
        const sliderAreaWidth = sliderArea.offsetWidth;
        const sliderBlockWidth = sliderBlock.offsetWidth;

        const onMouseMove = (e) => {
                const { left, width } = sliderArea.getBoundingClientRect();
                const newLeft = Math.min(Math.max(0, e.clientX - left - sliderBlockWidth / 2), sliderAreaWidth - sliderBlockWidth);
                const newValue = (newLeft / (sliderAreaWidth - sliderBlockWidth)) * 100;
                sliderBlock.style.left = `${newLeft}px`;
                setValue(newValue);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        e.preventDefault();
    }

    return (
        <div className={props.enabled ? "slider-bar" : "disabled-slider-bar"}>
            <Button direction="left" enabled={props.enabled} onClick={changeStateValue(-1)}/>
            <div className={props.enabled ? "slider-area" : "disabled-slider-area"} ref={sliderAreaRef}>
                <div className={props.enabled ? "slider-block" : "disabled-slider-block"} onMouseDown={props.enabled ? handleMouseDown : null} ref={sliderBlockRef}>
                    {Math.round(value)}
                </div>
            </div>
            <Button direction="right" enabled={props.enabled} onClick={changeStateValue(1)}/>
        </div>
    );
}

export default Bar;
