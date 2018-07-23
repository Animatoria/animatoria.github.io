var storedMainDate = [];
var dateList = [];

var actualDate;
var smallExtender;
var bigExtender;
var firstDay;
var thisDate;

var monthString = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

var fiveWeekNodes = monthList.querySelectorAll('.day');

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
		case 0 : firstWeek.hidden = false; smallExtender = 0; break;
		default : firstWeek.hidden = true;
		case 6 : bigExtender = 7;
	}
	lastWeek.hidden = true;
	findStoredYearAndMonth();
	colorizeDates();
	if (bigExtender == 7 && thisDate.getDate() == 6) lastWeek.hidden = false;
}

function colorizeDates() {
	for (var i = 7 + smallExtender; i < 49 + bigExtender; i++) {
		fiveWeekNodes[i].className = 'day';
		thisDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), i - 12 - firstDay);
		fiveWeekNodes[i].innerHTML = thisDate.getDate();
		if (thisDate.getMonth() == actualDate.getMonth()) {
			dayN(i).become('greenDay');
			selectCalendarDate(i, thisDate);
		} else {
			dayN(i).becomePassive;
		}
		if (thisDate.getFullYear() == currentDate.getFullYear() &&
			thisDate.getMonth() == currentDate.getMonth() &&
			thisDate.getDate() == currentDate.getDate())
			dayN(i).become('yellowDay');
	}
	for (var i in dateList) {
		dayN(dateList[i].date + 12 + firstDay).become('redDay');
	}
}

function selectCalendarDate(i, thisDate) {
	fiveWeekNodes[i].onclick = function() {
		closeSingleMenu();
		mainDate = thisDate.toLocaleDateString();
		currentDateParagraph.innerHTML = mainDate;
		actualDate = thisDate;
		newDateFlag = fiveWeekNodes[i].classList.contains('redDay') ? false : true;
		cardsTable.checked = true;
		getStoredCards();
	}
}

function dayN(num) {
	return {
		become : function(color) {
			fiveWeekNodes[num].classList.add(color);
		},
		get becomePassive() {
			fiveWeekNodes[num].onclick = null;
		}
	}
}

function findStoredYearAndMonth() {
	dateList = [];
	storedMainDate.forEach(findActualMonth);
}

function DateUnit(date, index) {
	this.date = date,
	this.index = index
}

function findActualMonth(storedUnit, storedIndex) {
	if ((storedUnit.getFullYear() == actualDate.getFullYear())
		&& (storedUnit.getMonth() == actualDate.getMonth()))
		dateList.push(new DateUnit(storedUnit.getDate(), storedIndex))
}

function clearDate() {
	for (var i in dateList) {
		if (dateList[i].date == actualDate.getDate()) {
			storedMainDate.splice(dateList[i].index, 1);
			dateList.splice(i, 1);
			break;
		}
	}
	localStorage.setItem('storedMainDate_' + mainTheme.value, JSON.stringify(storedMainDate));
	colorizeDates();
}

function changeMainDate(mobileVersion) {
	if (dateTable.checked) {
		closeSingleMenu();
		card.forEach(refreshCardsAnimation);
		cardsTable.checked = true;
	} else {
		dateTable.checked = true;
		mobileVersion ? singleLineMenu() : mobileMenu(1);
	}
}