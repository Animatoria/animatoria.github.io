var singleMenu = false;
var longMenu = false;

var header = document.querySelector('#header');
var plexiGlass = document.querySelector('.plexiGlass');

var burgerCross = document.querySelectorAll('.burgerCross');
var crossBurger = document.querySelectorAll('.crossBurger');

var lastScrollTop;

function fallingMobileMenu() {
	if (!longMenu) {
		if (lastScrollTop > document.documentElement.scrollTop) {
			header.style.top = 0;
		} else {
			header.style.top = '-45px';
		}
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

function singleLineMenu() {
	singleMenu = true;
	header.className = ('singleMenu');
	burger.off;
}

function closeSingleMenu() {
	singleMenu = false;
	burger.on;
	cardsTable.checked = true;
	header.className = ('closeSingleMenu');
}

function mobileMenu(toSingleMenu) {
	if (longMenu) {
		longMenu = false;
		plexiGlass.classList.add('displayNone');
		if (toSingleMenu) {
			singleMenu = true;
			header.className = ('singleMenu longMenuTr longMenuDelay');
		} else {
			burger.on;
			header.className = ('longMenuTr longMenuDelay');
		}
	} else {
		if (singleMenu) {
			closeSingleMenu();
		} else {
			header.className = ('longMenuTr longMenuPos');
			plexiGlass.classList.remove('displayNone');
			burger.off;
			longMenu = true;
		}
	}
}
