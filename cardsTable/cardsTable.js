var k = 0;
var card = [];
var storedCard = [];

var isAnyCardShowed;

var cardsColumnNumber;

var cardsColumn = cardsTableDeck.querySelectorAll('.cardsColumn');

var columnExpression = [
	function(e) {cardsColumn[0].appendChild(e.div)},
	function(e) {cardsColumn[(Math.min(cardsColumn[0].clientHeight << 1, (cardsColumn[1].clientHeight << 1) + 1)) & 1].appendChild(e.div)},
	function(e) {cardsColumn[(Math.min(cardsColumn[0].clientHeight << 2, (cardsColumn[1].clientHeight << 2) + 1 , (cardsColumn[2].clientHeight << 2) + 2)) & 3].appendChild(e.div)}
];

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
		card[k].faceArea.focus();
		k++;
	}
}

function getStoredCard(i) {
	storedCard.push(JSON.parse(localStorage.getItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + i])));
	card.push(new Card(i, false));
	Object.setPrototypeOf(storedCard[i], allCardsProperties);
	Object.setPrototypeOf(card[i], storedCard[i]);
	chooseCardsColumn(card[i]);
	card[i].addCard();
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

function refreshCards(card) {
	chooseCardsColumn(card);
	card.findCardHeight();
	card.zoomer.style.animation = 'none';
	card.divCardMenu.style.animation = 'none';
}

function refreshCardsAnimation(card) {
	card.zoomer.style.animation = 'none';
	card.divCardMenu.style.animation = 'none';
}