var k = 0;
var storedCard = [];
var card = [];

var readOnlyMode = true;
var isCardsTable = true;
var isAnyCardShowed;

var cardsColumnNumber;

var rubberBodyElement = document.querySelector('.rubberBody');
var cardsColumn = document.querySelectorAll('.cardsColumn');

function sessionIssue() {
	alert('Read only, because new Rotation cards application opened at the  same time.');
	sessionIssueFlag = true;
	readOnlyModeOn();
}

function chooseCardsColumn(e, resize) {
	if (resize) {
		cardsColumn[1].style.display = 'none';
		cardsColumn[2].style.display = 'none';
	}
	if (cardsColumnNumber) {
		if (resize) {
			cardsColumn[cardsColumnNumber - 1].style.display = 'block';
			cardsColumn[cardsColumnNumber].style.display = 'block';
		}
		cardsColumn[(Math.min(cardsColumn[0].clientHeight << 2, (cardsColumn[1].clientHeight << 2) + 1 , (cardsColumn[2].clientHeight << 2) + (2 / (cardsColumnNumber -1)))) & 3].appendChild(e.div);
	}
	else {
		cardsColumn[0].appendChild(e.div);
	}
}

function addNewCard() {
	if (longMenu) mobileMenu(0);
	if (!isThemeTable && !isDateTable) {
		storedCard.push(new StoredCardProperties());
		localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + k], JSON.stringify(storedCard[k]));
		card.push(new CardProperties(k, true));
		Object.setPrototypeOf(card[k], storedCard[k]);
		card[k].addCard();
		chooseCardsColumn(card[k]);
		card[k].faceArea.select();
		k++;
	}
}

function getStoredCard(i) {
	storedCard.push(JSON.parse(localStorage.getItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + i])));
	card.push(new CardProperties(i, false));
	Object.setPrototypeOf(storedCard[i], allCardsProperties);
	Object.setPrototypeOf(card[i], storedCard[i]);
	card[i].addCard();
	chooseCardsColumn(card[i]);
}

function deleteAllCards() {
	for (var i = 0; i < 3; i++) {
		while (cardsColumn[i].firstChild) {
			cardsColumn[i].removeChild(cardsColumn[i].firstChild);
		}
	}
}

function getStoredCards() {
	k = 0;
	storedCard = [];
	card = [];
	deleteAllCards();
	isAnyCardShowed = false;
	var localStorageItem = localStorage.getItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + k]);
	while (localStorageItem) {
		if (!(JSON.parse(localStorageItem).deleted)) {
			isAnyCardShowed = true;
			getStoredCard(k);
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
	if (!isAnyCardShowed && !newDateFlag && !newThemeFlag) {
		clearDate();
		if (storedMainDate.length == 0) {
			clearTheme();
		}
	}
}

function readOnlyModeSwitch() {
	if (readOnlyMode) {
		readOnlyModeOff();
	} else {
		readOnlyModeOn();
	}
}

function readOnlyModeOn() {
	readOnlyModeMobile.src = 'icons/readonlymode.svg';
	var childNodes = readOnlyModeButton.childNodes;
	childNodes[1].innerHTML = 'Read only mode';
	childNodes[0].src = 'icons/readonlymode.svg';
	readOnlyMode = true;
	for (var i in card) {
		card[i].removeMenu();
	}
}

function readOnlyModeOff() {
	if (localStorage.getItem('') == thisSessionID) {
		readOnlyModeMobile.src = 'icons/pencil.svg';
		var childNodes = readOnlyModeButton.childNodes;
		childNodes[1].innerHTML = 'Card edit mode';
		childNodes[0].src = 'icons/pencil.svg';
		readOnlyMode = false;
		for (var i in card) {
			card[i].addMenu();
		}
	} else {
		location.reload(true);
	}
}

function refreshCardsOnTable() {
	deleteAllCards();
	for (var i in card) {
		card[i].resizeTextarea();
		chooseCardsColumn(card[i], true);
		card[i].zoomer.style.animation = '';
	}
}

function refreshCardsAnimation() {
	for (var i in card) {
		card[i].zoomer.style.animation = '';
	}
}