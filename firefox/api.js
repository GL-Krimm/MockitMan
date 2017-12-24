(function () {
    console.log('trying to get background api');
    var getting = browser.runtime.getBackgroundPage();
    
    getting.then(function(b) {
        console.log("got background. setting to window.")
        console.log(b);
        backgroundService = b.BackgroundService;
    }, function(e) {
        console.log('error!');
        console.log(e);
    });
})();
