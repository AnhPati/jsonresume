jsonresume/
├── index.html              ← page principale avec sélecteurs et rendu du CV
|
├── data/                   ← [Fichiers JSON contenant les données de CV]
│   ├── default.json        ← contenu du CV (version standard)
│   ├── fake.json           ← données fictives (test/démo)
│   ├── freelance.json      ← version orientée freelance
│   └── full.json           ← contenu du CV (version complète)
|
├── doc/                    ← [Documentation du projet]
│   ├── colors.xml          ← référence couleurs pour le design
│   └── structure.md        ← structure du projet
|
├── js/                     ← [Scripts JavaScript modulaires]
│   ├── alert.js            ← affichage des alertes utilisateur
│   ├── loader.js           ← chargement du template et des données
│   ├── print.js            ← export en PDF via window.print()
│   ├── render.js           ← ancien fichier de rendu (à supprimer ?)
│   ├── renderCV.js         ← rendu du CV via Mustache
│   ├── storage.js          ← gestion du localStorage
│   └── uiControls.js       ← interactions UI (boutons, sélecteurs, etc.)
|
├── styles/                 ← [Feuilles de style CSS]
│   ├── base.css            ← styles communs
│   ├── classic.css         ← styles du template "classic"
│   ├── dark.css            ← version sombre (à venir)
│   ├── modern.css          ← styles du template "modern"
│   └── print.css           ← styles dédiés à l'impression/PDF
|
├── templates/              ← [Templates HTML utilisant Mustache.js]
│   ├── classic.html        ← template "classic" avec {{placeholders}}
│   └── modern.html         ← template "modern"
|
└── README.md               ← documentation du projet