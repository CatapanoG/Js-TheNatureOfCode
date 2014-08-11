//
// INTRODUCTION - The nature of code - 
//

// the Walker

//Simple object declaration
var walker = {
	x:undefined,
	y:undefined
};

//Constructor 
var Walker = function(x,y){
	this.x = x;
	this.y = y;
	this.display = function(context,canvas){
		context.fillStyle = "white";
		context.fillRect(this.x,this.y,1,1);
	};
	this.step = function(){ // 4 possible steps
		var choice = Math.floor(Math.random() * 4);
		if (choice === 0) {this.x = this.x + 1;}
		else if (choice === 1) {this.x = this.x-1;}
		else if (choice === 2) {this.y = this.y+1;}
		else if (choice === 3) {this.y = this.y-1;}
	};
	this.step2 = function(){ // 8 possible steps
		var stepx = Math.floor(Math.random() * 3) - 1;
		var stepy = Math.floor(Math.random() * 3) - 1;
		this.x += stepx;
		this.y += stepy;
	};
};

//Object instance
var w = new Walker(450,450);

//
// Testing
//

var testedObj = w;
console.log("Testing an object:");
console.log("typeof: " + typeof testedObj + ";");
console.log("the object prototype is: " + Object.getPrototypeOf(testedObj) + ";");
console.log(testedObj);

//
// Canvas initialization
//

var backgroundColor = "black";
var viewportHeight = 900; // in pixels
var viewportWidth = 900;
var viewportId = "viewport";
var timeStep = 1000/30;

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

function LoopOld(){
	var canvas = document.getElementById("viewport");
	var context = canvas.getContext("2d");

	w.display(context,canvas);
	w.step2();

	setTimeout(Loop,timeStep); // setTimeout() calls a function ONCE
};

function Loop(){
	var canvas = document.getElementById("viewport");
	var context = canvas.getContext("2d");

	function updateWorld(){
		w.step2();

		draw();
	}
	function draw(){
		w.display(context,canvas);
	}

	setInterval(updateWorld,timeStep); // setInterval() calls a function every timeStep
};
