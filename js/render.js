async function loadJSON(path) {
    const res = await fetch(path);
    return await res.json();
}

async function loadTemplate(path) {
    const res = await fetch(path);
    return await res.text();
}

function renderTemplate(template, data) {
    return template.replace(/{{\s*(\w+(\.\w+)*)\s*}}/g, (_, key) => {
        return key.split('.').reduce((o, k) => (o ? o[k] : ''), data) || '';
    });
}

async function main() {
    const data = await loadJSON('./data/default.json');
    const template = await loadTemplate('./templates/cv.html');
    const rendered = renderTemplate(template, data);

    document.getElementById('cv-container').innerHTML = rendered;
}

main();