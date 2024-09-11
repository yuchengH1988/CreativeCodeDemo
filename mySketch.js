const lineColor = '#FFD700'
// const multi = 0.0125

const bgColor = 0
const shadowBlur = 10
// const multi = 1.3
const afterImage = 100
const frameRateN = 30
const lineStroke = 0.5
const flash = true

var size
let img;

function preload() {
  img = loadImage('./heart.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	strokeWeight(lineStroke)
	angleMode(DEGREES)
	rectMode(CENTER)
	ellipseMode(CENTER)
	background(bgColor)
	frameRate(frameRateN)
	imageMode(CENTER);
	size = width > height ? height * 0.017 : width * 0.017
}

function draw() {
	background(bgColor,afterImage)
	noFill()

	translate(windowWidth/2,windowHeight/2)
	const heartBeatSize = heartBeat() * 1.1
	image(img, 0, 0, 36.8 * heartBeatSize * size , 65.4 * heartBeatSize * size);
	
	rotate(frameCount)
	stroke(lineColor)
	paints(36, () => { paintCircle(bounce(11 * size, 4 * size,0.8), bounce(16 *size,10 * size,1)) });
	push()
 	fill(bgColor, 50)
	drawingContext.shadowColor = color(lineColor)
	drawingContext.shadowOffsetX = 0
	drawingContext.shadowOffsetY = 0
	drawingContext.shadowBlur = shadowBlur
	circle(0,0,bounce(12 *size, 4 *size,1))
	circle(0,0,bounce(9 *size,3 *size,1))
	circle(0,0,bounce(6 * size,2 *size,1))
	fill(lineColor)
	circle(0,0,bounce(3 *size,size,1))
	
	if(flash) {
		if (frameCount % 4 == 0)circle(0,0,random(15 *size, size))
	  if (frameCount % 10 == 0) circle(0,0,random(30 * size,10 * size))
	  if (frameCount % 30 == 0) circle(0,0,random(30 * size,90 *size))
		if (frameCount % 40 == 0) circle(0,0,random(90 * size,150 *size))
	}
	
	
	pop()
	paints(7, () => { paintSquare(0,bounce(8 *size, 5 *size,0.5)) });
	paints(5, () => {paintSquare(0,bounce(25 * size,10 * size,1.2))});
	paints(60, () => { paintCircle(size * 32, bounce(2.5 *size,1.5 *size,2))})
	paints(9, () => { paintLine(size * 10, 60 *size)})
	push()
	  strokeWeight(bounce(2, 1.5, 1.5))
	  paints(54, () => { paintLine(bounce(50 * size, 5 * size, 0.8), 60 * size)})
	pop()
}

function paints(times, pattern) {
	for(let i = 0; i < times; i++) {
    rotate((1/times) * 360)
		pattern()
	}
}

function paintCircle (x = 110, r = 80) {
	circle(0,x,r)
}
function paintSquare(r, w = 50) {
	square(r, 0, w);
}
function bounce(x, range, speed) {
	return x + sin(frameCount/speed) * range
}

function paintLine (s,e) {
	line(0,s,0,e)
}

function heartBeat () {
	let range  = frameCount % 80
	const jumpSize = range > 65 ? 0.03 : 0.1
	return range > 65 ?
		1 + jumpSize * sin(360 / 15 * (range - 65)) :
	  1 + jumpSize * sin( 360 / 65 * (range))
}

function windowResized () {
	resizeCanvas(windowWidth, windowHeight)
}