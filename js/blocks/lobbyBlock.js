export default function lobbyBlock() {
	return {
		tag: "main",
		cls: "lobby",
		content: [
			{
				tag: "div",
				cls: "lobby__play",
				content: [
					{
						tag: "button",
						cls: ["btn", "lobby__btn"],
						content: "Играть",
					},
				],
			},
			{
				tag: "ul",
				cls: "lobby__player",
			},
		],
	};
}
