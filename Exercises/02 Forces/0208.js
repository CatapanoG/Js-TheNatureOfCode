//
// The nature of code - Ch.2 Forces
//
// Example 2.7: Attraction with many movers
//
// Ported by: Gennaro Catapano
//

//
// Exercise code
//

var movers = [],
	moversLength = 800,
	attractors = [],
	attractorsLength = 1,
	center,
	mouse,
	dist;

var flip = true;

function setup(canvas) {
	a = new Attractor(canvas);
	mouse = new Vector2d(0,0);

	for (var i = 0; i < attractorsLength; i++) {
		attractors[i] = new Attractor(canvas,
								50,
								canvas.width/2 + 100 - 75*i,
								canvas.height/2 + 50*i,
								-0.0 - 1*i,
								-4);
	};

	for (var i = 0; i < moversLength; i++) {
		movers[i] = new Mover(canvas,
								"black",
								1,
								canvas.width/2 - moversLength/2 + 0 + i,
								0,
								0,
								0);
	};

	for (var i = moversLength; i < moversLength*2; i++) {
		movers[i] = new Mover(canvas,
								"black",
								1,
								canvas.width/2 - moversLength/2 + 0 + i - moversLength,
								canvas.height,
								0,
								0);
	};

	center = new Attractor(canvas, 
						100, 
						canvas.width/2, 
						canvas.height/2,
						0.00,
						0.00);

	moversLength = movers.length;
}

function draw(context,canvas) {
	//center.update();
	//center.checkEdges(canvas);
	//center.display(context);


	//background(context,canvas,"black");
	for (var i = 0; i < moversLength; i++) {
		for (var j = 0; j < attractorsLength; j++) {
			var f = attractors[j].attract(movers[i]);
			movers[i].applyForce(f);
		};
		//var f = center.attract(movers[i]);
		//movers[i].applyForce(f);

		// motion 101
		movers[i].update();
		movers[i].checkEdges(canvas);
		movers[i].display(context);
	};

	for (var i = 0; i < attractorsLength; i++) {
		/*for (var j = 0; j < attractorsLength; j++) {
			if (j !== i) {
				var f = attractors[j].attract(attractors[i]);
				attractors[i].applyForce(f);
			};
		};*/
		var f = center.attract(attractors[i]);
		attractors[i].applyForce(f);

		attractors[i].update();
		attractors[i].checkEdges(canvas);
		attractors[i].display(context);

		/*if (attractors[0].location.y > canvas.height/2) {
			if (flip === true) {

			} else {
				flip = true;
				center.mass += 5;
				attractors[0].mass += 5;
			};
		};
		if (attractors[0].location.y < canvas.height/2) {
			if (flip === true) {
				flip = false;
			} else {

			};
		};*/

	};
};

// Mover object (Js has no classes)
	function Mover (canvas,color,m,x,y,velX,velY){
		this.location = new Vector2d(
			x,
			y
			);
		this.velocity = new Vector2d(
			velX,
			velY
			);
		this.acceleration = new Vector2d(
			0,
			0
			);
		this.topSpeed = 10;
		this.mass = m;
		this.color = color;
	}

	Mover.prototype = {
		update: function(){
			this.velocity.add(this.acceleration);
			this.velocity.limit(this.topSpeed);
			this.location.add(this.velocity);
			this.acceleration.mult(0);
		},
		display: function(context){
			//ellipse(context,this.location.x,this.location.y,this.mass*2);
			/*var red,
				green,
				blue;

			red = Math.round(this.velocity.mag() * this.velocity.mag())*100;
			if (red > 255) {red = 255;};
			if (red < 50) {red = 50};
			var colorString = "rgb(" + red + ",0,0)"*/

			context.fillStyle = this.color;
			context.fillRect(this.location.x,this.location.y,3,3);
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
				//this.location.y = 0;
				this.velocity.y *= -1;
				this.location.y = canvas.height;
				this.velocity.mult(0.5);
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

	function Attractor(canvas,m,x,y,velX,velY) {
		this.mass = m;
		this.location = new Vector2d(
			x,
			y
			);
		this.velocity = new Vector2d(
			velX,
			velY
			);
		this.acceleration = new Vector2d(
			0,
			0
			);
		this.G = 10,
		this.topSpeed = 10;
	};

	Attractor.prototype = {
		display: function(context){
			//ellipse(context,this.location.x,this.location.y,this.mass*2);
			var red,
				green,
				blue;	

			/*blue = Math.round(this.velocity.mag() * this.velocity.mag())*100;
			if (blue > 255) {blue = 255;};
			if (blue < 50) {blue = 50;};
			var colorString = "rgb(" + blue + "," + 0 + "," + blue + ")"

			context.fillStyle = colorString;*/
			context.fillStyle = "blue";
			context.fillRect(this.location.x,this.location.y,4,4);
		},
		attract: function(mover){
			var force = Vector2d.prototype.sub(this.location,mover.location);
			var distance = force.mag();

			if (distance < 25) {distance=25;};
			/*if (distance > 1000) {return new Vector2d(0,0);
			} else { 
				force.normalize();
				var strength = (this.G * this.mass * mover.mass) / (distance * distance);
				force.mult(strength);

				return force;
			};*/
			force.normalize();
			var strength = (this.G * this.mass * mover.mass) / (distance * distance);
			force.mult(strength);

			return force;
		},
		update: function(){
			this.velocity.add(this.acceleration);
			this.velocity.limit(this.topSpeed);
			this.location.add(this.velocity);
			this.acceleration.mult(0);
		},
		applyForce: function(vector2d){
			var f = Vector2d.prototype.div(this.mass,vector2d);
			this.acceleration.add(f);
		},
		checkEdges: function(canvas) {
			if (this.location.x > canvas.width) {
				//this.location.x = 0;
				this.location.x = canvas.width;
				this.velocity.x *= -1;
				//this.velocity.mult(0.5);
			} else if (this.location.x < 0) {
				//this.location.x = canvas.width;
				this.velocity.x *= -1;
				this.location.x = 0;
				//this.velocity.mult(0.5);
			}

			if (this.location.y > canvas.height) {
				//this.location.y = 0;
				this.velocity.y *= -1;
				this.location.y = canvas.height;
				//this.velocity.mult(0.5);
			} else if (this.location.y < 0) {
				//this.location.y = canvas.height;
				this.velocity.y *= -1;
				this.location.y = 0;
				//this.velocity.mult(0.5);
			}
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
	var backgroundColor = "DimGray",
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
			 context.globalAlpha = 0.05;
 			 /*canvas.onmousedown = function(e){
				 mouse.x = e.clientX;
				 mouse.y = e.clientY;

				 mouseHandler(canvas);
			 };*/

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