import React from "react";
import "./style.css";
import Header from "./header/Header";


function Slider(props) {
    const [ value, setValue ] = React.useState(0);

    const handleMouseDown = (e) => {
        const sliderBar = e.target.closest('.slider-bar');
        const sliderBarRect = sliderBar.getBoundingClientRect();
        const sliderBlock = e.target.closest('.slider-block');
        const sliderBlockRect = sliderBlock.getBoundingClientRect();
        const onMouseMove = (e) => {
            let newValue = ((e.clientX - (sliderBarRect.left + sliderBlockRect.width / 2)) / (sliderBarRect.width - sliderBlockRect.width)) * 100;
            let newPosition = newValue * (sliderBarRect.width - sliderBlockRect.width) / sliderBarRect.width;
            let maxPercent = (sliderBarRect.width - sliderBlockRect.width) / sliderBarRect.width * 100;
            newValue = Math.round(Math.max(0, Math.min(newValue, 100)), 0);
            newPosition = Math.round(Math.max(0, Math.min(newPosition, maxPercent)), 0);
            setValue(newValue);
            console.log(newPosition);
            sliderBlock.style.left = newPosition + '%';
        };
        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    React.useEffect(() => {
        const sliderBlock = document.querySelector(`.box${props.number} .slider-block`);
        sliderBlock.addEventListener('mousedown', handleMouseDown);
        return () => {
            sliderBlock.removeEventListener('mousedown', handleMouseDown);
        };
    });

    return (
        <div className={"box"+props.number}>
            <div className="slider">
                <Header text={props.text}/>
                <div className="slider-content">
                    <div className="slider-left-button"/>
                    <div className="slider-bar">
                        <div className="slider-block">
                            {value}
                        </div>
                    </div>
                    <div className="slider-right-button"/>
                </div>
            </div>
        </div>
    );
}

export default Slider;
