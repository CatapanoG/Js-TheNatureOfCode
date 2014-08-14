//
// vectors.js
//
// A lightweight library created to support "the Nature of Code" exercises.
// Author: Gennaro Catapano
// This version: 14.Aug.2014
//

// 2D
function Vector2d (x,y) {
	this.x = x;
	this.y = y;
}
// "static" methods
Vector2d.prototype = {
	set: function(vector2d){
		this.x = vector2d.x;
		this.y = vector2d.y;
	},
	add: function(vector2d,otherVector2d){
		if (arguments.length === 1) {
			this.x = this.x + vector2d.x;
			this.y = this.y + vector2d.y;
		} else if (arguments.length === 2) {
			//this.x = vector2d.x + otherVector2d.x,
			//this.y = vector2d.y + otherVector2d.y
			return new Vector2d(
				vector2d.x + otherVector2d.x,
				vector2d.y + otherVector2d.y
			);
		};
	},
	sub: function(vector2d){
		this.x = this.x - vector2d.x;
		this.y = this.y - vector2d.y;
	},
	mult: function(scalar){
		this.x = this.x * scalar;
		this.y = this.y * scalar;
	},
	div: function(scalar){
		this.x = this.x / scalar;
		this.y = this.y / scalar;
	},
	mag: function(){
		return Math.sqrt(this.x*this.x + this.y*this.y);
	},
	normalize: function(){
		var m = this.mag();
		if (m !== 0) {
			this.div(m);
		};
	},
	limit: function(maxMagnitude){ // could be more efficient, inside if() only 1 statement
		if (this.mag()>maxMagnitude) {
			this.normalize();
			this.mult(maxMagnitude);
		};
	},
	random: function(){
		this.x = Math.random() - 0.5;
		this.y = Math.random() - 0.5;
		this.normalize();
	}
};

// 3D
function Vector3d (x,y,z) {
	this.x = x;
	this.y = y;
	this.z = z;
}
// static methods
Vector3d.prototype = {	
	set: function(vector3d){
		this.x = vector3d.x;
		this.y = vector3d.y;
		this.z = vector3d.y;
	},
	add: function(vector3d){
		this.x = this.x + vector3d.x;
		this.y = this.y + vector3d.y;
		this.z = this.z + vector3d.z;
	},
	sub: function(vector3d){
		this.x = this.x - vector3d.x;
		this.y = this.y - vector3d.y;
		this.z = this.z - vector3d.z;
	},
	mult: function(scalar){
		this.x = this.x * scalar;
		this.y = this.y * scalar;
		this.z = this.z * scalar;
	},
	div: function(scalar){
		this.x = this.x / scalar;
		this.y = this.y / scalar;
		this.z = this.z / scalar;
	},
	mag: function(){
		return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
	},
	normalize: function(){
		var m = this.mag();
		if (m !== 0) {
			this.div(m);
		};
	},
	limit: function(maxMagnitude){
		if (this.mag()>maxMagnitude) {
			this.normalize();
			this.mult(maxMagnitude);
		};
	},
	random: function(){
		this.x = Math.random();
		this.y = Math.random();
		this.normalize();
	}
};

// testing code


console.log("Initial vector:");
var vec1 = new Vector2d(30,30);
var vec2 = new Vector2d(7,9);
var vec3 = Vector2d.prototype.add(vec1,vec2);
console.log(vec1);
console.log("magnitude: " + vec1.mag());
console.log(" ---- ");
//vec3.add(vec1,vec2);
console.log(vec3);


