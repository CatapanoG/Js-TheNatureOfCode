//
// The nature of code - Ch.1 Vectors
//
// Example 1.10: Accelerating towards the mouse
//
// Ported by: Gennaro Catapano
//

//
// Exercise code
//

var mover,
	mouse = new Vector2d(0,0),
	dir;

function setup(canvas) {
	mover = new Mover(canvas);
}

function draw(context,canvas) {
	background(context,canvas,"black");

	mover.update();
	mover.checkEdges(canvas);
	mover.display(context);
}

// Mover object (Js has no classes)
	function Mover (canvas){
		this.location = new Vector2d(
			canvas.width/2,
			canvas.height/2
			);
		this.velocity = new Vector2d(
			0,
			0
			);
		this.acceleration = new Vector2d(
			0,
			0
			);
		this.topSpeed = 5;
	}

	Mover.prototype = {
		update: function(){
			dir = Vector2d.prototype.sub(mouse,this.location);
			dir.normalize();
			dir.mult(0.5);

			this.acceleration.set(dir);

			this.velocity.add(this.acceleration);
			this.velocity.limit(this.topSpeed);
			this.location.add(this.velocity);
		},
		display: function(context){
			ellipse(context,this.location.x,this.location.y,16);
		},
		checkEdges: function(canvas) {
			if (this.location.x > canvas.width) {
				this.location.x = 0;
			} else if (this.location.x < 0) {
				this.location.x = canvas.width;
			}

			if (this.location.y > canvas.height) {
				this.location.y = 0;
			} else if (this.location.y < 0) {
				this.location.y = canvas.height;
			}
		}
	};
// 

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
			 canvas.onmousemove = function(e){
				 mouse.x = e.clientX;
				 mouse.y = e.clientY;
			 };
			 setup(canvas);
			 //


		}());
		function updateWorld(){
			// update logic here
			 //
			 //
			render();
		}
		function render(){
			// rendering logic here
			 draw(context,canvas);
			 //
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