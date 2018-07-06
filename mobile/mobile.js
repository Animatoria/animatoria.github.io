var header = document.querySelector('.header');

var singleMenu = false;
var longMenu = false;
var plexiGlass = document.querySelector('.plexiGlass');
var mainThemeLabel = document.querySelector('.mainThemeLabel');

var burgerCross = document.querySelectorAll('.burgerCross');
var crossBurger = document.querySelectorAll('.crossBurger');

var lastScrollTop;

function fallingMobileMenu() {
	if (lastScrollTop > document.documentElement.scrollTop) {
		header.style.top = 0;
	} else {
		header.style.top = '-50px';
	}
	lastScrollTop = document.documentElement.scrollTop;
}

var burger = {
	_on : true,
	get on() {
		for (var i = 0; i < 3; i++) {
			crossBurger[i].beginElement();
		}
		this._on = true;
	},
	get off() {
		if (this._on) {
			for (var i = 0; i < 3; i++) {
				burgerCross[i].beginElement();
			}
			this._on = false;
		}
	}
}

function singleLineMenu(label) {
	singleMenu = true;
	header.className = ('header singleMenu');
	burger.off;
}

function closeSingleMenu() {
	singleMenu = false;
	burger.on;
	changeTable(cardsTable);
	header.className = ('header closeSingleMenu');
}

function mobileMenu(label) {
	if (longMenu) {
		longMenu = false;
		plexiGlass.classList.add('displayNone');
		if (label) {
			singleMenu = true;
			header.className = ('header singleMenu longMenuTr longMenuDelay');
		} else {
			burger.on;
			header.className = ('header longMenuTr longMenuDelay');
		}
	} else {
		if (singleMenu) {
			closeSingleMenu(mainDateLog, mainThemeLabel)
		} else {
			header.className = ('header longMenuTr longMenuPos');
			plexiGlass.classList.remove('displayNone');
			burger.off;
			longMenu = true;
		}
	}
}
