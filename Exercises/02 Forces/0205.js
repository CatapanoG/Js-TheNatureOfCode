//
// The nature of code - Ch.2 Forces
//
// Exercise 2.5:
// Take a look at our formula for drag again: drag force = coefficient * speed * speed. 
// The faster an object moves, the greater the drag force against it. 
// In fact, an object not moving in water experiences no drag at all. 
// Expand the example to drop the balls from different heights. 
// How does this affect the drag as they hit the water?
//
// Solved & ported by: Gennaro Catapano
//

//
// Exercise code
//

var movers = [],
	moversLength = 20,
	liquid,
	wind,
	gravity;

function setup(canvas) {
	wind = new Vector2d(0.01,0);
	gravity = new Vector2d(0,0.1);

	liquid = new Liquid(0,canvas.height/2,canvas.width,canvas.height/2,0.1);

	for (var i = 0; i < moversLength; i++) {
		movers[i] = new Mover(
			canvas,									// pass the Canvas
			0.7,										// constant Mass
			i*((canvas.width-20)/moversLength)+20,	// evenly spaced on x axis
			0 + i*25);								// height linearly deceased 
	};
}

function draw(context,canvas) {
	background(context,canvas,"black");
	liquid.display(context);

	for (var i = 0; i < moversLength; i++) {
		//liquid	
		if (movers[i].isInside(liquid)) {
			movers[i].drag(liquid);
		};

		//friction
		/*var c = 0.025;
		var friction = Vector2d.prototype.mult(-1,movers[i].velocity);
		friction.normalize();
		friction.mult(c);
		movers[i].applyForce(friction);*/

		// wind
		//movers[i].applyForce(wind);

		// gravity
		var m = movers[i].mass;
		var gravityAdj = Vector2d.prototype.mult(m,gravity); // gravity is scaled by mass
		movers[i].applyForce(gravityAdj);

		// motion 101
		movers[i].update();
		movers[i].checkEdges(canvas);
		movers[i].display(context);
	};
}

// Mover object (Js has no classes)
	function Mover (canvas,m,x,y){
		this.location = new Vector2d(
			x,
			y
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
		this.mass = m;
	}

	Mover.prototype = {
		update: function(){
			this.velocity.add(this.acceleration);
			//this.velocity.limit(this.topSpeed);
			this.location.add(this.velocity);

			this.acceleration.mult(0);
		},
		display: function(context){
			ellipse(context,this.location.x,this.location.y,this.mass*16);
		},
		checkEdges: function(canvas) {
			if (this.location.x > canvas.width) {
				//this.location.x = 0;
				this.location.x = canvas.width;
				this.velocity.x *= -1;
			} else if (this.location.x < 0) {
				//this.location.x = canvas.width;
				this.velocity.x *= -1;
				this.location.x = 0;
			}

			if (this.location.y > canvas.height) {
				//his.location.y = 0;
				this.velocity.y *= -1;
				this.location.y = canvas.height;
			} else if (this.location.y < 0) {
				//this.location.y = canvas.height;
				this.velocity.y *= -1;
				this.location.y = 0;
			}
		},
		applyForce: function(vector2d){
			var f = Vector2d.prototype.div(this.mass,vector2d);
			this.acceleration.add(f);
		},
		isInside: function(obj){
			if (this.location.x > obj.x && this.location.x < (obj.x+obj.w) &&
				this.location.y > obj.y && this.location.y < (obj.y+obj.h)) {
					return true;
				} else {
					return false;
				};				
		},
		drag: function(liquid){
			var speed = this.velocity.mag();
			var dragMagnitude = liquid.c * speed * speed;

			var drag = Vector2d.prototype.mult(1,this.velocity);
			drag.mult(-1);
			drag.normalize();

			drag.mult(dragMagnitude);

			this.applyForce(drag);
		}
	};
// 

// Liquid object (Js has no classes)
	function Liquid (x,y,width,height,c){
		this.x = x;
		this.y = y;
		this.w = width;
		this.h = height;
		this.c = c;
	};

	Liquid.prototype = {
		display: function(context){
			context.fillStyle = "MidnightBlue";
			context.fillRect(this.x,this.y,this.w,this.h);
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
		viewportHeight = 1000,
		viewportWidth = 1900,
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
			 context.globalAlpha = 0.25;
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