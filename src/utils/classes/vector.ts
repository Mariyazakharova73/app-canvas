export class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // первое и второе положение мяча
  add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  subtr(v: Vector) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  // ищем вектор скорости по теореме Пифагора
  calculateVectorLength() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  mult(n: number) {
    return new Vector(this.x * n, this.y * n);
  }

  unit() {
    if (this.calculateVectorLength() === 0) {
      return new Vector(0, 0);
    } else {
      return new Vector(
        this.x / this.calculateVectorLength(),
        this.y / this.calculateVectorLength(),
      );
    }
  }

  // ед. вектор, перпендикулярный исходному
  normal() {
    return new Vector(-this.y, this.x).unit();
  }

  static dot(v1: Vector, v2: Vector) {
    return v1.x * v2.x + v1.y * v2.y;
  }

  drawVec(
    ctx: CanvasRenderingContext2D,
    start_x: number,
    start_y: number,
    n: number,
    color: string | CanvasGradient | CanvasPattern,
  ) {
    ctx.beginPath();
    ctx.moveTo(start_x, start_y);
    ctx.lineTo(start_x + this.x * n, start_y + this.y * n);
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}
