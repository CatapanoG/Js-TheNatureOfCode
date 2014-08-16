//
// The nature of code - introduction
//
// Exercise I.6
// Use a custom probability distribution to vary the size of a step taken by the random walker. 
// The step size can be determined by influencing the range of values picked. 
// Can you map the probability exponentially i.e. making the likelihood that a value is picked equal to the value squared?
// P(X=x)=x^2.

// Using Irwin-Hall approx to std Normal:
// http://en.wikipedia.org/wiki/Normal_distribution#Generating_values_from_normal_distribution
var IrwinHall = function(){ // Support: [-1,1]
	var randNum = 0;
	for (var i = 0; i < 12; i++) {
		randNum += Math.random();
	};
	return (randNum - 6)/6;
};

var customStepLength = function(stepSd){
	var jumpProb = 0.025;
	var jumpLenght = 50;
	var step = 0;

	if (Math.random()<(1-jumpProb)) {
		return ((IrwinHall()+1)/2)*stepSd;
	} else {
		return jumpLenght;
	};
};

var exponentialStepLenght = function(stepSd){
	while(true)
	{
		var step = Math.random();
		var prob = Math.random();
		if (step*step < prob) {
			return step*stepSd;
		};
	}
}

//Walker constructor
var Walker = function(x,y){
	this.x = x;
	this.y = y;
	this.stepSd = 20; // in pixels
	this.display = function(context,canvas){
		context.fillStyle = "white";
		context.fillRect(this.x,this.y,1,1);
	};
	this.step = function(){ 
		var randNum = Math.random();
		//var stepLength = customStepLength(this.stepSd);
		var stepLength = exponentialStepLenght(this.stepSd);
		if (randNum < 0.25) { this.y -= stepLength; } 
		else if (randNum < 0.5) { this.y += stepLength; }
		else if (randNum < 0.75) { this.x -= stepLength; }
		else { this.x += stepLength; } 
	};
};

//Walker instance
var w = new Walker(450,450);

//
// Testing (console output)
//

var testedObj = w;
console.log("Testing an object:");
console.log("typeof: " + typeof testedObj + ";");
console.log("the object prototype is: " + Object.getPrototypeOf(testedObj) + ";");
console.log(testedObj);

//
// Canvas initialization & Canvas related functions
//

var backgroundColor = "black";
var viewportHeight = 900; // in pixels
var viewportWidth = 900;
var viewportId = "viewport";
var timeStep = 1000/60;

window.onload = function() {
	var canvas = document.createElement("canvas");
	canvas.setAttribute("width", viewportWidth);
	canvas.setAttribute("height", viewportHeight);
	canvas.setAttribute("id", viewportId);
	var canvasPlace = document.getElementById("canvasPlace");
	canvasPlace.appendChild(canvas);

	var context = canvas.getContext("2d");

	context.fillStyle = backgroundColor;
	context.fillRect(0,0,canvas.width,canvas.height);

	Loop();
};

function Loop(){
	var canvas = document.getElementById("viewport");
	var context = canvas.getContext("2d");

	function updateWorld(){
		w.step();

		draw();
	}
	function draw(){
		w.display(context,canvas);
	}

	setInterval(updateWorld,timeStep); // setInterval() calls a function every timeStep
};