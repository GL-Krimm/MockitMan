(function() {

	var contentId = "content";
	var gId = "guidValue";
	var nId = "numValue";
	var naId = "nameValue";
	var addrId = "addrValue";
	var zId = "zipValue";
	var amtId = "amtValue";
	var vId = "vinValue";
	var oBtnId = "btnOut";
	var dateId = "dateValue";
	var formatField = document.getElementById("formatField");
	var titleMessage = "Click to copy to clipboard";
	var copyTarget = null;

	var formatDate = function(d, f) {
		f = f.replace("yyyy", d.getFullYear());
		var mo = ('0' + (d.getMonth() + 1)).slice(-2);
		f = f.replace("mm", mo.toString());

		var day = ('0' + d.getDate()).slice(-2);
		f = f.replace("dd", day.toString());
		f = f.replace("hh", "00").replace("MM", "00").replace("ss", "00");
		return f;
	}

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

		node = document.getElementById(vId);
		node.textContent = loanInfo.vin;

		node = document.getElementById(dateId);
		node.textContent = formatDate(new Date(), formatField.value); //new Date().toString();
	}

	var copyData = function(elem) {
		if (elem) {
			backgroundService.log(copyTarget);
			copyTarget.value = elem.textContent;
			copyTarget.select();
			document.execCommand('copy', true);
			generateNewData();
		} else {
			backgroundService.log('blankety blank');
		}
	}

	var handleClick = function() {
		var valNode = this.querySelector('.value');
		copyData(valNode);
	}

	var initClickHandlers = function() {
		var nodes = document.getElementsByClassName('property');

		for (var i = 0; i < nodes.length; ++i) {
			nodes[i].onclick = handleClick;
			nodes[i].title = titleMessage;
		}
	}

	var handleNav = function() {
		console.log('getting page ref')
		var targetRef = this.getAttribute('data-page-ref');

		console.log(targetRef);
		var panels = document.getElementsByClassName('panel');

		for (var i = 0; i < panels.length; i++) {
			var panel = panels[i];
			panel.style.visibility='hidden';
		}

		var navs = document.getElementsByClassName('nav');

		for (var i = 0; i < navs.length; ++i) {
			navs[i].classList.remove('active');
		}

		var targetPage = document.getElementById(targetRef);
		targetPage.style.visibility='visible';
		this.classList.add('active');
	}

	var initNav = function() {
		console.log("building nav dynamically")
		var navBar = document.getElementById('nav');
		var panels = document.getElementsByClassName('panel');

		for (var i = 0; i < panels.length; ++i) {
			console.log('adding button');
			var panel = panels[i];
			var navButton = document.createElement('li');
			navButton.className = 'nav';
			var id = panel.getAttribute('id');
			navButton.setAttribute('data-page-ref', id);
			navButton.textContent = id;
			navButton.onclick = handleNav;
			navBar.appendChild(navButton);
		}
	}

	var init = function() {
		generateNewData();

		var oBtn = document.getElementById(oBtnId);
		oBtn.onclick = function() {
			backgroundService.openWindow();
		}

		window.onbeforeunload = function() {
			backgroundService.setWindowDetached(false);
		}

		copyTarget = document.getElementById('copyTarget');

		initNav();
		initClickHandlers();
	}

	init();
})();