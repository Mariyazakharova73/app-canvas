const canvasPlot = document.getElementById('canvas_plot');
const ctx = canvasPlot.getContext('2d');

let LEFT;
let UP;
let RIGHT;
let DOWN;

let balls = [];

let friction = 0.1;

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
}

class Ball {
	constructor(x, y, r, color) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.speed_x = 0;
		this.speed_y = 0;
		this.acc_x = 0;
		this.acc_y = 0;
		this.acceleration = 1;
		// выбрать шар
		this.player = false;
		this.color = color;
		balls.push(this);
	}

	drawBall() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		ctx.strokeStyle = 'black';
		ctx.stroke();

		ctx.fillStyle = this.color;
		ctx.fill();
	}

	display() {
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x + this.acc_x * 100, this.y + this.acc_y * 100);
		ctx.strokeStyle = 'green';
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x + this.speed_x * 10, this.y + this.speed_y * 10);
		ctx.strokeStyle = 'blue';
		ctx.stroke();
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
		ball.acc_x = -ball.acceleration;
	}
	if (UP) {
		//ball.speed_y = -ball.speed;
		ball.acc_y = -ball.acceleration;
	}
	if (RIGHT) {
		//ball.speed_x = ball.speed;
		ball.acc_x = ball.acceleration;
	}
	if (DOWN) {
		//ball.speed_y = ball.speed;
		ball.acc_y = ball.acceleration;
	}

	// Ускорение = 0, мяч двигается с постоянной скоростью
	if (!UP && !DOWN) {
		//ball.speed_y = 0;
		ball.acc_y = 0;
	}

	if (!RIGHT && !LEFT) {
		//ball.speed_x = 0;
		ball.acc_x = 0;
	}

	ball.speed_x += ball.acc_x;
	ball.speed_y += ball.acc_y;

	ball.speed_x *= 1 - friction;
	ball.speed_y *= 1 - friction;

	ball.x += ball.speed_x;
	ball.y += ball.speed_y;
}

function repeatOften() {
	ctx.clearRect(0, 0, canvasPlot.clientWidth, canvasPlot.clientHeight);

	balls.forEach(b => {
		b.drawBall();
		if (b.player) {
			keyControl(b);
		}
		b.display();
	});
	requestAnimationFrame(repeatOften);
}

let Ball1 = new Ball(200, 200, 30, '#2020b0');
let Ball2 = new Ball(300, 300, 20, '#8720b0');
Ball2.player = true;

requestAnimationFrame(repeatOften);
