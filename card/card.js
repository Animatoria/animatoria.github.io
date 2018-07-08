var textareaEditableRows = 1;
var zIndexCounter = 1;
var card = [];

var isReverse = false;

var allCardsProperties = {

	createElements : function() {
		this.input = this.div.children[0];
		this.deleteChb = this.div.children[1];
		this.card = this.div.children[2];
			this.divCardMenu = this.card.children[0];
				this.label = this.divCardMenu.children[0];
				this.button = this.divCardMenu.children[1];
			this.zoomer = this.card.children[1];
				this.cardSide = this.zoomer.children[0];
				this.flipper = this.zoomer.children[1];
					this.faceArea = this.flipper.children[0];
					this.backArea = this.flipper.children[1];
				this.areaGlass = this.zoomer.children[2]; 
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
		this.input.aramAzrayan = this.cardNum;
		this.deleteChb.aramAzrayan = this.cardNum;
		this.cardSide.aramAzrayan = this.cardNum;
		this.input.onchange = function() {card[this.aramAzrayan].modeSwitch()};
		this.deleteChb.onchange = function() {card[this.aramAzrayan].delete()};
		this.cardSide.onchange = function() {card[this.aramAzrayan].rotate()};
	},

	addCard : function() {
		this.createElements();
		this.adjustElements();
		if (!this.isNewCard) {
			if (isReverse) this.reverse();
			this.input.checked = false;
			this.findCardHeight();
		}
	},

	findCardHeight : function() {
		this.faceArea.rows = 1;
		this.backArea.rows = 1;
		this.faceArea.value = this.faceAreaText;
		this.backArea.value = this.backAreaText;
		this.faceAreaHeight = this.rowCount(this.faceArea);
		this.backAreaHeight = this.rowCount(this.backArea);
		this.addEmptyLine();
		this.faceArea.rows = this.backArea.rows = this.faceAreaHeight > this.backAreaHeight ? this.faceAreaHeight : this.backAreaHeight;
	},

	addEmptyLine : function() {
		if (this.faceAreaHeight > this.backAreaHeight) {
			for (var i = 0; i < Math.floor((this.faceAreaHeight - this.backAreaHeight) / 2); i++) {
				this.backArea.value = '\n' + this.backArea.value;
			}
		} else {
			for (var i = 0; i < Math.floor((this.backAreaHeight - this.faceAreaHeight) / 2); i++) {
				this.faceArea.value = '\n' + this.faceArea.value;
			}
		}
	},

	newCardFirstStep : function() {
		Object.getPrototypeOf(this).faceAreaText = this.faceArea.value;
		this.faceAreaHeight = this.rowCount(this.faceArea);
		this.faceArea.rows = this.backArea.rows = this.faceAreaHeight > this.backAreaHeight ? this.faceAreaHeight : this.backAreaHeight;
		this.addEmptyLine();
		this.input.checked = true;
		this.cardSide.checked = false;
		this.isNewCard = false;
		Object.getPrototypeOf(this).deleted = false;
		this.saveCard();
	},

	saveCard : function() {
		localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + this.cardNum], JSON.stringify(storedCard[this.cardNum]));
	},

	sideIsDone : function() {
		this.cardSide.checked ? Object.getPrototypeOf(this).faceAreaText = this.faceArea.value : Object.getPrototypeOf(this).backAreaText = this.backArea.value;
		this.findCardHeight();
		this.saveCard();
	},

	sideIsEdit : function() {
		if (this.cardSide.checked) {
			this.faceArea.value = this.faceAreaText;
			this.faceArea.select();
		} else {
			this.backArea.value = this.backAreaText;
			this.backArea.select();
		}
	},

	modeSwitch : function() {
		if (localStorage.getItem('') == thisSessionID) {
			if (this.isNewCard) {
				isNewDateOrTheme();
				this.newCardFirstStep();
			}
			if (this.input.checked) {
				this.sideIsEdit();
			} else {
				this.sideIsDone();
			}
		} else {
			sessionIssue();
		}
	},

	rowCount : function(area) {
		return Math.floor((area.scrollHeight - 60) / 38);
	},

	autoGrow : function() {
		if (this.scrollHeight > this.clientHeight) this.rows++;
	},

	rotate : function() {
		this.card.style.zIndex = zIndexCounter++;
		if (this.cardSide.checked) {
			this.zoomer.style.animation = '2s backward';
		} else {
			this.zoomer.style.animation = '2s forward';
		}
	},

	reverse : function() {
		this.cardSide.checked = false;
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
	this.faceAreaText = 'Input your face card text';
	this.backAreaText = 'Input your bottom card text';
}

function Card(k, isNewCard) {
	this.cardNum = k;
	this.isNewCard = isNewCard;
	this.backAreaHeight = textareaEditableRows;
	this.faceAreaHeight = textareaEditableRows;
	this.div = cardTemplate.children[0].cloneNode(true);
}

