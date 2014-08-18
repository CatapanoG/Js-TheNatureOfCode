//
// The nature of code - introduction
//
// Example I.5: Perlin noise walker
//

// Using josephg noisejs to generate Perlin noise.
// GitHub: https://github.com/josephg/noisejs

// Using Irwin-Hall approx to std Normal:
// http://en.wikipedia.org/wiki/Normal_distribution#Generating_values_from_normal_distribution

//Walker constructor 
var Walker = function(x,y){
	this.x = x;
	this.y = y;
	this.noise = noise.seed(Math.random());
	this.perlinXSeed = 0;
	this.perlinYSeed = 0.5;
	this.perlinIncrement = 0.005;
	this.display = function(context,canvas){
		context.fillStyle = "Grey";
		context.strokeStyle = "White";
		context.lineWidth = 4;
		context.beginPath();
		context.arc(this.x,this.y,32,0,2*Math.PI);
		context.fill();
		context.stroke();
	};
	this.step = function(){ 
		var randNum = Math.random();
		if (randNum < 0.25) { this.y--; } 
		else if (randNum < 0.5) { this.y++; }
		else if (randNum < 0.75) { this.x--; }
		else { this.x++; } 
	};
	this.step2 = function(canvas){ // Perlin step function
		this.perlinXSeed += this.perlinIncrement;
		this.perlinYSeed += this.perlinIncrement;
		var perlinX = noise.perlin2(this.perlinXSeed,this.perlinXSeed);
		var perlinY = noise.perlin2(this.perlinYSeed,this.perlinYSeed);

		this.x = perlinX*canvas.width/2 + canvas.width/2;
		this.y = perlinY*canvas.height/2 + canvas.height/2;
	}
};

//Walker instance
var w = new Walker(450,450);

//
// Canvas initialization & Canvas related functions
//

var backgroundColor = "Black";
var viewportHeight = 900; // in pixels
var viewportWidth = 900;
var viewportId = "viewport";
var timeStep = 1000 / 60;

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

function clearCanvas(context,canvas){
	context.fillStyle = backgroundColor;
	context.fillRect(0,0,canvas.width,canvas.height);
}

function Loop(){
	var canvas = document.getElementById("viewport");
	var context = canvas.getContext("2d");

	function UpdateWorld(){
		w.step2(canvas);
		Draw();
	}
	function Draw(){
		clearCanvas(context,canvas);
		w.display(context,canvas);
	}

	setInterval(UpdateWorld,timeStep); // setInterval() calls a function every timeStep
};