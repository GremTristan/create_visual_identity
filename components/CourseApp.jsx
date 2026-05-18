"use client";
import { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    name: "Brief de marque", hook: "La Boussole Secrète", tag: "Stratégie",
    intro: "Le brief, c'est ta boussole. Sans lui, tu peux créer un logo magnifique pour la mauvaise cible.",
    iQ_cr: "Avant de commencer — en une phrase : qu'est-ce qu'une marque pour toi ? Qu'est-ce qui la différencie d'un simple logo ?",
    iQ_cs: (b) => `Avant d'analyser ${b} : selon toi, quel est son positionnement ? Qu'est-ce que cette marque cherche à transmettre ?`,
    oQ_cr: "Maintenant que tu vois la structure d'un brief — en une phrase, quel positionnement veux-tu pour ta marque ?",
    oQ_cs: (b) => `Le positionnement de ${b} te semble-t-il cohérent avec ce que tu perçois d'elle au quotidien ?`,
    ex: [
      { e: "🍎", n: "Apple", d: "3 mots résument tout le brief : 'Think Different'. Cible : les créatifs qui se sentent différents. Valeur unique : technologie + design = beauté. Tout découle de là — la boîte, les Apple Stores, les silences dans les pubs. Rien n'est hors brief." },
      { e: "✔️", n: "Nike", d: "'Every athlete' — brief radical : tout le monde est un athlète. Personnalité : coach exigeant qui croit en toi. 'Just Do It' n'est pas un slogan, c'est le brief entier résumé en 3 mots. Chaque campagne depuis 1988 en découle." },
      { e: "🍓", n: "Innocent Drinks", d: "Brief : 'une marque comme un ami qui te veut du bien'. Ton : drôle, humble, direct. Résultat : du texte sur les bouteilles de smoothie qui fait sourire en supermarché. Le brief se lit sur chaque emballage." },
      { e: "🏔️", n: "Patagonia", d: "'We're in business to save our home planet.' Pas de target marketing — juste une mission planétaire. Même leur ligne 'Don't Buy This Jacket' de 2011 respecte le brief. Les clients arrivent en alignement total." },
      { e: "🌸", n: "Glossier", d: "'Skin first, makeup second'. Cible : femmes réelles qui rejettent les standards irréalistes. Ton : amie qui partage ses secrets. Résultat : une communauté soudée, pas juste des clientes. Le brief a créé un mouvement social." },
    ],
    p_cr: "Je veux créer une marque dans [SECTEUR]. Ma cible est [PUBLIC]. Les valeurs clés sont [VALEURS]. Génère-moi un brief de marque structuré avec : positionnement, personnalité, territoire visuel, ton de voix.",
    p_cs: (b) => `Analyse le brief de marque de ${b} : positionnement réel, personnalité, territoire visuel, ton de voix. Identifie les forces et les éventuelles incohérences.`,
    d_cr: ["Brief de marque 1 page", "3 pistes de positionnement", "Mots-clés d'univers visuel"],
    d_cs: ["Brief reconstitué", "Forces et incohérences", "Positionnement déclaré vs perçu"],
  },
  {
    name: "Direction créative", hook: "Avant les Pixels", tag: "Concept",
    intro: "La direction créative, c'est le 'feel' de ta marque avant qu'elle existe visuellement. C'est ici que tout se joue.",
    iQ_cr: "Si ta marque était un lieu dans le monde, ce serait quoi ? (ex: un marché japonais, un loft new-yorkais, une forêt scandinave...) Pourquoi ce lieu ?",
    iQ_cs: (b) => `Si ${b} était un lieu dans le monde, ce serait quoi ? Décris-le en 2-3 phrases.`,
    oQ_cr: "Minimaliste, expressif, organique ou brut — laquelle de ces directions résonne avec ta vision ? Et surtout, pourquoi ?",
    oQ_cs: (b) => `La direction créative de ${b} — tu la qualifierais comment ? Cohérente sur tous ses supports ?`,
    ex: [
      { e: "🏠", n: "Airbnb", d: "Direction : 'Belong Anywhere'. Chaleur, humanité, authenticité locale. Résultat : une esthétique photographique unique reconnaissable sans logo. La direction guide chaque choix créatif depuis 2014 sur 191 pays." },
      { e: "🎵", n: "Spotify", d: "Direction : sombre, musical, culturel. Le fond noir met la musique et les couleurs en avant, comme une scène de concert. Cette direction assumée crée une cohérence globale immédiatement reconnaissable." },
      { e: "🥛", n: "Oatly", d: "Direction : anti-corporate rebellion. Typographie volontairement irrégulière, textes trop longs, humour absurde. Chaque choix 'non-professionnel' est une décision créative calculée par le studio Forsman & Bodenfors." },
      { e: "🧡", n: "Hermès", d: "Direction : artisanat français du XIXe siècle. Cuir, chevaux, Paris. Tout reste ancré dans cet univers — même le site web. Aucune concession à la modernité quand elle contredit la direction. 180 ans de cohérence." },
      { e: "📄", n: "Notion", d: "Direction : 'infinitely customizable blank canvas'. Blanc, minimaliste, presque vide. L'outil se fait oublier pour laisser place à ta pensée. Contre-intuitif dans un secteur tech saturé — et c'est exactement pourquoi ça marche." },
    ],
    p_cr: "Sur la base de ce brief [COLLER BRIEF], génère 3 directions créatives distinctes. Pour chacune : nom, concept, 5 adjectifs visuels, références de secteurs, palette de couleurs suggérée.",
    p_cs: (b) => `Décris la direction créative de ${b} : concept visuel directeur, adjectifs qui la définissent, cohérence sur tous les supports. Qu'est-ce qui prouve que la direction est (ou n'est pas) bien suivie ?`,
    d_cr: ["3 directions nommées et décrites", "Moodboard verbal par direction", "Direction validée"],
    d_cs: ["Direction créative nommée", "Cohérence multi-supports", "Forces et angles morts"],
  },
  {
    name: "Palette de couleurs", hook: "La Couleur qui Vend", tag: "Couleurs",
    intro: "La couleur crée 80% de la reconnaissance d'une marque. En 0,05 secondes, le cerveau l'a mémorisée. Avant même d'avoir lu le nom.",
    iQ_cr: "Quelle couleur associes-tu instinctivement à ta marque ? Décris comment elle te fait sentir — sans justification rationnelle.",
    iQ_cs: (b) => `Quelles couleurs viennent immédiatement en tête quand tu penses à ${b} ? Pourquoi selon toi ?`,
    oQ_cr: "Ta couleur instinctive du départ correspond-elle encore à ce que tu veux transmettre ? Ou elle a évolué ?",
    oQ_cs: (b) => `La palette de ${b} te semble optimale ? Que changerais-tu et pourquoi ?`,
    ex: [
      { e: "🩵", n: "Tiffany & Co.", d: "Pantone 1837 — déposé légalement. Personne d'autre ne peut l'utiliser dans la bijouterie. La couleur EST la marque. Pas besoin de logo sur la boîte bleue : le monde entier sait ce qu'il y a dedans. Valeur estimée : plusieurs milliards." },
      { e: "🔴", n: "Coca-Cola", d: "Rouge Pantone 484 depuis 1886. Associé au blanc, contraste parfait lisible à 50m. Optimisé pour le panneau d'affichage avant même l'invention du web. Vision à 100 ans encodée dans une couleur." },
      { e: "🟠", n: "Hermès", d: "Orange vif + blanc. L'orange est rare dans le luxe. Hermès l'a choisi par accident — pénurie de carton beige en 1942. L'accident est devenu la signature la plus reconnaissable du luxe mondial. Le hasard capitalisé." },
      { e: "💜", n: "Nubank", d: "Violet dans la banque — secteur dominé par le bleu. Message : 'on n'est pas comme les autres banques'. Disruption visuelle = disruption business. Aujourd'hui plus grande néobanque au monde. La couleur était le positionnement." },
      { e: "🩷", n: "Glossier", d: "Rose millennial (#FFC0CB). Provocateur en 2014. Message subliminal : 'nous assumons notre féminité sans excuse'. La couleur était un manifeste politique avant d'être un choix esthétique. Le marché a suivi." },
    ],
    p_cr: "Pour la direction [DIRECTION CHOISIE], crée une palette de marque : 1 couleur primaire, 2 secondaires, 1 accentuation, 1 neutre. Codes HEX, ratios d'usage (60/30/10), psychologie de chaque couleur, combinaisons à éviter.",
    p_cs: (b) => `Analyse la palette de couleurs de ${b} : codes HEX approximatifs, ratios d'usage observés, psychologie des couleurs choisies, cohérence avec le positionnement.`,
    d_cr: ["Palette 5 couleurs + HEX", "Guide d'usage (60/30/10)", "Règles de combinaison"],
    d_cs: ["Palette reconstituée + HEX", "Psychologie analysée", "Cohérence positionnement"],
  },
  {
    name: "Typographie", hook: "Voix Sans Paroles", tag: "Typo",
    intro: "La typographie, c'est la voix écrite de ta marque. Elle parle même quand il n'y a pas d'image. Un texte bien typographié = crédibilité instantanée.",
    iQ_cr: "Si ta marque parlait, elle aurait quelle voix ? Décris-la comme si c'était une personne réelle — son débit, son ton, ses mots.",
    iQ_cs: (b) => `Quelle 'voix' a ${b} ? Si c'était une personne qui parlait, comment parlerait-elle ?`,
    oQ_cr: "Serif (tradition), sans-serif (modernité) ou manuscrite (artisanat) — et pourquoi ce choix dit quelque chose de ta marque ?",
    oQ_cs: (b) => `Les choix typographiques de ${b} correspondent-ils à la 'voix' que tu décrivais au départ ?`,
    ex: [
      { e: "📰", n: "Vogue", d: "Didot — serif ultra-fin à fort contraste. Inventé en 1784, encore utilisé aujourd'hui. Impossible de lire 'Vogue' en Arial — la typographie EST le magazine. Aucune image ne pourrait remplacer ce que la police transmet en une fraction de seconde." },
      { e: "🎬", n: "Netflix", d: "Netflix Sans — police sur-mesure créée en 2018. Avant : des millions en licences annuelles. Investissement unique amorti en 2 ans. Bonus : une police unique que personne d'autre n'a le droit d'utiliser. ROI des polices propriétaires." },
      { e: "🔴", n: "Supreme", d: "Futura Bold Italic en rouge sur blanc. Appliquée sur n'importe quoi (briques, cacahuètes), ça devient instantanément 'Supreme'. Mémorabilité maximale par simplicité radicale. La répétition transforme en identité." },
      { e: "🦉", n: "Duolingo", d: "Feather Bold — arrondie, amicale, non-menaçante. Choix délibéré : apprendre une langue fait peur. La typographie 'douce' dit 'c'est ludique, pas scolaire'. La police combat l'anxiété de l'apprentissage avant le premier mot." },
      { e: "📄", n: "The Guardian", d: "Guardian Egyptian (custom) + Guardian Sans. Rigueur journalistique (serif) + modernité digitale (sans). La typographie raconte leur dualité print/web. Investissement : des centaines de milliers de livres. Justification : la crédibilité." },
    ],
    p_cr: "Pour [NOM DE MARQUE] avec les valeurs [VALEURS], recommande un système typographique : 1 Display, 1 Body, 1 Accent optionnelle. Justifie chaque choix, graisses, taille minimum, alternatives gratuites Google Fonts.",
    p_cs: (b) => `Analyse le système typographique de ${b} : polices utilisées, justification des choix, cohérence avec la personnalité de marque, ce que ce choix dit d'eux.`,
    d_cr: ["Système 2–3 polices justifié", "Hiérarchie typographique", "Spécifications techniques"],
    d_cs: ["Polices identifiées et analysées", "Cohérence avec personnalité", "Alternatives possibles"],
  },
  {
    name: "Création du logo", hook: "L'Image Éternelle", tag: "Logo",
    intro: "Le logo, c'est la pointe de l'iceberg. Il doit fonctionner seul, sans contexte, en noir et blanc, à 16px comme à 10 mètres de distance.",
    iQ_cr: "Ferme les yeux 5 secondes. Visualise le logo de ta marque. Tu vois quoi exactement ? Décris-le sans filtre.",
    iQ_cs: (b) => `Dessine mentalement le logo de ${b}. Qu'est-ce qui le rend reconnaissable sans même lire le nom ?`,
    oQ_cr: "Ton image mentale du départ a-t-elle changé après ces exemples ? Qu'est-ce qui reste, qu'est-ce qui a évolué ?",
    oQ_cs: (b) => `Le logo de ${b} — ce qu'il fait bien, ce qu'il pourrait mieux faire ?`,
    ex: [
      { e: "📦", n: "FedEx", d: "La flèche cachée entre le 'E' et le 'x' — conçue intentionnellement, jamais mentionnée pendant des années. On ne peut plus 'ne pas la voir' une fois repérée. Message subliminal : rapidité, direction, précision. Primée 40 fois." },
      { e: "📦", n: "Amazon", d: "La flèche sourit et va de 'a' à 'z' — on vend tout, de A à Z, et on est heureux de le faire. Un logo qui raconte l'intégralité du business model en une courbe. Simplicité totale, richesse de sens infinie." },
      { e: "🍎", n: "Apple", d: "La pomme croquée = connaissance, curiosité, humanité. Rob Janoff la dessine en 1977 en une semaine. Phil Knight ne l'aimait pas au départ. Presque inchangée depuis 47 ans. Leçon majeure de continuité identitaire." },
      { e: "🏠", n: "Airbnb", d: "Le 'Bélo' (2014) : symbole de personnes, lieux, amour et Airbnb. Controversé à sa sortie. Résultat : mémorabilité maximale via la controverse. La polémique = des millions de personnes qui décortiquent le logo gratuitement." },
      { e: "✔️", n: "Nike", d: "Swoosh dessiné pour 35$ en 1971. 'Il grandira sur moi.' Devenu le logo le plus reconnaissable au monde. Un bon logo n'est pas aimé immédiatement — il devient aimé. La mémorabilité précède l'affection." },
    ],
    p_cr: "Décris 5 concepts de logo pour [NOM DE MARQUE]. Pour chaque concept : type (wordmark/lettermark/symbole/combiné), description visuelle précise, style graphique, sentiment transmis. Puis le prompt Midjourney optimal.",
    p_cs: (b) => `Analyse le logo de ${b} : type, éléments visuels, signification intentionnelle et subliminale. Fonctionne-t-il en monochrome, en très petit format, et sans couleur ?`,
    d_cr: ["5 concepts + prompts Midjourney", "Logo principal vectorisé", "Variantes (carré, N&B)"],
    d_cs: ["Logo décortiqué et analysé", "Significations identifiées", "Polyvalence évaluée"],
  },
  {
    name: "Éléments graphiques", hook: "L'Univers Complet", tag: "Système",
    intro: "Un logo seul ne fait pas une identité. Le système graphique transforme une marque en univers — cohérent, extensible, reconnaissable sans logo.",
    iQ_cr: "Au-delà du logo, quelle texture, motif ou forme tu associes naturellement à ta marque ? (courbes, grilles, taches, lignes...)",
    iQ_cs: (b) => `Au-delà du logo de ${b}, quels éléments graphiques récurrents reconnais-tu ? Motifs, formes, style photo ?`,
    oQ_cr: "Tu vois comment les éléments créent une cohérence sans répéter le logo ? Comment tu appliques ça à ta marque concrètement ?",
    oQ_cs: (b) => `${b} a-t-elle un système graphique fort ou elle repose trop sur son logo ?`,
    ex: [
      { e: "💳", n: "Stripe", d: "Dégradés diagonaux colorés sur fond blanc. Pas un motif figé — une règle (direction diagonale) pas un asset fixe. Liberté totale dans le cadre. Design scalable à l'infini sans jamais ressembler à autre chose que Stripe." },
      { e: "🧡", n: "Hermès", d: "Les carrés de soie sont devenus un élément graphique en eux-mêmes — patterns foisonnants, illustrés à la main, réutilisés sur tous les supports. Un produit qui devient identité graphique. Le système ET le produit phare en même temps." },
      { e: "🐍", n: "Gucci", d: "Monogramme GG + motif rhombus + serpents + tigres + fleurs. Système baroque, superposable, reconnaissable à 100m. La surcharge est intentionnelle depuis Alessandro Michele. Le 'trop' est une direction assumée." },
      { e: "🎨", n: "Figma", d: "Les formes géométriques imbriquées issues du logo déclinées en système complet. Cercles, carrés, triangles qui s'assemblent = métaphore du design collaboratif. Le logo explique l'outil visuellement. Système et produit ont le même ADN." },
      { e: "🎵", n: "Spotify", d: "Les 'sound waves' — ondes sonores vertes dans toutes les campagnes. Pas un logo, pas un motif fixe : une forme en mouvement qui représente la musique. Système évolutif qui peut changer sans que la marque change." },
    ],
    p_cr: "Pour la marque [NOM] : crée un système graphique étendu — 3 motifs/textures, style d'icônes cohérent, règles de mise en page (marges, grilles), style photographique (cadrage, lumière, ton, sujets).",
    p_cs: (b) => `Analyse le système graphique étendu de ${b} : motifs, formes récurrentes, style photo, grilles. Ce système est-il fort et cohérent ? Qu'est-ce qu'on reconnaît sans voir le logo ?`,
    d_cr: ["Bibliothèque d'éléments", "Style photographique", "Règles de mise en page"],
    d_cs: ["Système cartographié", "Cohérence multi-supports", "Lacunes identifiées"],
  },
  {
    name: "Charte graphique", hook: "Le Code Légal", tag: "Charte",
    intro: "La charte, c'est le code légal de ta marque. Sans elle, chaque prestataire réinvente ta marque à sa façon — et au bout d'un an, tu ne la reconnais plus.",
    iQ_cr: "Si quelqu'un d'autre utilisait ta marque sans te demander — qu'est-ce qui serait absolument interdit ? Qu'est-ce qui la tuerait instantanément ?",
    iQ_cs: (b) => `Si ${b} n'avait pas de charte, qu'est-ce qui serait utilisé de manière anarchique en premier ?`,
    oQ_cr: "En voyant ce qu'est une vraie charte — tu vois maintenant la rigueur (ou l'absence) derrière des marques que tu croises ?",
    oQ_cs: (b) => `En observant ${b} sur différents supports — tu vois une charte bien respectée ou des incohérences ?`,
    ex: [
      { e: "🎵", n: "Spotify Brand Guidelines", d: "130 pages publiques sur brand.spotify.com. Les 3 versions du logo autorisées, les 47 couleurs de la palette, les règles photo, les règles d'animation, et une page entière d'interdits avec visuels. La charte montre autant ce qu'on ne fait PAS." },
      { e: "🚀", n: "NASA Graphics Standards Manual", d: "Créée en 1975. Redécouverte en 2015, recréée à l'identique par des fans (250 000$). Preuve qu'une bonne charte traverse les décennies. Référence absolue en design institutionnel. Disponible gratuitement en ligne." },
      { e: "🏠", n: "Airbnb + Cereal", d: "En 2018, Airbnb crée sa propre police (Cereal) et documente l'intégralité de son usage. 5 millions de listings, 191 pays, 10 000 employés — tu ne peux pas improviser la typographie. La charte = scalabilité mondiale garantie." },
      { e: "🍊", n: "Tropicana (l'absence de charte)", d: "En 2009, nouveau logo sans charte ni déploiement documenté. Ventes -20% en 2 mois, 35M$ de pertes, retour forcé. Ce n'est pas le nouveau logo qui a échoué — c'est l'absence de charte pour le déployer correctement." },
      { e: "📰", n: "Le Monde (refonte 2014)", d: "Charte typographique ultra-précise : 6 polices différentes avec règles à la colonne près. La rigueur typographique crédibilise le journalisme. Chaque décision documentée, chaque exception interdite. Design = crédibilité éditoriale." },
    ],
    p_cr: "Génère la structure complète d'une charte graphique pour [NOM DE MARQUE]. Sections : intro marque, logo (usages/interdits), couleurs, typographie, iconographie, photographie, applications (print/digital), ton de voix. Format markdown.",
    p_cs: (b) => `Imagine la charte graphique de ${b} d'après ce que tu observes. Quelles sections ? Quels seraient les 5 points les plus critiques à documenter pour CETTE marque spécifiquement ?`,
    d_cr: ["Charte structurée (10–20p)", "Fichiers sources organisés", "Guide simplifié"],
    d_cs: ["Charte reconstituée", "Points critiques identifiés", "Cohérence évaluée"],
  },
  {
    name: "Test et validation", hook: "Moment de Vérité", tag: "Validation",
    intro: "La validation, c'est le moment de vérité. Pas ton regard — celui de quelqu'un qui ne connaît pas ta marque et n'a aucune raison de t'aimer.",
    iQ_cr: "Si tu montrais ton identité visuelle à quelqu'un qui ne te connaît pas — quelle serait ta plus grande peur ? Qu'est-ce qu'il pourrait dire ?",
    iQ_cs: (b) => `Si tu présentais ${b} à quelqu'un qui ne la connaît pas — qu'est-ce qui serait le plus difficile à justifier visuellement ?`,
    oQ_cr: "Après ces exemples de rebrands réussis et ratés — qu'est-ce qu'il faut tester en priorité pour TA marque ?",
    oQ_cs: (b) => `Après avoir analysé ${b} sur les 8 étapes — quelle serait ta recommandation principale si tu étais leur DA aujourd'hui ?`,
    ex: [
      { e: "❌", n: "Gap (désastre 2010)", d: "Changement de logo sans test utilisateur, sans déploiement progressif. Tollé mondial. Retour à l'ancien logo en 6 jours. Coût estimé : 100M$. Leçon : la vitesse de déploiement n'est pas une vertu. Même les géants testent d'abord." },
      { e: "📱", n: "Instagram (2016)", d: "Passage à l'icône dégradée moderne. Première réaction : haine universelle. 6 mois après : complètement intégré et aimé. Le premier ressenti n'est pas le verdict final. Certains rebrands demandent du temps d'adaptation." },
      { e: "🔴", n: "Mastercard sans texte (2019)", d: "Suppression du mot 'Mastercard' du logo. Tests dans 12 pays sur 2 ans. Résultat : 80% de reconnaissance sans le texte. Permission validée par les données, pas l'intuition. Science, pas art seul." },
      { e: "🔵", n: "Pepsi (rebrand 2023)", d: "Retour au logo 90s — stratégie nostalgie. Testé pendant 3 ans avant déploiement mondial. Meilleure réception en 20 ans. Leçon : les tests longs révèlent la vérité. L'impatience est l'ennemie du bon rebrand." },
      { e: "🍊", n: "Tropicana (2009)", d: "Testé uniquement en focus group — pas en conditions réelles d'achat en magasin. En rayon, le produit devient méconnaissable. Ventes -20% en 2 mois. Leçon : tester dans le contexte réel d'usage, pas en salle stérile." },
    ],
    p_cr: "Joue le rôle d'un DA senior. Évalue cette identité visuelle [DÉCRIRE] sur : cohérence stratégique, mémorabilité, différenciation, accessibilité (WCAG), versatilité (petit/grand, print/digital, N&B). Note /10 avec justification.",
    p_cs: (b) => `Joue le rôle d'un DA senior. Fais un audit complet de ${b} : cohérence stratégique, mémorabilité, différenciation, accessibilité, versatilité. Note /10 par critère avec exemples concrets.`,
    d_cr: ["Audit critique complet", "Corrections prioritaires", "Identité validée"],
    d_cs: ["Audit complet", "Recommandations actionnables", "Synthèse étude de cas"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  bg: "#F8F5FF",
  white: "#FFFFFF",
  p1: "#8B5CF6", p2: "#6D28D9",
  grad: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
  pLight: "#EDE9FE", pBorder: "rgba(139,92,246,0.2)",
  t1: "#0EA5E9", t2: "#0284C7",
  tGrad: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)",
  tLight: "#E0F2FE",
  green: "#22C55E", greenLight: "#DCFCE7", greenDark: "#16A34A",
  greenGrad: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
  amber: "#FBBF24", amberLight: "#FEF3C7", amberDark: "#D97706",
  coral: "#F43F5E", coralLight: "#FFE4E6",
  gold: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
  text: "#0F0A1E", sub: "#374151", muted: "#6B7280", light: "#9CA3AF",
  border: "#E9E4F9",
  shadowSm: "0 2px 8px rgba(109,40,217,0.06)",
  shadow:   "0 8px 32px rgba(109,40,217,0.12), 0 2px 8px rgba(0,0,0,0.06)",
  shadowHover: "0 16px 48px rgba(109,40,217,0.18), 0 4px 12px rgba(0,0,0,0.08)",
  shadowXl: "0 24px 64px rgba(109,40,217,0.22), 0 8px 24px rgba(0,0,0,0.10)",
  glow: "0 0 40px rgba(139,92,246,0.4)",
  spring: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  springBounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  springSnap: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
};

