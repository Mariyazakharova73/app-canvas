import { ballsArr } from './variables';

export class Ball {
  x: number;
  y: number;
  r: number;
  color: string | CanvasGradient | CanvasPattern;
  player: boolean;
  speed: number;
  speed_x: number;
  speed_y: number;

  constructor(x: number, y: number, r: number, color: string) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.player = false;

    this.speed = 10;
    this.speed_x = 0;
    this.speed_y = 0;

    // Добавляем мяч в массив при создании экземпляра
    ballsArr.push(this);
  }

  drawBall(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
