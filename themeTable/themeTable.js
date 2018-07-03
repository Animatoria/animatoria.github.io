var storedMainTheme = [];

var themeTable = {
	on : false
}

var themeTable = document.querySelector('.themeTable');

function deleteAllThemeItems() {
	while (themeTable.firstChild) {
		themeTable.removeChild(themeTable.firstChild);
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
	changeTable(cardsTable);
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
	if (themeTable.on) {
		mainTheme.readOnly = true;
		if (singleMenu) {
			closeSingleMenu(mainThemeLabel);
		} else {
			changeTable(themeTable);
		}
		mainThemeChange();
	} else {
		mainTheme.readOnly = false;
		mainTheme.select();
		deleteAllThemeItems();
		changeTable(themeTable);
		for (var i in storedMainTheme) {
			getChoosableTheme(i);
		}
		if (mobileVersion) {
			singleLineMenu(mainThemeLabel);
		}
		if (longMenu) {
			mobileMenu(mainThemeLabel);
		}
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
	themeTable.appendChild(div);
	div.onclick = function() {
		mainTheme.value = thisItemTheme;
		mainThemeChange();
		if (singleMenu) {
			closeSingleMenu(mainThemeLabel);
		}
	}
}