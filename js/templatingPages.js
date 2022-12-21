import templateEngine from "./libs/template.js";
import loginBlock from "./blocks/loginBlock.js";
import lobbyBlock from "./blocks/lobbyBlock.js";
import playerBlock from "./blocks/playerBlock.js";
import waitingBlock from "./blocks/waitingBlock.js";
import gameBlock from "./blocks/gameBlock.js";
import endBlock from "./blocks/endGame.js";
const app = document.querySelector(".app");
const backURL = "https://skypro-rock-scissors-paper.herokuapp.com";
const clearTimers = () => {
	if (application.timers.length > 0) {
		application.timers.forEach((timer) => clearInterval(timer));
		application.timers = [];
	}
};
export const loginPage = () => {
	clearTimers();
	app.textContent = "";
	app.appendChild(templateEngine(loginBlock()));
	const form = document.querySelector(".login__form");

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const input = form.querySelector(".login__form_input");
		const params = new URLSearchParams();
		if (!input.value) {
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
				} else {
					application.idGame = player.game.id;
					const params = new URLSearchParams();
					params.set("token", application.token);
					params.set("id", application.idGame);
					fetch(`${backURL}/game-status?${params.toString()}`)
						.then((res) => {
							return res.json();
						})
						.then((result) => {
							const game = result["game-status"];
							if (game.status === "waiting-for-start") {
								application.renderScreen("waitingPlayer");
							} else if (game.status === "waiting-for-your-move") {
								application.renderScreen("game");
							}
						});
				}
			});
	});
};
export const lobbyPage = () => {
	clearTimers();
	app.textContent = "";
	app.appendChild(templateEngine(lobbyBlock()));
	const playerList = document.querySelector(".lobby__player");
	const btnPlay = document.querySelector(".lobby__btn");
	const params = new URLSearchParams();
	params.set("token", application.token);
	application.timers.push(
		setInterval(() => {
			fetch(`${backURL}/player-list?${params.toString()}`)
				.then((res) => res.json())
				.then((result) => {
					playerList.textContent = "";
					const players = result.list;
					playerList.appendChild(templateEngine(players.map(playerBlock)));
				});
		}, 500)
	);

	btnPlay.addEventListener("click", () => {
		const params = new URLSearchParams();
		params.set("token", application.token);
		fetch(`${backURL}/start?${params.toString()}`)
			.then((res) => res.json())
			.then((result) => {
				const player = result["player-status"];
				application.idGame = player.game.id;
				const params = new URLSearchParams();
				params.set("token", application.token);
				params.set("id", application.idGame);
				fetch(`${backURL}/game-status?${params.toString()}`)
					.then((res) => {
						return res.json();
					})
					.then((result) => {
						const game = result["game-status"];
						if (game.status === "waiting-for-start") {
							application.renderScreen("waitingPlayer");
						} else if (game.status === "waiting-for-your-move") {
							application.renderScreen("game");
						}
					});
			});
	});
};
export const waitingPlayerPage = () => {
	clearTimers();
	app.textContent = "";
	app.appendChild(templateEngine(waitingBlock("Ожидание соперника")));
	const params = new URLSearchParams();
	params.set("token", application.token);
	params.set("id", application.idGame);
	application.timers.push(
		setInterval(() => {
			fetch(
				`${backURL}/game-status?token=${application.token}&id=${application.idGame}`
			)
				.then((resp) => resp.json())
				.then((result) => {
					const game = result["game-status"];
					console.log(game);
					if (game.status === "waiting-for-your-move") {
						application.renderScreen("game");
					}
				});
		}, 500)
	);
};
export const gamePage = () => {
	clearTimers();
	app.textContent = "";
	app.appendChild(templateEngine(gameBlock()));
	const rock = document.querySelector(".btn__game_rock");
	const scissors = document.querySelector(".btn__game_scissors");
	const paper = document.querySelector(".btn__game_paper");

	rock.addEventListener("click", (e) => {
		const target = e.target;
		move(target);
	});
	scissors.addEventListener("click", (e) => {
		const target = e.target;
		move(target);
	});
	paper.addEventListener("click", (e) => {
		const target = e.target;
		move(target);
	});
};

const move = (btn) => {
	const params = new URLSearchParams();
	params.set("token", application.token);
	params.set("id", application.idGame);
	params.set("move", btn.dataset.move);
	fetch(`${backURL}/play?${params.toString()}`)
		.then((res) => res.json())
		.then((result) => {
			const game = result["game-status"];
			if (game.status === "waiting-for-enemy-move") {
				application.renderScreen("waitingMove");
			} else if (game.status === "waiting-for-your-move") {
				application.renderScreen("game");
			} else {
				application.renderScreen("end");
			}
		});
};
export const waitingMovePage = () => {
	clearTimers();
	app.textContent = "";
	app.appendChild(templateEngine(waitingBlock("Ожидание хода соперника")));
	const params = new URLSearchParams();
	params.set("token", application.token);
	params.set("id", application.idGame);
	application.timers.push(
		setInterval(() => {
			fetch(`${backURL}/game-status?${params.toString()}`)
				.then((resp) => resp.json())
				.then((result) => {
					const game = result["game-status"];
					if (game.status === "waiting-for-your-move") {
						application.renderScreen("game");
					} else if (game.status === "lose" || game.status === "win") {
						application.renderScreen("end");
					}
				});
		}, 500)
	);
};
export const endGame = () => {
	clearTimers();
	app.textContent = "";
	const params = new URLSearchParams();
	params.set("token", application.token);
	params.set("id", application.idGame);
	fetch(`${backURL}/game-status?${params.toString()}`)
		.then((resp) => resp.json())
		.then((result) => {
			const status = result["game-status"].status;
			app.appendChild(templateEngine(endBlock(status)));

			const buttonPlay = document.querySelector(".button__play");
			const buttonLobby = document.querySelector(".button__lobby");

			buttonLobby.addEventListener("click", () => {
				application.idGame = "";
				application.renderScreen("lobby");
			});

			buttonPlay.addEventListener("click", () => {
				const params = new URLSearchParams();
				params.set("token", application.token);
				fetch(`${backURL}/start?${params.toString()}`)
					.then((res) => res.json())
					.then((result) => {
						const player = result["player-status"];
						application.idGame = player.game.id;
						const params = new URLSearchParams();
						params.set("token", application.token);
						params.set("id", application.idGame);
						fetch(`${backURL}/game-status?${params.toString()}`)
							.then((res) => {
								return res.json();
							})
							.then((result) => {
								const game = result["game-status"];
								if (game.status === "waiting-for-start") {
									application.renderScreen("waitingPlayer");
								} else if (game.status === "waiting-for-your-move") {
									application.renderScreen("game");
								}
							});
					});
			});
		});
};
