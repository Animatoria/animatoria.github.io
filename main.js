    var k = 0;
    var storedCard = [];
    var card = [];
    var storedMainDate = [];
    var storedMainTheme = [];
    var AllCardsProperties = {
      colWidth : 30,
      editableRows : 12
    }
    var newDateSwitch = false;
    var newThemeSwitch = false;
    var mainDateIndex;

    StoredCardProperties.prototype = AllCardsProperties;

    var rubberBodyElement = document.querySelector('.rubberBody');
    rubberBodyElement.style.minHeight = (window.innerHeight - 20) + 'px';
    setCardWidth();

    var currentDate = new Date();
    var currentDateToLocaleDateString = currentDate.toLocaleDateString();
    var mainDate = currentDateToLocaleDateString;

    var currentDateParagraph = document.querySelector('.currentDate');
    currentDateParagraph.innerHTML = mainDate;

    var mainTheme = document.querySelector('.mainTheme');
    mainTheme.onclick = mainThemeMenu;
    mainTheme.oninput = mainThemeChange;
    setMainTheme();
    
    var newCardButton = document.querySelector('.addNewCard');
    newCardButton.onclick = addNewCard;

    getStoredCards();
    setStoredMainDate();
    var mainDateButton = document.querySelector('.mainDateButton');
    mainDateButton.onclick = changeMainDate;

    var clearLocalStorageButton = document.querySelector('.clearLocalStorage');
    clearLocalStorageButton.onclick = function() {localStorage.clear()};

    rubberBodyElement.style.backgroundColor = '#dfd';