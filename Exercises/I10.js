//
// The nature of code - introduction
//
// Exercise I.10
//
// Use the noise values as the elevations of a landscape.
//

var Perlin = function(width,height){
	this.perlinStep = 0.02;
	this.seed = Math.random();
	this.xoff = 0;
	this.yoff = 0;
	this.width = width;
	this.height = height;
	this.initialize = (function(){
		noise.seed(this.seed);
	}());
	this.draw = function(time,plane){
		for (var x = 0; x < this.width; x++) {
			this.yoff = 0.0;
			for (var y = 0; y < this.height; y++) {
				plane.geometry.vertices[x + y * this.width].z = Math.round(((noise.perlin3(this.xoff,this.yoff,time)+1)/2)*40);

				this.yoff += this.perlinStep;
			};
			this.xoff += this.perlinStep;
		};
		this.xoff = 0.0;
		this.time += this.timeStep;

		//WEBGL
        // set the geometry to dynamic
        // so that it allow updates
        plane.geometry.dynamic = true;
        // changes to the vertices
        plane.geometry.verticesNeedUpdate = true;
        // changes to the normals
        plane.geometry.normalsNeedUpdate = false;
	};
};

var cameraControl = function(camera,time){
	camera.position.x = Math.sin(time)*200;
	camera.position.z = 50 + 100 + Math.sin(time*2)*-100;
	camera.lookAt(new THREE.Vector3(0,0,0));
};

var p; // placeholder for a Perlin instance

//
// Canvas initialization & Canvas related functions
//

(function main(){

	var backgroundColor = "Black";
	var viewportHeight = 800; //window.innerHeight; // in pixels 
	var viewportWidth = 800; //window.innerWidth;
	var viewportId = "viewport";
	var timeStep = 1000 / 30;
	var perlinGridWidth = 200;
	var perlinGridHeight = 200;

	window.onload = function() {
		// =====================================
		// Three.js-WebGL init (ALSO SCENE INIT)
		var scene = new THREE.Scene(),
			light = new THREE.PointLight("red"),
			camera = new THREE.PerspectiveCamera(35,viewportWidth/viewportHeight,1,1000),
			renderer = new THREE.WebGLRenderer(),
			controls=null;

		renderer.setSize( viewportWidth, viewportHeight );
		document.getElementById("canvasPlace").appendChild(renderer.domElement);

		light.position.set( 0, 150, 150 );
		scene.add(light);

		camera.position.set( 0, 0, 250 );
		scene.add(camera); 

		// scene setup
        var plane = new THREE.Mesh( 
        	new THREE.PlaneGeometry( perlinGridWidth, perlinGridHeight, perlinGridWidth - 1, perlinGridHeight - 1 ), 
        	new THREE.MeshBasicMaterial( {wireframe: true, color: "grey", side: THREE.DoubleSide} ) 
       		//new THREE.MeshLambertMaterial( {wireframe: false, color: "white", side: THREE.DoubleSide} )
        ); 
        scene.add( plane );    
        // /scene setup     

		// End Three.js-WebGL init (ALSO SCENE INIT)
		// =========================================

		// ===============
		// Other obj setup

		p = new Perlin(perlinGridWidth,perlinGridHeight);

		// End Other obj setup
		// ===================

		Loop(scene,light,camera,renderer,controls,plane);
	};

}());

function Loop(scene,light,camera,renderer,controls,plane){
	
	var time = 0;
	var timeStep = 0.01;
	requestAnimationFrame(updateWorld);
	//plane.geometry.vertices[28].z = 10;

	function updateWorld(){
		time += timeStep;
		cameraControl(camera,time);

		draw();
	}
	function draw(){
		p.draw(time,plane);
		renderer.render(scene, camera); 

		requestAnimationFrame(updateWorld);
	}
};


