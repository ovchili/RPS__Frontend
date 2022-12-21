import * as pages from "./templatingPages.js";

window.application = {
	screens: {},
	renderScreen: function (screenName) {
		if (!(screenName in application.screens)) {
			console.log("Такого экрана нет");
			return;
		}
		application.screens[`${screenName}`]();
	},
	timers: [],
};
application.screens.login = pages.loginPage;
application.screens.lobby = pages.lobbyPage;
application.screens.waitingPlayer = pages.waitingPlayerPage;
application.screens.game = pages.gamePage;
application.screens.end = pages.endGame;

window.addEventListener("DOMContentLoaded", () => {
	application.renderScreen("login");
});
