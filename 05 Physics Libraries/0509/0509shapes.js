// BOX
	function Box(x,y,bStatic,iW,iH) {
		this.width = iW || Math.floor(Math.random()*16)+4;
		this.height = iH || Math.floor(Math.random()*16)+4;
		this.x = x;
		this.y = y;
		this.angle = 0;
		this.body; // defined below

		this.collision = false;

	    var bodyDef = new b2BodyDef;
	    if (bStatic === false || bStatic === undefined) {
		    bodyDef.type = b2Body.b2_dynamicBody;
	    } else if (bStatic === true) {
			bodyDef.type = b2Body.b2_staticBody;    	
	    };
	    bodyDef.position.Set(this.x/worldScale,this.y/worldScale);
	    var polygonShape = new b2PolygonShape;
	    polygonShape.SetAsBox(this.width/2/worldScale,this.height/2/worldScale);
	    var fixtureDef = new b2FixtureDef;
	    fixtureDef.density = 1.0;
	    fixtureDef.friction = 0.5;
	    fixtureDef.restitution = 0.3;
	    fixtureDef.shape = polygonShape;
	    this.body = world.CreateBody(bodyDef);
	    this.body.CreateFixture(fixtureDef);

	    this.body.SetUserData(this); 
	};

	Box.prototype = {
		display : function(context,bCollision){
			context.save();
			this.x = this.body.GetPosition().x*worldScale;
			this.y = this.body.GetPosition().y*worldScale;
			this.angle = this.body.GetAngle();
			context.translate(this.x,this.y);
			context.rotate(this.angle);
			if (this.collision) {
				rectangle(context,-this.width/2,-this.height/2,this.width,this.height,"Red");
			} else {
				rectangle(context,-this.width/2,-this.height/2,this.width,this.height);
			};
			context.restore();
		}
	};
//

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
			line(context,-this.radius,0,-(2/3)*this.radius,0);
			line(context,this.radius,0,(2/3)*this.radius,0);
			line(context,0,-this.radius,0,-(2/3)*this.radius);
			line(context,0,this.radius,0,(2/3)*this.radius);
			context.restore();
		}
	};
//

// BOUNDARY (Rectangular)
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
//

// CHAIN Boundary
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
//

// Polygon
	function Polygon(aVec2,posX,posY) {
		this.vertices = [];
		this.position;
		this.angle = 0;
		this.body; // defined below
		this.scaleFact = Math.random();

		for (var i = 0; i < aVec2.length; i++) {
			this.vertices[i] = {x: 0, y:0};
			this.vertices[i].x = this.scaleFact*aVec2[i].x;
			this.vertices[i].y = this.scaleFact*aVec2[i].y;
			//this.vertices[i].Multiply(1/worldScale);
		};

	    var bodyDef = new b2BodyDef;
	    bodyDef.type = b2Body.b2_dynamicBody;
	    bodyDef.position.Set(posX/worldScale,posY/worldScale);

	    var polygonShape = new b2PolygonShape;
	    polygonShape.SetAsArray(this.vertices,this.vertices.length);
	    var fixtureDef = new b2FixtureDef;
	    fixtureDef.density = 1.0;
	    fixtureDef.friction = 0.5;
	    fixtureDef.restitution = 0.5;
	    fixtureDef.shape = polygonShape;
	    this.body = world.CreateBody(bodyDef);
	    this.body.CreateFixture(fixtureDef);

	};

	Polygon.prototype = {
		display : function(context){
			this.position = this.body.GetPosition();

			context.save();
			context.translate(this.position.x*worldScale,this.position.y*worldScale);
			context.rotate(this.body.GetAngle());
			for (var i = 0; i < this.vertices.length - 1; i++) {
				line(context,(this.vertices[i].x)*worldScale,
							 (this.vertices[i].y)*worldScale,
						 	 (this.vertices[i+1].x)*worldScale,
						 	 (this.vertices[i+1].y)*worldScale);
			};
				line(context,(this.vertices[this.vertices.length - 1].x)*worldScale,
							 (this.vertices[this.vertices.length - 1].y)*worldScale,
						 	 (this.vertices[0].x)*worldScale,
						 	 (this.vertices[0].y)*worldScale);
			context.restore();
		}
	};
//

