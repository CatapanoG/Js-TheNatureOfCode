//
// The nature of code - introduction
//
// Example I.4: Gaussian distribution
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

var draw = function(context,canvas){
	var numX = IrwinHall();
	var sd = 0.6*canvas.width;
	var mean = (canvas.width/2);

	var x = numX * sd + mean;

	context.globalAlpha = 0.05;
	context.fillStyle = "Grey";
	//context.fillRect(x,canvas.height/2,16,16);
	context.beginPath();
	context.arc(x,canvas.height/2,32,0,2*Math.PI);
	context.fill();
}

//
// Canvas initialization & Canvas related functions
//

var backgroundColor = "Black";
var viewportHeight = 900; // in pixels
var viewportWidth = 900;
var viewportId = "viewport";
var timeStep = 1000 / 30;

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
		Draw();
	}
	function Draw(){
		//clearCanvas(context,canvas);
		draw(context,canvas);
	}

	setInterval(UpdateWorld,timeStep); // setInterval() calls a function every timeStep
};