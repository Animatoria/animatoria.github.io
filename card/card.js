var flipperColumnWidth = 30;
var textareaEditableRows = 3;
var zIndexCounter = 1;

var textAreaHeigth = document.querySelector('.textAreaHeight');
textAreaHeigth.style.width = flipperColumnWidth * 18.2 + 'px';

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
		this.div.className = 'card';
		this.zoomer.className = 'zoomer'
		this.flipper.className = 'flipper';
		this.faceArea.className = 'faceArea';
		this.backArea.className = 'backArea';
		this.div.appendChild(this.zoomer);
		this.zoomer.appendChild(this.flipper);
		this.flipper.appendChild(this.faceArea);
		this.flipper.appendChild(this.backArea);
		this.faceArea.cols = flipperColumnWidth;
		this.backArea.cols = flipperColumnWidth;
		this.faceArea.rows = this.faceAreaHeight > this.backAreaHeight ? this.faceAreaHeight : this.backAreaHeight;
		this.backArea.rows = this.faceArea.rows;
		this.faceArea.value = this.faceAreaText;
		this.backArea.value = this.backAreaText;
	},

	adjustMenuElements : function() {
		this.divCardMenu.className = 'cardMenu';
		this.input.className = 'completed';
		this.input.type = 'checkbox';
		this.button.className = 'deleteButton';
		this.button.type = 'button';
		this.button.value = 'X';
		this.divCardMenu.appendChild(this.label);
		this.divCardMenu.appendChild(this.button);
		this.label.appendChild(this.input);
		this.label.appendChild(this.node);
		this.div.style.backgroundColor = '#ddf';
		this.input.onchange = () => {this.modeSwitch()};
		this.button.onclick = () => {this.delete()};
	},

	addCard : function() {
		this.div = document.createElement('div');
		this.div.style.backgroundColor = '#dfd';
		if (this.isEditable || this.isNewCard) {
			this.createMenuElements();
			this.adjustMenuElements();
			this.div.appendChild(this.divCardMenu);
			this.wasCardMenu = true;
		}
		if (this.isEditable && !this.isNewCard) this.input.checked = true;
		this.createFlipperElements();
		this.adjustFlipperElements();
		if (!this.isNewCard) {
			this.findCardHeight();
			this.faceArea.onclick = () => {this.rotate()};
			this.backArea.onclick = () => {this.rotate()};
			this.faceArea.readOnly = true;
			this.backArea.readOnly = true;
		}
	},

	findCardHeight : function() {
		this.faceArea.value = this.faceAreaText;
		this.backArea.value = this.backAreaText;
		this.faceAreaHeight = this.rowCount(this.faceAreaText);
		this.backAreaHeight = this.rowCount(this.backAreaText);
		this.addEmptyLine();
		this.faceArea.rows = this.faceAreaHeight > this.backAreaHeight ? this.faceAreaHeight : this.backAreaHeight;
		this.backArea.rows = this.faceArea.rows;
	},

	addEmptyLine : function() {
		if (this.faceAreaHeight > this.backAreaHeight) {
			for (var i = 0; i < ((this.faceAreaHeight - this.backAreaHeight) / 2) - ((this.faceAreaHeight - this.backAreaHeight) % 2); i++) {
				this.backArea.value = '\n' + this.backArea.value;
			}
		} else {
			for (var i = 0; i < ((this.backAreaHeight - this.faceAreaHeight) / 2) - ((this.backAreaHeight - this.faceAreaHeight) % 2); i++) {
				this.faceArea.value = '\n' + this.faceArea.value;
			}
		}
	},

	newCardFirstStep : function() {
		Object.getPrototypeOf(this).faceAreaText = this.faceArea.value;
		this.faceAreaHeight = this.rowCount(this.faceArea.value);
		this.faceAreaHeight > this.backAreaHeight ? this.faceArea.rows = this.faceAreaHeight : this.faceArea.rows = this.backAreaHeight;
		this.addEmptyLine();
		this.input.checked = false;
		this.rotate();
		this.isNewCard = false;
		Object.getPrototypeOf(this).deleted = false;
		localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + this.cardNum], JSON.stringify(storedCard[this.cardNum]));
		this.faceArea.onclick = () => {this.rotate()};
		this.faceArea.readOnly = true;
	},

	removeMenu : function() {
		if (!this.isNewCard) {
			this.divCardMenu.style.display = 'none';
			this.div.style.backgroundColor = '#dfd';
		}
	},

	addMenu : function() {
		if (!this.isNewCard) {
			if (this.wasCardMenu) {
				this.divCardMenu.style.display = 'block';
				this.div.style.backgroundColor = '#ddf';
			} else {
				this.createMenuElements();
				this.adjustMenuElements();
				this.div.insertBefore(this.divCardMenu, this.zoomer);
				this.input.checked = true;
				this.wasCardMenu = true;
			}
		}
	},

	sideIsDone : function() {
		if (this.cardSide) {
			Object.getPrototypeOf(this).faceAreaText = this.faceArea.value;
			this.findCardHeight();
			localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + this.cardNum], JSON.stringify(storedCard[this.cardNum]));
			this.faceArea.onclick = () => {this.rotate()};
			this.faceArea.readOnly = true;
		} else {
			Object.getPrototypeOf(this).backAreaText = this.backArea.value;
			this.findCardHeight();
			localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + this.cardNum], JSON.stringify(storedCard[this.cardNum]));
			this.backArea.onclick = () => {this.rotate()};
			this.backArea.readOnly = true;
			if (readOnlyMode) {
				this.removeMenu();
			}
		}
	},

	sideIsEdit : function() {
		if (this.cardSide) {
			this.faceArea.value = this.faceAreaText;
			this.faceArea.onclick = function(){}
			this.faceArea.readOnly = false;
			this.faceArea.rows = textareaEditableRows;
			this.faceArea.select();
		} else {
			this.backArea.value = this.backAreaText;
			this.backArea.onclick = function(){}
			this.backArea.readOnly = false;
			this.faceArea.rows = textareaEditableRows;
			this.backArea.rows = textareaEditableRows;
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
			this.div.parentElement.removeChild(this.div);
		}
	},

	rowCount : function(value) {
		textAreaHeigth.innerHTML = value;
		return textAreaHeigth.clientHeight / 38;
	},

	resizeTextarea : function() {
		this.faceArea.cols = flipperColumnWidth;
		this.backArea.cols = flipperColumnWidth;
		textAreaHeigth.style.width = flipperColumnWidth * 18.2 + 'px';
		this.findCardHeight();
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
		//setTimeout(() => {this.zoomer.style.animation = ''; console.log('timeOut')}, 2000);
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

StoredCardProperties.prototype = allCardsProperties;

function StoredCardProperties() {
	this.deleted = true;
	this.faceAreaText = 'Input your face card text';
	this.backAreaText = 'Input your bottom card text';
}

function CardProperties(k, isNewCard) {
	this.cardNum = k;
	this.cardSide = 1;
	this.isNewCard = isNewCard;
	this.isEditable = !readOnlyMode;
	this.wasCardMenu = false;
	this.backAreaHeight = textareaEditableRows;
	this.faceAreaHeight = textareaEditableRows;
}