import React from 'react';
import Buttons from '../Buttons/Buttons';
import Path from '../Path/Path';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import './GameBoard.css';
import {
    changeStart,
    checkCollision,
    generateApple,
    generateSnake,
    initialize,
    move,
    reset,
    turn,
} from '../../action';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    currenDirection: state.direction,
    eatten: state.eatten,
    gameOver: state.gameOver,
    snake: state.snake,
    started: state.started
});

const mapDispatchToProps = (dispatch) => ({
    changeStart: (stared) => dispatch(changeStart(stared)),
    checkCollision: () => dispatch(checkCollision()),
    generateApple: () => dispatch(generateApple()),
    generateSnake: () => dispatch(generateSnake()),
    initialiize: () => dispatch(initialize()),
    move: () => dispatch(move()),
    reset: () => dispatch(reset()),
    turn: (direction) => dispatch(turn(direction))
})

class GameBoard extends React.Component {

    componentDidMount() {
        this.props.initialiize();
        this.props.generateApple();
        this.props.generateSnake();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    start = () => {
        if (!this.props.started) this.interval = setInterval(this.move, 200);
        this.props.changeStart(true);
    }

    move = () => {
        this.props.move();
        this.props.checkCollision();
        if (this.props.eatten) this.props.generateApple();
        this.props.generateSnake();
    }

    reset = () => {
        clearInterval(this.interval);
        this.props.reset();
        this.props.initialiize();
        this.props.generateApple();
        this.props.generateSnake();
    }

    render() {
        return (
            <div >
                <KeyboardEventHandler handleKeys={["space", "up", "down", "left", "right"]} onKeyEvent={(key) => {
                    if (key === "space") this.start();
                    else this.props.turn(key);
                }} />
                <div className="display">
                    <div className="headpart"></div>
                    <div className="score-board">
                        <span>Score : </span>
                        <span>{(this.props.snake.length - 1) * 10}</span>
                    </div>
                    <Path />
                    <Buttons play={this.start} turn={this.props.turn} reset={this.reset} currentDirection={this.props.currenDirection} />
                    {this.props.gameOver && <div className="over-board">
                        <div>GameOver-:) </div>
                        <div><sup>Scrore : </sup>{(this.props.snake.length - 1) * 10}</div>
                    </div>}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
