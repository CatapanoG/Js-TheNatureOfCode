// 
// A simple Canvas 2d boilerplate
//
// Author: Gennaro Catapano
// Author website: www.gennarocatapano.it
// Version: 0.0.3
// Date: 13-Aug-2014
//
// Sets up a Canvas and a loop with 3 components:
// init(), updateworld() and draw().
// 

//
// The nature of code
// Exercise 1.2
// 
// Take one of the walker examples from the introduction and convert it to use PVectors.
//

// Using josephg noisejs to generate Perlin noise.
// GitHub: https://github.com/josephg/noisejs

// Using Irwin-Hall approx to std Normal:
// http://en.wikipedia.org/wiki/Normal_distribution#Generating_values_from_normal_distribution

//Walker constructor 
var Walker = function(x,y){
	this.position = new Vector2d(x,y);
	this.noise = noise.seed(Math.random());
	this.perlinSeed = new Vector2d(0,0.5);
	this.perlinIncrement = 0.005;
	this.display = function(context,canvas){
		context.fillStyle = "Grey";
		context.strokeStyle = "White";
		context.lineWidth = 4;
		context.beginPath();
		context.arc(this.position.x,this.position.y,32,0,2*Math.PI);
		context.fill();
		context.stroke();
	};
	this.step = function(canvas){ // Perlin step function
		this.perlinSeed.x += this.perlinIncrement;
		this.perlinSeed.y += this.perlinIncrement;
		var perlin = new Vector2d(
			noise.perlin2(this.perlinSeed.x,this.perlinSeed.x),
			noise.perlin2(this.perlinSeed.y,this.perlinSeed.y)
			);

		this.position.x = perlin.x*canvas.width/2 + canvas.width/2;
		this.position.y = perlin.y*canvas.height/2 + canvas.height/2;
	}
};

//Walker instance
var w;


//
// main()
// Canvas and Loop init
//

(function main(){
	// std variables
	var backgroundColor = "Black",
		viewportHeight = 900,
		viewportWidth = 900,
		viewportId = "viewport",
		timeStep = 1000 / 30,
		canvas,
		context;

	// canvas & context creation
	window.onload = function() {
		canvas = document.createElement("canvas");
		canvas.setAttribute("width", viewportWidth);
		canvas.setAttribute("height", viewportHeight);
		canvas.setAttribute("id", viewportId);
		document.getElementById("canvasPlace").appendChild(canvas);
		context = canvas.getContext("2d");

		context.fillStyle = backgroundColor;
		context.fillRect(0,0,canvas.width,canvas.height);

		Loop();
	};

	// main loop
	function Loop(){
		requestAnimationFrame(updateWorld);

		(function init(){
			// initialize stuff here
			w = new Walker(canvas.width/2,canvas.height/2);
		}());
		function updateWorld(){
			// update logic here
			w.step(canvas);
			draw();
		}
		function draw(){
			// rendering logic here
			context.fillStyle = backgroundColor;
			context.fillRect(0,0,canvas.width,canvas.height);

			w.display(context,canvas);

			requestAnimationFrame(updateWorld);
		}
	};
}());
