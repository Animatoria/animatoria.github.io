function disableHeaderMenuButtons(flag, button) {
	animatoriaButton.disabled = flag;
	newCardButton.disabled = flag;
	readOnlyModeButton.disabled = flag;
	mainDateLog.disabled = flag;
	mainDateButton.disabled = flag;
	mainTheme.disabled = flag;
	if (button) button.disabled = false;
}