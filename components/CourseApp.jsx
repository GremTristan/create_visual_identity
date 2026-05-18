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
// DESIGN TOKENS — Dark / AI / Corporate
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  // Backgrounds
  bg:           "#08080F",
  bgDeep:       "#050508",
  surface:      "rgba(255,255,255,0.028)",
  surfaceHi:    "rgba(255,255,255,0.048)",
  surfaceSolid: "#0E0E1A",

  // Borders — barely there
  border:       "rgba(255,255,255,0.07)",
  borderHi:     "rgba(255,255,255,0.13)",
  borderAccent: "rgba(139,92,246,0.35)",
  borderGreen:  "rgba(52,211,153,0.30)",

  // Text hierarchy
  text:    "#FFFFFF",
  textB:   "rgba(255,255,255,0.88)",
  textSec: "rgba(255,255,255,0.52)",
  textMut: "rgba(255,255,255,0.28)",
  textDim: "rgba(255,255,255,0.14)",

  // Accent — single purple, restrained
  acc:      "#A78BFA",
  accDeep:  "#7C3AED",
  accSoft:  "rgba(167,139,250,0.10)",
  accGlow:  "rgba(167,139,250,0.18)",

  // Case-study blue
  blue:     "#60A5FA",
  blueSoft: "rgba(96,165,250,0.10)",

  // Success
  green:     "#34D399",
  greenSoft: "rgba(52,211,153,0.10)",
  greenDeep: "#059669",

  // Status
  coral:    "#F87171",
  amber:    "#FCD34D",

  // Gradients
  grad:      "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)",
  tGrad:     "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
  greenGrad: "linear-gradient(135deg, #34D399 0%, #059669 100%)",

  // Shadows — dark env, elevation via opacity rings
  shadow:   "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.55)",
  shadowHi: "0 0 0 1px rgba(255,255,255,0.11), 0 16px 56px rgba(0,0,0,0.65)",
  shadowAcc:"0 0 0 1px rgba(139,92,246,0.22), 0 8px 32px rgba(139,92,246,0.14)",

  // Transitions
  t1: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",   // smooth
  t2: "cubic-bezier(0.34, 1.56, 0.64, 1)",       // bounce
};

// Glow colors by mode
const GLOW = {
  create:    "rgba(139,92,246,",
  casestudy: "rgba(96,165,250,",
  done:      "rgba(52,211,153,",
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

const I = {
  layers: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  send: (c = "currentColor") => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>
    </svg>
  ),
  check: (c = "currentColor", s = 12) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  ),
  chevRight: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  ),
  chevLeft: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  ),
  chevDown: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  chat: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  copy: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
  ),
  book: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  rotate: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
    </svg>
  ),
  spark: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/>
    </svg>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// LIGHT LAYER — AI glow effect, top-center radial source
// ─────────────────────────────────────────────────────────────────────────────

