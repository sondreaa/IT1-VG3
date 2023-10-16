// https://discourse.processing.org/t/rotation-based-on-mouse/1766
// https://p5js.org/reference/#/p5/atan2
//'use strict';

let targetAngle = 0.0;
let currentAngle = 0.0;
let x = 0.0;
let y = 0.0;
let smoothSpeed = 0.1;
let scl = 25.0;
const count = 3;
let iToTheta;
let canvasSize = 200

function setup() {
	createCanvas(canvasSize, canvasSize);
	x = width * 0.5;
	y = height * 0.5;
	iToTheta = TWO_PI / count;
	img = loadImage('../img/pointing.png')
}

function draw() {
	targetAngle = atan2(mouseY - y, mouseX - x);
	currentAngle = lerpAngle(currentAngle, targetAngle, smoothSpeed);
	
	background(200);
	translate(height / 2, width / 2)
	rotate(currentAngle);
	
   	imageMode(CENTER);
	
	image(img, 0,0, height, width)
	rotate(-currentAngle)

	
	noStroke();
	// beginShape();
	// for (let i = 0; i < count; ++i) {
	// 	const theta = currentAngle + i * iToTheta;
	// 	vertex(x + cos(theta) * scl, y + sin(theta) * scl);
	// }
	// endShape(CLOSE);
	
	strokeWeight(2);
	stroke(color(255, 0, 0)); //direction facing the mouse
	// line(x, y, x + cos(targetAngle) * scl, y + sin(targetAngle) * scl);
	line(0, 0, 0 + cos(targetAngle) * scl, 0 + sin(targetAngle) * scl);

	stroke(color(0, 255, 0));//direction where it left off
	// line(x, y, x + cos(currentAngle) * scl,	y + sin(currentAngle) * scl);
	line(0, 0, 0 + cos(currentAngle) * scl,	0 + sin(currentAngle) * scl);

}

// Linear interpolation of an angle.
function lerpAngle(a, b, step) {
	// Prefer shortest distance,
	const delta = b - a;
	if (delta == 0.0) {
		return a;
	} else if (delta < -PI) {
		b += TWO_PI;
	} else if (delta > PI) {
		a += TWO_PI;
	}
	return (1.0 - step) * a + step * b;
}
