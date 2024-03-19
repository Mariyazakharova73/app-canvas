export class Ball {
  x: number;
  y: number;
  r: number;
  color: string | CanvasGradient | CanvasPattern;
  constructor(x: number, y: number, r: number, color: string) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }

  drawBall(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.fill();
  }
}
