jsonresume/
├── index.html          ← page principale
├── data/
│   ├── default.json    ← contenu du CV (version standard)
│   └── freelance.json  ← autre version
├── templates/
│   └── cv.html         ← template HTML avec {{placeholders}}
├── styles/
│   ├── classic.css
│   └── dark.css
└── js/
    └── render.js       ← script pour injecter le JSON dans le template