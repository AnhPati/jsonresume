import { getTemplateNameFromURL, getCVNameFromURL } from './storage.js';
import { renderCV } from './renderCV.js';
import { setupCVSelector, setupTemplateSelector, setupUploadInput, setupReloadButton, setupAutoRefresh, showDevElements } from './uiCOntrols.js';
import { setupPrintButton } from './print.js';

const init = async () => {
    const templateName = getTemplateNameFromURL();
    const cvName = getCVNameFromURL();

    setupTemplateSelector();
    setupCVSelector();
    setupUploadInput();
    setupReloadButton();
    setupAutoRefresh();
    setupPrintButton();
    showDevElements();

    await renderCV(templateName, cvName);
};

init();