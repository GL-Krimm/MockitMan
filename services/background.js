var windowDetached = false;

var BackgroundService = {

	openWindow : function () {
		if (windowDetached) {
			return;
		}
 		try {
 			console.log("trying...");
 			windowDetached = true;
 			chrome.windows.create({'url':'../views/popup.html', 'type':'panel', 'height':450, 'width':280});
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

