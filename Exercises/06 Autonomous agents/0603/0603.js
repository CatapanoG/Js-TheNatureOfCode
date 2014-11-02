//
// The nature of code - Ch.6 Autonomous agents
//
// Exercise 6.3: 
//
// Create a sketch where a vehicle’s maximum force and maximum speed do not remain constant, 
// but rather vary according to environmental factors.
//
// Ported by: Gennaro Catapano
//

//
// Example code
//

var mouse,
	trigoRunner,
	vehicle;

//
// main()
// Canvas and Loop init
//

(function main(){
	// std variables
	var backgroundColor = "Black",
		viewportHeight = window.innerHeight,
		viewportWidth = window.innerWidth,
		viewportId = "viewport",
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
		(function init(){
			context.globalAlpha = 0.75;

			trigoRunner = new TrigoRunner(canvas);
			vehicle = new Vehicle(canvas.width/2, canvas.height/2);

			updateWorld();
		}());
		function updateWorld(){
			Ambient.update();

			trigoRunner.trigoRun();
			trigoRunner.update();
			trigoRunner.checkEdges(canvas);

			vehicle.pursuit(trigoRunner);
			vehicle.update();
			vehicle.checkEdges(canvas);

			render();
		};
		function render(){
			background(context,canvas,Ambient.getBgColor());

			trigoRunner.display(context);
			vehicle.display(context);			

			requestAnimationFrame(updateWorld);
		};
	};
}());

