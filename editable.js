function StoredCardProperties() {
  this.notDeleted = true;
  this.faceAreaText = 'Input your face card text';
  this.bottomAreaText = 'Input your bottom card text';
}

function CardProperties(k, freshCardSwitch) {
  this.cardNum = k;
  this.cardSide = 1;
  this.freshCardSwitch = freshCardSwitch;
  this.div = document.createElement('div');
  this.button = document.createElement('input');
  this.area = document.createElement('textarea');
  this.label = document.createElement('label');
  this.input = document.createElement('input');
  this.node = document.createTextNode('Completed')
  this.bottomAreaHeight = 1;
  this.faceAreaHeight = AllCardsProperties.editableRows;
}

function addHTMLElements(e) {
  e.div.className = 'card';
  e.input.className = 'comleted';
  e.input.type = 'checkbox';
  e.button.className = 'deleteButton';
  e.button.type = 'button';
  e.button.value = 'Delete';
  rubberBodyElement.appendChild(e.div);
  e.div.appendChild(e.area);
  if (!readOnlyMode) {
    e.div.appendChild(e.label);
    e.div.appendChild(e.button);
    e.label.appendChild(e.input);
    e.label.appendChild(e.node);
  }
  e.area.cols = e.colWidth;
  e.area.rows = e.faceAreaHeight > e.bottomAreaHeight ? e.faceAreaHeight : e.bottomAreaHeight;
  e.area.value = e.faceAreaText;
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
      e.faceAreaHeight = rowCount(e.area.value);
      e.faceAreaHeight > e.bottomAreaHeight ? e.area.rows = e.faceAreaHeight : e.area.rows = e.bottomAreaHeight
      e.input.checked = false;
      Object.getPrototypeOf(e).faceAreaText = e.area.value;
      rotateCardClick(e);
      e.freshCardSwitch = false;
      localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + e.cardNum], JSON.stringify(storedCard[e.cardNum]));
    }
    if (e.input.checked) {
      e.cardSide ? e.faceAreaHeight = rowCount(e.area.value) : e.bottomAreaHeight = rowCount(e.area.value)
      e.faceAreaHeight > e.bottomAreaHeight ? e.area.rows = e.faceAreaHeight : e.area.rows = e.bottomAreaHeight
      e.cardSide ? Object.getPrototypeOf(e).faceAreaText = e.area.value : Object.getPrototypeOf(e).bottomAreaText = e.area.value
      localStorage.setItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + e.cardNum], JSON.stringify(storedCard[e.cardNum]));
      e.area.onclick = function() {rotateCardClick(e)};
      e.area.readOnly = true;
    } else {
      e.area.onclick = function(){}
      e.area.readOnly = false;
      e.area.rows = e.editableRows;
      e.area.select();
    }
  } else {
    alert('Read only, because new Rotation cards application opened at the  same time.');
    readOnlyModeOn();
  }
}

function rotateCardClick(e) {
  if (e.cardSide) {
    e.area.value = e.bottomAreaText;
  } else {
    e.area.value = e.faceAreaText;
  }
  e.cardSide = e.cardSide ^ 1;
}

function addNewCard() {
  storedCard.push(new StoredCardProperties());
  card.push(new CardProperties(k, true));
  Object.setPrototypeOf(card[k], storedCard[k]);
  addHTMLElements(card[k]);
  card[k].area.select();
  k++;
}

function getStoredCard(i) {
  storedCard.push(JSON.parse(localStorage.getItem(['cardNum_' + mainDate + '_' + mainTheme.value + '_' + i])));
  card.push(new CardProperties(i, false));
  Object.setPrototypeOf(storedCard[i], AllCardsProperties);
  Object.setPrototypeOf(card[i], storedCard[i]);
  card[i].faceAreaHeight = rowCount(card[i].faceAreaText);
  card[i].bottomAreaHeight = rowCount(card[i].bottomAreaText);
  addHTMLElements(card[i]);
  card[i].input.checked = true;
  card[i].area.onclick = function() {rotateCardClick(card[i])};
  card[i].area.readOnly = true;
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
    Object.getPrototypeOf(e).notDeleted = false;
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
    if (JSON.parse(localStorageItem).notDeleted) {
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

function setCardWidth() {
  var rubberBodyElementWidth = rubberBodyElement.clientWidth;
  if (rubberBodyElementWidth < 830) {
    AllCardsProperties.colWidth = Math.floor((rubberBodyElementWidth - 26) / 18);
  } else if (rubberBodyElementWidth < 1230) {
    AllCardsProperties.colWidth = Math.floor((rubberBodyElementWidth - 2 - (2 * 26)) / (2 * 18));
  } else {
    AllCardsProperties.colWidth = Math.floor((rubberBodyElementWidth - (2 * 2) - (3 * 26)) / (3 * 18));
  }
}

function setSessionID() {
  if (localStorage.getItem('')) {
    thisSessionID = +localStorage.getItem('') + 1;
    localStorage.setItem('', thisSessionID);
  } else {
    localStorage.setItem('', 0);
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
    deleteAllCards();
    for (var i in storedCard) {
      addHTMLElements(card[i]);
      card[i].cardSide = 1;
    }
  } else {
    location.reload(true);
  }
}