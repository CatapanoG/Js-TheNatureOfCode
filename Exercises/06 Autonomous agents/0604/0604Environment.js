var Ambient = (function (){
	var data = {
		t: 0,
		speedMult: 0,
		bgColor: 0
	};

	var exports = {
		update: function(){
			data.t+=0.005;
			data.speedMult=-Math.sin(data.t)+1.25;
			var red, blue;
			if (data.t%(2*Math.PI)<Math.PI) {
				red = Math.floor(Math.abs(Math.sin(data.t))*50);
				blue = 0;
			} else {
				red = 0;
				blue = Math.floor(Math.abs(Math.sin(data.t))*50);
			};	
			data.bgColor = "rgb(" + red + ", 0, " + blue + ")";
		},
		getBgColor: function(){return data.bgColor;},
		getSpeedMult: function(){return data.speedMult;}
	};

	return exports;
})();