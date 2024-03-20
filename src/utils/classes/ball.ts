import { roundNumber } from '../helpers/helpers';
import { FRICTION, TEXT_COLOR, ballsArr } from '../variables';
import { Vector } from './vector';

export class Ball {
  pos: Vector;
  r: number;
  m: number;
  inv_m: number;

  color: string | CanvasGradient | CanvasPattern;
  player: boolean;

  speed: Vector;
  acc: Vector;

  acceleration: number;

  constructor(x: number, y: number, r: number, m: number, color: string) {
    this.pos = new Vector(x, y);
    this.r = r;
    this.color = color;
    this.player = false;

    this.speed = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.acceleration = 1;

    this.m = m;
    this.inv_m = this.m === 0 ? 0 : 1 / this.m;

    // Добавляем мяч в массив при создании экземпляра
    ballsArr.push(this);
  }

  drawBall(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  display(ctx: CanvasRenderingContext2D) {
    this.speed.drawVec(ctx, this.pos.x, this.pos.y, 10, 'green');
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = 'bold 8pt Arial';
    ctx.fillText('m=' + this.m, this.pos.x - 10, this.pos.y + 5);
    ctx.fillText(
      'speed=' + roundNumber(this.speed.x, 2),
      this.pos.x - 10,
      this.pos.y - 5,
    );
    ctx.fillText(
      'speed=' + roundNumber(this.speed.y, 2),
      this.pos.x - 10,
      this.pos.y - 15,
    );
    ctx.fillText('acc=' + roundNumber(this.acc.x, 2), this.pos.x - 10, this.pos.y + 15);
  }

  reposition() {
    this.acc = this.acc.unit().mult(this.acceleration);

    this.speed = this.speed.add(this.acc);
    this.speed = this.speed.mult(1 - FRICTION);

    this.pos = this.pos.add(this.speed);
  }
}
