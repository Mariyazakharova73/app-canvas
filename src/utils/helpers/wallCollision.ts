import { Ball } from '../classes/ball';
import { Vector } from '../classes/vector';
import { Wall } from '../classes/wall';
import { ELASTICITY } from '../variables';

export function closestPointBW(b1: Ball, w1: Wall) {
  let ballToWallStart: Vector = w1.start.subtr(b1.pos);
  if (Vector.dot(w1.wallUnit(), ballToWallStart) > 0) {
    return w1.start;
  }

  let wallEndToBall: Vector = b1.pos.subtr(w1.end);
  if (Vector.dot(w1.wallUnit(), wallEndToBall) > 0) {
    return w1.end;
  }

  let closestDist: number = Vector.dot(w1.wallUnit(), ballToWallStart);
  let closestVest: Vector = w1.wallUnit().mult(closestDist);
  return w1.start.subtr(closestVest);
}

export function getCollisionBW(b1: Ball, w1: Wall): boolean | void {
  let ballToClosest: Vector = closestPointBW(b1, w1).subtr(b1.pos);
  if (ballToClosest.calculateVectorLength() <= b1.r) {
    return true;
  }
}

export function denyEntryBW(b1: Ball, w1: Wall) {
  let penVect: Vector = b1.pos.subtr(closestPointBW(b1, w1));
  b1.pos = b1.pos.add(penVect.unit().mult(b1.r - penVect.calculateVectorLength()));
}

export function handleCollisionBW(b1: Ball, w1: Wall) {
  let normal = b1.pos.subtr(closestPointBW(b1, w1)).unit();
  let sepSpeed = Vector.dot(b1.speed, normal);
  let newSpeed = -sepSpeed * ELASTICITY;
  let diff = sepSpeed - newSpeed;
  b1.speed = b1.speed.add(normal.mult(-diff));
}
