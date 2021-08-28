var canvas = document.getElementById("board");
var draw_heading = document.getElementById("draw");
var width = window.innerWidth; //cuurent width of browser window
var height = window.innerHeight; //current height of browser window

canvas.setAttribute("width", width - 100);
canvas.setAttribute("height", height);
var context = canvas.getContext("2d");

const center_x = width/2 - 50;
const center_y = height/2 - 50;
const radius = 300;

function drawCircle() {
	context.arc(center_x, center_y, radius, 0, 2 * Math.PI);
}

function getPointOnCircle(angle) {
	var x = center_x + radius * Math.cos(angle);
	var y = center_y + radius * Math.sin(angle);

	return [x, y]
}

function getPointsOnCircle(noOfPoints) {
	let points = {};
	let angle = 0;
	for(let i =0;i < noOfPoints; i++) {
		let point = getPointOnCircle(angle + i * 2 * Math.PI / noOfPoints);
		points[i] = point;
	}
	return points;
}

function drawLine(point1, point2) {
	context.moveTo(point1[0], point1[1]);
	context.lineTo(point2[0], point2[1]);
}

function drawPattern(noOfPoints, times) {
	let points = getPointsOnCircle(noOfPoints);

	for(let i = 1; i < noOfPoints; i++) {
		let curPoint = i;
		let nextPoint = i;
		while(true) {
			nextPoint = curPoint * times;
			drawLine(points[curPoint], points[nextPoint % noOfPoints]);
			if(nextPoint >= noOfPoints)
				break;
			curPoint = nextPoint % noOfPoints;
		}
	}
}

function draw(noOfPoints, times) {
	if(times <= 1)
		return;
	draw_heading.innerText = "Number of Points = " + noOfPoints; 
	//console.log(new Date().getTime(), "animate called for points = ", noOfPoints);
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
	drawCircle();
	drawPattern(noOfPoints, times);
	context.stroke();
}
