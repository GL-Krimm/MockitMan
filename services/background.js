var windowDetached = false;
var randomVinUrl = 'http://randomvin.com/getvin.php?fake=true';
var BackgroundService = {

	openWindow : function () {
 		try {
 			console.log("trying...");
 			windowDetached = true;
 			chrome.windows.create({'url':'../views/popup.html', 'type':'panel', 'height':280, 'width':280});
 		} catch ( e ) {
 			console.log(e.message);
 		}		
 	},
 	
 	setWindowDetached : function(value) {
 		windowDetached = value;
 	},
 	getWindowDetached : function() {
 		return windowDetached;
 	}
 };

