import { KeyboardEvent, MouseEvent } from 'react';
import useCanvas from '../../hooks/useCanvas';
import s from './Canvas.module.css';

export interface CanvasProps {
  draw: (ctx: CanvasRenderingContext2D) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLCanvasElement>) => void;
  handleKeyUp: (e: KeyboardEvent<HTMLCanvasElement>) => void;
  handleCanvasClick: (e: MouseEvent<HTMLCanvasElement>) => void;
}

const Canvas = (props: CanvasProps) => {
  const { draw, handleKeyDown, handleKeyUp, handleCanvasClick, ...rest } = props;

  const canvasRef = useCanvas(draw);

  return (
    <canvas
      tabIndex={0}
      ref={canvasRef}
      {...rest}
      onClick={handleCanvasClick}
      className={s.canvas}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    />
  );
};

export default Canvas;
