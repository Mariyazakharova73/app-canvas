import { KeyboardEvent, useCallback } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import { Ball } from './utils/ball';
import { changeAcceleration, changeKey } from './utils/helpers';
import { BALL_COLOR, ballsArr } from './utils/variables';

let friction = 0.1;

function App() {
  const ball1 = new Ball(100, 200, 30, BALL_COLOR);
  const ball2 = new Ball(300, 200, 20, BALL_COLOR);

  ball1.player = true;

  const moveBall = useCallback((ball: Ball) => {
    changeAcceleration(ball);

    ball.acc = ball.acc.unit().mult(ball.acceleration);
    ball.speed = ball.speed.add(ball.acc);
    // для уменьшения скорости
    ball.speed = ball.speed.mult(1 - friction);

    ball.x += ball.speed.x;
    ball.y += ball.speed.y;
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
      ballsArr.forEach(ball => {
        ball.drawBall(ctx);
        if (ball.player) {
          moveBall(ball);
        }
        ball.display(ctx);
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
