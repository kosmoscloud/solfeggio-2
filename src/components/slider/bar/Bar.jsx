import React, { useEffect } from 'react';

import './style.css';

function Bar ({min, max, value, isEnabled, onChange}) {
    const minValue = min || 0;
    const maxValue = max || 100;
    const sliderAreaRef = React.useRef();
    const sliderBlockRef = React.useRef();

    const updateBlockPosition = (newValue) => {
        const { offsetWidth: areaWidth } = sliderAreaRef.current;
        const { offsetWidth: blockWidth, style } = sliderBlockRef.current;
        style.left = `${((newValue - minValue) / (maxValue - minValue)) * (areaWidth - blockWidth)}px`;
    }

    useEffect(() => {
        updateBlockPosition(value);
    //eslint-disable-next-line
    }, [value]);

    const handleMouseDown = (e) => {
        const sliderArea = sliderAreaRef.current;
        const sliderBlock = sliderBlockRef.current;
        const sliderAreaWidth = sliderArea.offsetWidth;
        const sliderBlockWidth = sliderBlock.offsetWidth;

        const onMouseMove = (e) => {
                const { left } = sliderArea.getBoundingClientRect();
                const newLeft = Math.min(Math.max(0, e.clientX - left - sliderBlockWidth / 2), sliderAreaWidth - sliderBlockWidth);
                const newValue = Math.round((newLeft / (sliderAreaWidth - sliderBlockWidth)) * (maxValue - minValue) + minValue);
                sliderBlock.style.left = `${newLeft}px`;
                value = newValue;
                onChange(newValue);
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
        <div className={isEnabled ? "slider-area" : "disabled-slider-area"} ref={sliderAreaRef}>
            <div className={isEnabled ? "slider-block" : "disabled-slider-block"} onMouseDown={isEnabled ? handleMouseDown : null} ref={sliderBlockRef}>
                {Math.round(value)}
            </div>
        </div>
    );
}

export default Bar;
