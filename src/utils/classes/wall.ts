import { WALLS_COLOR, wallsArr } from '../variables';
import { Vector } from './vector';

export class Wall {
  start: Vector;
  end: Vector;
  constructor(x1: number, y1: number, x2: number, y2: number) {
    // векторы начального и конечного положения стены
    this.start = new Vector(x1, y1);
    this.end = new Vector(x2, y2);
    wallsArr.push(this);
  }

  drawWall(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.strokeStyle = WALLS_COLOR;
    ctx.stroke();
  }

  wallUnit() {
    return this.end.subtr(this.start).unit();
  }
}
