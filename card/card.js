var textareaEditableRows = 1;
var zIndexCounter = 1;

var isReverse = false;

var allCardsProperties = {

	createFlipperElements : function() {
		this.zoomer = document.createElement('div');
		this.flipper = document.createElement('div');
		this.faceArea = document.createElement('textarea');
		this.backArea = document.createElement('textarea');
	},

	createMenuElements : function() {
		this.divCardMenu = document.createElement('div');
		this.label = document.createElement('label');
		this.input = document.createElement('input');
		this.node = document.createTextNode('Completed')
		this.button = document.createElement('input');
	},

	adjustFlipperElements : function() {
		this.zoomer.className = 'zoomer'
		this.flipper.className = 'flipper';
		this.faceArea.className = 'faceArea';
		this.backArea.className = 'backArea';
		this.div.appendChild(this.zoomer);
		this.zoomer.appendChild(this.flipper);
		this.flipper.appendChild(this.faceArea);
		this.flipper.appendChild(this.backArea);
		this.faceArea.rows = this.faceAreaHeight;
		this.backArea.rows = this.backAreaHeight;
		this.faceArea.value = this.faceAreaText;
		this.backArea.value = this.backAreaText;
		this.faceArea.oninput = () => {this.autoGrow(this.faceArea)};
		this.backArea.oninput = () => {this.autoGrow(this.backArea)};
	},

	adjustMenuElements : function() {
		this.divCardMenu.className = 'cardMenu';
		this.input.className = 'completed';
		this.input.type = 'checkbox';
		this.button.className = 'deleteButton';
		this.button.type = 'button';
		this.button.value = 'X';
		this.div.appendChild(this.divCardMenu);
		this.divCardMenu.appendChild(this.label);
		this.divCardMenu.appendChild(this.button);
		this.label.appendChild(this.input);
		this.label.appendChild(this.node);
		this.input.onchange = () => {this.modeSwitch()};
		this.button.onclick = () => {this.delete()};
	},

	addCard : function() {
		if (this.isNewCard) this.div.classList.add('newCard');
		this.createMenuElements();
		this.adjustMenuElements();
		this.createFlipperElements();
		this.adjustFlipperElements();
		if (!this.isNewCard) {
			if (isReverse) this.reverse();
			this.input.checked = true;
			this.findCardHeight();
			this.faceArea.onclick = () => {this.rotate()};
			this.backArea.onclick = () => {this.rotate()};
			this.faceArea.readOnly = true;
			this.backArea.readOnly = true;
			this.faceArea.style.cursor = 'pointer';
			this.backArea.style.cursor = 'pointer';
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
		this.input.checked = false;
		this.faceArea.style.overflowY = 'hidden';
		this.rotate();
		this.isNewCard = false;
		Object.getPrototypeOf(this).deleted = false;
		localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + this.cardNum], JSON.stringify(storedCard[this.cardNum]));
		this.faceArea.onclick = () => {this.rotate()};
		this.faceArea.readOnly = true;
		this.faceArea.style.cursor = 'pointer';
	},

	sideIsDone : function() {
		if (this.cardSide) {
			Object.getPrototypeOf(this).faceAreaText = this.faceArea.value;
			this.findCardHeight();
			this.faceArea.style.overflowY = 'hidden';
			localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + this.cardNum], JSON.stringify(storedCard[this.cardNum]));
			this.faceArea.onclick = () => {this.rotate()};
			this.faceArea.readOnly = true;
			this.faceArea.style.cursor = 'pointer';
		} else {
			if (this.isStillNewCard) {
				this.isStillNewCard = false;
				this.div.classList.remove('newCard');
			}
			Object.getPrototypeOf(this).backAreaText = this.backArea.value;
			this.findCardHeight();
			this.backArea.style.overflowY = 'hidden';
			localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + this.cardNum], JSON.stringify(storedCard[this.cardNum]));
			this.backArea.onclick = () => {this.rotate()};
			this.backArea.readOnly = true;
			this.backArea.style.cursor = 'pointer';
		}
	},

	sideIsEdit : function() {
		if (this.cardSide) {
			this.faceArea.value = this.faceAreaText;
			this.faceArea.onclick = function(){};
			this.faceArea.readOnly = false;
			this.faceArea.style.cursor = 'auto';
			this.faceArea.style.overflowY = 'auto';
			this.faceArea.select();
		} else {
			this.backArea.value = this.backAreaText;
			this.backArea.onclick = function(){};
			this.backArea.readOnly = false;
			this.backArea.style.cursor = 'auto';
			this.backArea.style.overflowY = 'auto';
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
				this.sideIsDone();
			} else {
				this.sideIsEdit();
			}
		} else {
			sessionIssue();
		}
	},

	rowCount : function(value) {
		return Math.floor((value.scrollHeight - 60) / 38);
	},

	autoGrow : function(area) {
		if (area.scrollHeight > area.clientHeight) area.rows++;
	},

	rotate : function() {
		this.div.style.zIndex = zIndexCounter;
		zIndexCounter += 1;
		if (this.cardSide) {
			this.zoomer.style.animation = '2s forward';
			this.flipper.style.transform = 'rotateY(180deg)';
		} else {
			this.zoomer.style.animation = '2s backward';
			this.flipper.style.transform = 'rotateY(0deg)';
		}
		this.cardSide = this.cardSide ^ 1;
	},

	reverse : function() {
		this.flipper.style.transform = 'rotateY(180deg)';
		this.cardSide = this.cardSide ^ 1;
	},
	
	delete : function() {
		if (localStorage.getItem('') == thisSessionID) {
			this.div.parentElement.removeChild(this.div);
			Object.getPrototypeOf(this).deleted = true;
			localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + this.cardNum], JSON.stringify(storedCard[this.cardNum]));
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
	this.cardSide = 1;
	this.isNewCard = isNewCard;
	this.isStillNewCard = isNewCard;
	this.backAreaHeight = textareaEditableRows;
	this.faceAreaHeight = textareaEditableRows;
	this.div = document.createElement('div');
	this.div.className = 'card';
}

