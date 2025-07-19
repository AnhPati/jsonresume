# 📄 Générateur de CV en HTML/CSS/JS

Ce projet permet d’afficher dynamiquement un CV à partir d’un fichier `.json`, en utilisant différents templates visuels.  
Aucune dépendance, aucune installation : tout fonctionne en **HTML/CSS/JS côté client** (100 % statique).

---

## 🚀 Démarrer le projet

### 1. Clonage

```bash
git clone https://github.com/ton-pseudo/jsonresume.git
cd jsonresume
```

Ou télécharge le `.zip` depuis GitHub.

### 2. Lancement

Ouvre simplement le fichier `index.html` dans ton navigateur.

💡 Tu peux aussi utiliser l’extension *Live Server* sur VSCode pour recharger automatiquement la page.

---

## ✏️ Utilisation

### Modifier les données

Les CV sont des fichiers `.json` dans le dossier `data/`.  
Exemple : `data/default.json`

```json
{
  "basics": {
    "firstname": "Jane",
    "lastname": "Doe",
    "email": "jane.doe@email.com"
  },
  "work": [],
  "education": []
}
```

Tu peux en créer d’autres et les sélectionner via l’interface.

### Changer de template

Les templates sont dans le dossier `templates/` et utilisent Mustache :

```html
{{ firstname }} {{ lastname }}
{{#work}}<div>{{ position }}</div>{{/work}}
```

Ajoute le fichier CSS correspondant dans `styles/`.

---

## 🧰 Fonctionnalités principales

- Sélection du CV et du template depuis l’interface
- Rendu dynamique via [Mustache.js](https://github.com/janl/mustache.js)
- Mise en page responsive
- Prévisualisation et impression PDF (via `window.print`)
- Chargement local de fichiers JSON (mode dev)
- Sauvegarde du dernier choix via `localStorage`
- Alerte si le fichier ou le template est manquant

---

## 🌐 Déploiement (GitHub Pages)

1. Pousse le projet sur GitHub
2. Va dans `Settings > Pages`
3. Active GitHub Pages sur la branche `main`
4. Le site sera accessible à l'adresse :  
`https://<ton-username>.github.io/jsonresume/`

---

## 📁 Arborescence

```
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
```

---

## 📄 Licence

Ce projet est open-source sous licence MIT.