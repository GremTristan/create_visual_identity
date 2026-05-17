# Brand Studio — Identité visuelle

Application Next.js — déploiement Vercel en 3 minutes.

## Déploiement Vercel

### 1. Prérequis
- Compte [Vercel](https://vercel.com) (gratuit)
- Clé API Gemini (gratuite) → [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

### 2. Déployer via GitHub (recommandé)

1. Crée un repo GitHub et pousse ce dossier
2. Va sur [vercel.com/new](https://vercel.com/new)
3. Importe ton repo GitHub
4. Dans **Environment Variables**, ajoute :
   ```
   GEMINI_API_KEY = AIzaSy-xxxxxxxxxxxxxxxx
   ```
5. Clique **Deploy** — c'est tout.

### 3. Déployer via CLI (alternatif)

```bash
npm install -g vercel
npm install
vercel
# Suivre les instructions, ajouter la variable d'env quand demandé
```

### 4. Tester en local

```bash
# Crée un fichier .env.local avec :
GEMINI_API_KEY=AIzaSy-xxxxxxxxxxxxxxxx

npm install
npm run dev
# → http://localhost:3000
```

## Structure

```
├── app/
│   ├── layout.js          # Metadata
│   ├── page.js            # Page principale
│   └── api/chat/route.js  # Proxy Gemini (clé côté serveur)
├── components/
│   └── CourseApp.jsx      # L'app complète
└── package.json
```

## Notes

- La clé API n'est **jamais exposée** côté client — elle reste dans la route `/api/chat`
- Modèle : `gemini-1.5-flash` (tier gratuit Google AI Studio)
- Compatible mobile (iPhone, Android)
- 8 étapes · Guide interactif · Mode création + étude de cas
