export const loadJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Le fichier de données est introuvable : ${url}`);
    }
    return await response.json();
};

export const loadTemplate = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Le template HTML est introuvable : ${url}`);
    }
    return await response.text();
};

export const loadStylesheet = (templateName) => {
    const existing = document.querySelector("link[data-template-style]");
    if (existing) existing.remove();

    const newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.href = `./styles/${templateName}.css`;
    newLink.setAttribute('data-template-style', 'true');
    document.head.appendChild(newLink);
};