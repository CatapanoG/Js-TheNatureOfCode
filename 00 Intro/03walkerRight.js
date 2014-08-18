//
// INTRODUCTION - The nature of code - 
//
// Example 1.3: Walker that tends to move to the right
//

//Walker constructor 
var Walker = function(x,y){
	this.x = x;
	this.y = y;
	this.display = function(context,canvas){
		context.fillStyle = "white";
		context.fillRect(this.x,this.y,1,1);
	};
	this.step = function(){ 
		var randNum = Math.random();
		if (randNum < 0.2) { this.y--; } 
		else if (randNum < 0.4) { this.y++; }
		else if (randNum < 0.6) { this.x--; }
		else { this.x++; } 
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