function LightLayer({ color = "139,92,246", intensity = 0.16, animate = true }) {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {/* Primary beam — top center */}
      <div style={{
        position: "absolute", top: -100, left: "50%",
        transform: "translateX(-50%)",
        width: 900, height: 700,
        background: `radial-gradient(ellipse at 50% 0%, rgba(${color},${intensity}) 0%, rgba(${color},0) 68%)`,
        animation: animate ? "glowBreath 7s ease-in-out infinite" : "none",
      }} />
      {/* Secondary ambient — bottom corners */}
      <div style={{
        position: "absolute", bottom: -200, left: -200,
        width: 600, height: 600,
        background: `radial-gradient(circle, rgba(${color},0.04) 0%, transparent 70%)`,
        animation: animate ? "glowBreath 11s 3s ease-in-out infinite" : "none",
      }} />
      <div style={{
        position: "absolute", bottom: -200, right: -200,
        width: 500, height: 500,
        background: `radial-gradient(circle, rgba(${color},0.03) 0%, transparent 70%)`,
        animation: animate ? "glowBreath 9s 1.5s ease-in-out infinite" : "none",
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NOISE OVERLAY — film grain, very subtle
// ─────────────────────────────────────────────────────────────────────────────

function NoiseOverlay() {
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 998,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      opacity: 0.028,
      mixBlendMode: "screen",
    }} />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SESSION
// ─────────────────────────────────────────────────────────────────────────────

const SK = "bs_v3";
const saveS  = (d) => { try { localStorage.setItem(SK, JSON.stringify(d)); } catch {} };
const loadS  = ()  => { try { return JSON.parse(localStorage.getItem(SK) || "null"); } catch { return null; } };
const clearS = ()  => { try { localStorage.removeItem(SK); } catch {} };

// ─────────────────────────────────────────────────────────────────────────────
// PRESS PHYSICS
// ─────────────────────────────────────────────────────────────────────────────

function press(e) {
  const el = e.currentTarget;
  el.style.transform = "scale(0.96)";
  el.style.transition = `transform 70ms ${C.t2}`;
  const up = () => {
    el.style.transform = "scale(1.01)";
    el.style.transition = `transform 80ms ${C.t2}`;
    setTimeout(() => { el.style.transform = "scale(1)"; el.style.transition = `all 200ms ${C.t1}`; }, 80);
    el.removeEventListener("mouseup", up); el.removeEventListener("mouseleave", up);
  };
  el.addEventListener("mouseup", up); el.addEventListener("mouseleave", up);
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function CourseApp() {
  const [mode,        setMode]        = useState(null);
  const [brandInput,  setBrandInput]  = useState("");
  const [brand,       setBrand]       = useState("");
  const [step,        setStep]        = useState(0);
  const [phase,       setPhase]       = useState("intro");
  const [msgs,        setMsgs]        = useState([]);
  const [input,       setInput]       = useState("");
  const [loading,     setLoading]     = useState(false);
  const [openDone,    setOpenDone]    = useState(false);
  const [closeDone,   setCloseDone]   = useState(false);
  const [done,        setDone]        = useState(new Set());
  const [showEx,      setShowEx]      = useState(false);
  const [copied,      setCopied]      = useState(false);
  const [finished,    setFinished]    = useState(false);
  const [streamText,  setStreamText]  = useState("");
  const [isStreaming, setIsStreaming]  = useState(false);
  const [aiGlow,      setAiGlow]      = useState(false);
  const [retryVal,    setRetryVal]    = useState(null);
  const [saved,       setSaved]       = useState(null);
  const [flooding,    setFlooding]    = useState(false);
  const [midpoint,    setMidpoint]    = useState(false);
  const [midDone,     setMidDone]     = useState(false);
  const [progDisp,    setProgDisp]    = useState(0);
  const [hovCard,     setHovCard]     = useState(null);

  const endRef    = useRef(null);
  const streamRef = useRef(null);
  const t0Ref     = useRef(Date.now());

  // Session: load
  useEffect(() => {
    const s = loadS();
    if (s && (s.step > 0 || s.done?.length > 0)) setSaved(s);
  }, []);

  // Session: save
  useEffect(() => {
    if (!mode) return;
    saveS({ mode, brand, step, phase, done: [...done], finished });
  }, [mode, brand, step, phase, done, finished]);

  // Reset conversation per step/phase
  useEffect(() => {
    if (streamRef.current) { clearInterval(streamRef.current); streamRef.current = null; }
    setStreamText(""); setIsStreaming(false);
    setMsgs([]); setInput("");
    setOpenDone(false); setCloseDone(false); setShowEx(false); setRetryVal(null);
  }, [step, phase]);

  // Scroll to bottom
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading, streamText]);

  // Progress overshoot
  useEffect(() => {
    const target = (done.size / STEPS.length) * 100;
    if (target > progDisp) {
      setProgDisp(Math.min(target + 3.5, 100));
      setTimeout(() => setProgDisp(target), 420);
    }
  }, [done.size]);

  // Midpoint
  useEffect(() => {
    if (done.size === 4 && !midDone) { setMidpoint(true); setMidDone(true); setTimeout(() => setMidpoint(false), 4000); }
  }, [done.size]);

  useEffect(() => { return () => { if (streamRef.current) clearInterval(streamRef.current); }; }, []);

  // Word-by-word streaming
  const streamResponse = (text, glow = false) => {
    if (streamRef.current) clearInterval(streamRef.current);
    setIsStreaming(true); setStreamText("");
    if (glow) setAiGlow(true);
    const words = text.split(" ");
    let i = 0;
    streamRef.current = setInterval(() => {
      if (i >= words.length) {
        clearInterval(streamRef.current); streamRef.current = null;
        setIsStreaming(false); setStreamText("");
        setMsgs((p) => [...p, { role: "assistant", content: text }]);
        if (glow) setTimeout(() => setAiGlow(false), 2500);
        return;
      }
      setStreamText((p) => (i === 0 ? "" : p + " ") + words[i]);
      i++;
    }, 30);
  };

  // Send
  const send = async (override) => {
    const val = (override ?? input).trim();
    if (!val || loading || isStreaming) return;
    setInput(""); setRetryVal(null);
    const q = phase === "intro"
      ? (mode === "casestudy" ? s.iQ_cs(brand) : s.iQ_cr)
      : (mode === "casestudy" ? s.oQ_cs(brand) : s.oQ_cr);
    const apiMsgs = [
      ...msgs.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: msgs.length === 0 ? `[Question: "${q}"]\nMa réponse: ${val}` : val },
    ];
    setMsgs((p) => [...p, { role: "user", content: val }]);
    setLoading(true);
    const start = Date.now();
    try {
      const reply = await callTutor(apiMsgs, buildSystem(s.name, mode, brand, phase));
      const wait = Math.max(0, 850 - (Date.now() - start));
      if (wait > 0) await new Promise((r) => setTimeout(r, wait));
      if (phase === "intro") setOpenDone(true);
      if (phase === "outro") setCloseDone(true);
      setLoading(false);
      streamResponse(reply, Math.random() < 0.2);
    } catch {
      setLoading(false);
      setRetryVal(val);
      setMsgs((p) => [...p, { role: "assistant", content: "__error__" }]);
    }
  };

  // Next step with flood
  const nextStep = () => {
    setFlooding(true);
    setTimeout(() => {
      setFlooding(false);
      setDone((p) => new Set([...p, step]));
      if (step < STEPS.length - 1) { setStep(step + 1); setPhase("intro"); }
      else setFinished(true);
    }, 520);
  };

  const copy = () => {
    navigator.clipboard?.writeText(prompt).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const resume = () => {
    if (!saved) return;
    setMode(saved.mode); setBrand(saved.brand || ""); setBrandInput(saved.brand || "");
    setStep(saved.step || 0); setPhase(saved.phase || "intro");
    setDone(new Set(saved.done || [])); if (saved.finished) setFinished(true);
    setSaved(null);
  };

  // Computed
  const s          = STEPS[step];
  const isIntro    = phase === "intro";
  const isDone     = isIntro ? openDone : closeDone;
  const prompt     = mode === "casestudy" ? s.p_cs(brand) : s.p_cr;
  const dels       = mode === "casestudy" ? s.d_cs : s.d_cr;
  const isCS       = mode === "casestudy";
  const pColor     = isCS ? C.blue     : C.acc;
  const pSoft      = isCS ? C.blueSoft : C.accSoft;
  const pGrad      = isCS ? C.tGrad    : C.grad;
  const phaseColor = isIntro ? pColor   : C.green;
  const phaseGrad  = isIntro ? pGrad    : C.greenGrad;
  const glowStr    = isCS ? GLOW.casestudy : GLOW.create;

  // Shared styles
  const card = {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: "20px 22px",
    marginBottom: 10,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    transition: `all 180ms ${C.t1}`,
  };

  const btnBase = {
    fontFamily: "system-ui,-apple-system,sans-serif",
    cursor: "pointer", borderRadius: 8, fontSize: 13,
    fontWeight: 500, padding: "9px 18px", border: "none",
    display: "inline-flex", alignItems: "center", gap: 6,
    transition: `all 180ms ${C.t1}`, letterSpacing: "-0.01em",
    userSelect: "none",
  };

  const btnPrimary = {
    ...btnBase,
    background: pColor, color: "#fff",
    boxShadow: `0 0 0 1px ${pColor}55, 0 4px 16px ${pColor}30`,
  };
  const btnGhost = {
    ...btnBase,
    background: C.surface, color: C.textB,
    border: `1px solid ${C.border}`,
  };
  const btnGreen = {
    ...btnBase,
    background: C.green, color: "#000",
    boxShadow: `0 0 0 1px ${C.green}55, 0 4px 16px ${C.green}25`,
  };

  const liftCard = (e) => {
    e.currentTarget.style.background = C.surfaceHi;
    e.currentTarget.style.border = `1px solid ${C.borderHi}`;
    e.currentTarget.style.transform = "translateY(-1px)";
  };
  const dropCard = (e) => {
    e.currentTarget.style.background = C.surface;
    e.currentTarget.style.border = `1px solid ${C.border}`;
    e.currentTarget.style.transform = "";
  };

  // ──────────────────────────────────────────────────────────────
  // LANDING
  // ──────────────────────────────────────────────────────────────
  if (!mode) return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "system-ui,-apple-system,sans-serif", position: "relative", overflow: "hidden" }}>
      <LightLayer color="139,92,246" intensity={0.24} />
      <NoiseOverlay />

      {/* ── Wordmark bar ── */}
      <div style={{ position: "relative", zIndex: 1, padding: "28px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", animation: "fadeUp 500ms both" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, border: `1px solid ${C.borderHi}`, background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", color: C.acc, backdropFilter: "blur(20px)" }}>
            {I.layers}
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.textSec, letterSpacing: "-0.02em" }}>Brand Studio</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: C.textDim }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.green, boxShadow: `0 0 5px ${C.green}` }} />
          1 247 identités créées cette semaine
        </div>
      </div>

      {/* ── Hero center ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ width: "100%", maxWidth: 560, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

          {/* Return state — minimal */}
          {saved && (
            <div
              onClick={resume} onMouseDown={press}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: C.surface, border: `1px solid ${C.borderAccent}`, borderRadius: 99, padding: "7px 14px 7px 10px", marginBottom: 48, cursor: "pointer", backdropFilter: "blur(20px)", transition: `all 180ms ${C.t1}`, animation: "wordReveal 500ms both" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.acc; e.currentTarget.style.background = C.surfaceHi; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.borderAccent; e.currentTarget.style.background = C.surface; }}
            >
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: C.accSoft, border: `1px solid ${C.borderAccent}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.acc }}>
                {I.chevRight}
              </div>
              <span style={{ fontSize: 12, fontWeight: 500, color: C.textSec }}>
                Reprendre avec <span style={{ color: C.textB }}>{saved.brand || "ta marque"}</span> · étape {(saved.step || 0) + 1}/{STEPS.length}
              </span>
            </div>
          )}

          {/* ── THE HEADLINE ── */}
          <h1 style={{ margin: "0 0 28px", padding: 0, lineHeight: 1.04, letterSpacing: "-0.055em", fontSize: "clamp(44px, 10vw, 80px)", fontWeight: 300 }}>
            {/* Line 1 — white, emerge from darkness */}
            <span style={{ display: "block", color: C.text, animation: "wordReveal 800ms 100ms both" }}>
              Construisez l'identité
            </span>
            {/* Line 2 — italic, slightly dimmed, offset timing */}
            <span style={{ display: "block", fontStyle: "italic", color: C.textSec, animation: "wordReveal 900ms 340ms both" }}>
              impossible à ignorer.
            </span>
          </h1>

          {/* Subheadline */}
          <p style={{ fontSize: 15, color: C.textMut, margin: "0 0 64px", lineHeight: 1.65, maxWidth: 360, fontWeight: 300, animation: "wordReveal 700ms 700ms both" }}>
            Méthode en 8 étapes pour créer<br />
            la marque que ton marché n'a pas encore vue.
          </p>

          {/* ── Divider + mode rows ── */}
          <div style={{ width: "100%", animation: "fadeUp 500ms 900ms both" }}>

            {/* Top rule */}
            <div style={{ height: 1, background: C.border, marginBottom: 0, transformOrigin: "left", animation: "lineGrow 600ms 800ms both" }} />

            {[
              { id: "create", label: "Créer mon identité visuelle",  sub: "Construire de zéro · 8 étapes guidées",  accent: C.acc  },
              { id: "setup",  label: "Analyser une marque existante", sub: "Étude de cas · Décoder les choix créatifs", accent: C.blue },
            ].map((opt, idx) => {
              const isHov = hovCard === opt.id;
              const isDim = hovCard && !isHov;
              return (
                <div
                  key={opt.id}
                  onClick={() => setMode(opt.id)}
                  onMouseEnter={() => setHovCard(opt.id)}
                  onMouseLeave={() => setHovCard(null)}
                  onMouseDown={press}
                  style={{
                    borderBottom: `1px solid ${C.border}`,
                    padding: "22px 4px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    transition: `all 200ms ${C.t1}`,
                    opacity: isDim ? 0.32 : 1,
                  }}
                >
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 17, fontWeight: 400, color: isHov ? C.text : C.textB, letterSpacing: "-0.025em", transition: `color 180ms`, marginBottom: 4 }}>
                      {opt.label}
                    </div>
                    <div style={{ fontSize: 12, color: isHov ? C.textSec : C.textMut, transition: `color 180ms`, letterSpacing: "0" }}>
                      {opt.sub}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, color: isHov ? opt.accent : C.textDim, transform: isHov ? "translateX(3px)" : "translateX(0)", transition: `all 200ms ${C.t1}` }}>
                    <span style={{ fontSize: 11, fontWeight: 500, opacity: isHov ? 1 : 0, transition: `opacity 180ms`, letterSpacing: "0.02em" }}>
                      {idx === 0 ? "Créer" : "Analyser"}
                    </span>
                    {I.chevRight}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer line */}
          <div style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 20, animation: "fadeUp 400ms 1100ms both" }}>
            {[["40+", "exemples"], ["8", "étapes"], ["Free", ""]].map(([n, l]) => (
              <div key={n} style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.textSec, letterSpacing: "-0.02em" }}>{n}</span>
                {l && <span style={{ fontSize: 11, color: C.textDim }}>{l}</span>}
              </div>
            ))}
            <div style={{ width: 1, height: 12, background: C.border }} />
            {saved && (
              <button onClick={(e) => { e.stopPropagation(); clearS(); setSaved(null); }} style={{ background: "none", border: "none", color: C.textDim, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                Repartir de zéro
              </button>
            )}
          </div>

        </div>
      </div>

      <style>{CSS_ANIMATIONS}</style>
    </div>
  );

  // ──────────────────────────────────────────────────────────────
  // BRAND INPUT
  // ──────────────────────────────────────────────────────────────
  if (mode === "setup") return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", fontFamily: "system-ui,-apple-system,sans-serif", position: "relative", overflow: "hidden" }}>
      <LightLayer color="96,165,250" intensity={0.18} />
      <NoiseOverlay />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1, animation: "fadeUp 380ms both" }}>
        <button
          onClick={() => setMode(null)}
          style={{ background: "none", border: "none", color: C.textSec, cursor: "pointer", fontSize: 12, fontWeight: 500, marginBottom: 40, padding: 0, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5, transition: `color 150ms` }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.textB)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.textSec)}
        >
          {I.chevLeft} Retour
        </button>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: C.blueSoft, border: "1px solid rgba(96,165,250,0.30)", borderRadius: 99, padding: "3px 10px", marginBottom: 20, fontSize: 11, fontWeight: 600, color: C.blue, letterSpacing: "0.02em" }}>
          {I.spark} Mode Analyse
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: "0 0 8px", letterSpacing: "-0.04em" }}>Quelle marque analyser ?</h2>
        <p style={{ margin: "0 0 28px", fontSize: 13, color: C.textSec, lineHeight: 1.6 }}>
          Choisis une marque qui t'inspire — locale, nationale ou mondiale.
        </p>

        <input
          value={brandInput}
          onChange={(e) => setBrandInput(e.target.value)}
          placeholder="Apple, Patagonia, Jacquemus..."
          autoFocus
          onKeyDown={(e) => { if (e.key === "Enter" && brandInput.trim()) { setBrand(brandInput.trim()); setMode("casestudy"); setStep(0); setPhase("intro"); } }}
          style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px", color: C.text, fontSize: 14, outline: "none", fontFamily: "inherit", marginBottom: 10, boxSizing: "border-box", fontWeight: 400, backdropFilter: "blur(20px)", transition: `border-color 150ms, box-shadow 150ms, transform 150ms ${C.t1}` }}
          onFocus={(e) => { e.target.style.borderColor = C.blue; e.target.style.boxShadow = `0 0 0 3px rgba(96,165,250,0.12)`; e.target.style.transform = "translateY(-1px)"; }}
          onBlur={(e)  => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; e.target.style.transform = ""; }}
        />

        <button
          onClick={() => { if (brandInput.trim()) { setBrand(brandInput.trim()); setMode("casestudy"); setStep(0); setPhase("intro"); } }}
          style={{ ...btnBase, background: C.blue, color: "#fff", width: "100%", justifyContent: "center", boxShadow: `0 0 0 1px rgba(96,165,250,0.4), 0 4px 16px rgba(96,165,250,0.25)`, fontWeight: 500 }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 0 0 1px rgba(96,165,250,0.5), 0 8px 24px rgba(96,165,250,0.30)`; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 0 0 1px rgba(96,165,250,0.4), 0 4px 16px rgba(96,165,250,0.25)`; }}
          onMouseDown={press}
        >
          Analyser {brandInput || "cette marque"} {I.chevRight}
        </button>

        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Suggestions</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["Apple", "Nike", "Airbnb", "Patagonia", "Spotify", "Glossier"].map((b) => (
              <button
                key={b} onClick={() => setBrandInput(b)} onMouseDown={press}
                style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: "5px 12px", fontSize: 12, color: C.textSec, cursor: "pointer", fontFamily: "inherit", fontWeight: 500, transition: `all 150ms ${C.t1}`, backdropFilter: "blur(20px)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.blue; e.currentTarget.style.background = C.blueSoft; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; e.currentTarget.style.background = C.surface; }}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>
      <style>{CSS_ANIMATIONS}</style>
    </div>
  );

  // ──────────────────────────────────────────────────────────────
  // COMPLETION
  // ──────────────────────────────────────────────────────────────
  if (finished) {
    const mins = Math.max(1, Math.round((Date.now() - t0Ref.current) / 60000));
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", fontFamily: "system-ui,-apple-system,sans-serif", position: "relative", overflow: "hidden" }}>
        <LightLayer color="52,211,153" intensity={0.18} />
        <NoiseOverlay />

        {/* Confetti */}
        {[C.acc, C.blue, C.green, "#FCD34D", C.coral, "#A78BFA", "#60A5FA", "#34D399"].map((col, i) => (
          <div key={i} style={{ position: "fixed", top: -10, left: `${8 + i * 11.5}%`, width: 6 + (i % 3) * 3, height: 6 + (i % 3) * 3, borderRadius: i % 2 ? "50%" : 2, background: col, opacity: 0, animation: `confettiFall ${2.2 + (i % 3) * 0.7}s ${i * 0.12}s both`, pointerEvents: "none", zIndex: 10 }} />
        ))}

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 500, width: "100%", animation: "fadeUp 500ms both" }}>

          <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.greenSoft, border: `1px solid ${C.borderGreen}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: C.green, animation: "scalePop 600ms 100ms both" }}>
            {I.check(C.green, 22)}
          </div>

          <h2 style={{ fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 700, color: C.text, margin: "0 0 8px", letterSpacing: "-0.04em" }}>
            {isCS
              ? <><span style={{ color: C.textSec }}>{brand}</span> décortiquée</>
              : <>Identité <span style={{ background: `linear-gradient(90deg, ${C.acc}, ${C.green})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>complète</span></>
            }
          </h2>
          <p style={{ fontSize: 13, color: C.textSec, margin: "0 0 36px", lineHeight: 1.6 }}>
            Tu vois maintenant les décisions derrière chaque choix visuel de marque.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
            {[["8", "étapes"], [`${mins}`, "minutes"], ["100%", "complété"]].map(([n, l]) => (
              <div key={l} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 20px", backdropFilter: "blur(20px)", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: C.text, letterSpacing: "-0.04em" }}>{n}</div>
                <div style={{ fontSize: 10, color: C.textMut, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Step checklist */}
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px", marginBottom: 28, backdropFilter: "blur(20px)", textAlign: "left" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: C.textMut, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>8 piliers définis</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
              {STEPS.map((st, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ color: C.green, flexShrink: 0 }}>{I.check(C.green, 10)}</span>
                  <span style={{ fontSize: 11, color: C.textSec, fontWeight: 500 }}>{st.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => { clearS(); setMode(null); setStep(0); setPhase("intro"); setDone(new Set()); setFinished(false); setBrand(""); setBrandInput(""); setProgDisp(0); setMidDone(false); t0Ref.current = Date.now(); }}
              style={btnPrimary} onMouseDown={press}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
            >
              Recommencer {I.chevRight}
            </button>
            <button
              onClick={() => { setStep(0); setPhase("intro"); setDone(new Set()); setFinished(false); setProgDisp(0); setMidDone(false); t0Ref.current = Date.now(); }}
              style={btnGhost} onMouseDown={press}
            >
              Revoir depuis le début
            </button>
          </div>
        </div>
        <style>{CSS_ANIMATIONS}</style>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────
  // MAIN COURSE
  // ──────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "system-ui,-apple-system,sans-serif", display: "flex", flexDirection: "column" }}>
      <LightLayer color={isCS ? "96,165,250" : "139,92,246"} intensity={0.10} />
      <NoiseOverlay />

      {/* Midpoint toast */}
      {midpoint && (
        <div style={{ position: "fixed", bottom: 88, right: 20, zIndex: 100, background: C.surfaceSolid, border: `1px solid ${C.borderHi}`, borderRadius: 10, padding: "12px 16px", boxShadow: C.shadowHi, display: "flex", alignItems: "center", gap: 10, animation: "toastSlide 350ms both", maxWidth: 260, backdropFilter: "blur(24px)" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: `rgba(252,211,77,0.12)`, border: "1px solid rgba(252,211,77,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>⚡</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.textB }}>Mi-parcours atteint</div>
            <div style={{ fontSize: 11, color: C.textMut, marginTop: 2 }}>4 piliers définis · Continue</div>
          </div>
        </div>
      )}

      {/* ── HEADER ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(8,8,15,0.88)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", gap: 12, height: 52 }}>

          {/* Wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, border: `1px solid ${C.borderHi}`, background: C.surface, display: "flex", alignItems: "center", justifyContent: "center", color: C.acc }}>
              {I.layers}
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.textSec, letterSpacing: "-0.02em" }}>Brand Studio</span>
          </div>

          <div style={{ width: 1, height: 16, background: C.border, flexShrink: 0 }} />

          {/* Stepper */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 0, overflow: "hidden" }}>
            {STEPS.map((st, i) => {
              const isComp = done.has(i);
              const isCurr = i === step;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                  <div
                    onClick={() => { setStep(i); setPhase("intro"); }}
                    title={`${i + 1}. ${st.hook}`}
                    style={{
                      width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      background: isComp ? C.greenSoft : isCurr ? pSoft : "transparent",
                      border: `1px solid ${isComp ? C.borderGreen : isCurr ? `${pColor}60` : C.border}`,
                      color: isComp ? C.green : isCurr ? pColor : C.textMut,
                      fontSize: 10, fontWeight: 600, cursor: "pointer", flexShrink: 0,
                      transition: `all 220ms ${C.t1}`,
                    }}
                  >
                    {isComp ? I.check(C.green, 9) : i + 1}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ width: 10, height: 1, background: C.border, flexShrink: 0, position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", inset: 0, background: C.green, transform: `scaleX(${done.has(i) ? 1 : 0})`, transformOrigin: "left", transition: `transform 380ms ${C.t1}` }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Badge */}
          <div style={{ flexShrink: 0, fontSize: 11, fontWeight: 600, color: pColor, background: pSoft, border: `1px solid ${pColor}40`, borderRadius: 5, padding: "3px 10px", letterSpacing: "-0.01em", maxWidth: 90, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {isCS ? brand : "Création"}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 1, background: C.border }}>
          <div style={{ height: "100%", width: `${progDisp}%`, background: C.green, transition: `width 380ms ${C.t1}`, boxShadow: progDisp > 0 ? `0 0 6px ${C.green}` : "none" }} />
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px 160px", maxWidth: 720, margin: "0 auto", width: "100%", boxSizing: "border-box", position: "relative", zIndex: 1 }}>

        {/* Step header */}
        <div style={{ marginBottom: 20, position: "relative", overflow: "hidden" }}>
          {/* Flood animation overlay */}
          {flooding && (
            <div style={{ position: "absolute", inset: 0, background: C.green, borderRadius: 10, animation: "floodFade 520ms both", pointerEvents: "none", zIndex: 2 }} />
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: pColor, background: pSoft, border: `1px solid ${pColor}40`, borderRadius: 4, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.tag}</span>
            <span style={{ fontSize: 11, color: C.textMut }}>Étape {step + 1} / {STEPS.length}</span>
            <span style={{ fontSize: 11, color: C.textDim, marginLeft: "auto" }}>{s.hook}</span>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0, letterSpacing: "-0.03em" }}>{s.name}</h2>
        </div>

        {/* ── Q&A PHASES ── */}
        {(phase === "intro" || phase === "outro") && (
          <>
            {/* Question card */}
            <div
              style={{ ...card, borderLeft: `2px solid ${phaseColor}40`, background: `rgba(255,255,255,0.022)`, animation: "fadeUp 300ms both" }}
              onMouseEnter={liftCard} onMouseLeave={dropCard}
            >
              <div style={{ fontSize: 9, fontWeight: 700, color: phaseColor, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
                {isIntro ? "Avant de commencer" : "Pour aller plus loin"}
              </div>
              <p style={{ fontSize: 14, color: C.textB, margin: 0, lineHeight: 1.75, fontWeight: 400 }}>
                {phase === "intro"
                  ? (isCS ? s.iQ_cs(brand) : s.iQ_cr)
                  : (isCS ? s.oQ_cs(brand) : s.oQ_cr)}
              </p>
            </div>

            {/* Messages */}
            {msgs.map((m, i) => {
              const isErr = m.content === "__error__";
              const isUser = m.role === "user";
              return (
                <div key={i} style={{ marginBottom: 8, display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 8, animation: "fadeUp 200ms both" }}>
                  {!isUser && (
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: pSoft, border: `1px solid ${pColor}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: pColor, boxShadow: aiGlow && i === msgs.length - 1 ? `0 0 16px ${pColor}40` : "none", transition: `box-shadow 400ms` }}>
                      {I.chat}
                    </div>
                  )}
                  <div style={{
                    maxWidth: "76%",
                    background: isErr ? "rgba(248,113,113,0.08)" : isUser ? `rgba(${isCS ? "96,165,250" : "167,139,250"},0.12)` : C.surface,
                    border: `1px solid ${isErr ? "rgba(248,113,113,0.2)" : isUser ? `${pColor}25` : C.border}`,
                    borderRadius: isUser ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                    padding: "11px 14px",
                    backdropFilter: "blur(20px)",
                    boxShadow: aiGlow && !isUser && i === msgs.length - 1 ? `0 0 0 1px ${pColor}22, 0 4px 20px ${pColor}12` : "none",
                    transition: `box-shadow 400ms`,
                  }}>
                    {isErr ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 12, color: C.coral }}>Erreur réseau.</span>
                        <button
                          onClick={() => { setMsgs((p) => p.slice(0, -1)); if (retryVal) send(retryVal); }}
                          style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 5, padding: "3px 8px", fontSize: 11, color: C.coral, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit", flexShrink: 0 }}
                        >
                          {I.rotate} Retry
                        </button>
                      </div>
                    ) : (
                      <p style={{ fontSize: 13, color: isUser ? C.textB : C.textSec, margin: 0, lineHeight: 1.7 }}>{m.content}</p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Streaming bubble */}
            {isStreaming && (
              <div style={{ marginBottom: 8, display: "flex", justifyContent: "flex-start", alignItems: "flex-end", gap: 8, animation: "fadeUp 150ms both" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: pSoft, border: `1px solid ${pColor}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: pColor, boxShadow: aiGlow ? `0 0 16px ${pColor}40` : "none", transition: `box-shadow 400ms` }}>
                  {I.chat}
                </div>
                <div style={{ maxWidth: "76%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "12px 12px 12px 3px", padding: "11px 14px", backdropFilter: "blur(20px)", boxShadow: aiGlow ? `0 0 0 1px ${pColor}22, 0 4px 20px ${pColor}12` : "none", transition: `box-shadow 400ms` }}>
                  <p style={{ fontSize: 13, color: C.textSec, margin: 0, lineHeight: 1.7 }}>
                    {streamText}
                    <span style={{ display: "inline-block", width: 1.5, height: 12, background: pColor, marginLeft: 2, verticalAlign: "text-bottom", animation: "cursorBlink 800ms infinite", opacity: 0.8 }} />
                  </p>
                </div>
              </div>
            )}

            {/* Typing indicator */}
            {loading && !isStreaming && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 8, animation: "fadeUp 150ms both" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: pSoft, border: `1px solid ${pColor}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: pColor }}>
                  {I.chat}
                </div>
                <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "12px 12px 12px 3px", padding: "13px 16px", display: "flex", gap: 4, backdropFilter: "blur(20px)" }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: pColor, opacity: 0.5, animation: `dotBlink 1.1s ${i * 0.18}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />

            {/* Continue CTA */}
            {isDone && !loading && !isStreaming && (
              <button
                onClick={isIntro ? () => setPhase("content") : nextStep}
                style={{ ...btnPrimary, marginTop: 8, animation: "fadeUp 250ms both" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 0 0 1px ${pColor}66, 0 8px 24px ${pColor}35`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 0 0 1px ${pColor}55, 0 4px 16px ${pColor}30`; }}
                onMouseDown={press}
              >
                {isIntro
                  ? "Voir le cours"
                  : step < STEPS.length - 1
                    ? `Étape ${step + 2} · ${STEPS[step + 1].hook}`
                    : "Terminer"}
                {I.chevRight}
              </button>
            )}
          </>
        )}

        {/* ── CONTENT PHASE ── */}
        {phase === "content" && (
          <>
            {/* Intro */}
            <div style={{ ...card, animation: "fadeUp 280ms both" }} onMouseEnter={liftCard} onMouseLeave={dropCard}>
              <p style={{ fontSize: 13, color: C.textSec, margin: 0, lineHeight: 1.8 }}>{s.intro}</p>
            </div>

            {/* Examples accordion */}
            <div style={{ marginBottom: 10, animation: "fadeUp 300ms 60ms both" }}>
              <button
                onClick={() => setShowEx(!showEx)}
                style={{ width: "100%", background: C.surface, border: `1px solid ${showEx ? C.borderHi : C.border}`, borderRadius: 10, padding: "13px 16px", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: showEx ? 6 : 0, transition: `all 180ms ${C.t1}`, backdropFilter: "blur(20px)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = C.surfaceHi; e.currentTarget.style.borderColor = C.borderHi; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = C.surface; e.currentTarget.style.borderColor = showEx ? C.borderHi : C.border; }}
                onMouseDown={press}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(252,211,77,0.08)", border: "1px solid rgba(252,211,77,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: C.amber }}>
                    {I.book}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: C.textB, letterSpacing: "-0.01em" }}>5 exemples de marques réelles</div>
                    <div style={{ fontSize: 11, color: C.textMut, marginTop: 1 }}>{showEx ? "Masquer" : "Voir les études de cas"}</div>
                  </div>
                </div>
                <span style={{ color: C.textMut, transform: showEx ? "rotate(180deg)" : "", transition: `transform 220ms ${C.t1}`, display: "flex" }}>{I.chevDown}</span>
              </button>

              {showEx && s.ex.map((ex, i) => (
                <div
                  key={i}
                  style={{ ...card, marginBottom: 6, padding: "14px 16px", animation: `fadeUp 200ms ${i * 40}ms both` }}
                  onMouseEnter={liftCard} onMouseLeave={dropCard}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: C.surface, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>
                      {ex.e}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.textB, marginBottom: 5, letterSpacing: "-0.01em" }}>{ex.n}</div>
                      <p style={{ fontSize: 12, color: C.textSec, lineHeight: 1.7, margin: 0 }}>{ex.d}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Prompt */}
            <div style={{ marginBottom: 10, animation: "fadeUp 300ms 120ms both" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: C.textMut, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.1em" }}>Prompt IA</div>
              <div style={{ background: "#050508", border: `1px solid ${C.border}`, borderLeft: `2px solid ${C.acc}40`, borderRadius: 10, padding: "16px 18px", fontFamily: "'SF Mono','Fira Code','Consolas',monospace", fontSize: 12, color: "rgba(167,139,250,0.75)", lineHeight: 1.8, whiteSpace: "pre-wrap", wordBreak: "break-word", marginBottom: 8 }}>
                {prompt}
              </div>
              <button
                onClick={copy}
                style={{ ...btnGhost, padding: "7px 14px", fontSize: 12, background: copied ? C.greenSoft : C.surface, borderColor: copied ? C.borderGreen : C.border, color: copied ? C.green : C.textSec }}
                onMouseEnter={(e) => { if (!copied) { e.currentTarget.style.borderColor = C.borderHi; e.currentTarget.style.color = C.textB; } }}
                onMouseLeave={(e) => { if (!copied) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; } }}
                onMouseDown={press}
              >
                {copied ? <>{I.check(C.green, 11)} Copié</> : <>{I.copy} Copier le prompt</>}
              </button>
            </div>

            {/* Deliverables */}
            <div
              style={{ ...card, padding: "16px 18px", marginBottom: 20, animation: "fadeUp 300ms 180ms both" }}
              onMouseEnter={liftCard} onMouseLeave={dropCard}
            >
              <div style={{ fontSize: 9, fontWeight: 700, color: C.textMut, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>Livrables</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {dels.map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: C.greenSoft, border: `1px solid ${C.borderGreen}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: C.green }}>
                      {I.check(C.green, 8)}
                    </div>
                    <span style={{ fontSize: 12, color: C.textSec, fontWeight: 400 }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setPhase("outro")}
              style={{ ...btnGhost, animation: "fadeUp 300ms 240ms both" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.borderHi; e.currentTarget.style.color = C.textB; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; }}
              onMouseDown={press}
            >
              Réflexion finale {I.chevRight}
            </button>
          </>
        )}
      </div>

      {/* ── INPUT BAR ── */}
      {(phase === "intro" || phase === "outro") && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(8,8,15,0.92)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", borderTop: `1px solid ${C.border}`, padding: "10px 20px 20px", zIndex: 40 }}>
          <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", gap: 8, alignItems: "flex-end" }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              placeholder={isIntro ? "Ta réponse..." : "Ta réflexion finale..."}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              style={{ flex: 1, background: C.surface, border: `1px solid ${input ? `${pColor}40` : C.border}`, borderRadius: 8, padding: "11px 14px", color: C.text, fontSize: 13, outline: "none", resize: "none", fontFamily: "inherit", lineHeight: 1.55, transition: `border-color 150ms, box-shadow 150ms, transform 150ms ${C.t1}`, fontWeight: 400, boxShadow: input ? `0 0 0 3px ${pColor}12` : "none", backdropFilter: "blur(20px)" }}
              onFocus={(e) => { e.target.style.borderColor = `${pColor}60`; e.target.style.boxShadow = `0 0 0 3px ${pColor}12`; e.target.style.transform = "translateY(-1px)"; }}
              onBlur={(e)  => { e.target.style.borderColor = input ? `${pColor}40` : C.border; e.target.style.boxShadow = input ? `0 0 0 3px ${pColor}12` : "none"; e.target.style.transform = ""; }}
            />
            <button
              onClick={() => send()}
              disabled={loading || isStreaming || !input.trim()}
              style={{ width: 40, height: 40, borderRadius: 8, background: input.trim() && !loading && !isStreaming ? pColor : C.surface, border: `1px solid ${input.trim() && !loading && !isStreaming ? `${pColor}60` : C.border}`, cursor: input.trim() && !loading && !isStreaming ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: `all 180ms ${C.t1}`, color: input.trim() && !loading && !isStreaming ? "#fff" : C.textDim }}
              onMouseEnter={(e) => { if (input.trim() && !loading) { e.currentTarget.style.transform = "scale(1.05) translateY(-1px)"; } }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
              onMouseDown={press}
            >
              {I.send(input.trim() && !loading && !isStreaming ? "#fff" : C.textDim)}
            </button>
          </div>
        </div>
      )}

      <style>{CSS_ANIMATIONS}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CSS
