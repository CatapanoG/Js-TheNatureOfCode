//
// The nature of code - Ch.6 Autonomous agents
//
// Exercise 6.1: Implement a “fleeing” steering behavior (desired vector is inverse of “seek”).
//
// Ported by: Gennaro Catapano
//

//
// Example code
//

var mouse,
	vehicle;

function setup(context,canvas) {
	vehicle = new Vehicle(canvas.width/2, canvas.height/2);
	mouse = new Vector2d(canvas.width/2, canvas.height/2);
};

function update(canvas){
	vehicle.flee(mouse);
	vehicle.update();
	vehicle.checkEdges(canvas);
};

function draw(context,canvas) {
	background(context,canvas,"Black");

	vehicle.display(context);
};

// Mover object
	function Vehicle (x,y){
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

		this.r = 5;
		this.maxforce = 0.1;
		this.maxspeed = 4;
	};

	Vehicle.prototype = {
		update: function(){
			this.velocity.add(this.acceleration);
			this.velocity.limit(this.topSpeed);
			this.location.add(this.velocity);
			this.acceleration.mult(0);
		},
		display: function(context){
			context.save();
			var theta = Math.atan2(this.velocity.y,this.velocity.x) + Math.PI/2;
			//var theta = Math.PI/3;

			context.translate(this.location.x,this.location.y);
			context.rotate(theta);
			
			triangle(context,
				new Vector2d(0, - this.r*2),
				new Vector2d(-this.r,this.r*2),
				new Vector2d(this.r,this.r*2));

			context.restore();
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
			//var f = Vector2d.prototype.div(this.mass,vector2d);
			this.acceleration.add(vector2d);
		},
		seek: function(vector2d){
			var desired = Vector2d.prototype.sub(vector2d,this.location);
			desired.normalize();
			desired.mult(this.maxspeed);
			var steer = Vector2d.prototype.sub(desired,this.velocity);
			steer.limit(this.maxforce);
			this.applyForce(steer);
		},
		flee: function(vector2d){
			var desired = Vector2d.prototype.sub(vector2d,this.location);
			desired.normalize();
			desired.mult(-1*this.maxspeed);
			var steer = Vector2d.prototype.sub(desired,this.velocity);
			steer.limit(this.maxforce);
			this.applyForce(steer);			
		}
	};
//


// mouseHandler
	function mouseHandler(canvas){
		canvas.onmousemove = function(e){
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};
	};
// 


// UI

	var UI = {

		barLength : 150,
		barHeight : 50,
		barPadding : 2,
		barMargin : 10,
		xOrigin : 20,
		yOrigin: 20,

		display: function(context,canvas){
			context.font="20px Georgia";
			context.fillStyle = "White";
			var speed = Math.round(mover.velocity.mag()*100)/100;
			context.fillText("Speed: " + speed,10,50);
			var acceleration = Math.round(mover.lastAcceleration.mag()*100)/100;
			context.fillText("Acceleration: " + acceleration,10,80);
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
		viewportHeight = 600,
		viewportWidth = 600,
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
			// initialize stuff here
			 //context.globalAlpha = 0.6;
			 mouseHandler(canvas);
			 //keyHandler(canvas);
			 setup(context,canvas);
			 //

			 updateWorld();
		}());
		function updateWorld(){
			// update logic here
			 //
			 update(canvas);
			 render();
			 //
		}
		function render(){
			// rendering logic here
			 //
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
	var lineWidth = 4;

	function ellipse(context,x,y,radius){
		context.fillStyle = helpersFillStyle;
		context.strokeStyle = helpersStrokeStyle;
		context.lineWidth = lineWidth;
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
		context.lineWidth = lineWidth;
		context.beginPath(); // resets the previous path
		context.moveTo(x0,y0); // no translation f() so had to be done manually
		context.lineTo(x1,y1); // no translation f() so had to be done manually
		context.stroke();
	}

	function rectangle(context, x, y, width, height){
		context.fillStyle = helpersStrokeStyle;
		context.fillRect(x, y, width, height);

		context.fillStyle = helpersFillStyle;
		context.fillRect(x+lineWidth/2,y+lineWidth/2,width-lineWidth,height-lineWidth);
	}

	function triangle(context, A, B, C){
		context.fillStyle = helpersFillStyle;
		context.strokeStyle = helpersStrokeStyle;
		context.lineWidth = lineWidth;
		context.beginPath();
	    context.moveTo(A.x,A.y);
	    context.lineTo(B.x,B.y);
	    context.lineTo(C.x,C.y);
	    context.lineTo(A.x,A.y);
	    context.fill();
	    context.stroke();
	}
//