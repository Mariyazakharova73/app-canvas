import { Ball } from '../classes/ball';
import { Vector } from '../classes/vector';
import { ELASTICITY } from '../variables';

export function getCollision(b1: Ball, b2: Ball): boolean {
  // Сумма радиусов больше расстояния межу центрами шаров
  return b1.r + b2.r >= b2.pos.subtr(b1.pos).calculateVectorLength();
}

export function moveAwayBalls(b1: Ball, b2: Ball) {
  // вектор между центрами шаров
  let dist: Vector = b1.pos.subtr(b2.pos);

  // длина наложения
  let overlayLength: number = b1.r + b2.r - dist.calculateVectorLength();

  let overlayVec: Vector = dist.unit().mult(overlayLength / (b1.inv_m + b2.inv_m));

  // двигаем шары в противоположные стороны, чтобы не накладывались
  b1.pos = b1.pos.add(overlayVec.mult(b1.inv_m));
  b2.pos = b2.pos.add(overlayVec.mult(-b2.inv_m));
}

export function handleCollision(b1: Ball, b2: Ball) {
  // b2.speed = new Vector(10, 0);
  let normal = b1.pos.subtr(b2.pos).unit();
  let relSpeed = b1.speed.subtr(b2.speed);
  let sepSpeed = Vector.dot(relSpeed, normal);
  let newSepSpeed: number = -sepSpeed * ELASTICITY;

  let diff: number = newSepSpeed - sepSpeed;
  let impulse = diff / (b1.inv_m + b2.inv_m);
  let impulseVec = normal.mult(impulse);

  b1.speed = b1.speed.add(impulseVec.mult(b1.inv_m));
  b2.speed = b2.speed.add(impulseVec.mult(-b2.inv_m));

  // b1.speed = b1.speed.add(newSpeedVec);
  // b2.speed = b2.speed.add(newSpeedVec.mult(-1));
}
