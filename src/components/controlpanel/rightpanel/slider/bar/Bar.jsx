import React from 'react';
import './style.css';
import Button from './button/Button';

class Bar extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isDragging: false,
            value: 0
        };
        this.sliderAreaRef = React.createRef();
        this.sliderBlockRef = React.createRef();
    }

    changeStateValue = (value) => {
        return () => {
            let newValue = this.state.value + value;
            if (newValue < 0) newValue = 0;
            if (newValue > 100) newValue = 100;
            this.setState({ value: newValue });
            this.updateBlockPosition(newValue);
            console.log('new value:', newValue);
        };
    }

    updateBlockPosition(newValue) {
        const sliderArea = this.sliderAreaRef.current;
        const sliderAreaWidth = sliderArea.offsetWidth;
        const sliderBlock = this.sliderBlockRef.current;
        const sliderBlockWidth = sliderBlock.offsetWidth;
        const newLeft = (newValue / 100) * (sliderAreaWidth - sliderBlockWidth);
        sliderBlock.style.left = `${newLeft}px`;
    }

    handleClick(e) {
        const sliderArea = e.target.closest('.slider-area');
        const sliderAreaWidth = sliderArea.offsetWidth;
        const sliderBlock = e.target.closest('.slider-block');
        const sliderBlockWidth = sliderBlock.offsetWidth;

        this.setState({ isDragging: true });

        const onMouseMove = (e) => {
            if (this.state.isDragging) {

                const sliderAreaRect = sliderArea.getBoundingClientRect();
                let newLeft = e.clientX - sliderAreaRect.left - sliderBlockWidth / 2;

                if (newLeft < 0) newLeft = 0;
                if (newLeft > sliderAreaWidth - sliderBlockWidth) newLeft = sliderAreaWidth - sliderBlockWidth;

                const newValue = (newLeft / (sliderAreaWidth - sliderBlockWidth)) * 100;
                sliderBlock.style.left = `${newLeft}px`;
                this.setState({ value: newValue });
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            this.setState({ isDragging: false });
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    render() {
        return (
            <div className="slider-bar">
                <Button direction="left" onClick={this.changeStateValue(-1)}/>
                <div className="slider-area" ref={this.sliderAreaRef}>
                    <div className="slider-block" onMouseDown={this.handleClick} ref={this.sliderBlockRef}>
                        {Math.round(this.state.value, 2)}
                    </div>
                </div>
                <Button direction="right" onClick={this.changeStateValue(1)}/>
            </div>
        );
    }
}

export default Bar;
