var newThemeFlag = false;
var newDateFlag = true;
var regUser = false;

var thisSessionID;
var storedWidth;

function setSessionID() {
	if (regUser) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'sessionID');
		xhr.send();
		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4) return;
			if (xhr.status != 200) {
				console.log('Error ' + xhr.status + ': ' + xhr.statusText);
			} else {
				sessionID = xhr.responseText;
			}
		}
	} else {
		var sessionID = +localStorage.getItem('');
		if (sessionID && sessionID != 255) {
			thisSessionID = ++sessionID;
			localStorage.setItem('', thisSessionID);
		} else {
			thisSessionID = 1;
			localStorage.setItem('', 1);
		}
		return this;
	}
}

function setCardProperties() {
	if (storedWidth != innerWidth) {
		storedWidth = innerWidth;
		columnFuncSelector(Math.min(Math.floor(innerWidth / 700), 2));
		fullClear(cardsColumn[0])(cardsColumn[1])(cardsColumn[2]);
		card.forEach(refreshCards);
		chooseBlankColumn();
	}
	return this;
}

function setMainTheme() {
	if (localStorage.getItem('storedMainTheme') && (storedMainTheme = JSON.parse(localStorage.getItem('storedMainTheme'))).length) {
		mainTheme.value = storedMainTheme[storedMainTheme.length - 1];
	} else {
		mainTheme.value = 'Theme';
		storedMainTheme.push(mainTheme.value);
		localStorage.setItem('storedMainTheme', JSON.stringify(storedMainTheme));
		localStorage.setItem('storedMainDate_' + mainTheme.value, JSON.stringify(storedMainDate));
	}
	return this;
}

function setStoredMainDate() {
	if (localStorage.getItem('storedMainDate_' + mainTheme.value)) {
		storedMainDate = JSON.parse(localStorage.getItem('storedMainDate_' + mainTheme.value), function(key, value) {if (key == '') {return value} else {return new Date(value)}});
	}
	nextMonth(0);
	newDateFlag = dateList.some(function(dateUnit) {return dateUnit.date == actualDate.getDate()}) ? false : true;
	return this;
}

function fullClear(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
	return fullClear
}

function isNewDateOrTheme() {
	if (newThemeFlag) {
		storedMainTheme.push(mainTheme.value);
		localStorage.setItem('storedMainTheme', JSON.stringify(storedMainTheme));
		newThemeFlag = false;
		newDateFlag = true;
	}
	if (newDateFlag) {
		dateList.push(new DateUnit(actualDate.getDate(), storedMainDate.length));
		storedMainDate.push(actualDate);
		localStorage.setItem('storedMainDate_' + mainTheme.value, JSON.stringify(storedMainDate));
		colorizeDates();
		newDateFlag = false;
	}
}

function getRequest(file) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', file);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			console.log('Error ' + xhr.status + ': ' + xhr.statusText);
		} else {
			console.log(xhr.responseText);
		}
	}
}

function postRequest(type, data) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', type);
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	xhr.send(data);
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;
		if (xhr.status != 200) {
			console.log('Error ' + xhr.status + ': ' + xhr.statusText);
		} else {
			console.log(xhr.responseText);
		}
	}
}