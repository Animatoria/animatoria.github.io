function StoredCardProperties() {
  this.deleted = true;
  this.faceAreaText = 'Input your face card text';
  this.backAreaText = 'Input your bottom card text';
}

function CardProperties(k, freshCardSwitch) {
  this.cardNum = k;
  this.cardSide = 1;
  this.freshCardSwitch = freshCardSwitch;
  this.div = document.createElement('div');
  this.divCardMenu = document.createElement('div');
  this.label = document.createElement('label');
  this.input = document.createElement('input');
  this.node = document.createTextNode('Completed')
  this.button = document.createElement('input');
  this.zoomer = document.createElement('div');
  this.flipper = document.createElement('div');
  this.faceArea = document.createElement('textarea');
  this.backArea = document.createElement('textarea');
  this.backAreaHeight = 1;
  this.faceAreaHeight = AllCardsProperties.editableRows;
}

function addHTMLElements(e) {
  e.div.className = 'card';
  e.divCardMenu.className = 'cardMenu';
  e.zoomer.className = 'zoomer'
  e.flipper.className = 'flipper';
  e.backArea.className = 'backArea';
  e.input.className = 'completed';
  e.input.type = 'checkbox';
  e.button.className = 'deleteButton';
  e.button.type = 'button';
  e.button.value = 'X';
  rubberBodyElement.appendChild(e.div);
  if (!readOnlyMode) {
    e.div.appendChild(e.divCardMenu);
    e.divCardMenu.appendChild(e.label);
    e.divCardMenu.appendChild(e.button);
    e.label.appendChild(e.input);
    e.label.appendChild(e.node);
    e.div.style.backgroundColor = '#ddf';
  }
  e.div.appendChild(e.zoomer);
  e.zoomer.appendChild(e.flipper);
  e.flipper.appendChild(e.faceArea);
  e.flipper.appendChild(e.backArea);
  if (!e.cardSide) e.flipper.style.transform = 'rotateY(180deg)';
  e.faceArea.cols = e.colWidth;
  e.backArea.cols = e.colWidth;
  e.faceArea.rows = e.faceAreaHeight > e.backAreaHeight ? e.faceAreaHeight : e.backAreaHeight;
  e.backArea.rows = e.faceArea.rows;
  e.faceArea.value = e.faceAreaText;
  e.backArea.value = e.backAreaText;
  e.input.onchange = function() {textAreaSwitch(e)};
  e.button.onclick = function() {deleteCard(e)};
}

function textAreaSwitch(e) {
  if (localStorage.getItem('') == thisSessionID) {
    if (e.freshCardSwitch) {
      if (newThemeSwitch) {
        storedMainTheme.push(mainTheme.value);
        localStorage.setItem('storedMainTheme', JSON.stringify(storedMainTheme));
        newThemeSwitch = false;
      }
      if (newDateSwitch && mainDate == currentDateToLocaleDateString) {
        storedMainDate.push(currentDate);
        localStorage.setItem('storedMainDate_' + mainTheme.value, JSON.stringify(storedMainDate));
        newDateSwitch = false;
      }
      e.faceAreaHeight = rowCount(e.faceArea.value);
      e.faceAreaHeight > e.backAreaHeight ? e.faceArea.rows = e.faceAreaHeight : e.faceArea.rows = e.backAreaHeight
      e.input.checked = false;
      Object.getPrototypeOf(e).faceAreaText = e.faceArea.value;
      rotateCardClick(e);
      e.freshCardSwitch = false;
      Object.getPrototypeOf(e).deleted = false;
      localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + e.cardNum], JSON.stringify(storedCard[e.cardNum]));
      e.faceArea.onclick = function() {rotateCardClick(e)};
      e.faceArea.readOnly = true;
    }
    if (e.input.checked) {
      if (e.cardSide) {
        e.faceAreaHeight = rowCount(e.faceArea.value);
        Object.getPrototypeOf(e).faceAreaText = e.faceArea.value;
        localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + e.cardNum], JSON.stringify(storedCard[e.cardNum]));
        e.faceArea.onclick = function() {rotateCardClick(e)};
        e.faceArea.readOnly = true;
      } else {
        e.backAreaHeight = rowCount(e.backArea.value);
        Object.getPrototypeOf(e).backAreaText = e.backArea.value;
        localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + e.cardNum], JSON.stringify(storedCard[e.cardNum]));
        e.backArea.onclick = function() {rotateCardClick(e)};
        e.backArea.readOnly = true;
      }
      e.faceAreaHeight > e.backAreaHeight ? e.faceArea.rows = e.faceAreaHeight : e.faceArea.rows = e.backAreaHeight
      e.backArea.rows = e.faceArea.rows;
    } else {
      if (e.cardSide) {
        e.faceArea.onclick = function(){}
        e.faceArea.readOnly = false;
        e.faceArea.rows = e.editableRows;
        e.faceArea.select();
      } else {
        e.backArea.onclick = function(){}
        e.backArea.readOnly = false;
        e.faceArea.rows = e.editableRows;
        e.backArea.rows = e.editableRows;
        e.backArea.select();
      }
    }
  } else {
    alert('Read only, because new Rotation cards application opened at the  same time.');
    readOnlyModeOn();
  }
}

