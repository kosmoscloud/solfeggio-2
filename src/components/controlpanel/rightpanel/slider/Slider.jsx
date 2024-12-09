import React from "react";
import "./style.css";
import Header from "./header/Header";


class Slider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
        
        this.handleMouseDown = (e) => {
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
                this.setState({value: newValue});
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
    }

    componentDidUpdate() {
        const sliderBlock = document.querySelector(`.box${this.props.number} .slider-block`);
        sliderBlock.addEventListener('mousedown', this.handleMouseDown);
    }

    render() {
        return (
            <div className={"box"+this.props.number}>
                <div className="slider">
                    <Header text={this.props.text}/>
                    <div className="slider-content">
                        <div className="slider-left-button"/>
                        <div className="slider-bar">
                            <div className="slider-block">
                                {this.state.value}
                            </div>
                        </div>
                        <div className="slider-right-button"/>
                    </div>
                </div>
            </div>
        );
    };
}

export default Slider;
