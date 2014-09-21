//
// The nature of code - Ch.2 Forces
//
// Exercise 3.2
// Cannon simulation
//
// Ported by: Gennaro Catapano
//

//
// Exercise code
//

var cannon,
	projectile,
	gravity = new Vector2d(0, +0.01);

function setup(canvas) {
	mouse = new Vector2d(0,0);
	cannon = new Cannon(canvas, 100, canvas.height - 20);
}

function draw(context,canvas) {
	background(context,canvas,"Black");
	//context.save();

	context.fillStyle = "Green";
	context.fillRect(0,canvas.height - 20,canvas.width,canvas.height);

	cannon.display(context);

	if (projectile) {
		var distance = Vector2d.prototype.sub(projectile.location, new Vector2d(cannon.location.x,cannon.location.y - 40)).mag();
		if (distance > cannon.cannonLength) {projectile.applyForce(gravity);};	
		projectile.update();
		projectile.display(context);
	};
};

// Cannon object

	function Cannon (canvas,x,y){
		this.location = new Vector2d(x,y);
		this.angle = 10;
		this.force = 20;
		this.cannonLength = 50;
	}

	Cannon.prototype = {
		display: function(context,canvas){
			context.fillStyle = "White";
			context.fillRect(this.location.x - 30, this.location.y - 40, 60, 25);
			ellipse(context, this.location.x - 25, this.location.y - 16, 16);
			ellipse(context, this.location.x + 25, this.location.y - 16, 16);

			context.save();	

			context.translate(this.location.x, this.location.y - 40);
			context.rotate(-this.angle*Math.PI/180);
			context.fillStyle = "White";
			context.fillRect(0,-4,this.cannonLength,8);

			context.restore();

			ellipse(context, this.location.x, this.location.y - 40, 8);

			UI.display(context,canvas,this.force,this.angle);
		}
	}
//

// UI

	var UI = {

		barLength : 150,
		barHeight : 50,
		barPadding : 2,
		barMargin : 10,
		xOrigin : 20,
		yOrigin: 20,

		display: function(context,canvas,force,angle){
			context.fillStyle = "White";
			context.fillRect(this.xOrigin,this.yOrigin,this.barLength,this.barHeight);
			context.fillStyle = "Black";
			context.fillRect(this.xOrigin + this.barPadding,this.yOrigin + this.barPadding,this.barLength - 2*this.barPadding, this.barHeight - 2*this.barPadding);
			context.fillStyle = "Red";
			context.fillRect(this.xOrigin + this.barPadding,this.yOrigin + this.barPadding,(force/100)*(this.barLength - 2*this.barPadding),this.barHeight - 2*this.barPadding);

			context.fillStyle = "White";
			context.fillRect(this.xOrigin,this.yOrigin + this.barHeight + this.barMargin,this.barLength,this.barHeight);
			context.fillStyle = "Black";
			context.fillRect(this.xOrigin + this.barPadding,this.yOrigin + this.barPadding + this.barHeight + this.barMargin,this.barLength - 2*this.barPadding, this.barHeight - 2*this.barPadding);
			context.fillStyle = "Red";
			context.fillRect(this.xOrigin + this.barPadding,this.yOrigin + this.barPadding + this.barHeight + this.barMargin,(angle/90)*(this.barLength - 2*this.barPadding),this.barHeight - 2*this.barPadding);
		}

	};

//

// Mover object (Js has no classes)
	function Mover (canvas,m,x,y,accX,accY){
		this.location = new Vector2d(
			x,
			y
			);
		this.velocity = new Vector2d(
			0,
			0
			);
		this.acceleration = new Vector2d(
			accX,
			accY
			);
		this.topSpeed = 5;
		this.mass = m;
		this.G = 1.5;

		this.angle = 0;
		this.aVelocity = 0;
		this.aAcceleration = 0;
	}

	Mover.prototype = {
		update: function(){
			this.velocity.add(this.acceleration);
			//this.velocity.limit(this.topSpeed);
			this.location.add(this.velocity);

			this.aAcceleration = this.acceleration.x * 10;
			this.aVelocity += this.aAcceleration;
			this.angle += this.aVelocity;

			this.acceleration.mult(0);
		},
		display: function(context){
			context.save();

			context.translate(this.location.x,this.location.y);
			context.rotate(this.angle*Math.PI/180);

			context.fillStyle = "White";
			context.fillRect(- this.mass/2 - 2,- this.mass/2 - 2,this.mass + 4,this.mass + 4);

			context.fillStyle = "Grey";
			context.fillRect(- this.mass/2,- this.mass/2,this.mass,this.mass);

			//ellipse(context,this.location.x,this.location.y,this.mass*2);		

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
		},
		attract: function(mover){
			var force = Vector2d.prototype.sub(this.location,mover.location);
			var distance = force.mag();

			if (distance < 15 ) { distance = 15;};
			if (distance > 400) {return new Vector2d(0,0);
			} else { 
				force.normalize();
				var strength = (this.G * this.mass * mover.mass) / (distance * distance);
				force.mult(strength);

				return force;
			};
		}
	};
//

// Attractor object

	function Attractor(canvas) {
		this.mass = 20;
		this.location = new Vector2d(canvas.width/2,canvas.height/2);
		this.G = 3;
	};

	Attractor.prototype = {
		display: function(context){
			ellipse(context,this.location.x,this.location.y,this.mass*2);
		},
		attract: function(mover){
			var force = Vector2d.prototype.sub(this.location,mover.location);
			var distance = force.mag();

			if (distance < 5) {distance=5;};
			if (distance > 400) {return new Vector2d(0,0);
			} else { 
				force.normalize();
				var strength = (this.G * this.mass * mover.mass) / (distance * distance);
				force.mult(strength);

				return force;
			};
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

// keyboardHandler
	function keyHandler(canvas){
		document.addEventListener('keydown', function(event) {
		    if (event.keyCode == 33) {
		        //alert('Page up');
		        if (cannon.force < 100) {cannon.force += 1;};
		    }
		    else if (event.keyCode == 34) {
		        //alert('Page down');
		        if (cannon.force > 0) {cannon.force -= 1;};
		    }
		    else if (event.keyCode == 38) {
		        //alert('up');
		        if (cannon.angle < 90) {cannon.angle += 1;};
		    }
		    else if (event.keyCode == 40) {
		        //alert('down');
		        if (cannon.angle > 0) {cannon.angle -= 1;};
		    }
		    else if (event.keyCode == 32) {
		        //alert('space');
		        var slope = Math.abs(Math.tan(cannon.angle*Math.PI/180));
		        //var xAcc = (90 - cannon.angle)/90;
		        //var yAcc = -(1 - xAcc);
		        var xAcc = 1/(1+slope);
		        var yAcc = slope/(1+slope);
		        xAcc *= cannon.force / 10;
		        yAcc *= -cannon.force / 10;
		        //projectile = new Mover(canvas,1,cannon.location.x, cannon.location.y - 40, 1, slope);
		        projectile = new Mover(canvas,1,cannon.location.x, cannon.location.y - 40, xAcc, yAcc);
		    }
		}, true);
	};
//

//
// main()
// Canvas and Loop init
//

(function main(){
	// std variables
	var backgroundColor = "Blue",
		viewportHeight = 800,
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
			 //context.globalAlpha = 0.25;
 			 /*canvas.onmousedown = function(e){
				 mouse.x = e.clientX;
				 mouse.y = e.clientY;

				 mouseHandler(canvas);
			 };*/
			 keyHandler(canvas);

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