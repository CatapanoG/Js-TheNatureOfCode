// Particle object - parent
function Particle(v2Location) {
	this.location = new Vector2d(v2Location.x+(Math.random()-0.5)*50,v2Location.y+(Math.random()-0.5)*50);
	this.velocity = new Vector2d((Math.random()-0.5)*2,(Math.random()-1)*2);
	this.acceleration = new Vector2d(0.00,0.05);

	this.lifespan = 2.5;
	this.mass = 1.0;
	this.origin = new Vector2d(this.location.x,this.location.y);

	this.texture = new PIXI.Sprite(oParticleImage[0]);
	this.texture.anchor.x = 0.5;
	this.texture.anchor.y = 0.5;
	this.texture.position.x = this.location.x;
	this.texture.position.y = this.location.y;
	this.texture.blendMode = PIXI.blendModes.ADD;

	stage.addChild(this.texture);
};

Particle.prototype = {
	update: function(){
		this.convergeX();

		this.velocity.add(this.acceleration);
		this.location.add(this.velocity);

		this.acceleration.mult(0);
		this.lifespan -= 0.01;
	},
	display: function(context){
		var scale = this.lifespan*0.25;
		this.texture.scale = new PIXI.Point(scale,scale);
		this.texture.alpha = this.lifespan/2.5;
		this.texture.position.x = this.location.x;
		this.texture.position.y = this.location.y;
	},
	isDead: function(){
		if (this.lifespan <= 0.01){
				stage.removeChild(this.texture);
				return true;
			} else {
				return false;
		};
	},
	applyForce: function(v2Force) {
		var f = v2Force.get();
		f.div(this.mass);
		this.acceleration.add(f);
	},
	// custom methods
	checkEdges: function(){
		if (this.location.y >= 800) {
			this.location.y = 800;
			this.velocity.y *= -0.8;
		};
	},
	convergeX: function(){
		var dist = this.origin.x - this.location.x;
		var unitF = new Vector2d(dist,0);
		unitF.normalize();
		dist *= dist;
		unitF.mult(dist*0.0001);
		this.applyForce(unitF);
	}
};
