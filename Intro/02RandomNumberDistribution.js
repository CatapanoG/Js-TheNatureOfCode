//
// The nature of code - introduction
//
// Example 1.2: Random number distribution
//

var randomCounts = [];
var randomCountsLength = 20;

var draw = function(context,canvas){
	var index = Math.floor(Math.random() * randomCountsLength);

	if (randomCounts[index] == undefined) {
		randomCounts[index] = 1;
	} else { 
		randomCounts[index]++;
	};

	context.fillStyle = "DarkGrey";
	context.strokeStyle = "Black";
	context.lineWidth = 2;

	var w = canvas.width/randomCountsLength;
	for (var x = 0; x < randomCountsLength; x++) {
		context.fillRect(x*w,canvas.height-randomCounts[x],w-1,randomCounts[x]);
		context.strokeRect(x*w,canvas.height-randomCounts[x],w-1,randomCounts[x]);
	};
}

//
// Canvas initialization & Canvas related functions
//

var backgroundColor = "White";
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
		Draw();
	}
	function Draw(){
		clearCanvas(context,canvas);
		draw(context,canvas);
	}

	setInterval(UpdateWorld,timeStep); // setInterval() calls a function every timeStep
};