var k = 0;
var card = [];
var storedCard = [];

var isAnyCardShowed;

var cardsColumn = cardsTableDeck.querySelectorAll('.cardsColumn');
var cardBlank = cardsTableDeck.querySelectorAll('.cardBlankRB');

var columnExpression = [
	function(card) {cardsColumn[0].appendChild(card.wrapper)},
	function(card) {cardsColumn[cardsColumn[0].clientHeight <= cardsColumn[1].clientHeight ? 0 : 1].appendChild(card.wrapper)},
	function(card) {cardsColumn[(Math.min(cardsColumn[0].clientHeight << 2, (cardsColumn[1].clientHeight << 2) + 1 , (cardsColumn[2].clientHeight << 2) + 2)) & 3].appendChild(card.wrapper)}
];

var columnBlankExp = [
	function() {},
	function() {(cardBlank[cardsColumn[0].clientHeight <= cardsColumn[1].clientHeight ? 0 : 1]).checked = true},
	function() {(cardBlank[(Math.min(cardsColumn[0].clientHeight << 2, (cardsColumn[1].clientHeight << 2) + 1 , (cardsColumn[2].clientHeight << 2) + 2)) & 3]).checked = true}
];

function columnFuncSelector(variant) {
	cardBlank[0].checked = true;
	chooseCardsColumn = columnExpression[variant];
	chooseBlankColumn = columnBlankExp[variant];
}

function sessionIssue() {
	alert('Sorry, another "Rotation cards" application open. This application should be reload.');
	location.reload(true);
}

function addNewCard() {
	if (longMenu) mobileMenu(0);
	if (!themeTable.checked && !dateTable.checked) {
		storedCard.push(new StoredCard());
		localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + k], JSON.stringify(storedCard[k]));
		card.push(new Card(k, true));
		Object.setPrototypeOf(card[k], storedCard[k]);
		chooseCardsColumn(card[k]);
		card[k].addCard();
		chooseBlankColumn();
		card[k].faceArea.focus();
		k++;
	}
}

function getStoredCard() {
	storedCard.push(JSON.parse(localStorage.getItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + k])));
	card.push(new Card(k, false));
	Object.setPrototypeOf(storedCard[k], allCardsProperties);
	Object.setPrototypeOf(card[k], storedCard[k]);
	chooseCardsColumn(card[k]);
	card[k].addCard();
}

function getStoredCards() {
	k = 0;
	storedCard = [];
	card = [];
	fullClear(cardsColumn[0])(cardsColumn[1])(cardsColumn[2]);
	isAnyCardShowed = false;
	var localStorageItem = localStorage.getItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + k]);
	while (localStorageItem) {
		if (!(JSON.parse(localStorageItem).deleted)) {
			isAnyCardShowed = true;
			getStoredCard();
			k++;
		} else {
			var s = k;
			var renameLocalStorageItem = localStorage.getItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + (s + 1)]);
			localStorage.removeItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + s]);
			while (renameLocalStorageItem) {
				localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + s], renameLocalStorageItem);
				s++;
				renameLocalStorageItem = localStorage.getItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + (s + 1)]);
			}
			localStorage.removeItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + s]);
		}
		localStorageItem = localStorage.getItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + k]);
	}
	chooseBlankColumn();
	if (!isAnyCardShowed && !newDateFlag && !newThemeFlag) {
		clearDate();
		if (storedMainDate.length == 0) {
			clearTheme();
		}
	}
}

function refreshCards(card) {
	cardsTableDeck.style.display = 'flex';
	chooseCardsColumn(card);
	cardsTableDeck.style.display = '';
	card.findCardHeight();
	card.zoomer.style.animation = '';
	card.cardMenu.style.animation = '';
}

function refreshCardsAnimation(card) {
	card.zoomer.style.animation = '';
	card.cardMenu.style.animation = '';
}

const textareaEditableRows = 1;
var zIndexCounter = 1;

var isFaceSide = true;

