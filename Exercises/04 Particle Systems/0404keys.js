function keyHandler(){
	var key = [];
	var definedKeys = [];
	definedKeys[37] = true;
	definedKeys[38] = true;
	definedKeys[39] = true;
	definedKeys[40] = true;

	// keys defs
	var key38 = function(){
        //alert('up');
        var acc = new Vector2d(Math.cos(mover.angle + Math.PI/2),Math.sin(mover.angle + Math.PI/2));
        acc.mult(5);
        mover.applyForce(acc);
    };
    var key37 = function(){
        //alert('left');
        mover.angle -= 0.05;
    };
    var key39 = function(){
    	//alert('right')
        mover.angle += 0.05;
    };
    var key40 = function(){
        //alert('down');
        var acc = Vector2d.prototype.mult(1,mover.velocity);
        acc.mult(-mover.mass/10);
        mover.applyForce(acc);
    }

    // listeners
	document.addEventListener('keydown', function(e){
		key[e.keyCode] = true;
	});
	document.addEventListener('keyup', function(e){
		key[e.keyCode] = false;
	});

	// function used in the update cycle
	var checkKeys = function(){
		for (var i = 0; i < key.length; i++) {
			if (key[i] && definedKeys[i]) {
				var funName = "key" + i + "()";
				eval(funName);
			};
		};
	};

	return checkKeys; 
};

