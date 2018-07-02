var newThemeFlag = false;
var newDateFlag = true;

var thisSessionID;

var extender = 0;
var textAreaExtender = 23;

var bodyElement = document.querySelector('.body');
var rubberBodyWidthMeasure = document.querySelector('.empty');

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

function defineDeviceProperties() {
	var styleLink = document.createElement('link');
	styleLink.type = 'text/css';
	styleLink.rel = 'stylesheet';
	if (deviceBrowserType.device.type == 'Desktop') {
		extender = 10;
		styleLink.href = 'desktop/styleDesktop.css';
		rubberBodyWidthMeasure.style.width = '90%';
		rubberBodyElement.style.minHeight = (window.innerHeight - 180) + 'px';
		onresize = function() {setCardProperties()};
	} else {
		textareaEditableRows = 2;
		styleLink.href = 'mobile/styleMobile.css';
		rubberBodyWidthMeasure.style.width = '100%';
		onscroll = fallingMobileMenu;
		rubberBodyElement.style.minHeight = '300px';
		Screen.onorientationchange = function() {setCardProperties()};
	}
		if (deviceBrowserType.browser.family == 'Edge') {
			textAreaExtender = 27;
		}
		if (deviceBrowserType.browser.family == 'IE') {
		}
		if (deviceBrowserType.os.family == 'Android') {
			textareaEditableRows = 2;
			textAreaExtender = 12;
		}
	document.querySelector('head').appendChild(styleLink);
	setCardProperties();
}

function setCardProperties() {
	rubberBodyWidth = rubberBodyWidthMeasure.clientWidth;
	if (rubberBodyWidth < 830) {
		cardsColumnNumber = 0;
		flipperColumnWidth = Math.floor((rubberBodyWidth - 4 - textAreaExtender) / 18);
		rubberBodyWidth = flipperColumnWidth * 18 + textAreaExtender + 4;
	} else if (rubberBodyWidth < 1230) {
		cardsColumnNumber = 1;
		flipperColumnWidth = Math.floor((rubberBodyWidth - 4 - 4 - (2 * textAreaExtender)) / (2 * 18));
		rubberBodyWidth = flipperColumnWidth * 18 * 2 + 2 * textAreaExtender + 4 + 4;
	} else {
		cardsColumnNumber = 2;
		flipperColumnWidth = Math.floor((rubberBodyWidth - 4 - (2 * 4) - (3 * textAreaExtender)) / (3 * 18));
		rubberBodyWidth = flipperColumnWidth * 18 * 3 + 3 * textAreaExtender + 2 * 4 + 4;
	}
	bodyElement.style.width = extender + rubberBodyWidth + 'px';
	header.style.width = extender + rubberBodyWidth + 'px';
	defineCardsColumn();
	refreshCardsOnTable();
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