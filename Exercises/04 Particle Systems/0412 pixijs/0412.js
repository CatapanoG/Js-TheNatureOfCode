//
// The nature of code - Ch.4 Particle Systems
//
// Example 4.7: ParticleSystem with repeller
//
// Written by: Gennaro Catapano
//

//
// Example code
//

var stage,
	renderer;

var oPartSys,
	oRepeller, 
	v2Gravity = new Vector2d(0,-0.01),
	v2Wind = new Vector2d(0,0),
	oParticleImage = [];

function setup() {
	oPartSys = new ParticleSystem(new Vector2d(400,750));
	//oRepeller = new Repeller(canvas.width/2,canvas.height/2+100);
};

function update() {
	v2Wind.x = (Math.random()-0.5)*0.25;
	oPartSys.applyForce(v2Wind);

	oPartSys.applyForce(v2Gravity);
	oPartSys.addParticle();
	//oPartSys.applyRepeller(oRepeller);
	oPartSys.update();
};

function draw() {
	oPartSys.draw();
	//oRepeller.display(context);
	renderer.render(stage);
};



// mouseHandler
	function mouseHandler(canvas){
		canvas.onclick = function(e){
			//mouse.x = e.clientX;
			//mouse.y = e.clientY;
		};
	};
// 

//
// main()
// Canvas and Loop init
//

(function main(){
	// std variables
	var backgroundColor = "Black",
		viewportHeight = 800,
		viewportWidth = 800;

	// canvas & context creation
	window.onload = function() {
		stage = new PIXI.Stage();
		renderer = PIXI.autoDetectRenderer(viewportWidth, viewportHeight);
		document.body.appendChild(renderer.view);

		Loop();
	};

	// main loop
	function Loop(){
		(function init(){
			//context.globalAlpha = 0.6;
			//mouseHandler(canvas);
			//keyHandler(canvas);
			setup();

			var texture1 = PIXI.Texture.fromImage("yellowParticle.png");
			oParticleImage.push(texture1);
			var texture2 = PIXI.Texture.fromImage("fireParticle.png");
			oParticleImage.push(texture2);
			var texture3 = PIXI.Texture.fromImage("blueParticle.png");
			oParticleImage.push(texture3);

			updateWorld(); 
		}());
		function updateWorld(){
			 update();
			 render();
		}
		function render(){
			draw();
			requestAnimationFrame(updateWorld);
		}
	};
}());