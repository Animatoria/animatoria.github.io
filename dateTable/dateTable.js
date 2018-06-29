var storedMainDate = [];
var dateList = [];
var dateIndex = [];

var isDateTable = false;
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
		case 0 : for (var i = 7; i < 14; i++) fiveWeekNodes[i].style.display = 'block'; smallExtender = 0; break;
		default : for (var i = 7; i < 14; i++) fiveWeekNodes[i].style.display = 'none';
		case 6 : bigExtender = 7;
	}
	for (var i = 49; i < 56; i++) fiveWeekNodes[i].style.display = 'none';
	findStoredYearAndMonth();
	fillDates();
	if (bigExtender == 7 && thisDate.getDate() == 6) for (var i = 49; i < 56; i++) fiveWeekNodes[i].style.display = 'block';
}

function fillDates() {
	for (var i = 7 + smallExtender; i < 49 + bigExtender; i++) {
		thisDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), i - 12 - firstDay);
		fiveWeekNodes[i].innerHTML = thisDate.getDate();
		if (thisDate.getMonth() == actualDate.getMonth()) {
			fiveWeekNodes[i].style.backgroundColor = 'green';
			selectCalendarDate(i, thisDate);
		} else {
			fiveWeekNodes[i].style.backgroundColor = '#dfd';
		}
	}
	for (var i in dateList) {
		fiveWeekNodes[dateList[i] + 12 + firstDay].style.backgroundColor = 'red';
	}
}

function selectCalendarDate(i, thisDate) {
	fiveWeekNodes[i].onclick = function() {
		if (singleMenu) {
			closeSingleMenu(mainDateLog);
		}
		isDateTable = false;
		mainDate = thisDate.toLocaleDateString();
		actualDate = thisDate;
		if (fiveWeekNodes[i].style.backgroundColor == 'green') {
			newDateFlag = true;
		} else {
			newDateFlag = false;
		}
		changeDateItem();
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

function changeDateItem() {
	currentDateParagraph.innerHTML = mainDate;
	rubberBodyElement.style.display = 'flex';
	dateTable.style.display = 'none';
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
	if (isDateTable) {
		if (singleMenu) {
			closeSingleMenu(mainDateLog);
		} else {
			isDateTable = false;
			rubberBodyElement.style.display = 'flex';
			dateTable.style.display = 'none';
		}
	} else {
		isThemeTable = false;
		isDateTable = true;
		rubberBodyElement.style.display = 'none';
		dateTable.style.display = 'block';
		themeTable.style.display = 'none';
		if (mobileVersion) {
			singleLineMenu(mainDateLog);
		}
		if (longMenu) {
			mobileMenu(mainDateLog);
		}
	}
}