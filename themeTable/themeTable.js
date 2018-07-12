var storedMainTheme = [];

function mainThemeChange() {
	if (themeTable.checked) {
		mainTheme.readOnly = true;
		closeSingleMenu();
	}
	storedMainDate = [];
	mainDate = currentDateToLocaleDateString;
	actualDate = currentDate;
	currentDateParagraph.innerHTML = mainDate;
	if (localStorage.getItem('storedMainDate_' + mainTheme.value)) {
		storedMainDate = JSON.parse(localStorage.getItem('storedMainDate_' + mainTheme.value), function(key, value) {if (key == '') {return value} else {return new Date(value)}});
		newThemeFlag = false;
	} else {
		newThemeFlag = true;
	}
	nextMonth(0);
	if (dateList.some(function(dateUnit) {return dateUnit.date == actualDate.getDate()})) newDateFlag = false;
	else newDateFlag = true;
	getStoredCards();
}

function mainThemeMenu(mobileVersion) {
	if (themeTable.checked) {
		mainTheme.readOnly = true;
		closeSingleMenu();
	} else {
		mainTheme.readOnly = false;
		fullClear(themeTableDeck);
		themeTable.checked = true;
		storedMainTheme.forEach(getChoosableTheme);
		if (mobileVersion) {
			singleLineMenu();
		}
		if (longMenu) {
			mobileMenu(1);
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

function getChoosableTheme(mainThemeUnit) {
	var div = document.createElement('div');
	div.innerHTML = mainThemeUnit;
	div.className = 'storedTheme';
	themeTableDeck.appendChild(div);
	div.onclick = function() {
		mainTheme.value = mainThemeUnit;
		mainThemeChange();
		if (singleMenu) {
			closeSingleMenu();
		}
	}
}