//
// The nature of code - Ch.4 Physics Libraries
//
// Example 5.1:
//
// Using a port of Box2d physics library (C++) by Erin Catto,
// please visit: http://box2d.org
// Javascript Box2d port: box2dweb 2.1.a.3,
// website: https://code.google.com/p/box2dweb/ 
//
// Example ported-written by: Gennaro Catapano
// www.gennarocatapano.it
//

// Box2dWeb definitions
var Vec2 = Box2D.Common.Math.b2Vec2,
	BodyDef = Box2D.Dynamics.b2BodyDef,
	Body = Box2D.Dynamics.b2Body,
	FixtureDef = Box2D.Dynamics.b2FixtureDef,
	Fixture = Box2D.Dynamics.b2Fixture,
	World = Box2D.Dynamics.b2World,
	MassData = Box2D.Collision.Shapes.b2MassData,
	PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	CircleShape = Box2D.Collision.Shapes.b2CircleShape,
	DebugDraw = Box2D.Dynamics.b2DebugDraw;
// Other globals
var world,
	gravity,
	fixDef,
	bodyDef,
	debugDraw;

function setup(context,canvas) {
	gravity = new Vec2(0,10);
	world = new World(gravity,true);

	fixDef = new FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.7;

	bodyDef = new BodyDef;

	//create ground
	bodyDef.type = Body.b2_staticBody;
	bodyDef.position.x = 250;
	bodyDef.position.y = canvas.height - 20;
	fixDef.shape = new PolygonShape;
	fixDef.shape.SetAsBox(200, 20);
	world.CreateBody(bodyDef).CreateFixture(fixDef);

	//create an object
	bodyDef.type = Body.b2_dynamicBody;
	fixDef.shape = new PolygonShape;
	fixDef.shape.SetAsBox(Math.random()+0.1,Math.random()+0.1);
	bodyDef.position.x = Math.random()*10;
	bodyDef.position.y = Math.random()*10;
	world.CreateBody(bodyDef).CreateFixture(fixDef);	

	//setup debug draw
	debugDraw = new DebugDraw();
	debugDraw.SetSprite(context);
	debugDraw.SetDrawScale(1.0);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(2.0);
	debugDraw.SetFlags(DebugDraw.e_shapeBit | DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);	
};

function update(canvas){
	world.Step(
		1 / 60   //frame-rate
		,  10       //velocity iterations
		,  10       //position iterations
	);
};

function draw(context,canvas) {
	//background(context,canvas,"Black");

	world.DrawDebugData();
	world.ClearForces();
};



// mouseHandler
	function mouseHandler(canvas){
		canvas.onclick = function(e){
			//mouse.x = e.clientX;
			//mouse.y = e.clientY;
		};
	};
// 

//
// main()
// Canvas and Loop init
//

(function main(){
	// std variables
	var backgroundColor = "White",
		viewportHeight = 800,
		viewportWidth = 800,
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
//