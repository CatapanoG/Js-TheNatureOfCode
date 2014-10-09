//
// The nature of code - Ch.4 Particle Systems
//
// Exercise 4.9
// Expand the above example to include many repellers (using an array or ArrayList).
//
// Written by: Gennaro Catapano
//

//
// Example code
//

var oPartSys,
	oRepeller = [], 
	v2Gravity = new Vector2d(0,0.02);

function setup(context,canvas) {
	oPartSys = new ParticleSystem(new Vector2d(canvas.width/2,canvas.height/2 - 200));
	oRepeller[0] = new Repeller(canvas.width/2 - 150,canvas.height/2 - 100);
	oRepeller[1] = new Repeller(canvas.width/2 + 150,canvas.height/2 - 100);
	oRepeller[2] = new Repeller(canvas.width/2 - 100,canvas.height/2);
	oRepeller[3] = new Repeller(canvas.width/2 + 100,canvas.height/2);
	oRepeller[4] = new Repeller(canvas.width/2 - 150,canvas.height/2 - 200);
	oRepeller[5] = new Repeller(canvas.width/2 + 150,canvas.height/2 - 200);
	oRepeller[6] = new Repeller(canvas.width/2 - 150,canvas.height/2 - 300);
	oRepeller[7] = new Repeller(canvas.width/2 + 150,canvas.height/2 - 300);
	oRepeller[8] = new Repeller(canvas.width/2 - 100,canvas.height/2 - 400);
	oRepeller[9] = new Repeller(canvas.width/2 + 100,canvas.height/2 - 400);
};

function update(canvas){
	oPartSys.applyForce(v2Gravity);
	oPartSys.addParticle();
	for (var i = oRepeller.length - 1; i >= 0; i--) {
		oRepeller[i].randomizeG();
		oPartSys.applyRepeller(oRepeller[i]);
	};
	oPartSys.update();
};

function draw(context,canvas) {
	background(context,canvas,"Black");

	oPartSys.draw(context);
	for (var i = oRepeller.length - 1; i >= 0; i--) {
		oRepeller[i].display(context);
	};
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
		viewportWidth = 800,
		viewportId = "viewport",
		timeStep = 1000 / 30,
		canvas,
		context;

	// canvas & context creation
	window.onload = function() {
		canvas = document.createElement("canvas");
		canvas.setAttribute("width", viewportWidth);
		canvas.setAttribute("height", viewportHeight);
		canvas.setAttribute("id", viewportId);
		document.getElementById("canvasPlace").appendChild(canvas);
		context = canvas.getContext("2d");

		context.fillStyle = backgroundColor;
		context.fillRect(0,0,canvas.width,canvas.height);

		Loop();
	};

	// main loop
	function Loop(){
		requestAnimationFrame(updateWorld);

		(function init(){
			// initialize stuff here
			 //context.globalAlpha = 0.6;
			 //mouseHandler(canvas);
			 //keyHandler(canvas);
			 setup(context,canvas);
			 //


		}());
		function updateWorld(){
			// update logic here
			 //
			 update(canvas);
			 render();
			 //
		}
		function render(){
			// rendering logic here
			 //
			 draw(context,canvas);
			 //
			requestAnimationFrame(updateWorld);
		}
	};
}());

//
// helper functions ellipse(), background() etc
//

	var helpersStrokeStyle = "white";
	var helpersFillStyle = "grey";
	var lineWidth = 4;

	function ellipse(context,x,y,radius){
		context.fillStyle = helpersFillStyle;
		context.strokeStyle = helpersStrokeStyle;
		context.lineWidth = lineWidth;
		context.beginPath();
		context.arc(x,y,radius,0,2*Math.PI);
		context.fill();
		context.stroke();
	}

	function background(context,canvas,color){
		context.fillStyle = color;
		context.fillRect(0,0,canvas.width,canvas.height);
	}

	function line(context,x0,y0,x1,y1){
		context.strokeStyle = helpersStrokeStyle;
		context.lineWidth = lineWidth;
		context.beginPath(); // resets the previous path
		context.moveTo(x0,y0); // no translation f() so had to be done manually
		context.lineTo(x1,y1); // no translation f() so had to be done manually
		context.stroke();
	}

	function rectangle(context, x, y, width, height){
		context.fillStyle = helpersStrokeStyle;
		context.fillRect(x, y, width, height);

		context.fillStyle = helpersFillStyle;
		context.fillRect(x+lineWidth/2,y+lineWidth/2,width-lineWidth,height-lineWidth);
	}

	function triangle(context, A, B, C){
		context.fillStyle = helpersFillStyle;
		context.strokeStyle = helpersStrokeStyle;
		context.lineWidth = lineWidth;
		context.beginPath();
	    context.moveTo(A.x,A.y);
	    context.lineTo(B.x,B.y);
	    context.lineTo(C.x,C.y);
	    context.lineTo(A.x,A.y);
	    context.fill();
	    context.stroke();
	}
//