var allCardsProperties = {

	createElements : function() {
		this.input = this.wrapper.children[0];
		this.deleteChb = this.wrapper.children[1];
		this.card = this.wrapper.children[2];
			this.zoomer = this.card.children[0];
				this.cardSide = this.zoomer.children[0];
				this.flipper = this.zoomer.children[1];
					this.faceArea = this.flipper.children[0];
					this.backArea = this.flipper.children[1];
				this.areaGlass = this.zoomer.children[2]; 
			this.cardMenu = this.card.children[1];
				this.label = this.cardMenu.children[0];
				this.button = this.cardMenu.children[1];
	},

	adjustElements : function() {
		this.input.id = 'comletedChB' + this.cardNum;
		this.deleteChb.id = 'deleteChB' + this.cardNum;
		this.cardSide.id = 'sideChB' + this.cardNum;
		this.label.htmlFor = 'comletedChB' + this.cardNum;
		this.button.htmlFor = 'deleteChB' + this.cardNum;
		this.areaGlass.htmlFor = 'sideChB' + this.cardNum;
		this.faceArea.rows = this.faceAreaHeight;
		this.backArea.rows = this.backAreaHeight;
		this.faceArea.value = this.faceAreaText;
		this.backArea.value = this.backAreaText;
		this.faceArea.oninput = this.autoGrow;
		this.backArea.oninput = this.autoGrow;
		this.backArea.o = this;
		this.input.o = this;
		this.deleteChb.o = this;
		this.cardSide.o = this;
		this.card.o = this;
		this.input.onchange = function() {this.o.modeSwitch()};
		this.deleteChb.onchange = function() {this.o.delete()};
		this.cardSide.onchange = function() {this.o.rotate()};
		this.card.onmousedown = function() {this.o.mouseMove()};
		this.card.onmouseout = this.card.onmouseup = this.mouseFree;
	},

	mouseMove : function() {
		if (!this.input.checked && !editMode.checked) {
			this.yPos = event.y;
			this.card.onmousemove = function() {this.o.paddingTop()};
		}
	},

	paddingTop : function() {
		if (event.y - this.yPos >= 7) {
			this.input.checked = true;
			this.modeSwitch();
		}
	},

	mouseFree : function() {
		this.onmousemove = null;
	},

	addCard : function() {
		this.createElements();
		this.adjustElements();
		if (!this.isNewCard) {
			this.reverse();
			this.input.checked = false;
			this.findCardHeight();
		}
	},

	findCardHeight : function() {
		this.faceArea.rows = this.backArea.rows = 1;
		this.faceArea.value = this.faceAreaText;
		this.backArea.value = this.backAreaText;
		this.faceAreaHeight = this.rowCount(this.faceArea);
		this.backAreaHeight = this.rowCount(this.backArea);
		this.addEmptyLine(this.faceAreaHeight - this.backAreaHeight);
		this.faceArea.rows = this.backArea.rows = this.faceAreaHeight > this.backAreaHeight ? this.faceAreaHeight : this.backAreaHeight;
	},

	addEmptyLine : function(iterator) {
		if (this.faceArea.value && this.backArea.value) {
			for (var i = 1; i < iterator; i += 2) {
				this.backArea.value = '\n' + this.backArea.value;
			}
			for (var i = iterator; i < -1; i += 2) {
				this.faceArea.value = '\n' + this.faceArea.value;
			}
		}
	},

	newCardFirstStep : function(proto) {
		proto.faceAreaText = this.faceArea.value;
		this.faceAreaHeight = this.rowCount(this.faceArea);
		this.faceArea.rows = this.backArea.rows = this.faceAreaHeight > this.backAreaHeight ? this.faceAreaHeight : this.backAreaHeight;
		this.addEmptyLine(this.faceAreaHeight - this.backAreaHeight);
		this.input.checked = true;
		this.faceArea.readOnly = true;
		this.cardSide.checked = false;
		this.rotate();
		this.isNewCard = false;
		proto.deleted = false;
		this.saveCard();
	},

	saveCard : function() {
		localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + this.cardNum], JSON.stringify(storedCard[this.cardNum]));
	},

	sideIsDone : function(area) {
		Object.getPrototypeOf(this)[area + 'Text'] = this[area].value;//this.faceAreaText this.backAreaText this.faceArea this.backArea
		this[area].readOnly = true;//this.faceArea this.backArea
		this.findCardHeight();
		this.saveCard();
	},

	sideIsEdit : function(area) {
		this[area].value = this[area + 'Text'];//this.faceAreaText this.backAreaText this.faceArea this.backArea
		this[area].readOnly = false;//this.faceArea this.backArea
		this[area].focus();//this.faceArea this.backArea
	},

	modeSwitch : function() {
		if (localStorage.getItem('') == thisSessionID) {
			if (this.isNewCard) {
				isNewDateOrTheme();
				this.newCardFirstStep(Object.getPrototypeOf(this));
			}
			this.input.checked ?
			this.sideIsEdit(this.cardSide.checked ? 'faceArea' : 'backArea') :
			this.sideIsDone(this.cardSide.checked ? 'faceArea' : 'backArea');
		} else {
			sessionIssue();
		}
	},

	rowCount : function(area) {
		return Math.floor((area.scrollHeight - 60) / 38);
	},

	autoGrow : function() {
		if (this.scrollHeight > this.clientHeight) {
			this.rows++;
			if (this.o) this.o.faceArea.rows++;
		}
	},

	rotate : function() {
		this.card.style.zIndex = zIndexCounter++;
		this.zoomer.style.animation = '0.5s cardZoom' + this.cardSide.checked;
		this.cardMenu.style.animation = '0.5s cardMenuOpacity' + this.cardSide.checked;
	},

	reverse : function() {
		this.cardSide.checked = isFaceSide;
	},
	
	delete : function() {
		if (localStorage.getItem('') == thisSessionID) {
			Object.getPrototypeOf(this).deleted = true;
			this.saveCard();
			getStoredCards();
		} else {
			sessionIssue();
		}
	}
}

