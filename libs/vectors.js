//
// vectors.js
//
// A lightweight library created to support "the Nature of Code" exercises.
// Author: Gennaro Catapano
// This version: 13.Aug.2014
//

// 2D
function Vector2d (x,y) {
	this.x = x;
	this.y = y;
}

Vector2d.prototype = {
	add: function(vector2d){
		this.x = this.x + vector2d.x;
		this.y = this.y + vector2d.y;
	}
}

// 3D
function Vector3d (x,y,z) {
	this.x = x;
	this.y = y;
	this.z = z;
}

Vector3d.prototype = {
	add: function(vector3d){
		this.x = this.x + vector3d.x;
		this.y = this.y + vector3d.y;
		this.z = this.z + vector3d.z;
	}
}


/*

locavar vec1 = new Vector2d(1,1);

console.log(vec1);
vec1.add(new Vector2d(2,2));
console.log(vec1);

*/