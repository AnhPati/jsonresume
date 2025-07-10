import { loadJson, loadTemplate, loadStylesheet } from './loader.js';
import { showError } from './alert.js';

export const renderCVWithData = async (templateName, data) => {
    try {
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
        console.error('Erreur de rendu avec données personnalisées :', error);
        showError(error.message);
    }
};

export const renderCV = async (templateName, cvName) => {
    const data = await loadJson(`./data/${cvName}.json`);
    await renderCVWithData(templateName, data);
};