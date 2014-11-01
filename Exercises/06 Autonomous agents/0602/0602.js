//
// The nature of code - Ch.6 Autonomous agents
//
// Exercise 6.2: 
//
// Implement seeking a moving target, often referred to as “pursuit.” 
// In this case, your desired vector won’t point towards the object’s current location, 
// but rather its “future” location as extrapolated from its current velocity. 
// We’ll see this ability for a vehicle to “predict the future” in later examples
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
		viewportHeight = 800,
		viewportWidth = 800,
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
		(function init(){
			context.globalAlpha = 0.25;

			trigoRunner = new TrigoRunner(canvas);
			vehicle = new Vehicle(canvas.width/2, canvas.height/2);

			updateWorld();
		}());
		function updateWorld(){
			trigoRunner.trigoRun();
			trigoRunner.update();
			trigoRunner.checkEdges(canvas);

			vehicle.pursuit(trigoRunner);
			vehicle.update();
			vehicle.checkEdges(canvas);

			render();
		};
		function render(){
			background(context,canvas,"Black");

			trigoRunner.display(context);
			vehicle.display(context);			

			requestAnimationFrame(updateWorld);
		};
	};
}());

