// Particle object - parent
function Particle(v2Location) {
	this.location = new Vector2d(v2Location.x,v2Location.y);
	this.velocity = new Vector2d((Math.random()-0.5)*2,(Math.random()-1)*2);
	this.acceleration = new Vector2d(0.00,0.05);

	this.lifespan = 1.5;
	this.mass = 1.0;
	this.origin = new Vector2d(this.location.x,this.location.y);
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
		context.save();
		context.globalAlpha = (this.lifespan/1.5)/10;
		context.globalCompositeOperation = "lighter";
		//ellipse(context,this.location.x,this.location.y,8);
		//context.fillStyle = "White";
		//context.fillRect(this.location.x, this.location.y, 3, 3);
		var fPartSize = (this.lifespan)*20 + 4; 
		context.translate(this.location.x - fPartSize/2,this.location.y - fPartSize/2);
		context.drawImage(oParticleImage, 0, 0, fPartSize, fPartSize);
		context.globalAlpha = 1;
		context.restore();
	},
	isDead: function(){
		if (this.lifespan <= 0.01){
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
		var f = new Vector2d((this.origin.x - this.location.x)*0.001,0);
		this.applyForce(f);
	}
};
