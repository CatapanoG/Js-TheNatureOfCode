//
// The nature of code - introduction
//
// Exercise I.9
//
// Add a third argument to noise that increments once per cycle through draw() to animate the two-dimensional noise.
//

// Using josephg noisejs to generate Perlin noise.
// GitHub: https://github.com/josephg/noisejs

var Perlin = function(context,canvas){
	this.perlinStep = 0.05;
	this.seed = Math.random();
	this.xoff = 0.0;
	this.yoff = 0.0;
	this.context = context;
	this.canvas = canvas;
	this.image = context.createImageData(canvas.width,canvas.height);
	this.data = this.image.data;
	this.time = 0.0;
	this.timeStep = 0.05;
	this.initialize = function(){
		noise.seed(this.seed);
	};
	this.draw = function(){
		for (var x = 0; x < this.canvas.width; x++) {
			this.yoff = 0.0;
			for (var y = 0; y < this.canvas.height; y++) {
				var red = Math.round(((noise.perlin3(this.xoff,this.yoff,this.time)+1)/2)*255);
				var green = 0;
				var blue = 0;// red*Math.sin(this.time);

				var pixelIndex = (x + y * this.canvas.height)*4;

				this.data[pixelIndex] = red;
				this.data[pixelIndex+1] = green;
				this.data[pixelIndex+2] = blue;
				this.data[pixelIndex+3] = 255; 

				this.yoff += this.perlinStep;
			};
			this.xoff += this.perlinStep;
		};
		this.context.putImageData(this.image,0,0);
		this.xoff = 0.0;
		this.time += this.timeStep;
	};
};

var p; // placeholder for a Perlin instance

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

function Loop(){
	var canvas = document.getElementById("viewport");
	var context = canvas.getContext("2d");

	(function init(){
		p = new Perlin(context,canvas);
		p.initialize();
	}());
	function updateWorld(){
		draw();
	}
	function draw(){
		p.draw();
	}

	setInterval(updateWorld,timeStep); // setInterval() calls a function every timeStep
};


