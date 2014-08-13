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
// main()
// Canvas and Loop init
//

(function main(){
	// std variables
	var backgroundColor = "Black",
		viewportHeight = 900,
		viewportWidth = 900,
		viewportId = "viewport",
		time = 0,
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
		}());
		function updateWorld(){
			time += timeStep;
			// update logic here
			draw();
		}
		function draw(){
			// rendering logic here
			requestAnimationFrame(updateWorld);
		}
	};
}());


