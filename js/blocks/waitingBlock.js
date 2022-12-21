export default function waitingBlock(text) {
	return {
		tag: "div",
		cls: "spinner",
		content: [
			{
				tag: "span",
				cls: "spinner__animation",
			},
			{
				tag: "span",
				cls: "spinner__info",
				content: text,
			},
		],
	};
}
