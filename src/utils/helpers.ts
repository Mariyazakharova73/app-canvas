import { KeyboardEvent } from 'react';
import { Ball } from './ball';
import { ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP } from './variables';

let LEFT: boolean | undefined;
let UP: boolean | undefined;
let RIGHT: boolean | undefined;
let DOWN: boolean | undefined;

export const changeSpeed = (ball: Ball) => {
  if (LEFT) {
    ball.speed_x = -ball.speed;
  }
  if (UP) {
    ball.speed_y = -ball.speed;
  }
  if (RIGHT) {
    ball.speed_x = ball.speed;
  }
  if (DOWN) {
    ball.speed_y = ball.speed;
  }

  if (!UP && !DOWN) {
    ball.speed_y = 0;
  }

  if (!LEFT && !RIGHT) {
    ball.speed_x = 0;
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
