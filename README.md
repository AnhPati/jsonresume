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
├── index.html
├── data/
│   └── default.json
├── templates/
│   ├── classic.html
│   └── modern.html
├── styles/
│   ├── base.css
│   ├── classic.css
│   └── modern.css
├── js/
│   ├── renderCV.js
│   ├── loader.js
│   └── alert.js
└── README.md
```

---

## 📄 Licence

Ce projet est open-source sous licence MIT.