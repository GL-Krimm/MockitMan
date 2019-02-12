var windowDetached = false;

var BackgroundService = {

	openWindow : function () {
		if (windowDetached) {
			return;
		}
 		try {
 			console.log("trying...");
 			windowDetached = true;
 			chrome.windows.create({'url':'../views/popup.html', 'type':'panel', 'height':550, 'width':355});
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
	},
	 
	getHosts : function() {
		var hosts = [];
		  chrome.storage.sync.get(['hosts'], function(result) {
			console.log(result);
			var val = result.key;
			if (undefined != val && null != val) {
				hosts = JSON.parse(val);
			}
		  });

		  return hosts;
	},

	setHosts : function(hosts) {
		chrome.storage.sync.set({'hosts': hosts}, function() {
			console.log('Value is set to ' + hosts);
		  });
	}
 };

//backgroundService.setHosts("[{'name':'foo','url':'bar'}]");