//Particle system object
function ParticleSystem(v2Location){
	this.aParticles = [];
	this.v2Origin = new Vector2d(v2Location.x,v2Location.y);
};

ParticleSystem.prototype = {
	addParticle : function(){
		var fRandom = Math.random();
		if (fRandom < 0.5) {
			this.aParticles.push(new Particle(this.v2Origin));
		} else {
			this.aParticles.push(new Confetti(this.v2Origin));
		};
	},
	update: function(){
		for (var i = 0; i < this.aParticles.length; i++) {
			if (this.aParticles[i].isDead()) {
				this.aParticles.splice(i,1);
				i--;
			} else {
				this.aParticles[i].update();
			};
		};
	},
	draw: function(context){
		for (var i = 0; i < this.aParticles.length; i++) {
			this.aParticles[i].display(context);
		};
	}
};
