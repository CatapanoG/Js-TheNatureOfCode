//
// The nature of code - Ch.1 Vectors
//
// Example 1.5: Vector magnitude
//
// Ported by: Gennaro Catapano
//

//
// Exercise code
//

var mouse = new Vector2d(0,0),
	center,
	m;

function trackMouse(context,canvas){
	canvas.onmousemove = function(e){
		mouse.x = e.clientX;
		mouse.y = e.clientY;
		mouse.sub(center);
		m = mouse.mag();
	};
}

function draw(context){
	context.fillStyle = "white";
	context.fillRect(0,0,m,10);

	line(context,0+center.x,0+center.y,mouse.x+center.x,mouse.y+center.y);
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
			center = new Vector2d(canvas.width/2,canvas.height/2); //
			trackMouse(context,canvas); //

		}());
		function updateWorld(){
			// update logic here
			render();
		}
		function render(){
			// rendering logic here
			background(context,canvas,backgroundColor);
			draw(context); //

			requestAnimationFrame(updateWorld);
		}
	};
}());

//
// helper functions ellipse(), background() etc
//

var helpersStrokeStyle = "white";
var helpersFillStyle = "grey";

function ellipse(context,x,y,radius){
	context.fillStyle = helpersFillStyle;
	context.strokeStyle = helpersStrokeStyle;
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

function line(context,x0,y0,x1,y1){
	context.strokeStyle = helpersStrokeStyle;
	context.lineWidth = 3;
	context.beginPath(); // resets the previous path
	context.moveTo(x0,y0); // no translation f() so had to be done manually
	context.lineTo(x1,y1); // no translation f() so had to be done manually
	context.stroke();
}