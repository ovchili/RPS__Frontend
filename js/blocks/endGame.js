export default function endBlock(status) {
	const win = status === "win" ? "./img/win.png" : "./img/lose.png";
	console.log(win);
	return {
		tag: "div",
		content: [
			{
				tag: "div",
				cls: "img__block",
				content: [
					{
						tag: "img",
						cls: "img",
						attrs: {
							src: win,
						},
					},
				],
			},
			{
				tag: "div",
				cls: "button__block",
				content: [
					{ tag: "button", cls: ["btn", "button__lobby"], content: "В лобби" },
					{
						tag: "button",
						cls: ["btn", "button__play"],
						content: "Играть еще",
					},
				],
			},
		],
	};
}

/*const win = status === "win";
const imgBlock =
	document.querySelector(".img__block") || document.createElement("div");
imgBlock.classList.add("img__block");
container.appendChild(imgBlock);
const img = document.querySelector(".img") || document.createElement("img");
img.classList.add("img");
img.src = win ? "./img/win.png" : "./img/lose.png";
imgBlock.appendChild(img);

const buttonBlock =
	document.querySelector(".button__block") || document.createElement("div");
buttonBlock.classList.add("button__block");
application.renderBlock("buttons", buttonBlock, "lobby");
application.renderBlock("buttons", buttonBlock, "play");
container.appendChild(buttonBlock);
*/