function rotateCardClick(e) {
  e.zoomer.style.animation = '';
  e.div.style.zIndex = zIndexCounter;
  zIndexCounter += 1;
  e.zoomer.style.animation = '2s zoomer';
  if (e.cardSide) {
    e.flipper.style.transform = 'rotateY(180deg)';
  } else {
    e.flipper.style.transform = 'rotateY(0deg)';
  }
  e.cardSide = e.cardSide ^ 1;
}

function addNewCard() {
  storedCard.push(new StoredCardProperties());
  localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + k], JSON.stringify(storedCard[k]));
  card.push(new CardProperties(k, true));
  Object.setPrototypeOf(card[k], storedCard[k]);
  addHTMLElements(card[k]);
  card[k].faceArea.select();
  k++;
}

function getStoredCard(i) {
  storedCard.push(JSON.parse(localStorage.getItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + i])));
  card.push(new CardProperties(i, false));
  Object.setPrototypeOf(storedCard[i], AllCardsProperties);
  Object.setPrototypeOf(card[i], storedCard[i]);
  card[i].faceAreaHeight = rowCount(card[i].faceAreaText);
  card[i].backAreaHeight = rowCount(card[i].backAreaText);
  addHTMLElements(card[i]);
  card[i].input.checked = true;
  card[i].faceArea.onclick = function() {rotateCardClick(card[i])};
  card[i].backArea.onclick = function() {rotateCardClick(card[i])};
  card[i].faceArea.readOnly = true;
  card[i].backArea.readOnly = true;
}

function setStoredMainDate() {
  if (localStorage.getItem('storedMainDate_' + mainTheme.value)) {
    storedMainDate = JSON.parse(localStorage.getItem('storedMainDate_' + mainTheme.value), function(key, value) {if (key == '') {return value} else {return new Date(value)}});
    newDateSwitch = false;
    if (storedMainDate[storedMainDate.length -1].toLocaleDateString() != mainDate) {
      newDateSwitch = true;
    }
  } else {
    newDateSwitch = true;
  }
}

function changeMainDate() {
  if (localStorage.getItem('storedMainDate_' + mainTheme.value)) {
    k = 0;
    storedCard = [];
    card = [];
    deleteAllCards();
    newCardButton.style.visibility = 'hidden';
    for (var i in storedMainDate) {
      getChoosableDate(i);
    }
    if (storedMainDate[storedMainDate.length -1].toLocaleDateString() != currentDateToLocaleDateString) {
      var div = document.createElement('div');
      var thisItemDate = currentDateToLocaleDateString;
      div.innerHTML = thisItemDate;
      div.className = 'storedDate';
      rubberBodyElement.appendChild(div);
      div.onclick = function() {
        mainDate = thisItemDate;
        currentDateParagraph.innerHTML = mainDate;
        deleteAllCards();
        newCardButton.style.visibility = 'visible';
      }
    }
  } else {
    alert('Nothing to choose');
  }
}

