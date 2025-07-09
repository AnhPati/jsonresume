export function setupPrintButton(buttonId = 'download-pdf') {
    const btn = document.getElementById(buttonId);
    if (!btn) {
        console.warn(`[PRINT] Bouton "${buttonId}" introuvable.`);
        return;
    }

    btn.addEventListener('click', () => {
        window.print();
    });
}