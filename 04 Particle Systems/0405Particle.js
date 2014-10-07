// Particle object - parent
function Particle(v2Location) {
	this.location = new Vector2d(v2Location.x,v2Location.y);
	this.velocity = new Vector2d((Math.random()-0.5)*2,(Math.random()-1)*1);
	this.acceleration = new Vector2d(0,0.05);

	this.lifespan = 1.0;
};

Particle.prototype = {
	update: function(){
		this.velocity.add(this.acceleration);
		this.location.add(this.velocity);

		this.lifespan -= 0.01;
	},
	display: function(context){
		ellipse(context,this.location.x,this.location.y,8);
	},
	isDead: function(){
		if (this.lifespan < 0.0){
				return true;
			} else {
				return false;
		};
	}
};

// Confetti object - Particle's child
function Confetti(v2Location) {
	Particle.call(this,v2Location);
};

Confetti.prototype = Object.create(Particle.prototype);
Confetti.prototype.display = function(context){
		var theta = (this.location.x/800)*Math.PI*10;

		context.save();
		context.translate(this.location.x,this.location.y);
		context.rotate(theta);
		rectangle(context,-5,-5,10,10);
		context.restore();
};
