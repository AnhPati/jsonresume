jsonresume/
├── index.html              ← page principale avec sélecteurs et rendu du CV
├── data/                   ← fichiers JSON contenant les données de CV
│   ├── default.json        ← contenu du CV (version standard)
│   ├── fake.json           ← données fictives (test/démo)
│   └── freelance.json      ← version orientée freelance
├── doc/                    ← documentation du projet
│   ├── colors.xml          ← référence couleurs pour le design
│   └── structure.md        ← schéma attendu pour les fichiers JSON
├── js/                     ← scripts JavaScript modulaires
│   ├── alert.js            ← affichage des alertes utilisateur
│   ├── loader.js           ← chargement du template et des données
│   ├── print.js            ← export en PDF via window.print()
│   ├── render.js           ← ancien fichier de rendu (à supprimer ?)
│   ├── renderCV.js         ← rendu du CV via Mustache
│   ├── storage.js          ← gestion du localStorage
│   └── uiControls.js       ← interactions UI (boutons, sélecteurs, etc.)
├── styles/                 ← feuilles de style CSS
│   ├── base.css            ← styles communs
│   ├── classic.css         ← styles du template "classic"
│   ├── dark.css            ← version sombre (à venir)
│   ├── modern.css          ← styles du template "modern"
│   └── print.css           ← styles dédiés à l'impression/PDF
├── templates/              ← templates HTML utilisant Mustache.js
│   ├── classic.html        ← template "classic" avec {{placeholders}}
│   └── modern.html         ← template "modern"
└── README.md               ← documentation du projet