// ─────────────────────────────────────────────────────────────────────────────
// API
// ─────────────────────────────────────────────────────────────────────────────

async function callTutor(messages, system) {
  const r = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, system }),
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error);
  return d.content?.find((b) => b.type === "text")?.text || "Continue — tu es sur la bonne voie.";
}

function buildSystem(stepName, mode, brand, phase) {
  return `Tu es un mentor bienveillant en identité visuelle de marque.

RÈGLES :
- Toujours en français
- Maximum 90 mots par réponse
- Valider l'effort avant de guider
- 1 exemple concret de vraie marque dans chaque réponse
- Ne jamais donner la réponse directement — guider vers elle
- Terminer par une question courte OU un encouragement fort
- Jamais de "Super!" ou "Excellent!" seuls
- Ton : direct, chaleureux, précis

CONTEXTE :
Étape : ${stepName}
Mode : ${mode === "casestudy" ? `Étude de cas "${brand}"` : "Création de marque"}
Phase : ${phase === "intro" ? "Première impression (ouverture)" : "Dernière impression (réflexion après contenu)"}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────

const ICON_LAYERS = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
);
const ICON_SEND = (color = "#fff") => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4 20-7z" /><path d="M22 2 11 13" />
  </svg>
);
const ICON_CHECK = (color = "#fff", size = 12) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const ICON_ARROW = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);
const ICON_BACK = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);
const ICON_SPARK = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
  </svg>
);
const ICON_CHAT = (color = "#fff") => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const ICON_RETRY = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// AMBIENT PARTICLES (landing + completion)
// ─────────────────────────────────────────────────────────────────────────────

const PARTICLE_CONFIGS = [
  { x: 8,  y: 12, size: 220, dur: 9,  delay: 0,   color: "rgba(139,92,246,0.07)"  },
  { x: 82, y: 8,  size: 170, dur: 13, delay: 2.5, color: "rgba(14,165,233,0.06)"  },
  { x: 55, y: 75, size: 190, dur: 11, delay: 1,   color: "rgba(139,92,246,0.05)"  },
  { x: 92, y: 60, size: 140, dur: 15, delay: 4,   color: "rgba(34,197,94,0.05)"   },
  { x: 20, y: 80, size: 160, dur: 10, delay: 3,   color: "rgba(14,165,233,0.05)"  },
  { x: 70, y: 30, size: 200, dur: 12, delay: 1.5, color: "rgba(139,92,246,0.06)"  },
  { x: 35, y: 45, size: 130, dur: 14, delay: 5,   color: "rgba(251,191,36,0.04)"  },
  { x: 5,  y: 55, size: 180, dur: 8,  delay: 2,   color: "rgba(139,92,246,0.04)"  },
];

function AmbientParticles() {
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {PARTICLE_CONFIGS.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
          animation: `particleFloat ${p.dur}s ${p.delay}s infinite ease-in-out`,
          transform: "translate(-50%, -50%)",
        }} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SESSION STORAGE
// ─────────────────────────────────────────────────────────────────────────────

const SESSION_KEY = "brandstudio_v2";

function saveSession(data) {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(data)); } catch {}
}
function loadSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
}
function clearSession() {
  try { localStorage.removeItem(SESSION_KEY); } catch {}
}

// ─────────────────────────────────────────────────────────────────────────────
// PRESS PHYSICS HANDLER
// ─────────────────────────────────────────────────────────────────────────────

function pressPhysics(e) {
  const el = e.currentTarget;
  el.style.transform = "scale(0.96)";
  el.style.transition = `transform 80ms ${C.springSnap}`;
  const up = () => {
    el.style.transform = "scale(1.02)";
    el.style.transition = `transform 80ms ${C.springBounce}`;
    setTimeout(() => {
      el.style.transform = "scale(1)";
      el.style.transition = `all 220ms ${C.spring}`;
    }, 80);
    el.removeEventListener("mouseup", up);
    el.removeEventListener("mouseleave", up);
  };
  el.addEventListener("mouseup", up);
  el.addEventListener("mouseleave", up);
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function CourseApp() {
  const [mode,         setMode]         = useState(null);
  const [brandInput,   setBrandInput]   = useState("");
  const [brand,        setBrand]        = useState("");
  const [step,         setStep]         = useState(0);
  const [phase,        setPhase]        = useState("intro");
  const [msgs,         setMsgs]         = useState([]);
  const [input,        setInput]        = useState("");
  const [loading,      setLoading]      = useState(false);
  const [openDone,     setOpenDone]     = useState(false);
  const [closeDone,    setCloseDone]    = useState(false);
  const [done,         setDone]         = useState(new Set());
  const [showEx,       setShowEx]       = useState(false);
  const [copied,       setCopied]       = useState(false);
  const [finished,     setFinished]     = useState(false);
  const [streamText,   setStreamText]   = useState("");
  const [isStreaming,  setIsStreaming]   = useState(false);
  const [aiGlow,       setAiGlow]       = useState(false);
  const [retryMsg,     setRetryMsg]     = useState(null);
  const [hoveredMode,  setHoveredMode]  = useState(null);
  const [savedSession, setSavedSession] = useState(null);
  const [floodStep,    setFloodStep]    = useState(false);
  const [midpoint,     setMidpoint]     = useState(false);
  const [midpointDone, setMidpointDone] = useState(false);
  const [progressDisp, setProgressDisp] = useState(0);

  const endRef       = useRef(null);
  const streamRef    = useRef(null);
  const sessionStart = useRef(Date.now());

  // ── Session: load on mount ──────────────────────────────────────
  useEffect(() => {
    const s = loadSession();
    if (s && (s.step > 0 || (s.done && s.done.length > 0))) {
      setSavedSession(s);
    }
  }, []);

  // ── Session: save on state change ──────────────────────────────
  useEffect(() => {
    if (!mode) return;
    saveSession({ mode, brand, step, phase, done: [...done], finished });
  }, [mode, brand, step, phase, done, finished]);

  // ── Reset conversation when step/phase changes ──────────────────
  useEffect(() => {
    if (streamRef.current) { clearInterval(streamRef.current); streamRef.current = null; }
    setStreamText(""); setIsStreaming(false);
    setMsgs([]); setInput("");
    setOpenDone(false); setCloseDone(false); setShowEx(false);
    setRetryMsg(null);
  }, [step, phase]);

  // ── Scroll to latest message ────────────────────────────────────
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading, streamText]);

  // ── Progress overshoot ──────────────────────────────────────────
  useEffect(() => {
    const target = (done.size / STEPS.length) * 100;
    if (target > progressDisp) {
      const overshoot = Math.min(target + 4, 100);
      setProgressDisp(overshoot);
      setTimeout(() => setProgressDisp(target), 380);
    }
  }, [done.size]);

  // ── Midpoint dopamine hit (after completing step 4) ─────────────
  useEffect(() => {
    if (done.size === 4 && !midpointDone) {
      setMidpoint(true); setMidpointDone(true);
      setTimeout(() => setMidpoint(false), 3800);
    }
  }, [done.size]);

  // ── Cleanup on unmount ──────────────────────────────────────────
  useEffect(() => {
    return () => { if (streamRef.current) clearInterval(streamRef.current); };
  }, []);

  // ── Streaming word-by-word renderer ────────────────────────────
  const streamResponse = (text, glow = false) => {
    if (streamRef.current) clearInterval(streamRef.current);
    setIsStreaming(true);
    setStreamText("");
    if (glow) setAiGlow(true);
    const words = text.split(" ");
    let i = 0;
    streamRef.current = setInterval(() => {
      if (i >= words.length) {
        clearInterval(streamRef.current);
        streamRef.current = null;
        setIsStreaming(false);
        setStreamText("");
        setMsgs((p) => [...p, { role: "assistant", content: text }]);
        if (glow) setTimeout(() => setAiGlow(false), 2200);
        return;
      }
      setStreamText((p) => (i === 0 ? "" : p + " ") + words[i]);
      i++;
    }, 32);
  };

  // ── Send message ────────────────────────────────────────────────
  const send = async (overrideInput) => {
    const val = (overrideInput ?? input).trim();
    if (!val || loading || isStreaming) return;
    setInput("");
    setRetryMsg(null);
    const question = phase === "intro"
      ? (mode === "casestudy" ? s.iQ_cs(brand) : s.iQ_cr)
      : (mode === "casestudy" ? s.oQ_cs(brand) : s.oQ_cr);
    const apiMsgs = [
      ...msgs.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: msgs.length === 0 ? `[Question: "${question}"]\nMa réponse: ${val}` : val },
    ];
    setMsgs((p) => [...p, { role: "user", content: val }]);
    setLoading(true);
    const t0 = Date.now();
    try {
      const reply = await callTutor(apiMsgs, buildSystem(s.name, mode, brand, phase));
      const elapsed = Date.now() - t0;
      const minDelay = 900;
      if (elapsed < minDelay) await new Promise((r) => setTimeout(r, minDelay - elapsed));
      if (phase === "intro") setOpenDone(true);
      if (phase === "outro") setCloseDone(true);
      setLoading(false);
      streamResponse(reply, Math.random() < 0.2);
    } catch {
      setLoading(false);
      setRetryMsg(val);
      setMsgs((p) => [...p, { role: "assistant", content: "__error__" }]);
    }
  };

  // ── Step complete with flood animation ──────────────────────────
  const nextStep = () => {
    setFloodStep(true);
    setTimeout(() => {
      setFloodStep(false);
      setDone((p) => new Set([...p, step]));
      if (step < STEPS.length - 1) { setStep(step + 1); setPhase("intro"); }
      else { setFinished(true); }
    }, 550);
  };

  const copy = () => {
    navigator.clipboard?.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const resumeSession = () => {
    if (!savedSession) return;
    const s = savedSession;
    setMode(s.mode); setBrand(s.brand || ""); setBrandInput(s.brand || "");
    setStep(s.step || 0); setPhase(s.phase || "intro");
    setDone(new Set(s.done || []));
    if (s.finished) setFinished(true);
    setSavedSession(null);
  };

  // ── Computed ────────────────────────────────────────────────────
  const s         = STEPS[step];
  const isIntro   = phase === "intro";
  const isDone    = isIntro ? openDone : closeDone;
  const prompt    = mode === "casestudy" ? s.p_cs(brand) : s.p_cr;
  const dels      = mode === "casestudy" ? s.d_cs : s.d_cr;
  const pGrad     = mode === "casestudy" ? C.tGrad : C.grad;
  const pLight    = mode === "casestudy" ? C.tLight : C.pLight;
  const pColor    = mode === "casestudy" ? C.t1 : C.p1;
  const phaseGrad = isIntro ? pGrad : C.greenGrad;
  const phaseColor = isIntro ? pColor : C.green;

  // ── Shared style objects ────────────────────────────────────────
  const card = {
    background: C.white, border: `1.5px solid ${C.border}`,
    borderRadius: 20, boxShadow: C.shadowSm,
    padding: "22px 26px", marginBottom: 14,
    transition: `box-shadow 220ms ${C.spring}, transform 220ms ${C.spring}`,
  };
  const btnBase = {
    fontFamily: "system-ui,sans-serif", cursor: "pointer",
    borderRadius: 14, fontSize: 14, fontWeight: 700,
    padding: "13px 24px", border: "none",
    display: "inline-flex", alignItems: "center", gap: 8,
    transition: `all 220ms ${C.spring}`, letterSpacing: "-0.01em",
    userSelect: "none",
  };
  const btnPrimary = { ...btnBase, background: pGrad, color: "#fff", boxShadow: `0 4px 16px ${pColor}40` };
  const btnGreen   = { ...btnBase, background: C.greenGrad, color: "#fff", boxShadow: "0 4px 16px #22C55E40" };
  const btnGhost   = { ...btnBase, background: C.pLight, color: C.p1, border: `1.5px solid ${C.pBorder}` };

  const lift = (e) => {
    e.currentTarget.style.transform = "translateY(-3px)";
    e.currentTarget.style.boxShadow = C.shadowHover;
  };
  const drop = (e) => {
    e.currentTarget.style.transform = "";
    e.currentTarget.style.boxShadow = C.shadowSm;
  };

  // ─────────────────────────────────────────────────────────────────
  // LANDING
  // ─────────────────────────────────────────────────────────────────
  if (!mode) return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 20px", fontFamily: "system-ui,sans-serif", position: "relative", overflow: "hidden" }}>
      <AmbientParticles />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480, display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 28px ${C.p1}55`, animation: "breathe 3.6s ease-in-out infinite" }}>
            {ICON_LAYERS}
          </div>
          <span style={{ fontSize: 20, fontWeight: 900, color: C.text, letterSpacing: "-0.03em" }}>Brand Studio</span>
        </div>

        {/* Return state banner */}
        {savedSession && (
          <div
            onClick={resumeSession}
            style={{ width: "100%", background: C.white, border: `1.5px solid ${C.pBorder}`, borderRadius: 18, padding: "14px 20px", marginBottom: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: C.shadowSm, transition: `all 220ms ${C.spring}`, animation: "slideUp 400ms both" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = C.shadow; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = `${C.p1}50`; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = C.shadowSm; e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = C.pBorder; }}
            onMouseDown={pressPhysics}
          >
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: C.p1, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Session sauvegardée</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>
                Continuer avec {savedSession.brand || "ta marque"} — étape {(savedSession.step || 0) + 1}/{STEPS.length}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ height: 4, width: 60, background: C.border, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${((savedSession.done?.length || 0) / STEPS.length) * 100}%`, background: C.greenGrad, borderRadius: 2 }} />
              </div>
              {ICON_ARROW}
            </div>
          </div>
        )}

        {/* Headline */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.pLight, borderRadius: 99, padding: "5px 14px", marginBottom: 18, fontSize: 12, fontWeight: 700, color: C.p1, letterSpacing: "0.02em", animation: "slideUp 350ms both" }}>
            {ICON_SPARK} 8 étapes guidées par l'IA
          </div>
          <h1 style={{ fontSize: "clamp(28px, 6vw, 38px)", fontWeight: 900, color: C.text, margin: "0 0 14px", letterSpacing: "-0.04em", lineHeight: 1.15, animation: "slideUp 400ms 60ms both" }}>
            {"Construis une identité".split(" ").map((w, i) => (
              <span key={i} style={{ display: "inline-block", animation: `heroWord 500ms ${80 + i * 70}ms both` }}>{w}&nbsp;</span>
            ))}
            <br />
            <span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {"visuelle qui marque".split(" ").map((w, i) => (
                <span key={i} style={{ display: "inline-block", animation: `heroWord 500ms ${360 + i * 70}ms both` }}>{w}&nbsp;</span>
              ))}
            </span>
          </h1>
          <p style={{ fontSize: 15, color: C.muted, margin: 0, lineHeight: 1.7, animation: "slideUp 450ms 500ms both" }}>
            Exemples de vraies marques · Prompts IA prêts · Coach interactif
          </p>
        </div>

        {/* Mode cards */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12, animation: "slideUp 450ms 600ms both" }}>
          {[
            { id: "create", emoji: "✦", grad: C.grad,  glow: C.p1, title: "Créer ma marque",  desc: "Construis une identité visuelle de A à Z avec un coach à chaque étape.", badge: "Création" },
            { id: "setup",  emoji: "◎", grad: C.tGrad, glow: C.t1, title: "Étude de cas",      desc: "Analyse une marque existante pour décoder ses choix créatifs en profondeur.", badge: "Analyse" },
          ].map((opt) => {
            const isDimmed = hoveredMode && hoveredMode !== opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => setMode(opt.id)}
                onMouseEnter={() => setHoveredMode(opt.id)}
                onMouseLeave={() => setHoveredMode(null)}
                onMouseDown={pressPhysics}
                style={{
                  background: C.white, border: `1.5px solid ${hoveredMode === opt.id ? opt.glow + "50" : C.border}`,
                  borderRadius: 22, padding: "20px 22px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 18,
                  boxShadow: hoveredMode === opt.id ? `0 12px 40px ${opt.glow}25` : C.shadowSm,
                  transform: hoveredMode === opt.id ? "translateY(-3px)" : isDimmed ? "scale(0.99)" : "",
                  opacity: isDimmed ? 0.6 : 1,
                  filter: isDimmed ? "blur(0.5px)" : "none",
                  transition: `all 220ms ${C.spring}`,
                }}
              >
                <div style={{ width: 54, height: 54, borderRadius: 17, background: opt.grad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 22, color: "#fff", boxShadow: `0 6px 20px ${opt.glow}45`, fontWeight: 700 }}>
                  {opt.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: C.text, letterSpacing: "-0.02em" }}>{opt.title}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", background: opt.grad, borderRadius: 8, padding: "2px 9px", letterSpacing: "0.05em", textTransform: "uppercase" }}>{opt.badge}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.55 }}>{opt.desc}</p>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.light} strokeWidth="2" style={{ flexShrink: 0 }}>
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            );
          })}
        </div>

        {/* Stats + social proof */}
        <div style={{ marginTop: 44, display: "flex", flexDirection: "column", alignItems: "center", gap: 16, animation: "slideUp 450ms 750ms both" }}>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
            {[["40+", "exemples de marques"], ["8", "prompts IA"], ["100%", "gratuit"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: C.p1, letterSpacing: "-0.03em" }}>{n}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: C.light, display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, boxShadow: `0 0 6px ${C.green}` }} />
            1 247 identités créées cette semaine
          </div>
        </div>

        {savedSession && (
          <button
            onClick={() => { clearSession(); setSavedSession(null); }}
            style={{ marginTop: 16, background: "none", border: "none", color: C.light, fontSize: 12, cursor: "pointer", fontFamily: "system-ui,sans-serif" }}
          >
            Repartir de zéro
          </button>
        )}
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────
  // BRAND INPUT
  // ─────────────────────────────────────────────────────────────────
  if (mode === "setup") return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 20px", fontFamily: "system-ui,sans-serif", position: "relative", overflow: "hidden" }}>
      <AmbientParticles />
      <div style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1, animation: "slideUp 400ms both" }}>
        <button
          onClick={() => setMode(null)}
          style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 13, fontWeight: 700, marginBottom: 36, padding: 0, fontFamily: "system-ui,sans-serif", display: "flex", alignItems: "center", gap: 6, transition: `color 150ms`, }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
        >
          {ICON_BACK} Retour
        </button>

        <div style={{ width: 54, height: 54, borderRadius: 17, background: C.tGrad, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: `0 8px 28px ${C.t1}45`, fontSize: 24 }}>◎</div>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: C.text, margin: "0 0 8px", letterSpacing: "-0.03em" }}>Quelle marque analyser ?</h2>
        <p style={{ margin: "0 0 28px", fontSize: 14, color: C.muted, lineHeight: 1.65 }}>
          Choisis une marque qui t'inspire — locale, nationale ou mondiale.
        </p>

        <input
          value={brandInput}
          onChange={(e) => setBrandInput(e.target.value)}
          placeholder="ex: Apple, Patagonia, Jacquemus..."
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && brandInput.trim()) { setBrand(brandInput.trim()); setMode("casestudy"); setStep(0); setPhase("intro"); }
          }}
          style={{ width: "100%", background: C.white, border: `2px solid ${C.border}`, borderRadius: 14, padding: "15px 18px", color: C.text, fontSize: 15, outline: "none", fontFamily: "system-ui,sans-serif", marginBottom: 12, boxSizing: "border-box", fontWeight: 500, transition: `border-color 150ms ${C.spring}, box-shadow 150ms ${C.spring}, transform 150ms ${C.spring}` }}
          onFocus={(e) => { e.target.style.borderColor = C.t1; e.target.style.boxShadow = `0 0 0 4px ${C.t1}18`; e.target.style.transform = "translateY(-1px)"; }}
          onBlur={(e)  => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; e.target.style.transform = ""; }}
        />

        <button
          onClick={() => { if (brandInput.trim()) { setBrand(brandInput.trim()); setMode("casestudy"); setStep(0); setPhase("intro"); } }}
          style={{ ...btnBase, background: C.tGrad, color: "#fff", width: "100%", justifyContent: "center", boxShadow: `0 6px 20px ${C.t1}40`, animation: "ctaPulse 4s 4s infinite ease-in-out" }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 32px ${C.t1}55`; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 6px 20px ${C.t1}40`; }}
          onMouseDown={pressPhysics}
        >
          Analyser {brandInput || "cette marque"} {ICON_ARROW}
        </button>

        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.light, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>Suggestions populaires</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Apple", "Nike", "Airbnb", "Patagonia", "Spotify", "Glossier"].map((b) => (
              <button
                key={b}
                onClick={() => setBrandInput(b)}
                onMouseDown={pressPhysics}
                style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "7px 16px", fontSize: 13, color: C.sub, cursor: "pointer", fontFamily: "system-ui,sans-serif", fontWeight: 600, transition: `all 150ms ${C.spring}` }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.t1; e.currentTarget.style.color = C.t1; e.currentTarget.style.background = C.tLight; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.sub; e.currentTarget.style.background = C.white; e.currentTarget.style.transform = ""; }}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────
  // COMPLETION CEREMONY
  // ─────────────────────────────────────────────────────────────────
  if (finished) {
    const durationMin = Math.round((Date.now() - sessionStart.current) / 60000);
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "system-ui,sans-serif", position: "relative", overflow: "hidden" }}>
        <AmbientParticles />

        {/* Confetti */}
        {["#8B5CF6","#0EA5E9","#22C55E","#FBBF24","#F43F5E","#6D28D9","#0284C7","#16A34A"].map((col, i) => (
          <div key={i} style={{
            position: "fixed", top: "-20px",
            left: `${10 + i * 11}%`,
            width: 8 + (i % 3) * 4, height: 8 + (i % 3) * 4,
            borderRadius: i % 2 === 0 ? "50%" : 2,
            background: col, opacity: 0,
            animation: `confettiFall ${2.5 + (i % 3) * 0.8}s ${i * 0.15}s both`,
            zIndex: 5, pointerEvents: "none",
          }} />
        ))}

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 520, width: "100%", animation: "slideUp 600ms both" }}>

          {/* Badge */}
          <div style={{ width: 88, height: 88, borderRadius: "50%", background: C.greenGrad, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: `0 16px 48px ${C.green}50`, animation: "celebBadge 700ms ${C.springBounce} both" }}>
            {ICON_CHECK("#fff", 36)}
          </div>

          <h2 style={{ fontSize: "clamp(26px, 6vw, 40px)", fontWeight: 900, color: C.text, margin: "0 0 8px", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
            {mode === "casestudy"
              ? <>{brand} <span style={{ background: C.tGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>décortiquée</span></>
              : <>Identité <span style={{ background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>complète</span></>
            }
          </h2>
          <p style={{ fontSize: 15, color: C.muted, margin: "0 0 36px", lineHeight: 1.7 }}>
            Tu vois maintenant les décisions derrière chaque choix visuel de marque.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 36, flexWrap: "wrap" }}>
            {[["8", "étapes"], [durationMin || "~7", "minutes"], ["100%", "complété"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 16, padding: "14px 22px", boxShadow: C.shadowSm }}>
                <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.04em", background: C.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Step checklist */}
          <div style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: "20px 24px", marginBottom: 32, boxShadow: C.shadowSm, textAlign: "left" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>8 piliers construits</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px" }}>
              {STEPS.map((st, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: C.greenGrad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px #22C55E40" }}>
                    {ICON_CHECK("#fff", 9)}
                  </div>
                  <span style={{ fontSize: 12, color: C.sub, fontWeight: 600 }}>{st.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={() => { clearSession(); setMode(null); setStep(0); setPhase("intro"); setDone(new Set()); setFinished(false); setBrand(""); setBrandInput(""); setProgressDisp(0); setMidpointDone(false); sessionStart.current = Date.now(); }}
              style={btnPrimary}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 32px ${pColor}50`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 4px 16px ${pColor}40`; }}
              onMouseDown={pressPhysics}
            >
              Recommencer
            </button>
            <button
              onClick={() => { setStep(0); setPhase("intro"); setDone(new Set()); setFinished(false); setProgressDisp(0); setMidpointDone(false); sessionStart.current = Date.now(); }}
              style={btnGhost}
              onMouseDown={pressPhysics}
            >
              Revoir depuis le début
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────
  // MAIN COURSE LOOP
  // ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "system-ui,sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── MIDPOINT TOAST ── */}
      {midpoint && (
        <div style={{
          position: "fixed", bottom: 100, right: 20, zIndex: 100,
          background: C.white, border: `1.5px solid ${C.amberDark}30`,
          borderRadius: 16, padding: "14px 20px", boxShadow: C.shadowHover,
          display: "flex", alignItems: "center", gap: 12,
          animation: "toastIn 400ms both",
          maxWidth: 280,
        }}>
          <div style={{ fontSize: 24 }}>🔥</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.text }}>À mi-chemin !</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>4 piliers définis · Continue sur ta lancée</div>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(248,245,255,0.96)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `1.5px solid ${C.border}` }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", gap: 14, height: 60 }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: C.grad, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 12px ${C.p1}50`, animation: "breathe 3.6s ease-in-out infinite" }}>
              {ICON_LAYERS}
            </div>
            <span style={{ fontSize: 14, fontWeight: 900, color: C.text, letterSpacing: "-0.02em" }}>Brand Studio</span>
          </div>

          {/* Stepper */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            {STEPS.map((st, i) => {
              const isComp = done.has(i);
              const isCurr = i === step;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                  <div
                    onClick={() => { setStep(i); setPhase("intro"); }}
                    title={st.hook}
                    style={{
                      width: 28, height: 28, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: isComp ? C.greenGrad : isCurr ? pGrad : C.white,
                      border: `2px solid ${isComp ? C.green : isCurr ? pColor : C.border}`,
                      color: isComp || isCurr ? "#fff" : C.light,
                      fontSize: 11, fontWeight: 800, cursor: "pointer", flexShrink: 0,
                      transition: `all 280ms ${C.spring}`,
                      boxShadow: isCurr ? `0 4px 14px ${pColor}55, 0 0 0 4px ${pColor}15` : isComp ? "0 4px 14px #22C55E40" : "none",
                      animation: isCurr ? "breathe 3.6s ease-in-out infinite" : "none",
                      transform: isCurr ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    {isComp ? ICON_CHECK("#fff", 11) : i + 1}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ width: 11, height: 2.5, background: C.border, borderRadius: 2, flexShrink: 0, overflow: "hidden", position: "relative" }}>
                      <div style={{ position: "absolute", inset: 0, background: C.greenGrad, transform: `scaleX(${done.has(i) ? 1 : 0})`, transformOrigin: "left", transition: `transform 400ms ${C.spring}`, borderRadius: 2 }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mode + brand badge */}
          <div style={{ flexShrink: 0, fontSize: 11, fontWeight: 800, color: "#fff", background: pGrad, borderRadius: 10, padding: "5px 12px", letterSpacing: "0.02em", boxShadow: `0 4px 12px ${pColor}40`, maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {mode === "casestudy" ? brand : "Création"}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 3, background: C.border, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progressDisp}%`, background: C.greenGrad, transition: `width 380ms ${C.spring}`, borderRadius: "0 2px 2px 0", boxShadow: progressDisp > 0 ? "2px 0 8px #22C55E60" : "none" }} />
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "28px 20px 160px", maxWidth: 760, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

        {/* Step header with flood animation */}
        <div style={{ marginBottom: 24, position: "relative", overflow: "hidden", borderRadius: 16, padding: "18px 22px", background: C.white, border: `1.5px solid ${C.border}`, boxShadow: C.shadowSm }}>
          {floodStep && (
            <div style={{ position: "absolute", inset: 0, background: C.greenGrad, borderRadius: 16, transformOrigin: "left", animation: "floodIn 550ms both", zIndex: 1 }} />
          )}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", background: `linear-gradient(135deg, ${C.amber} 0%, ${C.amberDark} 100%)`, borderRadius: 8, padding: "3px 12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {s.tag}
              </span>
              <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>Étape {step + 1} / {STEPS.length}</span>
              <span style={{ fontSize: 12, color: C.light, fontWeight: 600, marginLeft: "auto" }}>{s.hook}</span>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: floodStep ? "#fff" : C.text, margin: 0, letterSpacing: "-0.03em", transition: `color 200ms` }}>{s.name}</h2>
          </div>
        </div>

        {/* ── Q&A PHASES ── */}
        {(phase === "intro" || phase === "outro") && (
          <>
            {/* Question card */}
            <div
              style={{ ...card, borderLeft: `4px solid ${phaseColor}`, background: `linear-gradient(135deg, ${C.white} 0%, ${pLight}55 100%)`, animation: "slideUp 350ms both" }}
              onMouseEnter={lift} onMouseLeave={drop}
            >
              <div style={{ fontSize: 10, fontWeight: 800, background: phaseGrad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
                {isIntro ? "✦ Avant de commencer" : "✦ Pour aller plus loin"}
              </div>
              <p style={{ fontSize: 15, color: C.text, margin: 0, lineHeight: 1.8, fontWeight: 500 }}>
                {phase === "intro"
                  ? (mode === "casestudy" ? s.iQ_cs(brand) : s.iQ_cr)
                  : (mode === "casestudy" ? s.oQ_cs(brand) : s.oQ_cr)}
              </p>
            </div>

            {/* Messages */}
            {msgs.map((m, i) => {
              const isErr = m.content === "__error__";
              return (
                <div key={i} style={{ marginBottom: 12, display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 10, animation: "slideUp 280ms both" }}>
                  {m.role === "assistant" && (
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: phaseGrad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 4px 12px ${phaseColor}40` }}>
                      {ICON_CHAT()}
                    </div>
                  )}
                  <div style={{
                    maxWidth: "78%",
                    background: isErr ? C.coralLight : m.role === "user" ? phaseGrad : C.white,
                    border: `1.5px solid ${isErr ? C.coral + "40" : m.role === "user" ? "transparent" : C.border}`,
                    borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    padding: "13px 18px",
                    boxShadow: m.role === "user" ? `0 6px 20px ${phaseColor}30` : aiGlow && i === msgs.length - 1 ? C.glow : C.shadowSm,
                    transition: `box-shadow 300ms ${C.spring}`,
                  }}>
                    {isErr ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <p style={{ fontSize: 13, color: C.coral, margin: 0 }}>Erreur réseau. Réessaye ?</p>
                        <button
                          onClick={() => { setMsgs((p) => p.slice(0, -1)); if (retryMsg) send(retryMsg); }}
                          style={{ background: "none", border: `1px solid ${C.coral}60`, borderRadius: 8, padding: "4px 10px", fontSize: 12, color: C.coral, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "system-ui,sans-serif", flexShrink: 0 }}
                        >
                          {ICON_RETRY} Retry
                        </button>
                      </div>
                    ) : (
                      <p style={{ fontSize: 14, color: m.role === "user" ? "#fff" : C.text, margin: 0, lineHeight: 1.75 }}>{m.content}</p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Streaming bubble */}
            {isStreaming && (
              <div style={{ marginBottom: 12, display: "flex", justifyContent: "flex-start", alignItems: "flex-end", gap: 10, animation: "slideUp 200ms both" }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: phaseGrad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: aiGlow ? C.glow : `0 4px 12px ${phaseColor}40`, transition: `box-shadow 400ms` }}>
                  {ICON_CHAT()}
                </div>
                <div style={{ maxWidth: "78%", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: "18px 18px 18px 4px", padding: "13px 18px", boxShadow: aiGlow ? C.glow : C.shadowSm, transition: `box-shadow 400ms` }}>
                  <p style={{ fontSize: 14, color: C.text, margin: 0, lineHeight: 1.75 }}>
                    {streamText}
                    <span style={{ display: "inline-block", width: 2, height: 13, background: phaseColor, marginLeft: 2, verticalAlign: "text-bottom", animation: "cursorBlink 800ms infinite" }} />
                  </p>
                </div>
              </div>
            )}

            {/* Loading — typing indicator */}
            {loading && !isStreaming && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 12, animation: "slideUp 200ms both" }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: phaseGrad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {ICON_CHAT()}
                </div>
                <div style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: "18px 18px 18px 4px", padding: "14px 20px", display: "flex", gap: 5, boxShadow: C.shadowSm }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: phaseColor, animation: `blink 1.2s ${i * 0.22}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />

            {/* Continue button */}
            {isDone && !loading && !isStreaming && (
              <button
                onClick={isIntro ? () => setPhase("content") : nextStep}
                style={{ ...btnPrimary, marginTop: 10, animation: "slideUp 300ms both" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 32px ${pColor}50`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 4px 16px ${pColor}40`; }}
                onMouseDown={pressPhysics}
              >
                {isIntro
                  ? "Voir le cours"
                  : step < STEPS.length - 1
                    ? `Étape suivante : ${STEPS[step + 1].hook}`
                    : "Terminer le cours ✦"}
                {ICON_ARROW}
              </button>
            )}
          </>
        )}

        {/* ── CONTENT PHASE ── */}
        {phase === "content" && (
          <>
            <div
              style={{ ...card, background: `linear-gradient(135deg, ${C.white} 60%, ${pLight}70 100%)`, animation: "slideUp 300ms both" }}
              onMouseEnter={lift} onMouseLeave={drop}
            >
              <p style={{ fontSize: 15, color: C.text, margin: 0, lineHeight: 1.85, fontWeight: 500 }}>{s.intro}</p>
            </div>

            {/* Examples accordion */}
            <div style={{ marginBottom: 14, animation: "slideUp 350ms 60ms both" }}>
              <button
                onClick={() => setShowEx(!showEx)}
                style={{ width: "100%", background: showEx ? `linear-gradient(135deg, ${C.white} 60%, ${C.amberLight} 100%)` : C.white, border: `1.5px solid ${showEx ? C.amber + "60" : C.border}`, borderRadius: 20, padding: "16px 20px", cursor: "pointer", fontFamily: "system-ui,sans-serif", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: C.shadowSm, marginBottom: showEx ? 10 : 0, transition: `all 220ms ${C.spring}` }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = C.shadow; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = C.shadowSm; e.currentTarget.style.transform = ""; }}
                onMouseDown={pressPhysics}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 13, background: `linear-gradient(135deg, ${C.amber} 0%, ${C.amberDark} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 14px ${C.amber}50`, flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: C.text, letterSpacing: "-0.01em" }}>5 exemples de marques réelles</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{showEx ? "Masquer les exemples" : "Voir les études de cas"}</div>
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2.5" style={{ transform: showEx ? "rotate(180deg)" : "none", transition: `transform 250ms ${C.spring}`, flexShrink: 0 }}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {showEx && s.ex.map((ex, i) => (
                <div
                  key={i}
                  style={{ ...card, marginBottom: 10, padding: "18px 20px", animation: `slideUp 250ms ${i * 50}ms both` }}
                  onMouseEnter={lift} onMouseLeave={drop}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 14, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 22, border: `1.5px solid ${C.border}` }}>
                      {ex.e}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: C.text, marginBottom: 6, letterSpacing: "-0.01em" }}>{ex.n}</div>
                      <p style={{ fontSize: 13, color: C.sub, lineHeight: 1.75, margin: 0 }}>{ex.d}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Prompt block */}
            <div style={{ marginBottom: 16, animation: "slideUp 350ms 120ms both" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>Prompt à utiliser</div>
              <div style={{ background: "linear-gradient(135deg, #0F0A1E 0%, #1A0A3E 100%)", border: `1.5px solid rgba(139,92,246,0.25)`, borderLeft: `4px solid ${C.p1}`, borderRadius: 16, padding: "18px 20px", fontFamily: "'SF Mono','Fira Code','Consolas',monospace", fontSize: 12.5, color: "#C4B5FD", lineHeight: 1.8, whiteSpace: "pre-wrap", wordBreak: "break-word", marginBottom: 10, boxShadow: `0 8px 32px ${C.p1}20` }}>
                {prompt}
              </div>
              <button
                onClick={copy}
                style={{ ...btnBase, background: copied ? C.greenGrad : C.pLight, color: copied ? "#fff" : C.p1, border: `1.5px solid ${copied ? "transparent" : C.pBorder}`, padding: "10px 20px", fontSize: 13, boxShadow: copied ? "0 4px 16px #22C55E40" : "none", transition: `all 200ms ${C.spring}` }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
                onMouseDown={pressPhysics}
              >
                {copied ? (
                  <>{ICON_CHECK("#fff", 13)} Copié !</>
                ) : (
                  <>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    Copier le prompt
                  </>
                )}
              </button>
            </div>

            {/* Deliverables */}
            <div
              style={{ ...card, padding: "20px 22px", marginBottom: 22, background: `linear-gradient(135deg, ${C.white} 60%, ${C.greenLight}50 100%)`, animation: "slideUp 350ms 180ms both" }}
              onMouseEnter={lift} onMouseLeave={drop}
            >
              <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.1em" }}>Livrables de l'étape</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {dels.map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, animation: `slideUp 250ms ${i * 60}ms both` }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: C.greenGrad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 3px 10px #22C55E40" }}>
                      {ICON_CHECK("#fff", 10)}
                    </div>
                    <span style={{ fontSize: 14, color: C.sub, fontWeight: 500 }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setPhase("outro")}
              style={{ ...btnGreen, animation: "slideUp 350ms 240ms both" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px #22C55E50"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 16px #22C55E40"; }}
              onMouseDown={pressPhysics}
            >
              Réflexion finale {ICON_ARROW}
            </button>
          </>
        )}
      </div>

      {/* ── INPUT BAR ── */}
      {(phase === "intro" || phase === "outro") && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(248,245,255,0.97)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderTop: `1.5px solid ${C.border}`, padding: "12px 20px 24px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", gap: 10, alignItems: "flex-end" }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              placeholder={isIntro ? "Ta réponse..." : "Ta réflexion finale..."}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              style={{ flex: 1, background: C.white, border: `2px solid ${input ? pColor + "60" : C.border}`, borderRadius: 16, padding: "13px 18px", color: C.text, fontSize: 14, outline: "none", resize: "none", fontFamily: "system-ui,sans-serif", lineHeight: 1.55, transition: `border-color 150ms ${C.spring}, box-shadow 150ms ${C.spring}, transform 150ms ${C.spring}`, fontWeight: 500, boxShadow: input ? `0 0 0 4px ${pColor}15` : "none" }}
              onFocus={(e) => { e.target.style.borderColor = pColor; e.target.style.boxShadow = `0 0 0 4px ${pColor}15`; e.target.style.transform = "translateY(-1px)"; }}
              onBlur={(e)  => { e.target.style.borderColor = input ? pColor + "60" : C.border; e.target.style.boxShadow = input ? `0 0 0 4px ${pColor}15` : "none"; e.target.style.transform = ""; }}
            />
            <button
              onClick={() => send()}
              disabled={loading || isStreaming || !input.trim()}
              style={{ width: 48, height: 48, borderRadius: 14, background: input.trim() && !loading && !isStreaming ? phaseGrad : C.border, border: "none", cursor: input.trim() && !loading && !isStreaming ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: `all 200ms ${C.spring}`, boxShadow: input.trim() && !loading && !isStreaming ? `0 6px 20px ${phaseColor}40` : "none" }}
              onMouseEnter={(e) => { if (input.trim() && !loading) { e.currentTarget.style.transform = "scale(1.06) translateY(-1px)"; e.currentTarget.style.boxShadow = `0 10px 28px ${phaseColor}50`; } }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = input.trim() && !loading ? `0 6px 20px ${phaseColor}40` : "none"; }}
              onMouseDown={pressPhysics}
            >
              {ICON_SEND(input.trim() && !loading && !isStreaming ? "#fff" : C.muted)}
            </button>
          </div>
        </div>
      )}

      {/* ── CSS ANIMATIONS ── */}
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.005); }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.2; transform: scale(0.7); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroWord {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floodIn {
          from { opacity: 0.9; clip-path: inset(0 100% 0 0); }
          to { opacity: 0; clip-path: inset(0 0% 0 0); }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          33% { transform: translate(-50%, -56%) scale(1.06); }
          66% { transform: translate(-50%, -46%) scale(0.95); }
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 6px 20px rgba(14,165,233,0.4); }
          50% { box-shadow: 0 6px 32px rgba(14,165,233,0.7), 0 0 0 8px rgba(14,165,233,0.1); }
        }
        @keyframes confettiFall {
          0% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
          80% { opacity: 0.8; }
          100% { opacity: 0; transform: translateY(90vh) rotate(540deg) scale(0.5); }
        }
        @keyframes celebBadge {
          from { opacity: 0; transform: scale(0.4); }
          to { opacity: 1; transform: scale(1); }
        }
        textarea::placeholder { color: ${C.light}; }
        input::placeholder { color: ${C.light}; }
        * { -webkit-font-smoothing: antialiased; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.p1}50; }
      `}</style>
    </div>
  );
}
