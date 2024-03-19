import { KeyboardEvent } from 'react';
import { Ball } from './ball';
import { ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP } from './variables';

let LEFT: boolean | undefined;
let UP: boolean | undefined;
let RIGHT: boolean | undefined;
let DOWN: boolean | undefined;

export const changeAcceleration = (ball: Ball) => {
  if (LEFT) {
    ball.acc.x = -ball.acceleration;
  }
  if (UP) {
    ball.acc.y = -ball.acceleration;
  }
  if (RIGHT) {
    ball.acc.x = ball.acceleration;
  }
  if (DOWN) {
    ball.acc.y = ball.acceleration;
  }

  if (!UP && !DOWN) {
    // шар движется с постоянной скоростью
    ball.acc.y = 0;
  }

  if (!LEFT && !RIGHT) {
    // шар движется с постоянной скоростью
    ball.acc.x = 0;
  }
};

export const changeKey = (e: KeyboardEvent<HTMLCanvasElement>, value: boolean) => {
  switch (e.key) {
    case ARROW_LEFT:
      LEFT = value;
      break;
    case ARROW_UP:
      UP = value;
      break;
    case ARROW_RIGHT:
      RIGHT = value;
      break;
    case ARROW_DOWN:
      DOWN = value;
      break;
    default:
      break;
  }
};
