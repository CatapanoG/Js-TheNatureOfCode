//
// The nature of code - introduction
//
// Example I.6: 2D Perlin noise
//

// Using josephg noisejs to generate Perlin noise.
// GitHub: https://github.com/josephg/noisejs

var perlinStep = 0.05;

var drawPerlin2D = function(context,canvas){

	noise.seed(Math.random());
	var xoff = 0.0;

	for (var x = 0; x < canvas.width; x++) {
		var yoff = 0.0;
		for (var y = 0; y < canvas.height; y++) {
			var red = Math.round(((noise.perlin2(xoff,yoff)+1)/2)*255);
			var green = red;
			var blue = red;

			// CSS color format rgb(red,green,blue). Each color can be [0,255]
			var colorString = "rgb(" + red + "," + green + "," + blue + ")"; 
			context.fillStyle = colorString;
			context.fillRect(x,y,1,1);

			yoff += perlinStep;
		};
		xoff += perlinStep;
	};
};

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

	drawPerlin2D(context,canvas);
};