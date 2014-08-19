//
// The nature of code - Ch.2 Forces
//
// Exercise 2.9:
//
// It’s worth noting that gravitational attraction is a model we can follow to develop our own forces. 
// This chapter isn’t suggesting that you should exclusively create sketches that use gravitational attraction. 
// Rather, you should be thinking creatively about how to design your own rules to drive the behavior of objects. 
// For example, what happens if you design a force that is weaker the closer it gets and stronger the farther it gets? 
// Or what if you design your attractor to attract faraway objects, but repel close ones?
//
// Written by: Gennaro Catapano
//

//
// Exercise code
//

var movers = [],
	moversLength = 20,
	a,
	mouse,
	dist;

function setup(canvas) {
	a = new Attractor(canvas);
	mouse = new Vector2d(0,0);

	for (var i = 0; i < moversLength; i++) {
		movers[i] = new Mover(canvas,
								Math.random()*2,
								Math.random()*canvas.width,
								Math.random()*canvas.height);
	};
}

function draw(context,canvas) {
	background(context,canvas,"black");

	for (var i = 0; i < moversLength; i++) {
		var f = a.attract(movers[i]);
		movers[i].applyForce(f);

		// motion 101
		movers[i].checkEdges(canvas);
		movers[i].update();
		movers[i].display(context);
	};

	a.display(context);	
};

// Mover object (Js has no classes)
	function Mover (canvas,m,x,y){
		this.location = new Vector2d(
			x,
			y
			);
		this.velocity = new Vector2d(
			Math.random() - 0.5,
			Math.random() - 0.5
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
			ellipse(context,this.location.x,this.location.y,this.mass*2);
		},
		checkEdges: function(canvas) {
			if (this.location.x > canvas.width) {
				//this.location.x = 0;
				this.location.x = canvas.width;
				this.velocity.x *= -1;
				this.velocity.mult(0.5);
			} else if (this.location.x < 0) {
				//this.location.x = canvas.width;
				this.velocity.x *= -1;
				this.location.x = 0;
				this.velocity.mult(0.5);
			}

			if (this.location.y > canvas.height) {
				//his.location.y = 0;
				this.velocity.y *= -1;
				this.velocity.mult(0.5);
				this.location.y = canvas.height;
			} else if (this.location.y < 0) {
				//this.location.y = canvas.height;
				this.velocity.y *= -1;
				this.location.y = 0;
				this.velocity.mult(0.5);
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

// Attractor object

	function Attractor(canvas) {
		this.mass = 20;
		this.location = new Vector2d(canvas.width/2,canvas.height/2);
		this.G = 0.001;
		this.repelRange = 100;
		this.attractRange = 1000 - this.repelRange;
		this.repelStep = this.repelRange / Math.PI;
		this.attractStep = this.attractRange / Math.PI;
	};

	Attractor.prototype = {
		display: function(context){
			ellipse(context,this.location.x,this.location.y,this.mass*2);

			context.strokeStyle = "red";
			context.lineWidth = 1;
			context.beginPath();
			context.arc(this.location.x,this.location.y,this.repelRange,0,2*Math.PI);
			context.stroke();

			context.strokeStyle = "red";
			context.lineWidth = 1;
			context.beginPath();
			context.arc(this.location.x,this.location.y,this.attractRange,0,2*Math.PI);
			context.stroke();
		},
		attract2: function(mover){
			var force = Vector2d.prototype.sub(this.location,mover.location);
			var distance = force.mag();
			var strength;

			if (distance < this.closestForce) {
				strength = 0;
			} else if (distance < this.repelRange) {
				strength = -(this.G * this.mass * mover.mass)*(1/(distance * distance))*(1);
			} else if (distance < this.noforceRange) {
				strength = 0;	
			} else if (distance < this.attractRange) {
				strength =  (this.G * this.mass * mover.mass)*(1/(distance * distance))*(1);
			} else { 
				strength = 0;
			};

			force.normalize();
			force.mult(strength);

			return force;
		},
		attract: function(mover){
			var force = Vector2d.prototype.sub(this.location,mover.location);
			var distance = force.mag();
			var strength;

			if (distance < this.repelRange) {
				strength = Math.sin(Math.PI + distance/this.repelStep)*(this.G * mover.mass*this.mass)*(8);
			} else if (distance < this.attractRange) {
				strength = Math.sin(Math.PI*2 + distance/this.attractStep)*(this.G * mover.mass*this.mass)*(1);
			} else { 
				strength = 0;
			};

			force.normalize();
			force.mult(strength);

			return force;
		}
	};
//

// mouseHandler
	function mouseHandler(canvas){
		diff = Vector2d.prototype.sub(a.location,mouse);
		dist = diff.mag();
		var isDragging = false;

		if (dist < a.mass * 2) { // distance less than attractor radius
			isDragging = true;
			canvas.onmousemove = function(e){
				if(isDragging){
					mouse.x = e.clientX;
					mouse.y = e.clientY;
					a.location = Vector2d.prototype.add(mouse,diff);
				}
			};
			canvas.onmouseup = function(e){
				isDragging = false;
			};
		};
	};
// 

//
// main()
// Canvas and Loop init
//

(function main(){
	// std variables
	var backgroundColor = "Black",
		viewportHeight = 1080,
		viewportWidth = 1920,
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
 			 canvas.onmousedown = function(e){
				 mouse.x = e.clientX;
				 mouse.y = e.clientY;

				 mouseHandler(canvas);
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