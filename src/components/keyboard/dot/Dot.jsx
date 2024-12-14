import React from 'react'
import './style.css'

class Dot extends React.Component {
    render() {
        return <div className={`dot ${this.props.type}`}/>
    }
}

export default Dot;
