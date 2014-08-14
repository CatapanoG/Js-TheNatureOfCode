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
			return new Vector2d(
				vector2d.x + otherVector2d.x,
				vector2d.y + otherVector2d.y
			);
		};
	},
	sub: function(vector2d,otherVector2d){
		if (arguments.length === 1) {
			this.x = this.x - vector2d.x;
			this.y = this.y - vector2d.y;
		} else if (arguments.length === 2) {
			return new Vector2d(
				vector2d.x - otherVector2d.x,
				vector2d.y - otherVector2d.y
			);
		};
	},
	mult: function(scalar,otherVector2d){
		if (arguments.length === 1) {
			this.x = this.x * scalar;
			this.y = this.y * scalar;
		} else if (arguments.length === 2) {
			return new Vector2d(
				scalar * otherVector2d.x,
				scalar * otherVector2d.y
			);
		};
	},
	div: function(scalar,otherVector2d){
		if (arguments.length === 1) {
			this.x = this.x / scalar;
			this.y = this.y / scalar;
		} else if (arguments.length === 2) {
			return new Vector2d(
				otherVector2d.x / scalar,
				otherVector2d.y / scalar
			);
		};
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

/*
console.log("Vector 1:");
var vec1 = new Vector2d(1,2);
console.log(vec1);
console.log("Vector 2:");
var vec2 = new Vector2d(3,5);
console.log(vec2);
console.log(" ---- ");

console.log("vec3=vec1 __ vec2: ");
var vec3 = Vector2d.prototype.sub(vec1,vec2);
console.log(vec3);

console.log("vec1=vec1 __ vec2:");
vec1.sub(vec2);
console.log(vec1);
*/
