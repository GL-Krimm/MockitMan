/*
	window.create = {
		guid: generateGuid,
		randomId: RID,
		name: fullName,
		loanAmount: amount,
		address: addr,
		zip: zipCode,
		loan: mockLoan
	};
	loan:
	loanId: RID(),
	firstName: name[0],
	lastName: name[1],
	amount: amount(),
	address: addr(),
	zip: zipCode()	
*/

(function() {
	backgroundService = chrome.extension.getBackgroundPage().BackgroundService;

	var gId = "guidValue";
	var nId = "numValue";
	var naId = "nameValue";
	var addrId = "addrValue";
	var zId = "zipValue";
	var amtId = "amtValue";
	var gBtnId = "btnGenerate";
	var oBtnId = "btnOut";

	var generateNewData = function() {
		var loanInfo = window.create.loan();

		var node = document.getElementById(gId);
		node.textContent = window.create.guid();

		node = document.getElementById(nId);
		node.textContent = loanInfo.loanId;

		node = document.getElementById(naId);
		node.textContent = loanInfo.firstName + " " + loanInfo.lastName;

		node = document.getElementById(addrId);
		node.textContent = loanInfo.address;

		node = document.getElementById(zId);
		node.textContent = loanInfo.zip;

		node = document.getElementById(amtId);
		node.textContent = loanInfo.amount;		
	}

	var init = function() {
		generateNewData();

		var gBtn = document.getElementById(gBtnId);
		gBtn.onclick = generateNewData;

		var oBtn = document.getElementById(oBtnId);
		oBtn.onclick = function() {
			console.log("opening!");
			backgroundService.openWindow();
		}
	}

	init();
})();