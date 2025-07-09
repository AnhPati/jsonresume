jsonresume/
├── index.html          ← page principale
├── data/
│   ├── default.json    ← contenu du CV (version standard)
│   ├── fake.json
│   └── freelance.json  ← autre version
├── templates/
│   ├── classic.html         ← template HTML avec {{placeholders}}
│   └── modern.html
├── styles/
│   ├── base.css
│   ├── classic.css
│   ├── modern.css
│   ├── print.css
│   └── dark.css
└── js/
    ├── alert.js
    ├── pdf.js
    └── render.js       ← script pour injecter le JSON dans le template