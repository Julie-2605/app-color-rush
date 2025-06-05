
# 🎨 App Color Rush

App Color Rush est une **application web ludique** développée avec **Vue 3**, **TypeScript** et **Pinia**. Ce mini-jeu de réflexion et de rapidité propose au joueur de **cliquer sur les ronds correspondant à la bonne couleur le plus vite possible**.

---

## 🚀 Fonctionnalités

- Affichage dynamique d’une consigne avec une couleur cible
- Apparition aléatoire de cercles colorés à cliquer
- Score calculé selon la rapidité et la justesse
- Interface responsive et épurée
- Tests unitaires avec **Vitest** et end-to-end avec **Cypress**

---

## 🧪 Stack technique

- **Vue 3** + **Vite**  
- **TypeScript**  
- **Pinia** (gestion d’état)  
- **Vitest** (tests unitaires)  
- **Cypress** (tests E2E)  
- **ESLint** (analyse statique)  

> ℹ️ Pour une meilleure expérience avec TypeScript + `.vue`, l’extension **Volar** est recommandée dans l’éditeur.

---

## ⚙️ Installation

```bash
npm install
```

---

## 🧑‍💻 Développement

```bash
npm run dev
```

---

## 🏗️ Build production + vérification de types

```bash
npm run build
npx vue-tsc --noEmit
```

---

## ✅ Tests

### Unitaires (Vitest)

```bash
npm run test:unit
```

### End-to-end (Cypress)

Développement rapide :

```bash
npm run test:e2e:dev
```

Mode production (recommandé pour CI) :

```bash
npm run build
npm run test:e2e
```

---

## 🔍 Lint

```bash
npm run lint
```

---

## 📁 Structure du projet

```
src/
├── components/       # Composants Vue (Circle, ConsigneColor, etc.)
├── stores/           # Store Pinia (useGameStore)
├── views/            # Page principale
├── assets/           # Fichiers statiques
└── __tests__/        # Fichiers de tests unitaires
```

---

## 👤 Auteur

Projet réalisé dans un cadre pédagogique (MyDigitalSchool) pour illustrer la qualité logicielle en frontend moderne.  
Licence libre pour usage personnel et éducatif.
