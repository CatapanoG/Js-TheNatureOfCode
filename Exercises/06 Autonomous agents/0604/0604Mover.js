// Vehicle object
	function Vehicle (x,y){
		this.location = new Vector2d(x,y);
		this.velocity = new Vector2d(0,0);
		this.acceleration = new Vector2d(0,0);
		this.theta = 0;

		this.r = 5;
		this.iniMaxforce = 0.1;
		this.maxforce = 0.1;
		this.iniMaxspeed = 4;
		this.maxspeed = 4;
		this.edgeRestitution = 0.5;

		this.strokeColor = "Red";

		//wandering stuff
		this.futLocation;
		this.futDesired;
	};

	Vehicle.prototype = {
		update: function(){
			this.maxforce = this.iniMaxforce * Ambient.getSpeedMult();
			this.maxspeed = this.iniMaxspeed * Ambient.getSpeedMult();

			this.velocity.add(this.acceleration);
			this.velocity.limit(this.maxspeed);
			this.location.add(this.velocity);
			this.acceleration.mult(0);

			this.theta = Math.atan2(this.velocity.y,this.velocity.x) + Math.PI/2;
		},
		display: function(context){
			context.save();
			
			context.translate(this.location.x,this.location.y);
			context.rotate(this.theta);
			
			triangle(context,
				new Vector2d(0, - this.r*4),
				new Vector2d(-this.r*2,this.r*4),
				new Vector2d(this.r*2,this.r*4),
				this.strokeColor);

			context.restore();
		},
		checkEdges: function(canvas) {
			if (this.location.x > canvas.width) {
				//this.location.x = 0;
				this.location.x = canvas.width;
				this.velocity.x *= -1*this.edgeRestitution;
			} else if (this.location.x < 0) {
				//this.location.x = canvas.width;
				this.velocity.x *= -1*this.edgeRestitution;
				this.location.x = 0;
			}

			if (this.location.y > canvas.height) {
				//his.location.y = 0;
				this.velocity.y *= -1*this.edgeRestitution;
				this.location.y = canvas.height;
			} else if (this.location.y < 0) {
				//this.location.y = canvas.height;
				this.velocity.y *= -1*this.edgeRestitution;
				this.location.y = 0;
			}
		},
		applyForce: function(vector2d){
			//var f = Vector2d.prototype.div(this.mass,vector2d);
			this.acceleration.add(vector2d);
		},
		// Behaviours
		seek: function(vector2d){
			var desired = Vector2d.prototype.sub(vector2d,this.location);
			desired.normalize();
			desired.mult(this.maxspeed);
			var steer = Vector2d.prototype.sub(desired,this.velocity);
			steer.limit(this.maxforce);
			this.applyForce(steer);
		},
		flee: function(vector2d){
			var desired = Vector2d.prototype.sub(vector2d,this.location);
			desired.normalize();
			desired.mult(-1*this.maxspeed);
			var steer = Vector2d.prototype.sub(desired,this.velocity);
			steer.limit(this.maxforce);
			this.applyForce(steer);			
		},
		pursuit: function(refVehicle){
			var desired = Vector2d.prototype.add(refVehicle.location,refVehicle.velocity);
			this.seek(desired);
		},
		wander: function(){
			var step = 100;
			var futureLoc = new Vector2d(
				Math.cos(this.theta - Math.PI/2)*step + this.location.x,
				Math.sin(this.theta - Math.PI/2)*step + this.location.y);
			this.futLocation = futureLoc;

			var r = 35;
			var rndTheta = Math.random()*Math.PI*2;
			var futureDes = new Vector2d(
				Math.cos(rndTheta - Math.PI/2)*r + this.futLocation.x,
				Math.sin(rndTheta - Math.PI/2)*r + this.futLocation.y);
			this.futDesired = futureDes;

			this.seek(this.futDesired);
		},
		displayWander: function(context){
			ellipse(context,this.futLocation.x,this.futLocation.y,4,"White");
			ellipse(context,this.futDesired.x,this.futDesired.y,4,"White");
		}
	};
//

// TrigoRunner object
	function TrigoRunner(canvas){
		Vehicle.call(this,
			Math.random()*canvas.width,
			Math.random()*canvas.height);

		this.t = 0;
		this.iniMaxforce = 0.15;
		this.maxforce = 0.1;
		this.iniMaxspeed = 4.5;
		this.maxspeed = 4;

		this.strokeColor = "Orange";
	};

	TrigoRunner.prototype = Object.create(Vehicle.prototype);
	TrigoRunner.prototype.trigoRun = function(){
		var f = new Vector2d(
			Math.sin(this.t)*10, 
			Math.cos(this.t)*10);
		f.normalize();
		f.limit(this.maxforce/1.25);
		this.applyForce(f);
		this.t += 0.01 + Math.random()*0.05;
	};
//