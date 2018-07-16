var textareaEditableRows = 1;
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

	newCardFirstStep : function() {
		Object.getPrototypeOf(this).faceAreaText = this.faceArea.value;
		this.faceAreaHeight = this.rowCount(this.faceArea);
		this.faceArea.rows = this.backArea.rows = this.faceAreaHeight > this.backAreaHeight ? this.faceAreaHeight : this.backAreaHeight;
		this.addEmptyLine(this.faceAreaHeight - this.backAreaHeight);
		this.input.checked = true;
		this.cardSide.checked = false;
		this.rotate();
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
			this.faceArea.focus();
		} else {
			this.backArea.value = this.backAreaText;
			this.backArea.focus();
		}
	},

	modeSwitch : function() {
		if (localStorage.getItem('') == thisSessionID) {
			if (this.isNewCard) {
				isNewDateOrTheme();
				this.newCardFirstStep();
			}
			this.input.checked ? this.sideIsEdit() : this.sideIsDone();
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
		this.zoomer.style.animation = '2s cardZoom' + this.cardSide.checked;
		this.cardMenu.style.animation = '2s cardMenuOpacity' + this.cardSide.checked;
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

