function Repeller(fX,fY) {
	this.location = new Vector2d(fX,fY);
	this.r = 20;
	this.G = 100;
};

Repeller.prototype = {
	display: function(context){
		ellipse(context,this.location.x,this.location.y,this.r);
	},
	repel: function(oParticle){
		var dir = Vector2d.prototype.sub(this.location,oParticle.location);
		var d = dir.mag();
		if (d<5) {
			d = 5;
		} else if (d > 100) {
			d = 100;
		};
		dir.normalize();
		var fForce = - 1 * this.G / (d * d);
		dir.mult(fForce);

		return dir;
	},
	randomizeG: function(){
		this.G += (Math.random()-0.5);
	}
};