const canvasPlot = document.getElementById('canvas_plot');
const ctx = canvasPlot.getContext('2d');

let LEFT;
let UP;
let RIGHT;
let DOWN;

let balls = [];
let walls = [];

let friction = 0.05;

// упругий удар
// let elasticity = 1;

class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	// первое и второе положение мяча
	add(v) {
		return new Vector(this.x + v.x, this.y + v.y);
	}

	subtr(v) {
		return new Vector(this.x - v.x, this.y - v.y);
	}

	// ищем вектор скорости по теореме Пифагора
	mag() {
		return Math.sqrt(this.x ** 2 + this.y ** 2);
	}

	mult(n) {
		return new Vector(this.x * n, this.y * n);
	}
	// ед. вектор, перпендикулярный исходному
	normal() {
		return new Vector(-this.y, this.x).unit();
	}

	// единичный вектор
	unit() {
		if (this.mag() === 0) {
			return new Vector(0, 0);
		} else {
			return new Vector(this.x / this.mag(), this.y / this.mag());
		}
	}

	drawVec(start_x, start_y, n, color) {
		ctx.beginPath();
		ctx.moveTo(start_x, start_y);
		ctx.lineTo(start_x + this.x * n, start_y + this.y * n);
		ctx.strokeStyle = color;
		ctx.stroke();
	}

	static dot(v1, v2) {
		// скалярное произведение векторов
		// угол>90, произвед. <0
		// угол<90, произвед. >0
		// угол=90, произвед. 0
		return v1.x * v2.x + v1.y * v2.y;
	}
}

class Wall {
	constructor(x1, y1, x2, y2) {
		this.start = new Vector(x1, y1);
		this.end = new Vector(x2, y2);
		walls.push(this);
	}

	drawWall() {
		ctx.beginPath();
		ctx.moveTo(this.start.x, this.start.y);
		ctx.lineTo(this.end.x, this.end.y);
		ctx.strokeStyle = 'black';
		ctx.stroke();
	}

	wallUnit() {
		return this.end.subtr(this.start).unit();
	}
}

class Ball {
	constructor(x, y, r, m, color) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.m = m;
		this.elasticity = 1;
		this.inv_m = this.m === 0 ? 0 : 1 / this.m;
		this.pos = new Vector(x, y);
		this.speed = new Vector(0, 0);
		this.acc = new Vector(0, 0);
		this.acceleration = 1;
		// выбрать шар
		this.player = false;
		this.color = color;
		balls.push(this);
	}

	drawBall() {
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
		ctx.strokeStyle = 'none';
		ctx.stroke();

		ctx.fillStyle = this.color;
		ctx.fill();
	}

	display() {
		this.speed.drawVec(this.pos.x, this.pos.y, 10, 'green');
		ctx.fillStyle = 'white';
		ctx.font = 'bold 8pt Arial';
		ctx.fillText('m= ' + this.m, this.pos.x - 10, this.pos.y - 5);
		ctx.fillText('e= ' + this.elasticity, this.pos.x - 10, this.pos.y + 5);

		// this.acc.unit().drawVec(600, 400, 50, '#2915e2');
		// // this.acc.normal().drawVec(600, 400, 50, '#e215a4');

		// ctx.beginPath();
		// ctx.arc(600, 400, 50, 0, 2 * Math.PI);
		// ctx.strokeStyle = 'black';
		// ctx.stroke();
	}

	reposition() {
		this.acc = this.acc.unit().mult(this.acceleration);

		this.speed = this.speed.add(this.acc);
		this.speed = this.speed.mult(1 - friction);

		this.pos = this.pos.add(this.speed);
	}
}

function keyControl(ball) {
	canvasPlot.addEventListener('keydown', function (e) {
		if (e.keyCode === 37) {
			LEFT = true;
		}
		if (e.keyCode === 38) {
			UP = true;
		}
		if (e.keyCode === 39) {
			RIGHT = true;
		}
		if (e.keyCode === 40) {
			DOWN = true;
		}
	});

	canvasPlot.addEventListener('keyup', function (e) {
		if (e.keyCode === 37) {
			LEFT = false;
		}
		if (e.keyCode === 38) {
			UP = false;
		}
		if (e.keyCode === 39) {
			RIGHT = false;
		}
		if (e.keyCode === 40) {
			DOWN = false;
		}
	});

	// меняем координаты шара на 10px

	if (LEFT) {
		//ball.speed_x = -ball.speed;
		ball.acc.x = -ball.acceleration;
	}
	if (UP) {
		//ball.speed_y = -ball.speed;
		ball.acc.y = -ball.acceleration;
	}
	if (RIGHT) {
		//ball.speed_x = ball.speed;
		ball.acc.x = ball.acceleration;
	}
	if (DOWN) {
		//ball.speed_y = ball.speed;
		ball.acc.y = ball.acceleration;
	}

	// Ускорение = 0, мяч двигается с постоянной скоростью
	if (!UP && !DOWN) {
		//ball.speed_y = 0;
		ball.acc.y = 0;
	}

	if (!RIGHT && !LEFT) {
		//ball.speed_x = 0;
		ball.acc.x = 0;
	}

	// ball.x += ball.speed.x;
	// ball.y += ball.speed.y;
}

// let distanceVec = new Vector(0, 0);

