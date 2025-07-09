export const showError = (message) => {
    const container = document.getElementById('cv-container');
    container.innerHTML = `
        <div class="alert error">
            ⚠️ ${message}
        </div>
    `;
};

// Tu peux aussi prévoir d'autres types d'alertes si besoin :
export const showInfo = (message) => {
    const container = document.getElementById('cv-container');
    container.innerHTML = `
        <div class="alert info">
            ℹ️ ${message}
        </div>
    `;
};