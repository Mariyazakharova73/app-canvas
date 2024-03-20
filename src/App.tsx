import { KeyboardEvent, useCallback } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import { Ball } from './utils/classes/ball';
import { changeAcceleration, changeKey, randInt } from './utils/helpers';
import {
  getCollision,
  handleCollision,
  moveAwayBalls,
} from './utils/helpers/ballCollision';
import {
  denyEntryBW,
  getCollisionBW,
  handleCollisionBW,
} from './utils/helpers/wallCollision';
import { BALL_COLOR, MAIN_BALL_COLOR, ballsArr, wallsArr } from './utils/variables';

function App() {
  for (let i = 0; i < 10; i++) {
    const ball = new Ball(
      randInt(100, 500),
      randInt(50, 400),
      randInt(20, 50),
      randInt(0, 10),
      BALL_COLOR,
    );
  }

  // const ball1 = new Ball(200, 250, 50, 10, BALL_COLOR);
  // const ball2 = new Ball(300, 200, 20, 10, BALL_COLOR);
  // const ball3 = new Ball(250, 220, 35, 3, BALL_COLOR);
  ballsArr[0].player = true;
  ballsArr[0].color = MAIN_BALL_COLOR;

  const moveBall = useCallback((ball: Ball) => {
    changeAcceleration(ball);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLCanvasElement>) => {
    changeKey(e, true);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLCanvasElement>) => {
    changeKey(e, false);
  };

  // main field
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ballsArr.forEach((ball, index) => {
        ball.drawBall(ctx);
        if (ball.player) {
          moveBall(ball);
        }

        wallsArr.forEach(w => {
          if (getCollisionBW(ballsArr[index], w)) {
            denyEntryBW(ballsArr[index], w);
            handleCollisionBW(ballsArr[index], w);
          }
        });

        for (let i = index + 1; i < ballsArr.length; i++) {
          if (getCollision(ballsArr[index], ballsArr[i])) {
            moveAwayBalls(ballsArr[index], ballsArr[i]);
            handleCollision(ballsArr[index], ballsArr[i]);
          }
        }

        ball.display(ctx);
        ball.reposition();
      });

      wallsArr.forEach(wall => {
        wall.drawWall(ctx);
      });
    },
    [moveBall],
  );

  return (
    <div className="App">
      <Canvas draw={draw} handleKeyDown={handleKeyDown} handleKeyUp={handleKeyUp} />
    </div>
  );
}

export default App;
