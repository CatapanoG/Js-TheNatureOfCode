//
// The nature of code - introduction
//
// Exercise I.8
//
// Play with color, noiseDetail(), and the rate at which xoff and yoff are incremented to achieve different visual effects.
//

// Using josephg noisejs to generate Perlin noise.
// GitHub: https://github.com/josephg/noisejs

var perlinStep = 0.05;

var drawPerlin2D = function(context,canvas){

	noise.seed(Math.random());
	var xoff = 0.0;

	var image = context.createImageData(canvas.width,canvas.height);
	var data = image.data;

	for (var x = 0; x < canvas.width; x++) {
		var yoff = 0.0;
		for (var y = 0; y < canvas.height; y++) {
			var red = Math.round(((noise.perlin2(xoff,yoff)+1)/2)*255);
			var green = 0;
			var blue = 0;

			var pixelIndex = (x + y * canvas.height)*4;

			data[pixelIndex] = red;
			data[pixelIndex+1] = green;
			data[pixelIndex+2] = blue;
			data[pixelIndex+3] = 255; 

			yoff += perlinStep;
		};
		xoff += perlinStep;
	};

	context.putImageData(image,0,0);
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


