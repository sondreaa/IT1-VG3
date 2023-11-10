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
let canvasSize_x = 350
let canvasSize_y = 450

function setup() {
	createCanvas(canvasSize_x, canvasSize_y);
	x = 153
	y = 152
	iToTheta = TWO_PI / count;

	pointLeft = loadImage('../img/pointing1.png')
	profileLeft = loadImage('../img/profile1.png')
	pointRight = loadImage('../img/pointing2.png')
	profileRight = loadImage('../img/profile2.png')

}

function draw() {
	targetAngle = atan2(mouseY - y, mouseX - x);
	currentAngle = lerpAngle(currentAngle, targetAngle, smoothSpeed);
	if (currentAngle > TWO_PI){
		currentAngle -= TWO_PI
	}
	if (currentAngle < -TWO_PI){
		currentAngle += TWO_PI
	}
	
	background(200);
	background(133, 100, 47);

	if (-PI/2 < currentAngle && currentAngle < PI/2){
		profileIMG = profileRight
		pointIMG = pointRight
	} else if ((3/2)*PI < currentAngle && currentAngle < TWO_PI){
		profileIMG = profileRight
		pointIMG = pointRight
	} else{
		profileIMG = profileLeft
		pointIMG = pointLeft
	}

	image(profileIMG, width/2, 253, 400, 400)

	translate(x,y)
	rotate(currentAngle);

   	imageMode(CENTER);	
	image(pointIMG, 0,0, 400, 400)


	rotate(-currentAngle)
	translate(-x,-y)


	
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
	// line(0, 0, 0 + cos(targetAngle) * scl, 0 + sin(targetAngle) * scl);

	stroke(color(0, 255, 0));//direction where it left off
	// line(x, y, x + cos(currentAngle) * scl,	y + sin(currentAngle) * scl);
	// line(0, 0, 0 + cos(currentAngle) * scl,	0 + sin(currentAngle) * scl);

	// console.log(currentAngle * 360 / TWO_PI) //logger vinkelen i grader
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
