import { loadJson, loadTemplate, loadStylesheet } from './loader.js';
import { showError } from './alert.js';

export const renderCVWithData = async (templateName, data) => {
    try {
        const template = await loadTemplate(`./templates/${templateName}.html`);
        loadStylesheet(templateName);

        const partials = {
            malt: await loadTemplate(`./templates/partials/icons/malt.mustache`)
        };

        const stripPrefix = (url) => url.replace(/^https?:\/\/(www\.)?/, '');

        const output = Mustache.render(template, {
            ...data.basics,
            linkedinStripped: stripPrefix(data.basics.linkedin),
            maltStripped: stripPrefix(data.basics.malt),
            skills: data.skills,
            work: data.work,
            education: data.education,
            languages: data.languages,
            additional: data.additional
        }, partials);

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