function getChoosableDate(i) {
  var div = document.createElement('div');
  var thisItemDate = storedMainDate[i].toLocaleDateString()
  div.innerHTML = thisItemDate;
  div.className = 'storedDate';
  rubberBodyElement.appendChild(div);
  div.onclick = function() {
    mainDateIndex = i;
    mainDate = thisItemDate;
    currentDateParagraph.innerHTML = mainDate;
    deleteAllCards();
    getStoredCards();
    newCardButton.style.visibility = 'visible';
  }
}

function deleteAllCards() {
  while (rubberBodyElement.firstChild) {
    rubberBodyElement.removeChild(rubberBodyElement.firstChild);
  }
}

function deleteCard(e) {
  if (localStorage.getItem('') == thisSessionID) {
    rubberBodyElement.removeChild(e.div);
    Object.getPrototypeOf(e).deleted = true;
    localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + e.cardNum], JSON.stringify(storedCard[e.cardNum]));
  } else {
    alert('Read only, because new Rotation cards application opened at the  same time.');
    readOnlyModeOn();
  }
}

function getStoredCards() {
  var isAnyCardShowed = false;
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
  if (!isAnyCardShowed && currentDateToLocaleDateString != mainDate && !readOnlyMode && confirm('This ' + mainDate + ' card list empty. Delete?')) {
    if (storedMainDate.length == 1) {
      localStorage.removeItem('storedMainDate_' + mainTheme.value);
      mainDate = currentDateToLocaleDateString;
      currentDateParagraph.innerHTML = mainDate;
      console.log(storedMainTheme.indexOf(mainTheme.value))
      storedMainTheme.splice(storedMainTheme.indexOf(mainTheme.value), 1);
      localStorage.setItem('storedMainTheme', JSON.stringify(storedMainTheme));
      newThemeSwitch = true;
      storedMainDate = [];
    } else {
      storedMainDate.splice(mainDateIndex, 1);
      localStorage.setItem('storedMainDate_' + mainTheme.value, JSON.stringify(storedMainDate));
      changeMainDate();
    }
  }
}

function setMainTheme() {
  if (localStorage.getItem('storedMainTheme')) {
    storedMainTheme = JSON.parse(localStorage.getItem('storedMainTheme'));
    if (storedMainTheme.length) {
      mainTheme.value = storedMainTheme[storedMainTheme.length - 1];
    } else {
      mainThemeNotAvailable();
    }
  } else {
    mainThemeNotAvailable();
  }
}

function mainThemeNotAvailable() {
  mainTheme.value = 'Input main theme';
  mainTheme.onblur = function() {newCardButton.style.visibility = 'visible'; mainDateButton.style.visibility = 'visible'};
  newThemeSwitch = true;
}

function mainThemeChange() {
  k = 0;
  storedCard = [];
  card = [];
  storedMainDate = [];
  mainDate = currentDateToLocaleDateString;
  currentDateParagraph.innerHTML = mainDate;
  deleteAllCards();
  getStoredCards();
  setStoredMainDate();
  newCardButton.style.visibility = 'visible';
  mainDateButton.style.visibility = 'visible';
  newThemeSwitch = localStorage.getItem('storedMainDate_' + mainTheme.value) ? false : true
}

function mainThemeMenu() {
  mainDateButton.style.visibility = 'hidden';
  newCardButton.style.visibility = 'hidden';
  mainTheme.select();
  deleteAllCards();
  for (var i in storedMainTheme) {
    getChoosableTheme(i);
  }
}

function getChoosableTheme(i) {
  var div = document.createElement('div');
  var thisItemTheme = storedMainTheme[i];
  div.innerHTML = thisItemTheme;
  div.className = 'storedTheme';
  rubberBodyElement.appendChild(div);
  div.onclick = function() {
    mainTheme.value = thisItemTheme;
    mainThemeChange();
  }
}

