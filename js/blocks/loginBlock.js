export default function loginBlock() {
	return {
		tag: "form",
		cls: "login__form",
		content: [
			{
				tag: "h2",
				cls: "login__heading",
				content: "Введите логин",
			},
			{
				tag: "div",
				cls: "login__form_control",
				content: [
					{
						tag: "input",
						cls: "login__form_input",
						attrs: {
							placeholder: "Введите логин",
							type: "text",
						},
					},
					{
						tag: "button",
						cls: ["btn", "login__form_btn"],
						content: "Войти",
					},
				],
			},
		],
	};
}
