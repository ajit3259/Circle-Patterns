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
	designNo = document.getElementById("designNo").value;
	if(curPoints === maxPointsForAnimation) {
		curPoints = startPoint;
	}
	draw(curPoints, designNo);
	let animationSpeed = 10 + (2000 - document.getElementById("animationSpeed").value);
	let millis = animationSpeed;

	for(let i = curPoints + 10; i <= maxPointsForAnimation; i+=10) {
		setTimeout(
			() => {
				draw(i, designNo)
				curPoints = i;
				changeNoPoints(curPoints);
			}, millis);
		millis+=animationSpeed;
	}
}

function playAnimationOverPattern() {
	curPoints = document.getElementById("noOfPoints").value;
	if(designNo >= maxPatternNoForAnimation) {
		designNo = startPattern;
	}
	draw(curPoints, designNo);
	let animationSpeed = 10 + (2000 - document.getElementById("animationSpeed").value);
	let millis = animationSpeed;

	for(let i = designNo + 1; i <= maxPatternNoForAnimation; i+=1) {
		setTimeout(
			() => {
				draw(curPoints, i)
				designNo = i;
				changeDesignNoValue(designNo);
			}, millis);
		millis+=animationSpeed;
	}
}