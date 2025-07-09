const loadJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Échec du chargement JSON : ${url}`);
    return await response.json();
};

const loadTemplate = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Échec du chargement du template : ${url}`);
    return await response.text();
};

const renderCV = async () => {
    try {
        const data = await loadJson("./data/default.json");
        const template = await loadTemplate("./templates/classic.html");

        const output = Mustache.render(template, {
            ...data.basics,
            skills: data.skills,
            work: data.work,
            education: data.education,
            languages: data.languages,
            additional: data.additional
        });

        document.getElementById("cv-container").innerHTML = output;
    } catch (error) {
        console.error("Erreur de rendu :", error);
    }
};

renderCV();