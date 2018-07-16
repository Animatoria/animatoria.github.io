window.onunload = function() {location.reload(true);};

var currentDate = new Date();
actualDate = currentDate;
var currentDateToLocaleDateString = currentDate.toLocaleDateString();
var mainDate = currentDateToLocaleDateString;

currentDateParagraph.innerHTML = mainDate;

animatoriaButton.onclick = function() {isFaceSide ^= 1;};

setCardProperties().setMainTheme().setSessionID().setStoredMainDate().getStoredCards();

onscroll = fallingMobileMenu;
onresize = setCardProperties;

cardsTableDeck.style.paddingBottom = innerHeight - 200 + 'px';
body.style.backgroundColor = '#dfd';