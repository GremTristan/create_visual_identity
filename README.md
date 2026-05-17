# Cours Identité Visuelle · IA

Application Next.js — déploiement Vercel en 3 minutes.

## Déploiement Vercel

### 1. Prérequis
- Compte [Vercel](https://vercel.com) (gratuit)
- Clé API Anthropic → [console.anthropic.com](https://console.anthropic.com)

### 2. Déployer via GitHub (recommandé)

1. Crée un repo GitHub et pousse ce dossier
2. Va sur [vercel.com/new](https://vercel.com/new)
3. Importe ton repo GitHub
4. Dans **Environment Variables**, ajoute :
   ```
   ANTHROPIC_API_KEY = sk-ant-xxxxxxxxxxxxxxxx
   ```
5. Clique **Deploy** — c'est tout.

### 3. Déployer via CLI (alternatif)

```bash
npm install -g vercel
cd brand-course
npm install
vercel
# Suivre les instructions, ajouter la variable d'env quand demandé
```

### 4. Tester en local

```bash
# Crée un fichier .env.local avec :
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx

npm install
npm run dev
# → http://localhost:3000
```

## Structure

```
brand-course/
├── app/
│   ├── layout.js          # Metadata
│   ├── page.js            # Page principale
│   └── api/chat/route.js  # Proxy Anthropic (clé côté serveur)
├── components/
│   └── CourseApp.jsx      # L'app complète
└── package.json
```

## Notes

- La clé API n'est **jamais exposée** côté client — elle reste dans la route `/api/chat`
- Compatible mobile (iPhone, Android)
- 8 étapes · Tuteur IA · Mode création + étude de cas
