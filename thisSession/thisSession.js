var newThemeFlag = false;
var newDateFlag = true;

var thisSessionID;
var screenWidth;

var bodyElement = document.querySelector('.body');

function setSessionID() {
	var sessionID = +localStorage.getItem('');
	if (sessionID) {
		if (sessionID == 255) {
			thisSessionID = 1;
			localStorage.setItem('', 1);
		} else {
			thisSessionID = sessionID + 1;
			localStorage.setItem('', thisSessionID);
		}
	} else {
		thisSessionID = 1;
		localStorage.setItem('', 1);
	}
}

function setCardProperties() {
	if (screenWidth != innerWidth) {
		screenWidth = innerWidth;
		if (innerWidth < 830) {
			cardsColumnNumber = 0;
		} else if (innerWidth < 1230) {
			cardsColumnNumber = 1;
		} else {
			cardsColumnNumber = 2;
		}
		chooseCardsColumn = columnExpression[cardsColumnNumber];
		refreshCardsOnTable();
	}
}

function setMainTheme() {
	if (localStorage.getItem('storedMainTheme') && (storedMainTheme = JSON.parse(localStorage.getItem('storedMainTheme'))).length) {
		mainTheme.value = storedMainTheme[storedMainTheme.length - 1];
	} else {
		mainTheme.value = 'Input main theme';
		storedMainTheme.push(mainTheme.value);
		localStorage.setItem('storedMainTheme', JSON.stringify(storedMainTheme));
	}
}

function setStoredMainDate() {
	if (localStorage.getItem('storedMainDate_' + mainTheme.value)) {
		storedMainDate = JSON.parse(localStorage.getItem('storedMainDate_' + mainTheme.value), function(key, value) {if (key == '') {return value} else {return new Date(value)}});
	}
	nextMonth(0);
	if (dateList.some(function(value) {return value == actualDate.getDate()})) newDateFlag = false;
	else newDateFlag = true;
}

function isNewDateOrTheme() {
	if (newThemeFlag) {
		storedMainTheme.push(mainTheme.value);
		localStorage.setItem('storedMainTheme', JSON.stringify(storedMainTheme));
		newThemeFlag = false;
		newDateFlag = true;
	}
	if (newDateFlag) {
		dateIndex.push(storedMainDate.length);
		dateList.push(actualDate.getDate());
		storedMainDate.push(actualDate);
		localStorage.setItem('storedMainDate_' + mainTheme.value, JSON.stringify(storedMainDate));
		fillDates();
		newDateFlag = false;
	}
}