window.onunload = function() {location.reload(true);};

var applicationVersion = 32;

//document.querySelector('.masterInformation').innerHTML = '';

var currentDate = new Date();
actualDate = currentDate;
var currentDateToLocaleDateString = currentDate.toLocaleDateString();
var mainDate = currentDateToLocaleDateString;

var currentDateParagraph = document.querySelector('.currentDate');
currentDateParagraph.innerHTML = mainDate;

var mainTheme = document.querySelector('.mainTheme');
mainTheme.onchange = mainThemeChange;

var animatoriaButton = document.querySelector('.animatoriaButton');
animatoriaButton.onclick = function() {isReverse ^= 1};

var newCardButton = document.querySelector('.addNewCard');

var mainDateButton = document.querySelector('.mainDateButton');

var mainDateLog = document.querySelector('.mainDateLog');

setCardProperties();
setMainTheme();
setSessionID();
getStoredCards();
setStoredMainDate();
onscroll = fallingMobileMenu;
onresize = setCardProperties;

bodyElement.style.backgroundColor = '#dfd';