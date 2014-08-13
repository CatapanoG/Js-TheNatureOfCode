// 
// A simple Canvas 3d boilerplate
//
// Author: Gennaro Catapano
// Author website: www.gennarocatapano.it
// Version: 0.0.3
// Date: 13-Aug-2014
//
// Sets up a Canvas and a loop with 3 components:
// init(), updateworld() and draw().
//
// Dependencies:
// three.js - visit: threejs.org
//

//
// main()
// three.js and Loop init
//

(function main(){
	// std variables
	var backgroundColor = "Black",
		viewportHeight = 800, //window.innerHeight; // in pixels 
		viewportWidth = 800, //window.innerWidth;
		viewportId = "viewport",
		time = 0,
		timeStep = 1000 / 30;
	// three.js variables
	var scene,
		light,
		camera,
		renderer,
		controls;

	window.onload = function() {
		scene = new THREE.Scene();
		light = new THREE.PointLight("red");
		camera = new THREE.PerspectiveCamera(35,viewportWidth/viewportHeight,1,1000);
		renderer = new THREE.WebGLRenderer();
		controls = null;

		renderer.setSize( viewportWidth, viewportHeight );
		document.getElementById("canvasPlace").appendChild(renderer.domElement);

		light.position.set( 0, 0, 100 );
		scene.add(light);

		camera.position.set( 0, 0, 100 );
		scene.add(camera); 

		Loop();
	};

	// main loop
	function Loop(){
		requestAnimationFrame(updateWorld);

		(function init(){
			// initialize stuff here
		}());
		function updateWorld(){
			time += timeStep;
			// update logic here
			draw();
		}
		function draw(){
			renderer.render(scene, camera); 
			requestAnimationFrame(updateWorld);
		}
	};
}());




