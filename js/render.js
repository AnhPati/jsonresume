const getTemplateNameFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('template') || 'classic';
};

const updateURLParam = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    history.pushState({}, '', newUrl);
};

const loadJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur chargement JSON : ${url}`);
    return await response.json();
};

const loadTemplate = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur chargement template : ${url}`);
    return await response.text();
};

const loadStylesheet = (templateName) => {
    const oldLink = document.querySelector("link[href*='/styles/']");
    if (oldLink) oldLink.remove();

    const newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.href = `./styles/${templateName}.css`;
    document.head.appendChild(newLink);
};

const renderCV = async (templateName) => {
    try {
        const data = await loadJson('./data/default.json');
        const template = await loadTemplate(`./templates/${templateName}.html`);
        loadStylesheet(templateName);

        const output = Mustache.render(template, {
            ...data.basics,
            skills: data.skills,
            work: data.work,
            education: data.education,
            languages: data.languages,
            additional: data.additional
        });

        document.getElementById('cv-container').innerHTML = output;
    } catch (error) {
        console.error('Erreur de rendu :', error);
    }
};

const setupTemplateSelector = () => {
    const select = document.getElementById('template-select');
    const current = getTemplateNameFromURL();
    select.value = current;

    select.addEventListener('change', async (e) => {
        const selected = e.target.value;
        updateURLParam('template', selected);
        await renderCV(selected);
    });
};

const init = async () => {
    const templateName = getTemplateNameFromURL();
    setupTemplateSelector();
    await renderCV(templateName);
};

init();