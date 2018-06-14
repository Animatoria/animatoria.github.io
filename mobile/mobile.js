var animatoriaButton = document.querySelector('.animatoriaButton');
setMobileMenu();
var ursus = true;
document.querySelector('.burgerMenu').onclick = mobileMenu;
animatoriaButton.onclick = mobileMenu;

function mobileMenu() {
  if (ursus) {
    document.querySelector('.burgerCross1').beginElement();
    document.querySelector('.burgerCross2').beginElement();
    document.querySelector('.burgerCross3').beginElement();
    ursus = false;
  } else {
    document.querySelector('.crossBurger1').beginElement();
    document.querySelector('.crossBurger2').beginElement();
    document.querySelector('.crossBurger3').beginElement();
    ursus = true;
  }
  var childNodes = document.querySelector('.header').childNodes;
  var delta = 0;
  if (childNodes[11].style.top == '250px') {
    for (var i = 1; i < 12; i += 2) {
      childNodes[i].style.top = -50 + 'px';
      childNodes[i].style.transitionDelay = (6 - delta) / 8 + 's';
      delta += 1;
    }
  } else {
    for (var i = 1; i < 12; i += 2) {
      childNodes[i].style.top = delta * 50 + 'px';
      childNodes[i].style.transitionDelay = '0s';
      delta += 1;
    }
  }
}

function setMobileMenu() {
  var delta = 1;
  for (var i = 1; i < 12; i += 2) {
    var childNodes = document.querySelector('.header').childNodes;
    childNodes[i].style.transition = 'top ' + delta / 8 + 's linear';
    childNodes[i].style.zIndex = 10 - delta;
    delta += 1;
  }
}
