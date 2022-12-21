export default function gameBlock() {
	return {
		tag: "div",
		cls: "game",
		content: [
			{
				tag: "button",
				cls: ["btn", "btn__game_rock"],
				content: "Камень",
				attrs: {
					"data-move": "rock",
				},
			},
			{
				tag: "button",
				cls: ["btn", "btn__game_scissors"],
				content: "Ножницы",
				attrs: {
					"data-move": "scissors",
				},
			},
			{
				tag: "button",
				cls: ["btn", "btn__game_paper"],
				content: "Бумага",
				attrs: {
					"data-move": "paper",
				},
			},
		],
	};
}
