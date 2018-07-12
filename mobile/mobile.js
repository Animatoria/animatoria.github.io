var singleMenu = false;
var longMenu = false;

var lastScrollTop;

function fallingMobileMenu() {
	if (!longMenu) {
		if (lastScrollTop >= document.documentElement.scrollTop) {
			header.style.top = 0;
		} else {
			header.style.top = '-45px';
		}
	}
	lastScrollTop = document.documentElement.scrollTop;
}

function singleLineMenu() {
	singleMenu = true;
	header.className = ('singleMenu');
	burgerMenu.checked = true;
}

function closeSingleMenu() {
	singleMenu = false;
	burgerMenu.checked = false;
	card.forEach(refreshCardsAnimation);
	cardsTable.checked = true;
	header.className = ('closeSingleMenu');
}

function mobileMenu(toSingleMenu) {
	if (longMenu) {
		longMenu = false;
		plexiGlass.hidden = true;
		if (toSingleMenu) {
			singleMenu = true;
			header.className = ('singleMenu longMenuTr longMenuDelay');
		} else {
			burgerMenu.checked = false;
			header.className = ('longMenuTr longMenuDelay');
		}
	} else {
		if (singleMenu) {
			closeSingleMenu();
		} else {
			header.className = ('longMenuTr longMenuPos');
			plexiGlass.hidden = false;
			burgerMenu.checked = true;
			longMenu = true;
		}
	}
}
