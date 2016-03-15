(function() {
	var numNames = names.length - 1;
	var numStreets = streetNames.length - 1;
	var numStreetTypes = streetTypes.length - 1;
	var maxHouseNum = 8999;
	var maxLoanAmount = 29000;
	var loanFloor = 1000;
	var zipFloor = 10000;
	var maxIdSize = 120000000000;
	
	var rand = function(limit) {
		return Math.floor(Math.random() * limit);
	}
	
	var getRandomName = function() {
		return names[rand(numNames)];
	}
	//http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/2117523#8809472
	var generateGuid = function() {
		var d = new Date().getTime();
		if(window.performance && typeof window.performance.now === "function"){
			d += performance.now(); //use high-precision timer if available
		}
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	}

	var RID = function() {
		return (rand(maxIdSize) + 1).toString();
	}

	var fullName = function() {
		return [getRandomName(), getRandomName()];
	}
	
	var amount = function() {
		return (rand(maxLoanAmount) + loanFloor).toString();
	}
	
	var addr = function() {
		return (rand(maxHouseNum) + loanFloor).toString()
				+ " " +  streetNames[rand(numStreets)]
				+ " " + streetTypes[rand(numStreetTypes)];
	}
	
	var zipCode = function() {
		return (rand(maxHouseNum) + zipFloor).toString();
	}
	
	var mockLoan = function() {
		var name = fullName();
		return {
			loanId: RID(),
			firstName: name[0],
			lastName: name[1],
			amount: amount(),
			address: addr(),
			zip: zipCode()
		};
	}
	
	window.create = {
		guid: generateGuid,
		randomId: RID,
		name: fullName,
		loanAmount: amount,
		address: addr,
		zip: zipCode,
		loan: mockLoan
	};
})();