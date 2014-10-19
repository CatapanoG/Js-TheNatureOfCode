//
// The nature of code - Ch.5 Physics Libraries
// http://natureofcode.com/book/chapter-5-physics-libraries/
//
// Exercise 5.10
// Take any example you made previously using a force calculation and bring that force calculation into Box2D.
//
// Example ported-written by: Gennaro Catapano
// www.gennarocatapano.it
//

// Box2dWeb definitions
var b2Vec2 = Box2D.Common.Math.b2Vec2,
	b2AABB = Box2D.Collision.b2AABB,
	b2BodyDef = Box2D.Dynamics.b2BodyDef,
	b2Body = Box2D.Dynamics.b2Body,
	b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	b2Fixture = Box2D.Dynamics.b2Fixture,
	b2World = Box2D.Dynamics.b2World,
	b2MassData = Box2D.Collision.Shapes.b2MassData,
	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
	b2DistJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
	b2RevoJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
	b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;

// Box2d globals
var world,
	gravity,
	fixDef,
	bodyDef,
	debugDraw,
	worldScale = 10;
// Exercise globals
var boxes = [],
	boundaries = [],
	chains = [],
	circles = [],
	composites = [],
	mouseJoint,
	pairs = [],
	polygons = [],
	polyShape = [ {x: -1, y:  2},
				  {x: -3, y: -2},
				  {x:  3, y: -2},
				  {x:  1, y:  2}   ],
	windmill;
// Force
var wind = new b2Vec2(8,0);

function setup(context,canvas) {
	//create Box2d world
	world = new b2World(new b2Vec2(0, 10),true);

	//create ground
	boxes.push(new Box(0,canvas.height/2,true,0.5*canvas.width/10,10*canvas.height/10));
	boxes.push(new Box(canvas.width,canvas.height/2,true,0.5*canvas.width/10,10*canvas.height/10));
	boxes.push(new Box(canvas.width/2,9.5*canvas.height/10,true,10*canvas.width/10,1*canvas.height/10));
	boxes.push(new Box(canvas.width/2,0.5*canvas.height/10,true,10*canvas.width/10,1*canvas.height/10));

	//create ball
	circles.push(new Circle(0.5*canvas.width/10,1.5*canvas.height/10,32));
};

function update(canvas){
	var force = new b2Vec2(wind.x*circles[0].body.GetMass(),wind.y*circles[0].body.GetMass());
	var position = new b2Vec2(circles[0].body.GetPosition().x,circles[0].body.GetPosition().y - circles[0].radius/4);
	circles[0].body.ApplyForce(force,position);

	world.Step(
		1 / 60   //frame-rate
		,  10       //velocity iterations
		,  10       //position iterations
	);

	world.ClearForces();
};

function draw(context,canvas) {
	background(context,canvas,"Black");

	//draw dynamic boxes
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].display(context);
	};

	//draw chain boundaries
	for (var i = 0; i < chains.length; i++) {
		chains[i].display(context);
	};

	//draw circles
	for (var i = 0; i < circles.length; i++) {
		circles[i].display(context);
	};

	//draw polygons
	for (var i = 0; i < polygons.length; i++) {
		polygons[i].display(context);
	};

	//draw composites
	for (var i = 0; i < composites.length; i++) {
		composites[i].display(context);
	};

	//draw pairs
	for (var i = 0; i < pairs.length; i++) {
		pairs[i].display(context);
	};
};

//
// main()
// Canvas and Loop init
//

(function main(){
	// std variables
	var backgroundColor = "Black",
		viewportHeight = 600,
		viewportWidth = 1000,
		viewportId = "viewport",
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
			 //mouseHandler(canvas);
			 //keyHandler(canvas);
			 setup(context,canvas);
			 updateWorld();
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

	function outlineCanvas(context,canvas){
		context.strokeStyle = "Black";
		context.lineWidth = 1;
		context.beginPath(); // resets the previous path
		context.moveTo(0,0); // no translation f() so had to be done manually
		context.lineTo(canvas.width,0); // no translation f() so had to be done manually
		context.lineTo(canvas.width,canvas.height);
		context.lineTo(0,canvas.height);
		context.lineTo(0,0);
		context.stroke();
	}


//
