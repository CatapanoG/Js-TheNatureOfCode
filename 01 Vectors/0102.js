//
// The nature of code - introduction
//
// Example 1.2: Bouncing ball with vectors
//
// Ported by: Gennaro Catapano
//

//
// Bouncing ball
//

var theLocation, 
	velocity;

function setup(){
	theLocation = new Vector2d(100,100);
	velocity = new Vector2d(2.5,5);
}

function draw(context,canvas){
	background(context,canvas,"Black");

	theLocation.add(velocity);

	if ((theLocation.x>canvas.width) || (theLocation.x<0)) {
		velocity.x = velocity.x * -1;
	};
	if ((theLocation.y>canvas.height) || (theLocation.y<0)) {
		velocity.y = velocity.y * -1;
	};

	ellipse(context,theLocation.x,theLocation.y,16);
}

//
// main()
// Canvas and Loop init
//

(function main(){
	// std variables
	var backgroundColor = "Black",
		viewportHeight = 200,
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
			setup(); //
		}());
		function updateWorld(){
			// update logic here
			render();
		}
		function render(){
			// rendering logic here
			draw(context,canvas); //

			requestAnimationFrame(updateWorld);
		}
	};
}());

//
// helper functions ellipse(), background()
//

function ellipse(context,x,y,radius){
	context.fillStyle = "Grey";
	context.strokeStyle = "White";
	context.lineWidth = 4;
	context.beginPath();
	context.arc(x,y,radius,0,2*Math.PI);
	context.fill();
	context.stroke();
}

function background(context,canvas,color){
	context.fillStyle = color;
	context.fillRect(0,0,canvas.width,canvas.height);
}