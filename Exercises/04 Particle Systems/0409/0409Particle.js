// Particle object - parent
function Particle(v2Location) {
	this.location = new Vector2d(v2Location.x,v2Location.y);
	this.velocity = new Vector2d((Math.random()-0.5)*0.5,(Math.random()-0.5)*1);
	this.acceleration = new Vector2d(0.00,0.00);

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
		context.globalAlpha = this.lifespan/1.5;
		context.fillStyle = "White";
		//ellipse(context,this.location.x,this.location.y,8);
		context.fillRect(this.location.x, this.location.y, 3, 3);
		context.globalAlpha = 1;
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
