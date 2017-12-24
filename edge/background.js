var windowDetached = false;

var BackgroundService = {

	openWindow : function () {
		if (windowDetached) {
			return;
		}
 		try {
			 console.log("trying..."); 
			 
			 var creating = browser.windows.create({
				url: '../views/popup.html',
				type: "popup",
				height: 625,
				width: 355
			  });

			  creating.then(function() {
				windowDetached = true;
			  }, function() {
				  console.log('Failed to open in new window')
			  });
 		} catch ( e ) {
 			console.log(e.message);
 		}		
 	},
 	
 	setWindowDetached : function(value) {
 		windowDetached = value;
 	},
 	getWindowDetached : function() {
 		return windowDetached;
 	},

 	log: function(msg) {
 		console.log(msg);
 	}
 };

