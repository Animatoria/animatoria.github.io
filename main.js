window.onunload = function() {location.reload(true);};

var applicationVersion = 12;

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
var readOnlyMode = false;

var thisSessionID;
var mainDateIndex;

var zIndexCounter = 1;

StoredCardProperties.prototype = AllCardsProperties;

var rubberBodyElement = document.querySelector('.rubberBody');

var deviceBrowserType = detect.parse(navigator.userAgent);
document.querySelector('.deviceBrowserType').innerHTML = ('<b>device type</b>: ' + deviceBrowserType.device.type + ' <b>device</b>: ' + deviceBrowserType.device.family + ' <b>\
os</b>: ' + deviceBrowserType.os.family + ' <b>browser</b>: ' + deviceBrowserType.browser.family + ' ' + deviceBrowserType.browser.version + ' <b>app version</b>: ' + applicationVersion);

setCardProperties();

document.querySelector('.masterInformation').innerHTML = rubberBodyElement.clientWidth;

var currentDate = new Date();
var currentDateToLocaleDateString = currentDate.toLocaleDateString();
var mainDate = currentDateToLocaleDateString;

var currentDateParagraph = document.querySelector('.currentDate');
currentDateParagraph.innerHTML = mainDate;

var mainTheme = document.querySelector('.mainTheme');
mainTheme.onclick = mainThemeMenu;
mainTheme.oninput = mainThemeChange;
setMainTheme();

setSessionID();

var newCardButton = document.querySelector('.addNewCard');
newCardButton.onclick = addNewCard;

var readOnlyModeButton = document.querySelector('.readOnlyMode');
readOnlyModeButton.onclick = readOnlyModeOn;

getStoredCards();
setStoredMainDate();
var mainDateButton = document.querySelector('.mainDateButton');
mainDateButton.onclick = changeMainDate;

var clearLocalStorageButton = document.querySelector('.clearLocalStorage');
clearLocalStorageButton.onclick = function() {localStorage.clear()};

rubberBodyElement.style.backgroundColor = '#dfd';