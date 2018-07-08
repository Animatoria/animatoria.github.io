window.onunload = function() {location.reload(true);};

var applicationVersion = 32;

//document.querySelector('.masterInformation').innerHTML = '';

var currentDate = new Date();
actualDate = currentDate;
var currentDateToLocaleDateString = currentDate.toLocaleDateString();
var mainDate = currentDateToLocaleDateString;

currentDateParagraph.innerHTML = mainDate;

mainTheme.onchange = mainThemeChange;

animatoriaButton.onclick = function() {isReverse ^= 1};

setCardProperties();
setMainTheme();
setSessionID();
getStoredCards();
setStoredMainDate();
onscroll = fallingMobileMenu;
onresize = setCardProperties;

body.style.backgroundColor = '#dfd';