// ─────────────────────────────────────────────────────────────────────────────

const CSS_ANIMATIONS = `
  @keyframes glowBreath {
    0%, 100% { opacity: 0.75; transform: scale(1); }
    50%       { opacity: 1;    transform: scale(1.06); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes wordReveal {
    from { opacity: 0; filter: blur(12px); transform: translateY(10px); }
    to   { opacity: 1; filter: blur(0px);  transform: translateY(0); }
  }
  @keyframes lineGrow {
    from { transform: scaleX(0); transform-origin: left; opacity: 0; }
    to   { transform: scaleX(1); transform-origin: left; opacity: 1; }
  }
  @keyframes scalePop {
    from { opacity: 0; transform: scale(0.5); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes floodFade {
    0%   { opacity: 0.6; clip-path: inset(0 100% 0 0 round 10px); }
    60%  { opacity: 0.3; clip-path: inset(0 0%   0 0 round 10px); }
    100% { opacity: 0;   clip-path: inset(0 0%   0 0 round 10px); }
  }
  @keyframes toastSlide {
    from { opacity: 0; transform: translateX(32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes confettiFall {
    0%   { opacity: 1; transform: translateY(0) rotate(0deg); }
    100% { opacity: 0; transform: translateY(88vh) rotate(480deg); }
  }
  @keyframes cursorBlink {
    0%, 100% { opacity: 0.8; }
    50%       { opacity: 0; }
  }
  @keyframes dotBlink {
    0%, 100% { opacity: 0.25; transform: scale(0.8); }
    50%       { opacity: 0.9;  transform: scale(1.1); }
  }

  textarea::placeholder { color: rgba(255,255,255,0.20); }
  input::placeholder    { color: rgba(255,255,255,0.20); }
  * { -webkit-font-smoothing: antialiased; box-sizing: border-box; }
  ::-webkit-scrollbar       { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.16); }
`;
