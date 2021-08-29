let maxPointsForAnimation = 500;
let maxPatternNoForAnimation = 1000;
let startPoint = 10;
let startPattern = 2;
function playAnimation() {
	console.log(animationOver);

	if(animationOver === "points") {
		playAnimationOverPoints();
	} else {
		playAnimationOverPattern();
	}
}

function playAnimationOverPoints() {
	designNo = parseInt(document.getElementById("designNo").value);
	if(curPoints === maxPointsForAnimation) {
		curPoints = startPoint;
	}
	draw(curPoints, designNo);
	const animationSpeed = 10 + (2000 - document.getElementById("animationSpeed").value);
	let millis = animationSpeed;

	for(let i = curPoints + 10; i <= maxPointsForAnimation; i+=1) {
		setTimeout(
			() => {
				draw(i, designNo)
				curPoints = i;
				//console.log(milllis);
				changeNoPoints(curPoints);
			}, millis);
		millis+=animationSpeed;
	}
}

function playAnimationOverPattern() {
	curPoints = parseInt(document.getElementById("noOfPoints").value); 
	if(designNo === maxPatternNoForAnimation) {
		designNo = startPattern;
	}
	console.log(curPoints, designNo);
	draw(curPoints, designNo);
	const animationSpeed = 10 + (2000 - document.getElementById("animationSpeed").value);
	let millis = animationSpeed;

	for(let i = parseInt(designNo) + 1; i <= maxPatternNoForAnimation; i+=1) {
		setTimeout(
			() => {
				draw(curPoints, i)
				designNo = parseInt(i);
				changeDesignNoValue(designNo);
			}, millis);
		millis+=animationSpeed;
	}
}