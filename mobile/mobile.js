var header = document.querySelector('.header');
var headerChildNodes = header.childNodes;

var singleMenu = false;
var longMenu = false;
var plexiGlass = document.querySelector('.plexiGlass');
var mainThemeLabel = document.querySelector('.mainThemeLabel');

var burgerCross = document.querySelectorAll('.burgerCross');
var crossBurger = document.querySelectorAll('.crossBurger');

var lastScrollTop;

setMobileMenu();

function fallingMobileMenu() {
	if (lastScrollTop > document.documentElement.scrollTop) {
		header.style.top = 0;
	} else {
		header.style.top = '-50px';
	}
	lastScrollTop = document.documentElement.scrollTop;
}

function cross() {
	for (var i = 0; i < 3; i++) {
		burgerCross[i].beginElement();
	}
}

function burger() {
	for (var i = 0; i < 3; i++) {
		crossBurger[i].beginElement();
	}
}

function singleLineMenu(label) {
	singleMenu = true;
	label.style.top = 0;
	label.style.transition = 'top ' + 1 / 8 + 's linear';
	cross();
}

function closeSingleMenu() {
	singleMenu = false;
	burger();
	changeTable(cardsTable);
	for (var i in arguments) {
		arguments[i].style.top = '-50px';
		arguments[i].style.transition = 'top ' + 1 / 8 + 's linear';
	}
}

function mobileMenu(label) {
	for (var i = 0; i < 6; i++) {
		headerChildNodes[i].style.transition = 'top ' + (i + 1) / 8 + 's linear';
	}
	if (longMenu) {
		longMenu = false;
		for (var i = 0; i < 6; i++) {
			headerChildNodes[i].style.top = -50 + 'px';
			headerChildNodes[i].style.transitionDelay = (6 - i) / 8 + 's';
		}
		plexiGlass.classList.add('displayNone');
		if (label) {
			label.style.top = 0;
			singleMenu = true;
		} else {
			burger();
		}
	} else {
		if (singleMenu) {
			closeSingleMenu(mainDateLog, mainThemeLabel)
		} else {
			for (var i = 0; i < 6; i++) {
				headerChildNodes[i].style.top = i * 50 + 'px';
				headerChildNodes[i].style.transitionDelay = '0s';
			}
			plexiGlass.classList.remove('displayNone');
			cross();
			longMenu = true;
		}
	}
}

function setMobileMenu() {
	for (var i = 0; i < 6; i++) {
		headerChildNodes[i].style.transition = 'top ' + (i + 1) / 8 + 's linear';
		headerChildNodes[i].style.zIndex = 10 - (i + 1);
	}
}
