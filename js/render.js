import { showError } from './alert.js';
import { setupPrintButton } from './print.js';

const getTemplateNameFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    const urlTemplate = params.get('template');

    if (urlTemplate) {
        localStorage.setItem('selectedTemplate', urlTemplate);
        return urlTemplate;
    }

    const saved = localStorage.getItem('selectedTemplate');
    return saved || 'classic';
};

const getCVNameFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    const urlCV = params.get('cv');

    if (urlCV) {
        localStorage.setItem('selectedCV', urlCV);
        return urlCV;
    }

    const saved = localStorage.getItem('selectedCV');
    return saved || 'default';
};

const updateURLParam = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    history.pushState({}, '', newUrl);
};

const loadJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Le fichier de données est introuvable : ${url}`);
    }
    return await response.json();
};

const loadTemplate = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Le template HTML est introuvable : ${url}`);
    }
    return await response.text();
};

const loadStylesheet = (templateName) => {
    const existingTemplateLink = document.querySelector("link[data-template-style]");
    if (existingTemplateLink) existingTemplateLink.remove();

    const newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.href = `./styles/${templateName}.css`;
    newLink.setAttribute('data-template-style', 'true');
    document.head.appendChild(newLink);
};

const renderCV = async (templateName, cvName) => {
    try {
        const data = await loadJson(`./data/${cvName}.json`);
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
        showError(error.message);
    }
};

const setupTemplateSelector = () => {
    const select = document.getElementById('template-select');
    const current = getTemplateNameFromURL();
    select.value = current;

    select.addEventListener('change', async (e) => {
        const selected = e.target.value;
        updateURLParam('template', selected);
        localStorage.setItem('selectedTemplate', selected);
        const cvName = getCVNameFromURL();
        await renderCV(selected, cvName);
    });
};

const setupCVSelector = () => {
    const select = document.getElementById('cv-selector');
    const current = getCVNameFromURL();
    select.value = current;

    select.addEventListener('change', async (e) => {
        const selected = e.target.value;
        updateURLParam('cv', selected);
        localStorage.setItem('selectedCV', selected);
        const templateName = getTemplateNameFromURL();
        await renderCV(templateName, selected);
    });
};

const init = async () => {
    const templateName = getTemplateNameFromURL();
    const cvName = getCVNameFromURL();
    setupTemplateSelector();
    setupCVSelector();
    setupPrintButton();
    await renderCV(templateName, cvName);
};

init();