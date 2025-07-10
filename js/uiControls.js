import { getTemplateNameFromURL, getCVNameFromURL, updateURLParam } from './storage.js';
import { renderCV, renderCVWithData } from './renderCV.js';
import { showError } from './alert.js';

let autoRefreshInterval = null;

export const setupTemplateSelector = () => {
    const select = document.getElementById('template-select');
    const current = getTemplateNameFromURL();
    select.value = current;

    select.addEventListener('change', async (e) => {
        const selected = e.target.value;
        updateURLParam('template', selected);
        localStorage.setItem('selectedTemplate', selected);
        await renderCV(selected, getCVNameFromURL());
    });
};

export const setupCVSelector = () => {
    const select = document.getElementById('cv-selector');
    const current = getCVNameFromURL();
    select.value = current;

    select.addEventListener('change', async (e) => {
        const selected = e.target.value;
        updateURLParam('cv', selected);
        localStorage.setItem('selectedCV', selected);
        await renderCV(getTemplateNameFromURL(), selected);
    });
};

export const setupReloadButton = () => {
    const reloadButton = document.getElementById('reload-data');
    if (!reloadButton) return;

    reloadButton.addEventListener('click', async () => {
        await renderCV(getTemplateNameFromURL(), getCVNameFromURL());
    });
};

export const setupUploadInput = () => {
    const input = document.getElementById('upload-json');
    if (!input) return;

    const fileNameDisplay = document.getElementById('file-name');

    input.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        fileNameDisplay.textContent = file.name;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const data = JSON.parse(event.target.result);
                await renderCVWithData(getTemplateNameFromURL(), data);
            } catch (err) {
                console.error('Fichier JSON invalide :', err);
                showError("Le fichier JSON n'est pas valide.");
            }
        };
        reader.readAsText(file);
    });
};

export const setupAutoRefresh = () => {
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
            await renderCV(getTemplateNameFromURL(), getCVNameFromURL());
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
        !enabled ? startInterval() : stopInterval();
    });

    if (getStatus()) startInterval();
    updateButtonText();
};

export const showDevElements = () => {
    const isDevMode =
        ['localhost', '127.0.0.1'].includes(window.location.hostname) ||
        window.location.hostname.startsWith('192.168.') ||
        window.location.search.includes('dev=true');

    if (isDevMode) {
        document.querySelectorAll('.dev-only').forEach(el => {
            el.style.display = 'inline-block';
        });
    }
};