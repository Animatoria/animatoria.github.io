function isNewDateOrTheme() {
	if (newThemeFlag) {
		storedMainTheme.push(mainTheme.value);
		localStorage.setItem('storedMainTheme', JSON.stringify(storedMainTheme));
		newThemeFlag = false;
	}
	if (newDateFlag && mainDate == currentDateToLocaleDateString) {
		storedMainDate.push(currentDate);
		localStorage.setItem('storedMainDate_' + mainTheme.value, JSON.stringify(storedMainDate));
		newDateFlag = false;
	}
}

function changeMainDate() {
  getOffMobileMenu();
  if (localStorage.getItem('storedMainDate_' + mainTheme.value)) {
    k = 0;
    storedCard = [];
    card = [];
    deleteAllChoosableItems();
    rubberBodyElement.style.display = 'none';
    chooseItemWindow.style.display = 'block';
    disableHeaderMenuButtons(true);
    for (var i in storedMainDate) {
      getChoosableDate(i);
    }
    if (storedMainDate[storedMainDate.length -1].toLocaleDateString() != currentDateToLocaleDateString) {
      var div = document.createElement('div');
      var thisItemDate = currentDateToLocaleDateString;
      div.innerHTML = thisItemDate;
      div.className = 'storedDate';
      chooseItemWindow.appendChild(div);
      div.onclick = function() {
        mainDate = thisItemDate;
        currentDateParagraph.innerHTML = mainDate;
        deleteAllCards();
        rubberBodyElement.style.display = 'flex';
        chooseItemWindow.style.display = 'none';
        if (mobileVersion) {
          document.querySelector('.crossBurger1').beginElement();
          document.querySelector('.crossBurger2').beginElement();
          document.querySelector('.crossBurger3').beginElement();
          mainDateLog.style.top = '-50px';
          mobileVersion = false;
          document.querySelector('.burgerMenu').onclick = mobileMenu;
        }
        disableHeaderMenuButtons(false);
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
  chooseItemWindow.appendChild(div);
  div.onclick = function() {
    mainDateIndex = i;
    mainDate = thisItemDate;
    currentDateParagraph.innerHTML = mainDate;
    deleteAllCards();
    rubberBodyElement.style.display = 'flex';
    chooseItemWindow.style.display = 'none';
    getStoredCards();
    if (mobileVersion) {
      document.querySelector('.crossBurger1').beginElement();
      document.querySelector('.crossBurger2').beginElement();
      document.querySelector('.crossBurger3').beginElement();
      mainDateLog.style.top = '-50px';
      mobileVersion = false;
      document.querySelector('.burgerMenu').onclick = mobileMenu;
    }
    disableHeaderMenuButtons(false);
  }
}

function deleteAllChoosableItems() {
  while (chooseItemWindow.firstChild) {
      chooseItemWindow.removeChild(chooseItemWindow.firstChild);
    }
}

function mainThemeChange() {
  k = 0;
  storedCard = [];
  card = [];
  storedMainDate = [];
  mainDate = currentDateToLocaleDateString;
  currentDateParagraph.innerHTML = mainDate;
  deleteAllCards();
  rubberBodyElement.style.display = 'flex';
  chooseItemWindow.style.display = 'none';
  getStoredCards();
  setStoredMainDate();
  disableHeaderMenuButtons(false);
  newThemeFlag = localStorage.getItem('storedMainDate_' + mainTheme.value) ? false : true
}

function mainThemeMenu() {
  getOffMobileMenu();
  disableHeaderMenuButtons(true, mainTheme);
  mainTheme.select();
  deleteAllChoosableItems();
  rubberBodyElement.style.display = 'none';
  chooseItemWindow.style.display = 'block';
  for (var i in storedMainTheme) {
    getChoosableTheme(i);
  }
}

function getChoosableTheme(i) {
  var div = document.createElement('div');
  var thisItemTheme = storedMainTheme[i];
  div.innerHTML = thisItemTheme;
  div.className = 'storedTheme';
  chooseItemWindow.appendChild(div);
  div.onclick = function() {
    mainTheme.value = thisItemTheme;
    mainThemeChange();
    if (mobileVersion) {
      document.querySelector('.crossBurger1').beginElement();
      document.querySelector('.crossBurger2').beginElement();
      document.querySelector('.crossBurger3').beginElement();
      mainThemeLabel.style.top = '-50px';
      mobileVersion = false;
      document.querySelector('.burgerMenu').onclick = mobileMenu;
    }
  }
}