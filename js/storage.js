export const getTemplateNameFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    const urlTemplate = params.get('template');
    if (urlTemplate) {
        localStorage.setItem('selectedTemplate', urlTemplate);
        return urlTemplate;
    }
    return localStorage.getItem('selectedTemplate') || 'classic';
};

export const getCVNameFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    const urlCV = params.get('cv');
    if (urlCV) {
        localStorage.setItem('selectedCV', urlCV);
        return urlCV;
    }
    return localStorage.getItem('selectedCV') || 'default';
};

export const updateURLParam = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    history.pushState({}, '', newUrl);
};