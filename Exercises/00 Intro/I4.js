//
// The nature of code - introduction
//
// Exercise I.4
// Consider a simulation of paint splatter drawn as a collection of colored dots. 
// Most of the paint clusters around a central location, but some dots do splatter out towards the edges. 
// Can you use a normal distribution of random numbers to generate the locations of the dots? 
// Can you also use a normal distribution of random numbers to generate a color palette?
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
	var numY = IrwinHall();
	var sdX = 0.75*canvas.width;
	var meanX = canvas.width/2;
	var sdY = 0.75*canvas.height;
	var meanY = canvas.height/2;

	var x = numX * sdX + meanX;
	var y = numY * sdY + meanY;

	var redWeight = 1;
	var greenWeight = 0.5;
	var blueWeight = 0.75;

	var red = Math.round(((IrwinHall()+1)/2)*255*redWeight);
	var green = Math.round(((IrwinHall()+1)/2)*255*greenWeight);
	var blue = Math.round(((IrwinHall()+1)/2)*255*blueWeight);

	// CSS color format rgb(red,green,blue). Each color can be [0,255]
	var colorString = "rgb(" + red + "," + green + "," + blue + ")"; 

	context.globalAlpha = 0.05;
	context.fillStyle = colorString;
	context.beginPath();
	context.arc(x,y,32,0,2*Math.PI);
	context.fill();
}

//
// Canvas initialization & Canvas related functions
//

var backgroundColor = "Black";
var viewportHeight = 950; // in pixels
var viewportWidth = 1800;
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