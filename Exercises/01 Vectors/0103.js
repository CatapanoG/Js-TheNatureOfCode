//
// The nature of code - Chapter 1 - Vectors
//
// Exercise 1.3
//
// Extend the bouncing ball with vectors example into 3D. 
// Can you get a sphere to bounce around a box?
//

var boxSize = 100,
	ball,
	ballRadius = 8,
	ballPosition,
	ballVelocity;

var drawBall = function(scene){
	var geometry = new THREE.SphereGeometry( ballRadius, 32, 32 ); 
	var material = new THREE.MeshBasicMaterial( {wireframe: "true", color:"grey"} ); 
	ball = new THREE.Mesh( geometry, material ); 
	ball.position.x = ballPosition.x;
	ball.position.y = ballPosition.y;
	ball.position.z = ballPosition.z;
	scene.add( ball );
};

var drawBox = function(scene){
	var geometry = new THREE.BoxGeometry( boxSize, boxSize, boxSize ); 
	var material = new THREE.MeshBasicMaterial( {wireframe: "true", color: "white"} ); 
	var cube = new THREE.Mesh( geometry, material ); 
	scene.add( cube );
};

var animateBall = function(){

	ballPosition.add(ballVelocity);

	if (ballPosition.z > boxSize/2 || ballPosition.z < -boxSize/2) {
		ballVelocity.z *= -1;
	};
	if (ballPosition.x > boxSize/2 || ballPosition.x < -boxSize/2) {
		ballVelocity.x *= -1;
	};
	if (ballPosition.y > boxSize/2 || ballPosition.y < -boxSize/2) {
		ballVelocity.y *= -1;
	};

	ball.position.x = ballPosition.x;
	ball.position.y = ballPosition.y;
	ball.position.z = ballPosition.z;
};

var cameraControl = function(camera,time){
	camera.position.x = Math.sin(time)*250;
	camera.position.z = 50 + 150 + Math.sin(time*2)*-150;
	camera.lookAt(new THREE.Vector3(0,0,0));
};


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
		timeStep = 0.005;
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

		camera.position.set( 0, 0, 250 );
		scene.add(camera); 

		Loop();
	};

	// main loop
	function Loop(){
		requestAnimationFrame(updateWorld);

		(function init(){
			// initialize stuff here
			ballPosition = new THREE.Vector3( 0, 0, boxSize/2 );
			ballVelocity = new THREE.Vector3(
				Math.random(),
				Math.random(),
				Math.random()
			);

			drawBox(scene);
			drawBall(scene);
		}());
		function updateWorld(){
			time += timeStep;
			cameraControl(camera,time);
			// update logic here
			draw();
		}
		function draw(){
			animateBall();

			renderer.render(scene, camera); 
			requestAnimationFrame(updateWorld);
		}
	};
}());