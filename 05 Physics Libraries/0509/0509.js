//
// The nature of code - Ch.5 Physics Libraries
//
// Example 5.8: MouseJoint demonstration
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
	b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
	b2ContactListener = Box2D.Dynamics.b2ContactListener;

// Box2d globals
var world,
	gravity,
	fixDef,
	bodyDef,
	debugDraw,
	worldScale = 10;
// Bodies and bodies defs
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
// Controls
var cl = new b2ContactListener,
	mouse = new b2Vec2(0,0),
	selectedBody;

function setup(context,canvas) {
	//create Box2d world
	world = new b2World(new b2Vec2(0, 10),true);
	world.SetContactListener(cl);

	//init ContactListener:
	cl.BeginContact = function(oContact){
		var objA = oContact.GetFixtureA().GetBody().GetUserData();
		if (objA.body.GetType() > 0) {
			objA.collision = true;
		};

		var objB = oContact.GetFixtureB().GetBody().GetUserData();
		if (objB.body.GetType() > 0) {
			objB.collision = true;
		};
	};
	cl.EndContact = function(oContact){
		var objA = oContact.GetFixtureA().GetBody().GetUserData();
		if (objA.body.GetType() > 0) {
			objA.collision = false;
		};

		var objB = oContact.GetFixtureB().GetBody().GetUserData();
		if (objB.body.GetType() > 0) {
			objB.collision = false;
		};
	};

	//create ground
	boxes.push(new Box(canvas.width/2,9*canvas.height/10,true,8*canvas.width/10,1*canvas.height/10));

	//some boxes
	for (var i = 0; i < 1; i++) {
		boxes.push(new Box(Math.random()*8*canvas.width/10 + 1*canvas.width/10,
				   Math.random()*1*canvas.height/10 + 7*canvas.height/10,
				   false,
				   0.5*canvas.width/10,
				   0.5*canvas.width/10));
	};


	//init mouseJoint
	//mouseJoint = new Spring();
};

function update(canvas){
	//if (mouseJoint.mouseJoint != undefined) {
	//	mouseJoint.update(mouse.x,mouse.y);
	//};

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

	//mouseJoint.display(context);
};

// mouseHandler
	function mouseHandler(canvas){
		canvas.onmousedown = function(e){
			//mouse.x = e.clientX;
			//mouse.y = e.clientY;

			boxes.push(new Box(e.clientX,e.clientY));
			//circles.push(new Circle(e.clientX,e.clientY));
			//polygons.push(new Polygon(polyShape,e.clientX,e.clientY));
			//composites.push(new Composite(e.clientX,e.clientY));
			//pairs.push(new Pair(e.clientX,e.clientY));

			/*var body = getBodyAtMouse();
			if (body) {
				mouse.x = e.clientX/worldScale;
				mouse.y = e.clientY/worldScale;
				mouseJoint.bind(mouse.x,mouse.y,body);*/
			};	
		};
		/*canvas.onmouseup = function(e){
			if (mouseJoint.mouseJoint != undefined) {
				mouseJoint.destroy();
			};
		};
		canvas.onmousemove = function(e){
			mouse.x = e.clientX/worldScale;
			mouse.y = e.clientY/worldScale;
		};
	};*/
	/*function getBodyAtMouse() {
		var aabb = new b2AABB();
		aabb.lowerBound.Set(mouse.x - 0.001, mouse.y - 0.001);
		aabb.upperBound.Set(mouse.x + 0.001, mouse.y + 0.001);

		// Query the world for overlapping shapes.

		selectedBody = null;
		world.QueryAABB(getBodyCB, aabb);
		return selectedBody;
	}

	function getBodyCB(fixture) {
		if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
			if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mouse)) {
				  selectedBody = fixture.GetBody();
				  return false;
				}
			}
		return true;
	}*/
//

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

	function rectangle(context, x, y, width, height, color){
		context.fillStyle = helpersStrokeStyle;
		context.fillRect(x, y, width, height);

		if(color != undefined){
			context.fillStyle = color;
		} else {
			context.fillStyle = helpersFillStyle;
		};

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