// Composite
	function Composite(posX,posY) {
		this.vertices = [ 	{x: -1, y:  3},
						  	{x: -1, y: -3},
						  	{x:  1, y: -3},
						  	{x:  1, y:  3}	];
		this.position;
		this.angle = 0;
		this.body; // defined below
		this.scaleFact = 10/worldScale;
		this.radius = 15;
		this.circleOffset = new b2Vec2(0,+20);

		for (var i = 0; i < this.vertices.length; i++) {
			this.vertices[i].x *= this.scaleFact;
			this.vertices[i].y *= this.scaleFact;
		};

	    var bodyDef = new b2BodyDef;
	    bodyDef.type = b2Body.b2_dynamicBody;
	    bodyDef.position.Set(posX/worldScale,posY/worldScale);

	    var ps = new b2PolygonShape;
	    ps.SetAsArray(this.vertices,this.vertices.length);

	    var cs = new b2CircleShape(this.radius/worldScale);
	    cs.SetLocalPosition(new b2Vec2(this.circleOffset.x/worldScale,this.circleOffset.y/worldScale));

	    var psFixture = new b2FixtureDef;
	    psFixture.density = 1.0;
	    psFixture.friction = 0.5;
	    psFixture.restitution = 0.5;
	    psFixture.shape = ps;

	    var csFixture = new b2FixtureDef;
	    csFixture.density = 1.0;
	    csFixture.friction = 0.5;
	    csFixture.restitution = 0.5;
	    csFixture.shape = cs;

	    this.body = world.CreateBody(bodyDef);
	    this.body.CreateFixture(psFixture);
	    this.body.CreateFixture(csFixture);
	};

	Composite.prototype = {
		display : function(context){
			this.position = this.body.GetPosition();

			context.save();
			context.translate(this.position.x*worldScale,this.position.y*worldScale);
			context.rotate(this.body.GetAngle());
			for (var i = 0; i < this.vertices.length - 1; i++) {
				line(context,(this.vertices[i].x)*worldScale,
							 (this.vertices[i].y)*worldScale,
						 	 (this.vertices[i+1].x)*worldScale,
						 	 (this.vertices[i+1].y)*worldScale);
			};
				line(context,(this.vertices[this.vertices.length - 1].x)*worldScale,
							 (this.vertices[this.vertices.length - 1].y)*worldScale,
						 	 (this.vertices[0].x)*worldScale,
						 	 (this.vertices[0].y)*worldScale);
			ellipse(context,this.circleOffset.x,this.circleOffset.y,this.radius);
			context.restore();
		}
	};
//

// Particle

	function Particle(x,y) {
		this.radius = 15;
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
	    fixtureDef.friction = 0.75;
	    fixtureDef.restitution = 0.5;
	    fixtureDef.shape = polygonShape;
	    this.body = world.CreateBody(bodyDef);
	    this.body.CreateFixture(fixtureDef); 
	};

	Particle.prototype = {
		display : function(context){
			context.save();
			this.x = this.body.GetPosition().x*worldScale;
			this.y = this.body.GetPosition().y*worldScale;
			this.angle = this.body.GetAngle();
			context.translate(this.x,this.y);
			context.rotate(this.angle);
			ellipse(context,0,0,this.radius);
			line(context,-this.radius,0,-(2/3)*this.radius,0);
			line(context,this.radius,0,(2/3)*this.radius,0);
			line(context,0,-this.radius,0,-(2/3)*this.radius);
			line(context,0,this.radius,0,(2/3)*this.radius);
			context.restore();
		}
	};
//

// Pair - distance joint
	
	function Pair(posX,posY){
		this.p1 = new Particle(posX,posY);
		this.p2 = new Particle(posX + (Math.random()-0.5)*2, posY + (Math.random()-0.5)*2);
		this.joint = new b2DistJointDef;
		this.length = 40;

		this.joint.Initialize(this.p1.body,this.p2.body,this.p1.body.GetPosition(),this.p2.body.GetPosition());
		this.joint.length = this.length/worldScale;

		world.CreateJoint(this.joint);
	};

	Pair.prototype = {
		display : function(context){
			this.p1.display(context);
			this.p2.display(context);
			line(context,this.p1.x,this.p1.y,this.p2.x,this.p2.y);
		} 
	};
//

// Windmill
	function Windmill(canvas){
		this.b1 = new Box(canvas.width/2,2.4*canvas.height/4,false,canvas.width/5,canvas.width/50);
		this.b2 = new Box(canvas.width/2,3*canvas.height/4,true,canvas.width/50,canvas.width/5);
		this.joint = new b2RevoJointDef;

		this.joint.Initialize(this.b1.body,this.b2.body,this.b1.body.GetPosition());
		this.joint.enableMotor = true;
		this.joint.motorSpeed = Math.PI*2;
		this.joint.maxMotorTorque = 1000.0;

		world.CreateJoint(this.joint);
	};

	Windmill.prototype = {
		display : function(context){
			this.b1.display(context);
			this.b2.display(context);
		} 
	};
//

// Spring
	function Spring(){
		this.mouseJoint;
		this.groundBody;
		this.body;
		this.maxForce = 100;
		this.frequencyHz = 5;
		this.dampingRatio = 0.9;	
	};

	Spring.prototype = {
		bind: function(posX,posY,body){
			var md = new b2MouseJointDef();
			md.bodyA = world.GetGroundBody();
			md.bodyB = body;
			md.target.Set(posX,posY);
			md.collideConnected = true;
			md.maxForce = this.maxForce * body.GetMass();
			md.frequencyHz = this.frequencyHz;
			md.dampingRatio = this.dampingRatio;
			this.mouseJoint = world.CreateJoint(md);
			body.SetAwake(true);

			this.body = body;
		},
		update: function(posX,posY){
			this.mouseJoint.SetTarget(new b2Vec2(posX,posY));
		},
		destroy: function(){
			world.DestroyJoint(this.mouseJoint);
			this.mouseJoint = undefined;
			this.body = undefined;
		},
		display: function(context){
			if (this.mouseJoint != undefined) {
				line(context,this.body.GetPosition().x*worldScale,
							this.body.GetPosition().y*worldScale,
							mouse.x*worldScale,
							mouse.y*worldScale);
			};
		}
	};
//