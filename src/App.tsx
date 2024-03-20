import { KeyboardEvent, MouseEvent, useCallback, useState } from 'react';
import './App.css';
import Canvas from './components/Canvas/Canvas';
import Modal from './components/Modal/Modal';
import { Ball } from './utils/classes/ball';
import {
  getCollision,
  handleCollision,
  moveAwayBalls,
} from './utils/helpers/ballCollision';
import { changeAcceleration, changeKey, randInt } from './utils/helpers/helpers';
import {
  denyEntryBW,
  getCollisionBW,
  handleCollisionBW,
} from './utils/helpers/wallCollision';
import { BALL_COLOR, MAIN_BALL_COLOR, ballsArr, wallsArr } from './utils/variables';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  for (let i = 0; i < 10; i++) {
    const ball = new Ball(
      randInt(100, 500),
      randInt(50, 400),
      randInt(20, 50),
      randInt(0, 10),
      BALL_COLOR,
    );
  }

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

  const handleCanvasClick = (e: MouseEvent<HTMLCanvasElement>) => {
    console.log(e.clientX);
    console.log(e.clientY);
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
      <Modal isOpen={isOpen}>ggggg</Modal>
      <Canvas
        draw={draw}
        handleKeyDown={handleKeyDown}
        handleKeyUp={handleKeyUp}
        handleCanvasClick={handleCanvasClick}
      />
    </div>
  );
}

export default App;