function round(number, precision) {
	let factor = 10 ** precision;
	return Math.round(number * factor) / factor;
}

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function closestPointBW(b1, w1) {
	let ballToWallStart = w1.start.subtr(b1.pos);
	if (Vector.dot(w1.wallUnit(), ballToWallStart) > 0) {
		return w1.start;
	}

	let wallEndToBall = b1.pos.subtr(w1.end);
	if (Vector.dot(w1.wallUnit(), wallEndToBall) > 0) {
		return w1.end;
	}

	let closestDist = Vector.dot(w1.wallUnit(), ballToWallStart);
	let closestVest = w1.wallUnit().mult(closestDist);
	return w1.start.subtr(closestVest);
}

function call_det_bb(b1, b2) {
	return b1.r + b2.r >= b2.pos.subtr(b1.pos).mag();
}

function coll_det_bw(b1, w1) {
	let ballToClosest = closestPointBW(b1, w1).subtr(b1.pos);
	if (ballToClosest.mag() <= b1.r) {
		return true;
	}
}

function pen_res_bb(b1, b2) {
	let dist = b1.pos.subtr(b2.pos);
	let pen_depth = b1.r + b2.r - dist.mag();
	// глубина проникновения
	let pen_res = dist.unit().mult(pen_depth / (b1.inv_m + b2.inv_m));
	// двигаем шары в противоположные стороны, чтобы не накладывались
	// b1.pos = b1.pos.add(pen_res);
	// b2.pos = b2.pos.add(pen_res.mult(-1));
	b1.pos = b1.pos.add(pen_res.mult(b1.inv_m));
	b2.pos = b2.pos.add(pen_res.mult(-b2.inv_m));
}

function pen_res_bw(b1, w1) {
	let penVect = b1.pos.subtr(closestPointBW(b1, w1));
	b1.pos = b1.pos.add(penVect.unit().mult(b1.r - penVect.mag()));
}

function coll_res_bb(b1, b2) {
	// сдвигаем второй шар при столкновении
	let normal = b1.pos.subtr(b2.pos).unit();
	let relSpeed = b1.speed.subtr(b2.speed);
	let sepSpeed = Vector.dot(relSpeed, normal);
	let new_sepSpeed = -sepSpeed * b1.elasticity;

	let vsep_diff = new_sepSpeed - sepSpeed;
	let impulse = vsep_diff / (b1.inv_m + b2.inv_m);
	let impulseVec = normal.mult(impulse);
	// let sepSpeedVec = normal.mult(new_sepSpeed);

	b1.speed = b1.speed.add(impulseVec.mult(b1.inv_m));
	b2.speed = b2.speed.add(impulseVec.mult(-b2.inv_m));
}

// function momentum_display() {
// 	let momentum = Ball1.speed.add(Ball2.speed).mag();
// 	ctx.fillText('Momentum:' + round(momentum, 4), 500, 330);
// }

function coll_res_bw(b1, w1) {
	let normal = b1.pos.subtr(closestPointBW(b1, w1)).unit();
	let sepSpeed = Vector.dot(b1.speed, normal);
	let new_sepSpeed = -sepSpeed * b1.elasticity;
	let vsep_diff = sepSpeed - new_sepSpeed;
	b1.speed = b1.speed.add(normal.mult(-vsep_diff));
}

function repeatOften() {
	ctx.clearRect(0, 0, canvasPlot.clientWidth, canvasPlot.clientHeight);

	balls.forEach((b, index) => {
		b.drawBall();
		if (b.player) {
			keyControl(b);
		}

		walls.forEach(w => {
			if (coll_det_bw(balls[index], w)) {
				pen_res_bw(balls[index], w);
				coll_res_bw(balls[index], w);
			}
		});

		for (let i = index + 1; i < balls.length; i++) {
			if (call_det_bb(balls[index], balls[i])) {
				pen_res_bb(balls[index], balls[i]);
				coll_res_bb(balls[index], balls[i]);
			}
		}

		b.display();
		b.reposition();
	});
	// momentum_display();
	// distanceVec = Ball2.pos.subtr(Ball1.pos);
	// ctx.fillText('Distance' + distanceVec.mag(), 500, 300);

	walls.forEach(w => {
		w.drawWall();
	});

	// closestPointBW(Ball1, Wall1)
	// 	.subtr(Ball1.pos)
	// 	.drawVec(Ball1.pos.x, Ball1.pos.y, 1, 'red');

	requestAnimationFrame(repeatOften);
}

for (let i = 0; i < 10; i++) {
	let newBall = new Ball(
		randInt(100, 500),
		randInt(5, 400),
		randInt(20, 50),
		randInt(0, 10)
	);
	newBall.elasticity = randInt(0, 10) / 10;
	newBall.color = '#1668DC';
}

//let Ball1 = new Ball(200, 200, 30, 2, '#2020b0');
// let Ball2 = new Ball(300, 250, 40, '#8720b0', 5);
// let Ball3 = new Ball(250, 220, 35, '#ff0184', 3);
// Ball1.player = true;
// Ball1.elasticity = 1;

let edge1 = new Wall(0, 0, canvasPlot.clientWidth, 0);
let edge2 = new Wall(
	canvasPlot.clientWidth,
	0,
	canvasPlot.clientWidth,
	canvasPlot.clientHeight
);
let edge3 = new Wall(
	canvasPlot.clientWidth,
	canvasPlot.clientHeight,
	0,
	canvasPlot.clientHeight
);
let edge4 = new Wall(0, canvasPlot.clientWidth, 0, 0);

let Wall1 = new Wall(200, 200, 400, 300);
balls[0].player = true;
balls[0].color = '#ff4d4f';
requestAnimationFrame(repeatOften);
