const setActives = document.querySelectorAll(".set-active");

for (const key in setActives) {
    if (Object.hasOwnProperty.call(setActives, key)) {
        const setActiveClasse = setActives[key];
        if (setActiveClasse.children[0].getAttribute("href") === location.pathname) {
            setActiveClasse.classList.add("active")
        }
    }
}