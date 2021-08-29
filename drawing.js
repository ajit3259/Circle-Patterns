let canvas = document.getElementById("responsive-canvas");
let draw_heading = document.getElementById("draw");

const colors = ["#4a4e4d", "#0e9aa7", "#3da4ab", "#f6cd61", "#fe8a71"];

let context = canvas.getContext("2d");

function drawCircle(center_x, center_y, radius) {
	context.arc(center_x, center_y, radius, 0, 2 * Math.PI);
}

function getPointOnCircle(center_x, center_y, radius, angle) {
	let x = center_x + radius * Math.cos(angle);
	let y = center_y + radius * Math.sin(angle);

	return [x, y]
}

function getPointsOnCircle(center_x, center_y, radius, noOfPoints) {
	let points = {};
	let angle = 0;
	for(let i =0;i < noOfPoints; i++) {
		let point = getPointOnCircle(center_x, center_y, radius, angle + i * 2 * Math.PI / noOfPoints);
		points[i] = point;
	}
	return points;
}

function drawLine(point1, point2) {
	context.moveTo(point1[0], point1[1]);
	context.lineTo(point2[0], point2[1]);
}

function drawPattern(center_x, center_y, radius, noOfPoints, times) {
	let points = getPointsOnCircle(center_x, center_y, radius, noOfPoints);

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
	canvas.width = window.innerWidth;
	canvas.height = Math.max(window.innerWidth * 0.6, window.innerHeight * 0.6);
	let width = canvas.width;
	let height = canvas.height;
	draw_heading.innerText = "Number of Points = " + noOfPoints; 
	//console.log(new Date().getTime(), "animate called for points = ", noOfPoints);
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#f9f4f4";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.lineWidth = 2;
	context.strokeStyle = "black";
	context.beginPath();

	let center_x = width/2;
	let center_y = height/2;
	let radius = Math.min(width/2.1, height/2.1);
	drawCircle(center_x, center_y, radius);
	
	drawPattern(center_x, center_y, radius, noOfPoints, times);
	
	context.stroke();
}
