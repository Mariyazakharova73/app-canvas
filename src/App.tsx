import { KeyboardEvent, useCallback } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import { Ball } from './utils/ball';
import { ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP } from './utils/variables';

function App() {
  let LEFT: boolean | undefined;
  let UP: boolean | undefined;
  let RIGHT: boolean | undefined;
  let DOWN: boolean | undefined;
  const ball1 = new Ball(100, 200, 30, 'blue');

  const moveBall = useCallback(() => {
    if (LEFT) {
      ball1.x--;
    }
    if (UP) {
      ball1.y--;
    }
    if (RIGHT) {
      ball1.x++;
    }
    if (DOWN) {
      ball1.y++;
    }
  }, [DOWN, LEFT, RIGHT, UP]);

  const handleKeyDown = (e: KeyboardEvent<HTMLCanvasElement>) => {
    switch (e.key) {
      case ARROW_LEFT:
        LEFT = true;
        break;
      case ARROW_UP:
        UP = true;
        break;
      case ARROW_RIGHT:
        RIGHT = true;
        break;
      case ARROW_DOWN:
        DOWN = true;
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLCanvasElement>) => {
    switch (e.key) {
      case ARROW_LEFT:
        LEFT = false;
        break;
      case ARROW_UP:
        UP = false;
        break;
      case ARROW_RIGHT:
        RIGHT = false;
        break;
      case ARROW_DOWN:
        DOWN = false;
        break;
      default:
        break;
    }
  };

  // main field
  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      moveBall();

      ball1.drawBall(ctx);
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
