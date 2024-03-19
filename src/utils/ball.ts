import { ballsArr } from './variables';
import { Vector } from './vector';

export class Ball {
  x: number;
  y: number;
  r: number;
  color: string | CanvasGradient | CanvasPattern;
  player: boolean;

  speed: Vector;
  acc: Vector;

  acceleration: number;

  constructor(x: number, y: number, r: number, color: string) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.player = false;

    this.speed = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.acceleration = 1;

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

  display(ctx: CanvasRenderingContext2D) {
    this.speed.drawVec(ctx, 550, 300, 10, 'green');
    this.acc.unit().drawVec(ctx, 550, 300, 50, '#c251f6');
    this.acc.normal().drawVec(ctx, 550, 300, 50, '#f6519b');
  }
}
