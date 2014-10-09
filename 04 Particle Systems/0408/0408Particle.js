// Particle object - parent
function Particle(v2Location) {
	this.location = new Vector2d(v2Location.x,v2Location.y);
	this.velocity = new Vector2d((Math.random()-0.5)*2,(Math.random()-1)*2);
	this.acceleration = new Vector2d(0.00,0.05);

	this.lifespan = 1.5;
	this.mass = 1.0;
};

Particle.prototype = {
	update: function(){
		this.velocity.add(this.acceleration);
		this.location.add(this.velocity);

		this.acceleration.mult(0);
		this.lifespan -= 0.01;
	},
	display: function(context){
		context.save();
		context.globalAlpha = this.lifespan/1.5;
		//ellipse(context,this.location.x,this.location.y,8);
		//context.fillStyle = "White";
		//context.fillRect(this.location.x, this.location.y, 3, 3);
		var fPartSize = (1/this.lifespan)*5; 
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
	}
};
