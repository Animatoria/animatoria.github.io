var k = 0;
var card = [];
var storedCard = [];

var isAnyCardShowed;

var cardsColumn = cardsTableDeck.querySelectorAll('.cardsColumn');

var columnExpression = [
	function(card) {cardsColumn[0].appendChild(card.wrapper)},
	function(card) {cardsColumn[cardsColumn[0].clientHeight <= cardsColumn[1].clientHeight ? 0 : 1].appendChild(card.wrapper)},
	function(card) {cardsColumn[(Math.min(cardsColumn[0].clientHeight << 2, (cardsColumn[1].clientHeight << 2) + 1 , (cardsColumn[2].clientHeight << 2) + 2)) & 3].appendChild(card.wrapper)}
];

var columnBlankExp = [
	function() {},
	function() {eval('cardBlank' + (cardsColumn[0].clientHeight <= cardsColumn[1].clientHeight ? 0 : 1)).checked = true},
	function() {eval('cardBlank' + ((Math.min(cardsColumn[0].clientHeight << 2, (cardsColumn[1].clientHeight << 2) + 1 , (cardsColumn[2].clientHeight << 2) + 2)) & 3)).checked = true}
];

function columnFuncSelector(variant) {
	cardBlank0.checked = true;
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
	fullClear(cardsColumn[0]);
	fullClear(cardsColumn[1]);
	fullClear(cardsColumn[2]);
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