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

// Pair
	
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

// Bridge
	function Bridge(canvas){
		this.particles = [];
		this.particlesLength;
		this.particlesRadius = 5;
		this.firstParticlePos = new b2Vec2(0,3*canvas.height/4);
		this.lastParticlePos = new b2Vec2(canvas.width,canvas.height/4);
		this.yStepParticlePos;
		this.joints = [];
		this.jointsLength = 15;

		this.particlesLength = canvas.width/this.jointsLength;
		this.yStepParticlePos = (this.lastParticlePos.y - this.firstParticlePos.y)/(this.particlesLength-1);
		this.particles.push(new BridgeElement(this.firstParticlePos.x,this.firstParticlePos.y,true,this.particlesRadius));
		for (var i = 0; i < this.particlesLength - 1; i++) {
			this.particles.push(new BridgeElement(this.firstParticlePos.x + (i+1)*this.jointsLength,
													this.firstParticlePos.y +(i+1)*this.yStepParticlePos,
													false,
													this.particlesRadius));
			this.joints.push(new b2DistJointDef);
			this.joints[i].Initialize(this.particles[i].body,
										this.particles[i+1].body,
										this.particles[i].body.GetPosition(),
										this.particles[i+1].body.GetPosition());
			this.joints[i].length = this.jointsLength/worldScale;
			world.CreateJoint(this.joints[i]);
		};
		this.particles.push(new BridgeElement(this.lastParticlePos.x,this.lastParticlePos.y,true,this.particlesRadius));
		this.joints.push(new b2DistJointDef);
		this.joints[this.joints.length-1].Initialize(this.particles[this.particles.length-2].body,
											this.particles[this.particles.length-1].body,
											this.particles[this.particles.length-2].body.GetPosition(),
											this.particles[this.particles.length-1].body.GetPosition());
		this.joints[this.joints.length-1].length = this.jointsLength/worldScale;
		world.CreateJoint(this.joints[this.joints.length-1]);
	};

	Bridge.prototype = {
		display : function(context){
			//this.p1.display(context);
			//this.p2.display(context);
			//line(context,this.p1.x,this.p1.y,this.p2.x,this.p2.y);
			for (var i = 0; i < this.particles.length; i++) {
				this.particles[i].display(context);
			};
		} 
	};
//

// Bridge element
	function BridgeElement(iX,iY,bStatic,fRadius) {
		this.radius = fRadius;
		this.x = iX;
		this.y = iY;
		this.angle = 0;
		this.body; // defined below

	    var bodyDef = new b2BodyDef;
	    if (bStatic) {
	    	bodyDef.type = b2Body.b2_staticBody;
	    } else {
	    	bodyDef.type = b2Body.b2_dynamicBody;
	    };
	    
	    bodyDef.position.Set(this.x/worldScale,this.y/worldScale);
	    var polygonShape = new b2CircleShape(this.radius/worldScale);
	    var fixtureDef = new b2FixtureDef;
	    fixtureDef.density = 1;
	    fixtureDef.friction = 0.8;
	    fixtureDef.restitution = 0.25;
	    fixtureDef.shape = polygonShape;
	    this.body = world.CreateBody(bodyDef);
	    this.body.CreateFixture(fixtureDef); 
	};

	BridgeElement.prototype = {
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