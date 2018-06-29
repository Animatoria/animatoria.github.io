var newThemeFlag = false;
var newDateFlag = true;

var thisSessionID;

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

function setCardProperties(resize) {
	var rubberBodyWidthMeasure = document.querySelector('.empty');
	var extender = 10;
	var headTag = document.querySelector('head');
	var styleLink = document.createElement('link');
	styleLink.type = 'text/css';
	styleLink.rel = 'stylesheet';
	if (deviceBrowserType.device.type == 'Desktop') {
		onresize = function() {setCardProperties(true)};
		styleLink.href = 'desktop/styleDesktop.css';
		rubberBodyWidthMeasure.style.width = '90%';
		rubberBodyElement.style.minHeight = (window.innerHeight - 180) + 'px';
	} else {
		textareaEditableRows = 2;
		styleLink.href = 'mobile/styleMobile.css';
		rubberBodyWidthMeasure.style.width = '100%';
		onscroll = fallingMobileMenu;
	}
	rubberBodyWidthMeasure = rubberBodyWidthMeasure.clientWidth;
		var textAreaExtender = 23;
		if (deviceBrowserType.browser.family == 'Edge') {
			textAreaExtender = 27;
		}
		if (deviceBrowserType.browser.family == 'IE') {
		}
		if (deviceBrowserType.os.family == 'Android') {
			textareaEditableRows = 2;
			textAreaExtender = 12;
			onresize = function() {};
		}
		if (rubberBodyWidthMeasure < 830) {
			cardsColumnNumber = 1;
			flipperColumnWidth = Math.floor((rubberBodyWidthMeasure - 4 - textAreaExtender) / 18);
			rubberBodyWidthMeasure = flipperColumnWidth * 18 + textAreaExtender + 4;
		} else if (rubberBodyWidthMeasure < 1230) {
			cardsColumnNumber = 2;
			flipperColumnWidth = Math.floor((rubberBodyWidthMeasure - 4 - 4 - (2 * textAreaExtender)) / (2 * 18));
			rubberBodyWidthMeasure = flipperColumnWidth * 18 * 2 + 2 * textAreaExtender + 4 + 4;
		} else {
			cardsColumnNumber = 3;
			flipperColumnWidth = Math.floor((rubberBodyWidthMeasure - 4 - (2 * 4) - (3 * textAreaExtender)) / (3 * 18));
			rubberBodyWidthMeasure = flipperColumnWidth * 18 * 3 + 3 * textAreaExtender + 2 * 4 + 4;
		}
	bodyElement.style.width = extender + rubberBodyWidthMeasure + 'px';
	header.style.width = extender + rubberBodyWidthMeasure + 'px';
	headTag.appendChild(styleLink);
	if (resize) refreshCardsOnTable();
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