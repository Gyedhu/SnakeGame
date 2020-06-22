import React from 'react';
import './Buttons.css';

export default class Buttons extends React.Component {
    render() {
        const { play, turn, reset, currentDirection } = this.props;
        return (
            <div className="buttons">
                <div className="playButtons">
                    <button onClick={play}><i className="fa fa-play"></i></button>
                    <button onClick={reset}><i className="fa fa-repeat"></i></button>
                </div>
                <div className="controls">
                    <div></div>
                    <button onClick={() => currentDirection !== "down" ? turn("up") : turn("down")}><i className="fa fa-arrow-up"></i></button>
                    <div></div>
                    <button onClick={() => currentDirection !== "right" ? turn("left") : turn("right")}><i className="fa fa-arrow-left"></i></button>
                    <div></div>
                    <button onClick={() => currentDirection !== "left" ? turn("right") : turn("left")}><i className="fa fa-arrow-right"></i></button>
                    <div></div>
                    <button onClick={() => currentDirection !== "up" ? turn("down") : turn("up")}><i className="fa fa-arrow-down"></i></button>
                    <div></div>
                </div>
            </div >
        );
    }
}
