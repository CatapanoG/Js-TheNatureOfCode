// Vehicle object
	function Vehicle (x,y){
		this.location = new Vector2d(
			x,
			y
			);
		this.velocity = new Vector2d(
			0,
			0
			);
		this.acceleration = new Vector2d(
			0,
			0
			);

		this.r = 5;
		this.maxforce = 0.1;
		this.maxspeed = 4;
		this.edgeRestitution = 0.5;

		this.strokeColor = "Red";
	};

	Vehicle.prototype = {
		update: function(){
			this.velocity.add(this.acceleration);
			this.velocity.limit(this.topSpeed);
			this.location.add(this.velocity);
			this.acceleration.mult(0);
		},
		display: function(context){
			context.save();
			var theta = Math.atan2(this.velocity.y,this.velocity.x) + Math.PI/2;
			//var theta = Math.PI/3;

			context.translate(this.location.x,this.location.y);
			context.rotate(theta);
			
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
		}
	};
//

// TrigoRunner object
	function TrigoRunner(canvas){
		Vehicle.call(this,
			Math.random()*canvas.width,
			Math.random()*canvas.height);

		this.t = 0;
		this.maxspeed = 4.5;

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