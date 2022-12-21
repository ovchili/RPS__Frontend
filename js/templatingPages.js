import templateEngine from "./libs/template.js";
import loginBlock from "./blocks/loginBlock.js";
import lobbyBlock from "./blocks/lobbyBlock.js";
const app = document.querySelector(".app");
const backURL = "https://skypro-rock-scissors-paper.herokuapp.com";
const clearTimers = () => {
	if (application.timers.length > 0) {
		application.timers.forEach((timer) => clearInterval(timer));
		application.timers = [];
	}
};
export const loginPage = () => {
	app.textContent = "";
	app.appendChild(templateEngine(loginBlock()));
	const form = document.querySelector(".login__form");

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const input = form.querySelector(".login__form_input");
		const params = new URLSearchParams();
		if (!input.value) {
			return;
		}
		params.set("login", input.value);
		fetch(`${backURL}/login?${params.toString()}`)
			.then((resp) => resp.json())
			.then((result) => {
				application.token = result.token;
				const params = new URLSearchParams();
				params.set("token", application.token);
				return fetch(`${backURL}/player-status?${params.toString()}`);
			})
			.then((res) => res.json())
			.then((result) => {
				const player = result["player-status"];
				if (player.status === "lobby") {
					application.renderScreen("lobby");
					return;
				}
				application.idGame = player.game.id;
				const params = new URLSearchParams();
				params.set("token", application.token);
				params.set("id", application.idGame);
				return fetch(`${backURL}/game-status?${params.toString()}`);
			})
			.then((res) => {
				return res.json();
			})
			.then((result) => {
				const game = result["game-status"];
				if (game.status === "waiting-for-start") {
					application.renderScreen("waitingPlayer");
				}
			});
	});
};
export const lobbyPage = () => {
	app.textContent = "";
	app.appendChild(templateEngine(lobbyBlock()));
};
export const waitingPlayerPage = () => {
	app.textContent = "";
};
export const gamePage = () => {};
export const endGame = () => {};
