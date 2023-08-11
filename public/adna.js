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
			].forEach((input) => {
				if (input.name !== "quantite") {
					input.value = "";
				}
			});
			rmIcon.classList.add("fas");
			rmIcon.classList.add("fa-minus");
			rmBtn.classList.add("btn");
			rmBtn.classList.add("btn-danger");
			rmBtn.append(rmIcon);
			rmBtn.setAttribute("rmbtn", true);
			cloneForm.append(rmBtn);
			multiInput.append(cloneForm);
			document.dispatchEvent(
				new CustomEvent("multi-input-add", {
					detail: cloneForm,
				}),
			);
			multiInput.querySelectorAll("[rmbtn]").forEach((removeBtn) => {
				removeBtn.addEventListener("click", (e) => {
					document.dispatchEvent(
						new CustomEvent("multi-input-remove", {
							detail: removeBtn.parentElement,
						}),
					);
					removeBtn.parentElement.remove();
				});
			});
		});
});

const dataTables = document.querySelectorAll("table[sorted]");

dataTables.forEach((dataTable) => {
	try {
		new DataTable(dataTable, {
			buttons: ["print", "colvis"],
			responsive: !!dataTable.hasAttribute("responsive"),
			order: !!dataTable.hasAttribute("order"),
			autoFill: !!dataTable.hasAttribute("autoFill"),
		});
	} catch (error) {
		console.log(error);
	}
});

document.querySelectorAll(".alert").forEach((alert) => {
	setTimeout(() => {
		alert.style.display = "none";
	}, 5000);
});

const showCountries = document.querySelectorAll("[show-countries]");
const CountriesApiUrl = `https://restcountries.com/v3.1/all`;
showCountries.forEach((showCountrie) => {
	fetch(CountriesApiUrl, {
		method: "GET",
	}).then(async (res) => {
		if (res.ok) {
			const data = (await res.json()) ?? [];
			data.map((country) => {
				const createOption = document.createElement("option");
				createOption.value = country.name.common;
				createOption.innerHTML = country.name.common;
				if (country.flags) {
					const flagImg = document.createElement("img");
					flagImg.src = country.flags.png;
					flagImg.alt = `${country.name.common} flag`;
					flagImg.style.width = "30px";
					flagImg.style.marginRight = "5px";

					createOption.prepend(flagImg);
				}
				showCountrie.appendChild(createOption);
			});
		}
	});
});
