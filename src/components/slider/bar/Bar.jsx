import React, { useEffect } from 'react';
import './style.css';
import Button from './button/Button';

function Bar (props) {
    const min = props.min || 0;
    const max = props.max || 100;
    const [value, setValue] = React.useState(props.initialValue || (min + max) / 2);
    const sliderAreaRef = React.useRef();
    const sliderBlockRef = React.useRef();

    const changeStateValue = (addValue) => () => {
        if (!props.enabled) return;
        const newValue = Math.min(max, Math.max(min, value + addValue));
        setValue(newValue);
        updateBlockPosition(newValue);
    }

    const updateBlockPosition = (newValue) => {
        const { offsetWidth: areaWidth } = sliderAreaRef.current;
        const { offsetWidth: blockWidth, style } = sliderBlockRef.current;
        console.log(areaWidth, blockWidth);
        style.left = `${((newValue - min) / (max - min)) * (areaWidth - blockWidth)}px`;
    }

    useEffect(() => {
        updateBlockPosition(value);
    //eslint-disable-next-line
    }, []);

    const handleMouseDown = (e) => {
        const sliderArea = sliderAreaRef.current;
        const sliderBlock = sliderBlockRef.current;
        const sliderAreaWidth = sliderArea.offsetWidth;
        const sliderBlockWidth = sliderBlock.offsetWidth;

        const onMouseMove = (e) => {
                const { left } = sliderArea.getBoundingClientRect();
                const newLeft = Math.min(Math.max(0, e.clientX - left - sliderBlockWidth / 2), sliderAreaWidth - sliderBlockWidth);
                const newValue = Math.round((newLeft / (sliderAreaWidth - sliderBlockWidth)) * (max - min) + min);
                sliderBlock.style.left = `${newLeft}px`;
                setValue(newValue);
                props.onChange(newValue);
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
