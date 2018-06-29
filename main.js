window.onunload = function() {location.reload(true);};

var applicationVersion = 31;

var sessionIssueFlag = false;

var deviceBrowserType = detect.parse(navigator.userAgent);
//document.querySelector('.deviceBrowserType').innerHTML = ('<b>device type</b>: ' + deviceBrowserType.device.type + ' <b>device</b>: ' + deviceBrowserType.device.family + ' <b>os</b>: ' + deviceBrowserType.os.family + ' <b>browser</b>: ' + deviceBrowserType.browser.family + ' ' + deviceBrowserType.browser.version + ' <b>app version</b>: ' + applicationVersion);

var readOnlyModeMobile = document.querySelector('.readOnlyModeMobile');

setCardProperties();
textAreaHeight.style.width = flipperColumnWidth * 18.2 + 'px';

//document.querySelector('.masterInformation').innerHTML = '';

var currentDate = new Date();
actualDate = currentDate;
var currentDateToLocaleDateString = currentDate.toLocaleDateString();
var mainDate = currentDateToLocaleDateString;

var currentDateParagraph = document.querySelector('.currentDate');
currentDateParagraph.innerHTML = mainDate;

var mainTheme = document.querySelector('#mainTheme');
mainTheme.onchange = mainThemeChange;
setMainTheme();

setSessionID();

var animatoriaButton = document.querySelector('.animatoriaButton');

var newCardButton = document.querySelector('.addNewCard');

var readOnlyModeButton = document.querySelector('.readOnlyMode');

getStoredCards();
setStoredMainDate();

var mainDateButton = document.querySelector('.mainDateButton');

var mainDateLog = document.querySelector('.mainDateLog');

bodyElement.style.backgroundColor = '#dfd';