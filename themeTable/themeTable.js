var storedMainTheme = [];

var themeTable = document.querySelector('#themeTableRB');

var themeTableDeck = document.querySelector('.themeTable');

function deleteAllThemeItems() {
	while (themeTableDeck.firstChild) {
		themeTableDeck.removeChild(themeTableDeck.firstChild);
	}
}

function mainThemeChange() {
	if (singleMenu) {
		closeSingleMenu(mainThemeLabel);
	}
	storedMainDate = [];
	mainDate = currentDateToLocaleDateString;
	actualDate = currentDate;
	currentDateParagraph.innerHTML = mainDate;
	cardsTable.checked = true;
	if (localStorage.getItem('storedMainDate_' + mainTheme.value)) {
		storedMainDate = JSON.parse(localStorage.getItem('storedMainDate_' + mainTheme.value), function(key, value) {if (key == '') {return value} else {return new Date(value)}});
		newThemeFlag = false;
	} else {
		newThemeFlag = true;
	}
	nextMonth(0);
	if (dateList.some(function(value) {return value == actualDate.getDate()})) newDateFlag = false;
	else newDateFlag = true;
	getStoredCards();
}

function mainThemeMenu(mobileVersion) {
	refreshCardsAnimation();
	if (themeTable.checked) {
		mainTheme.readOnly = true;
		if (singleMenu) {
			closeSingleMenu(mainThemeLabel);
		} else {
			themeTable.checked = true;
		}
		mainThemeChange();
	} else {
		mainTheme.readOnly = false;
		deleteAllThemeItems();
		themeTable.checked = true;
		for (var i in storedMainTheme) {
			getChoosableTheme(i);
		}
		if (mobileVersion) {
			singleLineMenu(mainThemeLabel);
		}
		if (longMenu) {
			mobileMenu(mainThemeLabel);
		}
		setTimeout(function() {mainTheme.select()}, 1);
	}
}

function clearTheme() {
	localStorage.removeItem('storedMainDate_' + mainTheme.value);
	storedMainTheme.splice(storedMainTheme.indexOf(mainTheme.value), 1);
	localStorage.setItem('storedMainTheme', JSON.stringify(storedMainTheme));
	newThemeFlag = true;
}

function getChoosableTheme(i) {
	var div = document.createElement('div');
	var thisItemTheme = storedMainTheme[i];
	div.innerHTML = thisItemTheme;
	div.className = 'storedTheme';
	themeTableDeck.appendChild(div);
	div.onclick = function() {
		mainTheme.value = thisItemTheme;
		mainThemeChange();
		if (singleMenu) {
			closeSingleMenu(mainThemeLabel);
		}
	}
}