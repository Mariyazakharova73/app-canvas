import { useEffect, useRef } from 'react';
import { Wall } from '../utils/classes/wall';

type Draw = (ctx: CanvasRenderingContext2D) => void;

function resizeCanvas(canvas: HTMLCanvasElement) {
  const { width, height } = canvas.getBoundingClientRect();

  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio: ratio = 1 } = window;
    const context = canvas.getContext('2d');
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context?.scale(ratio, ratio);
    return true;
  }

  return false;
}

const useCanvas = (draw: Draw) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas?.focus();

    if (canvas) {
      let edge1 = new Wall(0, 0, canvas.clientWidth, 0);
      let edge2 = new Wall(
        canvas.clientWidth,
        0,
        canvas.clientWidth,
        canvas.clientHeight,
      );
      let edge3 = new Wall(
        canvas.clientWidth,
        canvas.clientHeight,
        0,
        canvas.clientHeight,
      );
      let edge4 = new Wall(0, canvas.clientWidth, 0, 0);
      resizeCanvas(canvas);
    }

    const context = canvas?.getContext('2d');
    let animationFrameId: number;

    const render = () => {
      if (canvas) {
        context?.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      }

      if (context) {
        draw(context);
      }

      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
