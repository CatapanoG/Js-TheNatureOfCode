//
// The nature of code - introduction
//
// Exercise I.5
// A Gaussian random walk is defined as one in which the step size (how far the object moves in a given direction) 
// is generated with a normal distribution. Implement this variation of our random walk.
//

// Using Irwin-Hall approx to std Normal:
// http://en.wikipedia.org/wiki/Normal_distribution#Generating_values_from_normal_distribution
var IrwinHall = function(){ // Support: [-1,1]
	var randNum = 0;
	for (var i = 0; i < 12; i++) {
		randNum += Math.random();
	};
	return (randNum - 6)/6;
}

//Walker constructor
var Walker = function(x,y){
	this.x = x;
	this.y = y;
	this.stepSd = 15;
	this.display = function(context,canvas){
		context.fillStyle = "white";
		context.fillRect(this.x,this.y,1,1);
	};
	this.step = function(){ 
		var randNum = Math.random();
		var stepLength = ((IrwinHall()+1)/2)*this.stepSd;
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