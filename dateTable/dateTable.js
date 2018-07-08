var storedMainDate = [];
var dateList = [];
var dateIndex = [];

var isActualMainDate = true;

var actualDate;
var smallExtender;
var bigExtender;
var firstDay;
var thisDate;

var monthString = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

var fiveWeekNodes = document.querySelectorAll('.day');

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
		case 0 : firstWeek.classList.remove('displayNone'); smallExtender = 0; break;
		default : firstWeek.classList.add('displayNone');
		case 6 : bigExtender = 7;
	}
	lastWeek.classList.add('displayNone');
	findStoredYearAndMonth();
	fillDates();
	if (bigExtender == 7 && thisDate.getDate() == 6) lastWeek.classList.remove('displayNone');
}

function fillDates() {
	for (var i = 7 + smallExtender; i < 49 + bigExtender; i++) {
		thisDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), i - 12 - firstDay);
		fiveWeekNodes[i].innerHTML = thisDate.getDate();
		if (thisDate.getMonth() == actualDate.getMonth()) {
			dayN(i).become('greenDay');
			selectCalendarDate(i, thisDate);
		} else {
			dayN(i).becomePassive;
		}
	}
	for (var i in dateList) {
		dayN(dateList[i] + 12 + firstDay).become('redDay');
	}
}

function dayN(num) {
	fiveWeekNodes[num].className = 'day';
	return {
		become : function(color) {
			fiveWeekNodes[num].classList.add(color);
		},
		get becomePassive() {
			fiveWeekNodes[num].onclick = function() {};
		}
	}
}

function selectCalendarDate(i, thisDate) {
	fiveWeekNodes[i].onclick = function() {
		if (singleMenu) {
			closeSingleMenu();
		}
		mainDate = thisDate.toLocaleDateString();
		currentDateParagraph.innerHTML = mainDate;
		actualDate = thisDate;
		if (fiveWeekNodes[i].classList.contains('greenDay')) {
			newDateFlag = true;
		} else {
			newDateFlag = false;
		}
		cardsTable.checked = true;
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
	if (dateTable.checked) {
		if (singleMenu) {
			closeSingleMenu();
		} else {
			cardsTable.checked = true;
		}
	} else {
		dateTable.checked = true;
		if (mobileVersion) {
			singleLineMenu();
		}
		if (longMenu) {
			mobileMenu(1);
		}
	}
}