//
// The nature of code - Ch.3 Oscillation
//
// Exercise 3.8
// Incorporate angular acceleration into the Oscillator object.
//
// Written by: Gennaro Catapano
//

//
// Exercise code
//

var oscillators = [],
	oscillatorsLength = 3000;

function setup(context,canvas) {

	var theta = 0,
		thetaMax = 5, // num of complete circles in the spiral
		r = 0,
		rMax = (canvas.width/2)*1,
		x = 0,
		y = 0;

	for (var i = 0; i < oscillatorsLength; i++) {

		theta = (i+1)*(Math.PI*2*thetaMax/(oscillatorsLength-1));
		//r = 0.05*(i*0+1)*(rMax/(oscillatorsLength-1));
		r = 0.01 + 0.0001*i;

		x = r*Math.cos(theta)/1;
		y = r*Math.sin(theta)/1;

		var angle = new Vector2d(x,y);
			//velocity = new Vector2d(0.0,0.0),
			velocity = new Vector2d(-y*0.004/(r/2),x*0.004/r),
			//velocity = new Vector2d(0.01,0.01+theta/thetaMax*0.01),
			//acceleration = new Vector2d(-y*0.00001/(r/2),x*0.00001/r),
			acceleration = new Vector2d(0,0),
			amplitude = new Vector2d(canvas.height/2,canvas.height/2);

		oscillators.push(new Oscillator(canvas,angle,velocity,acceleration,amplitude));
	};
};

function update(canvas){
	for (var i = 0; i < oscillatorsLength; i++) {

		var acc = new Vector2d(
			oscillators[i].velocity.y*-1,
			oscillators[i].velocity.x);

		acc.normalize();
		acc.mult(oscillators[i].velocity.mag()/30);

		oscillators[i].acceleration = acc;

		oscillators[i].oscillate();

		/*if (oscillators[i].position.x <= -canvas.height/2 + 20 || oscillators[i].position.x >= canvas.height/2 -20 ||
			oscillators[i].position.y <= -canvas.height/2 + 20 || oscillators[i].position.y >= canvas.height/2 - 20) {

			oscillators.splice(i, 1);
			oscillatorsLength -= 1;
		};*/
	};
};

function draw(context,canvas) {
	context.globalAlpha = 0.03;
	background(context,canvas,"Black");
	context.globalAlpha = 1;

	for (var i = 0; i < oscillatorsLength; i++) {
		oscillators[i].display(context,canvas);
	};

	context.globalAlpha = 1;
	context.fillStyle = "Black";
	context.fillRect(0,0,(canvas.width-1060)/2,canvas.height);
	UI.display(context,canvas);
	context.globalAlpha = 0.05;
};

// Mover object (Js has no classes)
	function Mover (canvas,m,x,y){
		this.location = new Vector2d(
			x,
			y
			);
		this.velocity = new Vector2d(
			0,
			-0.001
			);
		this.acceleration = new Vector2d(
			0,
			0
			);
		this.lastAcceleration = new Vector2d(
			0,
			0
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
			this.velocity.limit(this.topSpeed);
			this.location.add(this.velocity);

			//this.aAcceleration = this.acceleration.x * 10;
			//this.aVelocity += this.aAcceleration;
			//this.angle += this.aVelocity;

			//this.angle = Math.atan2(this.velocity.y, this.velocity.x) - Math.PI/2;

			this.lastAcceleration = new Vector2d(this.acceleration.x,this.acceleration.y);
			this.acceleration.mult(0);
		},
		display: function(context){
			context.save();

			context.translate(this.location.x,this.location.y);
			//context.rotate(this.angle*Math.PI/180);
			context.rotate(this.angle);

			//rectangle(context, -this.mass, -this.mass/2, this.mass*2, this.mass);
			//ellipse(context,this.location.x,this.location.y,this.mass*2);		

			var a = new Vector2d(-20,-10);
				b = new Vector2d( 20,-10);
				c = new Vector2d(  0, 50);

			triangle(context,a,b,c);
			//rectangle(context, -15.0, -20, 8.0, 10);
			//rectangle(context,  08.0, -20, 8.0, 10);

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

// Oscillator object
	
	function Oscillator(canvas,angle,velocity,acceleration,amplitude) {
		this.angle = angle;
		this.velocity = velocity;
		this.acceleration = acceleration;
		this.amplitude = amplitude;
		this.position = new Vector2d(0,0);

		this.topvelocity = 5;
	}

	Oscillator.prototype = {
		oscillate: function(){
			this.velocity.add(this.acceleration);
			this.angle.add(this.velocity);

			this.velocity.limit(this.topvelocity);
			this.acceleration.mult(0);

			var x = Math.sin(this.angle.x)*this.amplitude.x;
			var y = Math.sin(this.angle.y)*this.amplitude.y;

			this.position.x = x;
			this.position.y = y;
		},
		display: function(context,canvas){
			context.save();
			context.translate(canvas.width/2,canvas.height/2);
			//line(context,0,0,x,y);
			//ellipse(context,this.position.x,this.position.y,16);

			context.fillStyle = "Blue";
			context.fillRect(this.position.x, this.position.y, 4, 4);

			context.restore();
		}
	}
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
		canvas.onmousemove = function(e){
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};
	};
// 

// keyboardHandler
	function keyHandler(canvas){
		document.addEventListener('keydown', function(event) {
		    if (event.keyCode == 33) {
		        //alert('Page up');
		    }
		    else if (event.keyCode == 34) {
		        //alert('Page down');
		    }
		    else if (event.keyCode == 38) {
		        //alert('up');

		        // this next commented line is wrong and just references to the velocity vector 
		        // without actually creating a copy of it
		        //var acc = mover.velocity;

		        //var acc = Vector2d.prototype.mult(1,mover.velocity);
		        //acc.normalize();
		        //acc.mult(mover.mass/10);
		        //mover.applyForce(acc);

		        var acc = new Vector2d(Math.cos(mover.angle + Math.PI/2),Math.sin(mover.angle + Math.PI/2));
		        acc.mult(5);
		        mover.applyForce(acc);
		    }
		    else if (event.keyCode == 40) {
		        //alert('down');
		        var acc = Vector2d.prototype.mult(1,mover.velocity);
		        acc.mult(-mover.mass/10);
		        mover.applyForce(acc);
		    }
		    else if (event.keyCode == 37) {
		        //alert('left');
		        //var acc = new Vector2d(mover.velocity.y,-mover.velocity.x);
		        //acc.mult(mover.mass/10);
		        //mover.applyForce(acc);

		        mover.angle -= 0.1;
		    }
		    else if (event.keyCode == 39) {
		        //alert('right');
		        //var acc = new Vector2d(-mover.velocity.y,mover.velocity.x);
		        //acc.mult(mover.mass/10);
		        //mover.applyForce(acc);

		        mover.angle += 0.1;
		    }
		    else if (event.keyCode == 32) {
		        //alert('space');
		    }
		}, true);
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
			context.fillText("Oscillators: " + oscillatorsLength,10,50);
			//var acceleration = Math.round(mover.lastAcceleration.mag()*100)/100;
			//context.fillText("Acceleration: " + acceleration,10,80);
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
		viewportHeight = 940,
		viewportWidth = 1850,
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
			 //context.globalAlpha = 0.05;
			 //mouseHandler(canvas);
			 //keyHandler(canvas);
			 setup(context,canvas);
			 //


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