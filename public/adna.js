const setActives = document.querySelectorAll(".set-active");

for (const key in setActives) {
	if (Object.hasOwnProperty.call(setActives, key)) {
		const setActiveClasse = setActives[key];
		if (
			setActiveClasse.children[0].getAttribute("href") === location.pathname
		) {
			setActiveClasse.classList.add("active");
		}
	}
}

const multiInputs = document.querySelectorAll("[multi-input]");

multiInputs.forEach((multiInput) => {
	multiInput
		.querySelector("button[type='button']")
		.addEventListener("click", (e) => {
			e.preventDefault();
			const cloneForm = multiInput.children[0].cloneNode(true);
			cloneForm.querySelector("button").remove();
			const rmBtn = document.createElement("button");
			const rmIcon = document.createElement("i");
			[
				...cloneForm.querySelectorAll("input"),
				...cloneForm.querySelectorAll("select"),
			].forEach((input) => (input.value = ""));
			rmIcon.classList.add("fas");
			rmIcon.classList.add("fa-minus");
			rmBtn.classList.add("btn");
			rmBtn.classList.add("btn-danger");
			rmBtn.append(rmIcon);
			rmBtn.setAttribute("rmbtn", true);
			cloneForm.append(rmBtn);
			multiInput.append(cloneForm);
			multiInput.querySelectorAll("[rmbtn]").forEach((removeBtn) => {
				removeBtn.addEventListener("click", (e) => {
					removeBtn.parentElement.remove();
				});
			});
		});
});
