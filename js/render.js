import { showError } from './alert.js';
import { setupPrintButton } from './print.js';

let autoRefreshInterval = null;

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

const renderCVWithData = async (templateName, data) => {
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

const renderCV = async (templateName, cvName) => {
    const data = await loadJson(`./data/${cvName}.json`);
    await renderCVWithData(templateName, data);
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

const setupReloadButton = () => {
    const reloadButton = document.getElementById('reload-data');
    if (!reloadButton) return;

    reloadButton.addEventListener('click', async () => {
        const templateName = getTemplateNameFromURL();
        const cvName = getCVNameFromURL();
        await renderCV(templateName, cvName);
    });
};

const setupUploadInput = () => {
    const input = document.getElementById('upload-json');
    if (!input) return;

    input.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const data = JSON.parse(event.target.result);
                const templateName = getTemplateNameFromURL();
                await renderCVWithData(templateName, data);
            } catch (err) {
                console.error('Fichier JSON invalide :', err);
                showError("Le fichier JSON n'est pas valide.");
            }
        };
        reader.readAsText(file);
    });
};

const setupAutoRefresh = () => {
    const button = document.getElementById('toggle-auto-refresh');
    if (!button) return;

    const getStatus = () => localStorage.getItem('autoRefresh') === 'true';

    const updateButtonText = () => {
        button.textContent = getStatus()
            ? 'Désactiver auto-refresh'
            : 'Activer auto-refresh';
    };

    const startInterval = () => {
        if (autoRefreshInterval) return;
        autoRefreshInterval = setInterval(async () => {
            const templateName = getTemplateNameFromURL();
            const cvName = getCVNameFromURL();
            await renderCV(templateName, cvName);
        }, 3000);
    };

    const stopInterval = () => {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
    };

    button.addEventListener('click', () => {
        const enabled = getStatus();
        localStorage.setItem('autoRefresh', String(!enabled));
        updateButtonText();

        if (!enabled) {
            startInterval();
        } else {
            stopInterval();
        }
    });

    // Initial state on load
    if (getStatus()) {
        startInterval();
    }

    updateButtonText();
};

const isDevMode =
    ['localhost', '127.0.0.1'].includes(window.location.hostname) ||
    window.location.hostname.startsWith('192.168.') ||
    window.location.search.includes('dev=true');

const showDevElements = () => {
    if (isDevMode) {
        document.querySelectorAll('.dev-only').forEach(el => {
            el.style.display = 'inline-block';
        });
    }
};

const init = async () => {
    const templateName = getTemplateNameFromURL();
    const cvName = getCVNameFromURL();

    setupTemplateSelector();
    setupCVSelector();
    setupPrintButton();
    setupReloadButton();
    setupUploadInput();
    showDevElements();
    setupAutoRefresh();
    await renderCV(templateName, cvName);
};

init();