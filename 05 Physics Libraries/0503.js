//
// The nature of code - Ch.5 Physics Libraries
//
// Example 5.3: ChainShape with three hard-coded vertices
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
	circles = [];

function setup(context,canvas) {
	//create Box2d world
	world = new b2World(new b2Vec2(0, 10),true);

	//create chains
	var verts = [];
	verts[0] = new b2Vec2(0,400);
	verts[1] = new b2Vec2(100,600); 
	verts[2] = new b2Vec2(500,500);
	verts[3] = new b2Vec2(800,400);
	chains.push(new Chain(verts));
};

function update(canvas){
	world.Step(
		1 / 60   //frame-rate
		,  10       //velocity iterations
		,  10       //position iterations
	);
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
};

// BOX
function Box(x,y) {
	this.width = Math.floor(Math.random()*16)+4;
	this.height = Math.floor(Math.random()*16)+4;
	this.x = x;
	this.y = y;
	this.angle = 0;
	this.body; // defined below

    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.Set(this.x/worldScale,this.y/worldScale);
    var polygonShape = new b2PolygonShape;
    polygonShape.SetAsBox(this.width/2/worldScale,this.height/2/worldScale);
    var fixtureDef = new b2FixtureDef;
    fixtureDef.density = 1.0;
    fixtureDef.friction = 0.5;
    fixtureDef.restitution = 0.5;
    fixtureDef.shape = polygonShape;
    this.body = world.CreateBody(bodyDef);
    this.body.CreateFixture(fixtureDef); 
};

Box.prototype = {
	display : function(context){
		context.save();
		this.x = this.body.GetPosition().x*worldScale;
		this.y = this.body.GetPosition().y*worldScale;
		this.angle = this.body.GetAngle();
		context.translate(this.x,this.y);
		context.rotate(-this.angle);
		rectangle(context,-this.width/2,-this.height/2,this.width,this.height);
		context.restore();
	}
};

// Circle
function Circle(x,y) {
	this.radius = Math.floor(Math.random()*16)+4;
	this.x = x;
	this.y = y;
	this.angle = 0;
	this.body; // defined below

    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_dynamicBody;
    bodyDef.position.Set(this.x/worldScale,this.y/worldScale);
    var polygonShape = new b2CircleShape(this.radius/worldScale);
    var fixtureDef = new b2FixtureDef;
    fixtureDef.density = 1.0;
    fixtureDef.friction = 0.5;
    fixtureDef.restitution = 0.5;
    fixtureDef.shape = polygonShape;
    this.body = world.CreateBody(bodyDef);
    this.body.CreateFixture(fixtureDef); 
};

Circle.prototype = {
	display : function(context){
		context.save();
		this.x = this.body.GetPosition().x*worldScale;
		this.y = this.body.GetPosition().y*worldScale;
		this.angle = this.body.GetAngle();
		context.translate(this.x,this.y);
		context.rotate(this.angle);
		ellipse(context,0,0,this.radius);
		line(context,0,0,-this.radius,0);
		context.restore();
	}
};

//BOUNDARY (Rectangular)
function Boundary(x,y,w,h) {
	this.width = w;
	this.height = h;
	this.x = x;
	this.y = y;
	this.angle = 0;
	this.body; // defined below

    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.Set(this.x/worldScale,this.y/worldScale);
    var polygonShape = new b2PolygonShape;
    polygonShape.SetAsBox(this.width/2/worldScale,this.height/2/worldScale);
    var fixtureDef = new b2FixtureDef;
    fixtureDef.density = 1.0;
    fixtureDef.friction = 0.5;
    fixtureDef.restitution = 0.5;
    fixtureDef.shape = polygonShape;
    this.body = world.CreateBody(bodyDef);
    this.body.CreateFixture(fixtureDef); 
};

Boundary.prototype = {
	display : function(context){
		context.save();
		this.x = this.body.GetPosition().x*worldScale;
		this.y = this.body.GetPosition().y*worldScale;
		this.angle = this.body.GetAngle();
		context.translate(this.x,this.y);
		context.rotate(-this.angle);
		rectangle(context,-this.width/2,-this.height/2,this.width,this.height);
		context.restore();
	}
};

//CHAIN Boundary
function Chain(aVec2) {
	this.width = 30;
	this.height = 30;
	this.vertices = aVec2;
	this.angle = 0;
	this.body; // defined below

	for (var i = 0; i < this.vertices.length; i++) {
		this.vertices[i].Multiply(1/worldScale);
	};

    var bodyDef = new b2BodyDef;
    bodyDef.type = b2Body.b2_staticBody;
    for (var i = 0; i < this.vertices.length - 1; i++) {
	    var polygonShape = new b2PolygonShape;
	    polygonShape.SetAsEdge(this.vertices[i],this.vertices[i+1]);
	    var fixtureDef = new b2FixtureDef;
	    fixtureDef.density = 1.0;
	    fixtureDef.friction = 0.5;
	    fixtureDef.restitution = 0.5;
	    fixtureDef.shape = polygonShape;
	    this.body = world.CreateBody(bodyDef);
	    this.body.CreateFixture(fixtureDef);
    };
};

Chain.prototype = {
	display : function(context){
		for (var i = 0; i < this.vertices.length - 1; i++) {
			line(context,this.vertices[i].x*worldScale,this.vertices[i].y*worldScale,
					 this.vertices[i+1].x*worldScale,this.vertices[i+1].y*worldScale);
		};
	}
};

// mouseHandler
	function mouseHandler(canvas){
		canvas.onmousedown = function(e){
			//mouse.x = e.clientX;
			//mouse.y = e.clientY;

			//boxes.push(new Box(e.clientX,e.clientY));
			circles.push(new Circle(e.clientX,e.clientY));
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
			 mouseHandler(canvas);
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
