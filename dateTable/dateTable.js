var storedMainDate = [];
var dateList = [];
var dateIndex = [];

var dateTable = {
	is : false
}
var isActualMainDate = true;

var actualDate;
var smallExtender;
var bigExtender;
var firstDay;
var thisDate;

var monthString = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

var dateTable = document.querySelector('.dateTable');
var year = document.querySelector('.year');
var month = document.querySelector('.month');
var fiveWeekNodes = document.querySelector('.fiveWeek').childNodes;

function nextYear(direction) {
		actualDate = new Date(actualDate.getFullYear() + direction, actualDate.getMonth(), actualDate.getDate());
		year.innerHTML = actualDate.getFullYear();
		setCalendar();
}

function nextMonth(direction) {
	actualDate = new Date(actualDate.getFullYear(), actualDate.getMonth() + direction, actualDate.getDate());
	year.innerHTML = actualDate.getFullYear();
	month.innerHTML = monthString[actualDate.getMonth()];
	setCalendar();
}

function setCalendar() {
	smallExtender = 7;
	bigExtender = 0;
	firstDay = new Date(actualDate.getFullYear(), actualDate.getMonth()).getDay();
	switch(firstDay) {
		case 0 : for (var i = 7; i < 14; i++) fiveWeekNodes[i].classList.remove('displayNone'); smallExtender = 0; break;
		default : for (var i = 7; i < 14; i++) fiveWeekNodes[i].classList.add('displayNone');
		case 6 : bigExtender = 7;
	}
	for (var i = 49; i < 56; i++) fiveWeekNodes[i].classList.add('displayNone');
	findStoredYearAndMonth();
	fillDates();
	if (bigExtender == 7 && thisDate.getDate() == 6) for (var i = 49; i < 56; i++) fiveWeekNodes[i].classList.remove('displayNone');
}

function fillDates() {
	for (var i = 7 + smallExtender; i < 49 + bigExtender; i++) {
		thisDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), i - 12 - firstDay);
		fiveWeekNodes[i].innerHTML = thisDate.getDate();
		if (thisDate.getMonth() == actualDate.getMonth()) {
			fiveWeekNodes[i].classList.add('greenDay');
			fiveWeekNodes[i].classList.remove('redDay');
			selectCalendarDate(i, thisDate);
		} else {
			fiveWeekNodes[i].classList.remove('greenDay');
			fiveWeekNodes[i].classList.remove('redDay');
			fiveWeekNodes[i].onclick = function() {};
		}
	}
	for (var i in dateList) {
		fiveWeekNodes[dateList[i] + 12 + firstDay].classList.remove('greenDay');
		fiveWeekNodes[dateList[i] + 12 + firstDay].classList.add('redDay');
	}
}

function selectCalendarDate(i, thisDate) {
	fiveWeekNodes[i].onclick = function() {
		if (singleMenu) {
			closeSingleMenu(mainDateLog);
		}
		mainDate = thisDate.toLocaleDateString();
		currentDateParagraph.innerHTML = mainDate;
		actualDate = thisDate;
		if (fiveWeekNodes[i].classList.contains('greenDay')) {
			newDateFlag = true;
		} else {
			newDateFlag = false;
		}
		changeTable(cardsTable);
		getStoredCards();
	}
}

function findStoredYearAndMonth() {
	dateIndex = [];
	dateList = [];
	for (var i in storedMainDate) {
		if ((storedMainDate[i].getFullYear() == actualDate.getFullYear()) && (storedMainDate[i].getMonth() == actualDate.getMonth())) {
			dateIndex.push(i);
			dateList.push(storedMainDate[i].getDate());
		}
	}
}

function clearDate() {
	storedMainDate.splice(dateIndex[dateList.indexOf(actualDate.getDate())], 1);
	dateIndex.splice(dateList.indexOf(actualDate.getDate()), 1);
	dateList.splice(dateList.indexOf(actualDate.getDate()), 1);
	localStorage.setItem('storedMainDate_' + mainTheme.value, JSON.stringify(storedMainDate));
	fillDates();
}

function changeMainDate(mobileVersion) {
	refreshCardsAnimation();
	if (dateTable.is) {
		if (singleMenu) {
			closeSingleMenu(mainDateLog);
		} else {
			changeTable(cardsTable);
		}
	} else {
		changeTable(dateTable);
		if (mobileVersion) {
			singleLineMenu(mainDateLog);
		}
		if (longMenu) {
			mobileMenu(mainDateLog);
		}
	}
}