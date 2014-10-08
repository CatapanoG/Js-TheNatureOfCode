//Particle system object
function ParticleSystem(v2Location){
	this.aParticles = [];
	this.v2Origin = new Vector2d(v2Location.x,v2Location.y);
};

ParticleSystem.prototype = {
	addParticle : function(){
		var fRandom = Math.random();
		this.aParticles.push(new Particle(this.v2Origin));
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
	},
	applyForce: function(v2Force){
		for (var i = this.aParticles.length - 1; i >= 0; i--) {
			this.aParticles[i].applyForce(v2Force);
		};
	},
	applyRepeller: function(oRepeller){
		for (var i = this.aParticles.length - 1; i >= 0; i--) {
			var f = oRepeller.repel(this.aParticles[i]);
			//alert(f.x + "  " + f.y);
			this.aParticles[i].applyForce(f);
		};
	}
};
