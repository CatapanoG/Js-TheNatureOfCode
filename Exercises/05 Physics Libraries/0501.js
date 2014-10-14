//
// The nature of code - Ch.5 Physics Libraries
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
var b2Vec2 = Box2D.Common.Math.b2Vec2,
	b2BodyDef = Box2D.Dynamics.b2BodyDef,
	b2Body = Box2D.Dynamics.b2Body,
	b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	b2Fixture = Box2D.Dynamics.b2Fixture,
	b2World = Box2D.Dynamics.b2World,
	b2MassData = Box2D.Collision.Shapes.b2MassData,
	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
	b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
// Other globals
var world,
	gravity,
	fixDef,
	bodyDef,
	debugDraw,
	worldScale = 10;

function setup(context,canvas) {
	world = new b2World(new b2Vec2(0, 10),true);

	//setup debug draw
	debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(context);
	debugDraw.SetDrawScale(worldScale);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

	fixDef = new b2FixtureDef;
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.7;

	bodyDef = new b2BodyDef;

	//create ground
    createBox(600,30,400,780,b2Body.b2_staticBody);

	//create an object
	//createBox(100,100,400,0,b2Body.b2_dynamicBody,1,0.8,0.75);
	createCircle(100,400,200,b2Body.b2_dynamicBody,1,0.8,0.75);
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

	outlineCanvas(context,canvas);
};

function createBox(width,height,pX,pY,type,density,friction,restitution){
    var bodyDef = new b2BodyDef;
    bodyDef.type = type;
    bodyDef.position.Set(pX/worldScale,pY/worldScale);
    var polygonShape = new b2PolygonShape;
    polygonShape.SetAsBox(width/2/worldScale,height/2/worldScale);
    var fixtureDef = new b2FixtureDef;
    fixtureDef.density = density;
    fixtureDef.friction = friction;
    fixtureDef.restitution = restitution;
    fixtureDef.shape = polygonShape;
    var body=world.CreateBody(bodyDef);
    body.CreateFixture(fixtureDef);
};

function createCircle(radius,pX,pY,type,density,friction,restitution){
    var bodyDef = new b2BodyDef;
    bodyDef.type = type;
    bodyDef.position.Set(pX/worldScale,pY/worldScale);
    var polygonShape = new b2CircleShape;
    polygonShape.SetRadius(radius/worldScale);
    var fixtureDef = new b2FixtureDef;
    fixtureDef.density = density;
    fixtureDef.friction = friction;
    fixtureDef.restitution = restitution;
    fixtureDef.shape = polygonShape;
    var body=world.CreateBody(bodyDef);
    body.CreateFixture(fixtureDef);
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
	var backgroundColor = "Black",
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
