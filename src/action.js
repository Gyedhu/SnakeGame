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

// Change Start
export const changeStart = (stated) => ({
    type: CHANGE_START, 
    payload: stated
})

// Chack Collision
export const checkCollision = () => ({
    type: CHECK_COLLISION
});

// Generate Apple
export const generateApple = () => ({
    type: GENERATE_APPLE
});

// Generate Snake
export const generateSnake = () => ({
    type: GENERATE_SNAKE
});

// Initialize
export const initialize = () => ({
    type: INITIALIZE
});

// Move
export const move = () => ({
    type: MOVE
});

// Reset
export const reset = () => ({
    type: RESET
});

// Turn
export const turn = (direction) => ({
    type: TURN,
    payload: direction
});


