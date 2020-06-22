import {
    CHANGE_START,
    CHECK_COLLISION,
    GENERATE_APPLE,
    GENERATE_SNAKE,
    INITIALIZE,
    MOVE,
    RESET,
    TURN
} from './constants';

const initialState = {
    apple: [],
    boardSize: 0,
    borderWidth: 15,
    direction: "right",
    eatten: false,
    gameOver: false,
    head: [0, 0],
    length: 1,
    numberOfPiece: 20,
    percentage: 80,
    size: 0,
    snake: [],
    started: false
}

export const reducer = (state = initialState, action = {}) => {
    switch (action.type) {

        // Change start
        case CHANGE_START:
            return Object.assign({}, state, {
                started: action.payload
            });

        // Check Collision
        case CHECK_COLLISION:
            let gameOver = state.gameOver;
            let length = state.length;
            let direction = state.direction;

            if (state.snake.length > 1) {
                for (let i = 0; i < state.snake.length; i++) {
                    if (state.snake[i][0] === state.head[0] && state.snake[i][1] === state.head[1]) {
                        gameOver = true;
                        direction = "";
                    }
                }
            }

            if (state.apple[0] === state.head[0] && state.apple[1] === state.head[1]) {
                state.eatten = true;
                length++;
            }
            return Object.assign({}, state, {
                direction: direction,
                gameOver: gameOver,
                length: length
            });

        // Generate Apple
        case GENERATE_APPLE:
            // Declaring variables
            let location = 0;
            let y = 0;
            let x = 0;

            // Generating a random number beween 0 -and square of 'numberOfPiece' and assign the value to the variable 'location'
            location = Math.floor(Math.random() * (state.numberOfPiece ** 2));
            // Calculating the 'y' value by deviding 'location' by 'numberOfPiece'
            y = Math.floor(location / state.numberOfPiece);

            // Calculating the 'x' value by subtracting the 'y' * 'numberOfPiece'  from the 'location'
            x = location - (y * state.numberOfPiece);

            // Multipying the 'x' and 'y' value with 'size' the find the apple location
            x *= state.size;
            y *= state.size;

            return Object.assign({}, state, {
                apple: [x, y],
                eatten: false,
            });

        // GenerateSnake
        case GENERATE_SNAKE:
            let newSnake = Array(state.length);

            if (state.snake.length < state.length) {
                newSnake.splice(0, newSnake.length - 1, ...state.snake.slice(0, state.snake.length));
            } else {
                newSnake.splice(0, newSnake.length - 1, ...state.snake.slice(1, state.snake.length))
            }
            newSnake[newSnake.length - 1] = state.head;
            return Object.assign({}, state, {
                snake: newSnake
            });

        // Initializing
        case INITIALIZE:
            // Declaring variables
            let boardSize = 0;
            let size = 0;

            //  Calculating width and height of the board

            // From total screen width and height finding smallest 
            // Calculating 80% of the the value got from the previous step
            // Assing the result  to the 'boardSize'  variable
            boardSize = Math.round((state.percentage / 100) * Math.min(window.innerWidth, window.innerHeight));

            // Making the 'borderSize' variable devisible by the 'numberOfPiece' for avoiding getting floating point number in 'size'
            boardSize += (state.numberOfPiece - (boardSize % state.numberOfPiece));

            // Calculating 'size' by dividing 'boardSize'  by  'numberOfPeice'
            size = boardSize / state.numberOfPiece;

            // Adding the 'boderWidth' to the 'boardSize' 
            boardSize += state.borderWidth * 2;

            return Object.assign({}, state, {
                boardSize: boardSize,
                head: [size, size],
                path: Array(state.numberOfPiece ** 2).fill(0),
                size: size
            })

        // Move
        case MOVE:
            let newHead = state.head.slice();
            if (!state.gameOver) {
                if (state.direction === "right" && newHead[0] + state.size < state.size * state.numberOfPiece) {
                    newHead[0] += state.size;
                } else if (state.direction === "left" && newHead[0] > 0) {
                    newHead[0] -= state.size;
                } else if (state.direction === "down" && newHead[1] + state.size < state.size * state.numberOfPiece) {
                    newHead[1] += state.size;
                } else if (state.direction === "up" && newHead[1] > 0) {
                    newHead[1] -= state.size;
                } else {
                    console.log("nothing");
                }
            }
            return Object.assign({}, state, {
                head: newHead
            });

        // Reset
        case RESET:
            return Object.assign({}, state, {
                apple: [],
                direction: "right",
                eatten: false,
                gameOver: false,
                head: [state.size, state.size],
                length: 1,
                snake: [],
                started: false
            });

        // Turn
        case TURN:
            return Object.assign({}, state, {
                direction: action.payload
            });

        default:
            return state;
    }
}
