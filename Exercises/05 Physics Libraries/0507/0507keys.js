// uses a closure 
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
	    };
	    var key37 = function(){
	        //alert('left');
	        cars[0].brake();
	    };
	    var key39 = function(){
	    	//alert('right')
	    	cars[0].accelerate();
	    };
	    var key40 = function(){
	        //alert('down');
	    }
	//

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

