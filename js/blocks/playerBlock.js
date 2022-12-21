export default function playerBlock(player) {
	return {
		tag: "li",
		cls: player.you ? ["player", "player__you"] : "player",
		content: [
			{
				tag: "header",
				cls: "player__header",
				content: [
					{
						tag: "p",
						cls: "player__login",
						content: player.login,
					},
				],
			},
			{
				tag: "main",
				cls: "player__main",
				content: [
					{
						tag: "ul",
						cls: "player__move",
						content: [
							{
								tag: "li",
								cls: "player__move_rocks",
								content: `Камень ${player.rocks}`,
							},
							{
								tag: "li",
								cls: "player__move_scissors",
								content: `Ножницы ${player.scissors}`,
							},
							{
								tag: "li",
								cls: "player__move_papers",
								content: `Бумага ${player.papers}`,
							},
						],
					},
				],
			},
			{
				tag: "footer",
				cls: "player__footer",
				content: [
					{
						tag: "ul",
						cls: "player__result",
						content: [
							{
								tag: "li",
								cls: "player__result_wins",
								content: `W: ${player.wins}`,
							},
							{
								tag: "li",
								cls: "player__result_loses",
								content: `L: ${player.loses}`,
							},
						],
					},
				],
			},
		],
	};
}
