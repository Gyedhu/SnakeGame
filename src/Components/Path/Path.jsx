import React from 'react';
import { connect } from 'react-redux';
import './Path.css' 

const mapStateToProps = (state) => ({
    apple: state.apple,
    borderWidth: state.borderWidth,
    boardSize: state.boardSize,
    head: state.head,
    numberOfPiece: state.numberOfPiece,
    size: state.size,
    snake: state.snake
});


const Path = ({ apple, borderWidth, boardSize, head, numberOfPiece, path, size, snake }) => {
    const pathStyle = {
        border: `${borderWidth}px  solid #7777`,
        boxShadow: "0 0 5px 0 black",
        display: "grid",
        gridTemplateColumns: `repeat(${numberOfPiece}, 1fr)`,
        height: boardSize,
        position: "relative",
        transform: "traslateX(100%)",
        width: boardSize
    }
    return (
        <div style={pathStyle}>
            <div
                style={{ 
                    animationIterationCount: "infinite",
                    backgroundColor: "red",
                    borderRadius: "2px",
                    boxShadow: "0 0 1px  black",
                    height: size,
                    left: apple[0],
                    position: "absolute",
                    top: apple[1],
                    width: size
                }}
            ></div>

            {
                snake.map((value, index) => <div key={index} style={{
                    backgroundColor: value[0] === head[0] && value[1] === head[1] ? "#555" : "#ccc",
                    boxShadow: "0 0 1px black",
                    height: size,
                    left: value[0],
                    position: "absolute",
                    top: value[1],
                    width: size
                }}> </div>)
            }

        </div >
    );
}

export default connect(mapStateToProps)(Path);
