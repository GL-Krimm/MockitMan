var windowDetached = false;
var BackgroundService = {

	openWindow : function () {
 		try {
 			console.log("trying...");
 			windowDetached = true;
 			chrome.windows.create({'url':'../views/popup.html', 'type':'panel', 'height':250, 'width':250});
 		} catch ( e ) {
 			console.log(e.message);
 		}		
 	},
 	
 	setWindowDetached : function(value) {
 		windowDetached = value;
 	};
 	getWindowDetached : function() {
 		return windowDetached;
 	};
 };

