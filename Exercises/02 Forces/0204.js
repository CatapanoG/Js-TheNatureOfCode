//
// The nature of code - Ch.2 Forces
//
//Exercise 2.4
//
// Create pockets of friction in a Processing sketch so that objects only experience friction when crossing over those pockets.
// What if you vary the strength (friction coefficient) of each area? 
// What if you make some pockets feature the opposite of friction—i.e., 
// when you enter a given pocket you actually speed up instead of slowing down?
//
// Ported by: Gennaro Catapano
//

//
// Exercise code
//

var movers = [],
	moversLength = 10,
	pocket,
	wind,
	gravity;

function setup(canvas) {
	wind = new Vector2d(0.01,0);
	gravity = new Vector2d(0,0.1);

	for (var i = 0; i < moversLength; i++) {
		movers[i] = new Mover(canvas,Math.random()*5 + 0.1,100,50);
	};

	pocket1 = new Pocket(0,0,canvas.width,canvas.height/2,
							0.05,"red");
	pocket2 = new Pocket(0,(canvas.height/2)+1,canvas.width,(canvas.height/2)-1,
							-0.05,"green");
};

function draw(context,canvas) {
	background(context,canvas,"black");

	pocket1.display(context);
	pocket2.display(context);

	for (var i = 0; i < moversLength; i++) {
		movers[i].applyForce(pocket1.returnFriction(movers[i]));
		movers[i].applyForce(pocket2.returnFriction(movers[i]));

		movers[i].applyForce(wind);
		movers[i].applyForce(gravity);
		//movers[i].applyForce(repellingForce(movers[i],canvas));

		movers[i].update();
		movers[i].checkEdges(canvas);
		movers[i].display(context);
	};
};

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
	};

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
		}
	};
// 

// A force that repelles objects from the edges
	function repellingForce(mover,canvas) {
		
		var totalForce = new Vector2d(0,0),
			maxForce = 3000;

		// floor
		var d = canvas.height - mover.location.y;
		var f;
		if (d !== 0) {f = -maxForce/(d*d);} else {f = 0;};
		totalForce.add(new Vector2d(0,f));

		// right
		d = canvas.width - mover.location.x;
		if (d !== 0) {f = -maxForce/(d*d);} else {f = 0;};
		totalForce.add(new Vector2d(f,0));

		// left
		d = mover.location.x;
		if (d !== 0) {f = maxForce/(d*d);} else {f = 0;};
		totalForce.add(new Vector2d(f,0));	

		// ceiling
		d = mover.location.y;
		if (d !== 0) {f = maxForce/(d*d);} else {f = 0;};
		totalForce.add(new Vector2d(0,f));

		return totalForce;
	};
//

// Pockets - areas of the world with different frictions
	function Pocket(x,y,width,height,coeff,color){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.x1 = this.x + this.width;
		this.y1 = this.y + this.height;
		this.frictionCoeff = coeff;
		this.color = color;
	};

	Pocket.prototype = {
		checkIfInside: function(mover){
			if (mover.location.x > this.x && mover.location.x < this.x1 &&
				mover.location.y > this.y && mover.location.y < this.y1) {
				return true;
			} else { return false; };
		},
		display: function(context){
			context.fillStyle = this.color;
			context.fillRect(this.x,this.y,this.width,this.height);
		},
		returnFriction: function(mover){
			if (this.checkIfInside(mover)) {
				var friction = Vector2d.prototype.mult(-1,mover.velocity);
				friction.normalize();
				friction.mult(this.frictionCoeff);
				return friction;
			} else {
				return new Vector2d(0,0);
			};
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
		viewportHeight = 900,
		viewportWidth = 1800,
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