function setCardProperties() {
  var rubberBodyWidthMeasure = document.querySelector('.empty').clientWidth;
  var extender = 0;
  var headTag = document.querySelector('head');
  var styleLink = document.createElement('link');
  styleLink.type = 'text/css';
  styleLink.rel = 'stylesheet';
  if (deviceBrowserType.device.type == 'Desktop') {
    onresize = setCardProperties;
    styleLink.href = 'styleDesktop.css';
    var letterWidth = 18;
    if (deviceBrowserType.browser.family == 'Edge') {
      extender = 10;
    }
    if (deviceBrowserType.browser.family == 'IE') {
      extender = 5;
    }
    if (deviceBrowserType.os.family == 'Android') {
      onresize = function() {};
      extender = 20;
    }
    if (rubberBodyWidthMeasure < 830) {
      AllCardsProperties.colWidth = Math.floor((rubberBodyWidthMeasure - 26) / letterWidth);
      rubberBodyWidthMeasure = AllCardsProperties.colWidth * letterWidth + 26;
    } else if (rubberBodyWidthMeasure < 1230) {
      AllCardsProperties.colWidth = Math.floor((rubberBodyWidthMeasure - 2 - (2 * 26)) / (2 * letterWidth));
      rubberBodyWidthMeasure = AllCardsProperties.colWidth * letterWidth * 2 + 2 * 26 + 2;
    } else {
      AllCardsProperties.colWidth = Math.floor((rubberBodyWidthMeasure - (2 * 2) - (3 * 26)) / (3 * letterWidth));
      rubberBodyWidthMeasure = AllCardsProperties.colWidth * letterWidth * 3 + 3 * 26 + 2 * 2;
    }
  } else {
    styleLink.href = 'styleMobile.css';
    AllCardsProperties.colWidth = Math.floor((rubberBodyWidthMeasure - 36) / 31);
    rubberBodyWidthMeasure = AllCardsProperties.colWidth * 31 + 36;
    extender = 5;
  }
  document.querySelector('.body').style.width = extender + rubberBodyWidthMeasure + 'px';
  document.querySelector('header').style.width = extender + rubberBodyWidthMeasure + 'px';
  headTag.appendChild(styleLink);
  rubberBodyElement.style.minHeight = (window.innerHeight - 40) + 'px';
  refreshCardsOnTable();
}

function setSessionID() {
  var sessionID = +localStorage.getItem('');
  if (sessionID) {
    if (sessionID == 255) {
      thisSessionID = 1;
      localStorage.setItem('', 1);
    } else {
      thisSessionID = sessionID + 1;
      localStorage.setItem('', thisSessionID);
    }
  } else {
    thisSessionID = 1;
    localStorage.setItem('', 1);
  }
}

function readOnlyModeOn() {
  k = 0;
  storedCard = [];
  card = [];
  newCardButton.onclick = function() {alert('In case if you opened Rotation Cards application in more then one window\
 at the same time, only last opened app can apply your changes. In another window you can read only your cards.')};
  newCardButton.value = 'Read only mode?';
  readOnlyModeButton.onclick = readOnlyModeOff;
  readOnlyModeButton.value = 'Card edit mode';
  readOnlyMode = true;
  deleteAllCards();
  getStoredCards();
}

function readOnlyModeOff() {
  if (localStorage.getItem('') == thisSessionID) {
    newCardButton.onclick = addNewCard;
    newCardButton.value = 'Add new card';
    readOnlyModeButton.onclick = readOnlyModeOn;
    readOnlyModeButton.value = 'Read only mode';
    readOnlyMode = false;
    refreshCardsOnTable();
  } else {
    location.reload(true);
  }
}

function refreshCardsOnTable() {
  deleteAllCards();
    for (var i in storedCard) {
      addHTMLElements(card[i]);
      card[i].zoomer.style.animation = '';
    }
}