StoredCard.prototype = allCardsProperties;

function StoredCard() {
	this.deleted = true;
	this.faceAreaText = '';
	this.backAreaText = '';
}

function Card(k, isNewCard) {
	this.cardNum = k;
	this.isNewCard = isNewCard;
	this.backAreaHeight = textareaEditableRows;
	this.faceAreaHeight = textareaEditableRows;
	this.wrapper = cardTemplate.children[0].cloneNode(true);
}

var newThemeFlag = false;
var newDateFlag = true;
var regUser = falseж

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
		mobileVersion ? singleLineMenu() : mobileMenu(1);
		setTimeout(function() {mainTheme.focus()}, 1);
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

var singleMenu = false;
var longMenu = false;

var lastScrollTop;

function fallingMobileMenu() {
	if (!longMenu) {
		if (lastScrollTop >= document.documentElement.scrollTop) {
			header.style.top = 0;
		} else {
			header.style.top = '-45px';
		}
	}
	lastScrollTop = document.documentElement.scrollTop;
}

function singleLineMenu() {
	singleMenu = true;
	header.className = ('singleMenu');
	burgerMenu.checked = true;
}

function closeSingleMenu() {
	singleMenu = false;
	burgerMenu.checked = false;
	card.forEach(refreshCardsAnimation);
	cardsTable.checked = true;
	header.className = ('closeSingleMenu');
}

function mobileMenu(toSingleMenu) {
	if (longMenu) {
		longMenu = false;
		plexiGlass.hidden = true;
		if (toSingleMenu) {
			singleMenu = true;
			header.className = ('singleMenu longMenuTr longMenuDelay');
		} else {
			burgerMenu.checked = false;
			header.className = ('longMenuTr longMenuDelay');
		}
	} else {
		if (singleMenu) {
			closeSingleMenu();
		} else {
			header.className = ('longMenuTr longMenuPos');
			plexiGlass.hidden = false;
			burgerMenu.checked = true;
			longMenu = true;
		}
	}
}
