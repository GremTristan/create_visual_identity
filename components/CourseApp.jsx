"use client";
import { useState, useRef, useEffect } from "react";

const STEPS = [
  {
    name: "Brief de marque", tag: "Stratégie",
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
    name: "Direction créative", tag: "Concept",
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
    name: "Palette de couleurs", tag: "Couleurs",
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
    name: "Typographie", tag: "Typo",
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
    name: "Création du logo", tag: "Logo",
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
    name: "Éléments graphiques", tag: "Système",
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
    name: "Charte graphique", tag: "Charte",
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
    name: "Test et validation", tag: "Validation",
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

const C = {
  bg: "#0e0e0f", bg2: "#161618", bg3: "#1e1e21",
  bdr: "rgba(255,255,255,0.08)", bdr2: "rgba(255,255,255,0.14)",
  txt: "#f0ede8", mut: "#8a8784", hint: "#555",
  blue: "#4f7fff", green: "#2ee8a0", amber: "#f5a623",
};

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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function CourseApp() {
  const [mode, setMode] = useState(null);
  const [brandInput, setBrandInput] = useState("");
  const [brand, setBrand] = useState("");
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState("intro");
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDone, setOpenDone] = useState(false);
  const [closeDone, setCloseDone] = useState(false);
  const [done, setDone] = useState(new Set());
  const [showEx, setShowEx] = useState(false);
  const [copied, setCopied] = useState(false);
  const [finished, setFinished] = useState(false);
  const endRef = useRef(null);
  const taRef = useRef(null);
  const isMobile = useIsMobile();

  const s = STEPS[step];

  const currentQ = () => {
    if (phase === "intro") return mode === "casestudy" ? s.iQ_cs(brand) : s.iQ_cr;
    return mode === "casestudy" ? s.oQ_cs(brand) : s.oQ_cr;
  };

  useEffect(() => {
    setMsgs([]); setInput("");
    setOpenDone(false); setCloseDone(false); setShowEx(false);
  }, [step, phase]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  const send = async () => {
    const val = input.trim();
    if (!val || loading) return;
    setInput("");
    const question = currentQ();
    const apiMsgs = [
      ...msgs.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: msgs.length === 0 ? `[Question: "${question}"]\nMa réponse: ${val}` : val },
    ];
    setMsgs((p) => [...p, { role: "user", content: val }]);
    setLoading(true);
    try {
      const reply = await callTutor(apiMsgs, buildSystem(s.name, mode, brand, phase));
      setMsgs((p) => [...p, { role: "assistant", content: reply }]);
      if (phase === "intro") setOpenDone(true);
      if (phase === "outro") setCloseDone(true);
    } catch {
      setMsgs((p) => [...p, { role: "assistant", content: "Une erreur s'est produite. Réessaie." }]);
    }
    setLoading(false);
  };

  const nextStep = () => {
    setDone((p) => new Set([...p, step]));
    if (step < STEPS.length - 1) { setStep(step + 1); setPhase("intro"); }
    else setFinished(true);
  };

  const copy = () => {
    const p = mode === "casestudy" ? s.p_cs(brand) : s.p_cr;
    navigator.clipboard?.writeText(p).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const changePhase = (p) => {
    setPhase(p);
    setMsgs([]);
    setOpenDone(false);
    setCloseDone(false);
  };

  // ── SCREENS WITHOUT MAIN NAV ───────────────────────────────────────────────

  if (!mode) return (
    <div className="screen-center">
      <div className="onboarding-card">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div className="label-tag" style={{ marginBottom: 10 }}>Cours IA · Identité visuelle</div>
          <div className="title-lg" style={{ marginBottom: 10 }}>Comment veux-tu utiliser ce cours ?</div>
          <div className="body-sm" style={{ color: C.mut, lineHeight: 1.7 }}>
            Le tuteur IA t'accompagne à chaque étape — il pose des questions, réagit à tes réponses, et te pousse à réfléchir.
          </div>
        </div>
        {[
          { id: "create", icon: "✦", title: "Créer ma marque", desc: "Je pars de zéro et je construis une identité visuelle de A à Z avec l'IA comme mentor.", accent: C.blue },
          { id: "setup", icon: "🔍", title: "Étude de cas", desc: "J'analyse une marque existante avec la même trame pour comprendre ses choix créatifs.", accent: C.green },
        ].map((opt) => (
          <div key={opt.id} onClick={() => setMode(opt.id)} className="choice-card"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = opt.accent + "66")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.bdr)}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{opt.icon}</div>
            <div className="title-md" style={{ marginBottom: 4 }}>{opt.title}</div>
            <div className="body-sm" style={{ color: C.mut, lineHeight: 1.5 }}>{opt.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (mode === "setup") return (
    <div className="screen-center">
      <div className="onboarding-card">
        <button onClick={() => setMode(null)} className="back-btn">← Retour</button>
        <div className="title-md" style={{ marginBottom: 8 }}>Quelle marque veux-tu analyser ?</div>
        <div className="body-sm" style={{ color: C.mut, marginBottom: 24, lineHeight: 1.7 }}>
          Choisis une marque que tu trouves intéressante — locale, nationale ou mondiale.
        </div>
        <input value={brandInput} onChange={(e) => setBrandInput(e.target.value)}
          placeholder="ex: Apple, Patagonia, Jacquemus..."
          onKeyDown={(e) => { if (e.key === "Enter" && brandInput.trim()) { setBrand(brandInput.trim()); setMode("casestudy"); setStep(0); setPhase("intro"); } }}
          className="text-input" />
        <button onClick={() => { if (brandInput.trim()) { setBrand(brandInput.trim()); setMode("casestudy"); setStep(0); setPhase("intro"); } }}
          className="btn-primary btn-green" style={{ marginTop: 0 }}>
          Analyser {brandInput || "cette marque"} →
        </button>
      </div>
    </div>
  );

  if (finished) return (
    <div className="screen-center">
      <div style={{ maxWidth: 400, width: "100%", textAlign: "center", padding: "0 24px" }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
        <div className="title-lg" style={{ marginBottom: 12 }}>
          {mode === "casestudy" ? `${brand} décortiquée` : "Identité visuelle complète"}
        </div>
        <div className="body-sm" style={{ color: C.mut, lineHeight: 1.7, marginBottom: 28 }}>
          Tu as traversé les 8 étapes. Maintenant tu vois les marques différemment — tu vois les décisions derrière chaque choix visuel.
        </div>
        <button onClick={() => { setMode(null); setStep(0); setPhase("intro"); setDone(new Set()); setFinished(false); }}
          className="btn-ghost">
          Recommencer
        </button>
      </div>
    </div>
  );

  // ── MAIN APP ───────────────────────────────────────────────────────────────

  const prompt = mode === "casestudy" ? s.p_cs(brand) : s.p_cr;
  const dels = mode === "casestudy" ? s.d_cs : s.d_cr;
  const question = currentQ();
  const isIntro = phase === "intro";
  const isDone = isIntro ? openDone : closeDone;
  const phaseColor = isIntro ? C.blue : C.green;
  const isQA = phase === "intro" || phase === "outro";

  return (
    <div className="app-shell">

      {/* ── HEADER ── */}
      <header className="app-header">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="label-tag" style={{ marginBottom: 2 }}>
            {mode === "casestudy" ? `📍 ${brand}` : "✦ Création"} · Étape {step + 1}/8
          </div>
          <div className="header-title">{s.name}</div>
        </div>
        <div className="step-dots">
          {STEPS.map((_, i) => (
            <div key={i} onClick={() => { setStep(i); setPhase("intro"); }}
              className="step-dot"
              style={{ background: done.has(i) ? C.green : i === step ? C.blue : C.bg3 }} />
          ))}
        </div>
      </header>

      {/* ── PHASE TABS (desktop only) ── */}
      <div className="phase-tabs-desktop">
        {["intro", "content", "outro"].map((p, i) => (
          <div key={p} onClick={() => changePhase(p)} className="phase-tab"
            style={{
              color: phase === p ? C.txt : C.hint,
              borderBottom: `2px solid ${phase === p ? (p === "outro" ? C.green : C.blue) : "transparent"}`,
            }}>
            {["1ère impression", "Contenu", "Dernière impression"][i]}
          </div>
        ))}
      </div>

      {/* ── BODY ── */}
      <main className={`app-body${isQA ? " qa-mode" : ""}`}>

        {/* Q&A phases */}
        {isQA && (
          <>
            <div className="card" style={{ borderLeft: `2px solid ${phaseColor}`, marginBottom: 14 }}>
              <div className="phase-label" style={{ color: phaseColor, marginBottom: 8 }}>
                {isIntro ? "Mentor IA · Première impression" : "Mentor IA · Dernière impression"}
              </div>
              <div className="body-md">{question}</div>
            </div>

            {msgs.map((m, i) => (
              <div key={i} className={`msg-row ${m.role}`}>
                <div className={`msg-bubble ${m.role}`}>
                  {m.role === "assistant" && (
                    <div className="phase-label" style={{ color: phaseColor, marginBottom: 5 }}>Mentor</div>
                  )}
                  <div className="body-md">{m.content}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="typing-indicator">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="dot" style={{ animationDelay: `${i * 0.18}s`, background: phaseColor }} />
                ))}
              </div>
            )}
            <div ref={endRef} />

            {isDone && (
              <button onClick={isIntro ? () => changePhase("content") : nextStep}
                className="btn-primary btn-blue" style={{ marginTop: 10 }}>
                {isIntro ? "Voir le contenu →" : step < STEPS.length - 1 ? `Étape ${step + 2} : ${STEPS[step + 1].name} →` : "🎉 Terminer le cours"}
              </button>
            )}
          </>
        )}

        {/* Content phase */}
        {phase === "content" && (
          <>
            <div className="card" style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span className="tag-chip">{s.tag}</span>
                <span className="body-xs" style={{ color: C.hint }}>Étape {step + 1}</span>
              </div>
              <div className="body-md">{s.intro}</div>
            </div>

            <button onClick={() => setShowEx(!showEx)} className="examples-toggle"
              style={{ background: showEx ? "rgba(245,166,35,0.08)" : C.bg2, borderColor: showEx ? "rgba(245,166,35,.3)" : C.bdr, color: showEx ? C.amber : C.mut }}>
              <span>📚 {showEx ? "Masquer" : "Voir"} les 5 exemples de marques réelles</span>
              <span style={{ fontSize: 12 }}>{showEx ? "↑" : "↓"}</span>
            </button>

            {showEx && s.ex.map((ex, i) => (
              <div key={i} className="card example-card">
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 18 }}>{ex.e}</span>
                  <span className="body-sm" style={{ fontWeight: 600, color: C.txt }}>{ex.n}</span>
                </div>
                <div className="body-sm" style={{ color: C.mut, lineHeight: 1.7 }}>{ex.d}</div>
              </div>
            ))}

            <div style={{ marginTop: 18 }}>
              <div className="section-label">Prompt à utiliser</div>
              <div className="prompt-block">{prompt}</div>
              <button onClick={copy} className="btn-ghost btn-copy"
                style={{ borderColor: copied ? "rgba(46,232,160,.4)" : C.bdr2, color: copied ? C.green : C.mut }}>
                {copied ? "✓ Copié" : "Copier le prompt"}
              </button>
            </div>

            <div style={{ marginTop: 18 }}>
              <div className="section-label">Livrables de l'étape</div>
              {dels.map((d, i) => (
                <div key={i} className="deliverable-row">
                  <div className="deliverable-dot" />
                  <div className="body-sm" style={{ color: C.mut, lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
            </div>

            <button onClick={() => changePhase("outro")} className="btn-primary btn-green" style={{ marginTop: 20 }}>
              Réflexion finale →
            </button>
          </>
        )}
      </main>

      {/* ── INPUT BAR (Q&A only) ── */}
      {isQA && (
        <div className="input-bar">
          <div className="input-inner">
            <textarea ref={taRef} value={input} onChange={(e) => setInput(e.target.value)} rows={1}
              placeholder={isIntro ? "Ta réponse..." : "Ta réflexion..."}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              className="chat-input" />
            <button onClick={send} disabled={loading || !input.trim()} className="send-btn"
              style={{ background: input.trim() ? phaseColor : C.bg3 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke={input.trim() ? "#fff" : "#444"} strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── BOTTOM NAV (mobile only) ── */}
      <nav className="bottom-nav">
        {["intro", "content", "outro"].map((p, i) => {
          const labels = ["Intro", "Contenu", "Réflexion"];
          const icons = ["💬", "📖", "✨"];
          const activeColor = p === "outro" ? C.green : C.blue;
          return (
            <button key={p} onClick={() => changePhase(p)} className="bottom-tab"
              style={{ color: phase === p ? activeColor : C.hint }}>
              <span className="bottom-tab-icon">{icons[i]}</span>
              <span className="bottom-tab-label">{labels[i]}</span>
              {phase === p && <div className="bottom-tab-bar" style={{ background: activeColor }} />}
            </button>
          );
        })}
      </nav>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; -webkit-font-smoothing: antialiased; }
        html, body { height: 100%; overflow: hidden; }

        @keyframes dot { 0%,100%{opacity:.25;transform:scale(.75)} 50%{opacity:1;transform:scale(1)} }
        textarea::placeholder { color: #3a3a3e; }
        input::placeholder { color: #3a3a3e; }

        /* ── LAYOUT SHELL ── */
        .app-shell {
          height: 100dvh;
          display: flex;
          flex-direction: column;
          background: ${C.bg};
          font-family: system-ui, sans-serif;
          overflow: hidden;
        }

        /* ── CENTERING SCREENS ── */
        .screen-center {
          min-height: 100dvh;
          background: ${C.bg};
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: system-ui, sans-serif;
        }
        .onboarding-card { max-width: 460px; width: 100%; }

        /* ── HEADER ── */
        .app-header {
          position: relative;
          z-index: 50;
          background: rgba(14,14,15,0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 0.5px solid ${C.bdr};
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 12;
          flex-shrink: 0;
        }
        .header-title {
          font-size: 14px;
          font-weight: 600;
          color: ${C.txt};
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .step-dots { display: flex; gap: 4px; flex-shrink: 0; }
        .step-dot {
          width: 7px; height: 7px; border-radius: 50%;
          cursor: pointer; transition: background .2s;
        }

        /* ── PHASE TABS (desktop) ── */
        .phase-tabs-desktop {
          display: flex;
          border-bottom: 0.5px solid ${C.bdr};
          flex-shrink: 0;
        }
        .phase-tab {
          flex: 1; padding: 10px 0;
          text-align: center;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.05em; text-transform: uppercase;
          cursor: pointer; transition: all .2s;
        }

        /* ── BODY ── */
        .app-body {
          flex: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 16px 20px 24px;
        }
        .app-body.qa-mode { padding-bottom: 100px; }
        .app-body > * { max-width: 720px; margin-left: auto; margin-right: auto; display: block; }
        .app-body > div { max-width: 720px; margin-left: auto; margin-right: auto; }

        /* ── INPUT BAR ── */
        .input-bar {
          flex-shrink: 0;
          background: rgba(14,14,15,0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 0.5px solid ${C.bdr};
          padding: 10px 16px;
          padding-bottom: calc(10px + env(safe-area-inset-bottom, 0px));
        }
        .input-inner {
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }
        .chat-input {
          flex: 1;
          background: ${C.bg2};
          border: 0.5px solid ${C.bdr2};
          border-radius: 12px;
          padding: 10px 14px;
          color: ${C.txt};
          font-size: 15px;
          outline: none;
          resize: none;
          font-family: system-ui, sans-serif;
          line-height: 1.5;
          max-height: 120px;
        }
        .send-btn {
          width: 44px; height: 44px;
          border-radius: 12px; border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: background .2s;
        }

        /* ── BOTTOM NAV (mobile) ── */
        .bottom-nav { display: none; }

        /* ── CARDS & COMPONENTS ── */
        .card {
          background: ${C.bg2};
          border: 0.5px solid ${C.bdr};
          border-radius: 14px;
          padding: 16px;
          width: 100%;
        }
        .example-card { border-radius: 12px; padding: 14px 16px; margin-bottom: 8px; }
        .msg-row { margin-bottom: 10px; display: flex; width: 100%; }
        .msg-row.user { justify-content: flex-end; }
        .msg-row.assistant { justify-content: flex-start; }
        .msg-bubble {
          max-width: 85%;
          border-radius: 12px;
          padding: 11px 14px;
        }
        .msg-bubble.user {
          background: #1b1b32;
          border: 0.5px solid rgba(79,127,255,.25);
        }
        .msg-bubble.assistant {
          background: ${C.bg2};
          border: 0.5px solid ${C.bdr};
        }
        .typing-indicator {
          display: flex; gap: 4px;
          padding: 9px 14px;
          background: ${C.bg2};
          border-radius: 12px;
          width: fit-content;
          margin-bottom: 10px;
        }
        .dot {
          width: 5px; height: 5px; border-radius: 50%;
          animation: dot 1s infinite;
        }
        .prompt-block {
          background: #0a0a0d;
          border: 0.5px solid ${C.bdr};
          border-left: 2px solid ${C.blue};
          border-radius: 10px;
          padding: 12px 14px;
          font-family: monospace;
          font-size: 12px;
          color: #bbb8b2;
          line-height: 1.7;
          white-space: pre-wrap;
          word-break: break-word;
          margin-bottom: 8px;
          width: 100%;
        }
        .deliverable-row {
          display: flex; align-items: flex-start; gap: 8px; margin-bottom: 7px;
        }
        .deliverable-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: ${C.green}; flex-shrink: 0; margin-top: 7px;
        }
        .examples-toggle {
          width: 100%;
          border: 0.5px solid;
          border-radius: 12px;
          padding: 13px 16px;
          font-size: 14px; font-weight: 500;
          cursor: pointer;
          font-family: system-ui, sans-serif;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          transition: all .2s;
        }

        /* ── TYPOGRAPHY ── */
        .label-tag {
          font-size: 11px; letter-spacing: 0.08em;
          text-transform: uppercase; color: ${C.hint};
        }
        .title-lg { font-size: 22px; font-weight: 600; color: ${C.txt}; }
        .title-md { font-size: 16px; font-weight: 600; color: ${C.txt}; }
        .body-lg { font-size: 15px; color: ${C.txt}; line-height: 1.7; }
        .body-md { font-size: 14px; color: ${C.txt}; line-height: 1.75; }
        .body-sm { font-size: 13px; color: ${C.txt}; }
        .body-xs { font-size: 11px; }
        .phase-label {
          font-size: 10px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .section-label {
          font-size: 10px; font-weight: 600; color: ${C.hint};
          margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.09em;
        }

        /* ── BUTTONS ── */
        .btn-primary {
          display: block; width: 100%;
          border-radius: 12px; font-size: 14px; font-weight: 500;
          padding: 14px; cursor: pointer;
          transition: opacity .15s;
          font-family: system-ui, sans-serif;
          border: 0.5px solid;
          text-align: center;
        }
        .btn-blue {
          background: rgba(79,127,255,0.1);
          border-color: rgba(79,127,255,.3);
          color: ${C.blue};
        }
        .btn-green {
          background: rgba(46,232,160,0.12);
          border-color: rgba(46,232,160,0.3);
          color: ${C.green};
        }
        .btn-ghost {
          background: ${C.bg2};
          border: 0.5px solid ${C.bdr2};
          color: ${C.txt};
          border-radius: 12px;
          font-size: 14px; font-weight: 500;
          padding: 11px 24px;
          cursor: pointer;
          font-family: system-ui, sans-serif;
        }
        .btn-copy {
          display: block; width: 100%;
          border: 0.5px solid;
          border-radius: 10px;
          padding: 9px;
          background: ${C.bg2};
          cursor: pointer;
          font-family: system-ui, sans-serif;
          font-size: 13px;
          text-align: center;
        }
        .back-btn {
          background: none; border: none; color: ${C.hint};
          cursor: pointer; font-size: 13px;
          margin-bottom: 24px; padding: 0;
          font-family: system-ui, sans-serif;
          display: block;
        }
        .tag-chip {
          display: inline-block; padding: 3px 10px;
          border-radius: 99px;
          background: rgba(245,166,35,0.12);
          border: 0.5px solid rgba(245,166,35,.3);
          color: ${C.amber};
          font-size: 11px; font-weight: 500;
        }
        .text-input {
          width: 100%;
          background: ${C.bg2};
          border: 0.5px solid ${C.bdr2};
          border-radius: 12px;
          padding: 14px 16px;
          color: ${C.txt};
          font-size: 15px;
          outline: none;
          font-family: system-ui, sans-serif;
          margin-bottom: 12px;
          display: block;
        }
        .choice-card {
          background: ${C.bg2};
          border: 0.5px solid ${C.bdr};
          border-radius: 16px;
          padding: 20px 24px;
          cursor: pointer;
          margin-bottom: 12px;
          transition: border-color .2s;
          -webkit-tap-highlight-color: transparent;
        }

        /* ── MOBILE OVERRIDES ── */
        @media (max-width: 767px) {
          html, body { overflow: hidden; }

          .app-shell { height: 100dvh; }

          .app-header { padding: 10px 14px 10px; }
          .header-title { font-size: 13px; }
          .step-dot { width: 6px; height: 6px; }

          /* Hide desktop phase tabs on mobile */
          .phase-tabs-desktop { display: none; }

          /* Show bottom nav on mobile */
          .bottom-nav {
            display: flex;
            flex-shrink: 0;
            background: rgba(14,14,15,0.98);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-top: 0.5px solid ${C.bdr};
            padding-bottom: env(safe-area-inset-bottom, 8px);
          }
          .bottom-tab {
            flex: 1; display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            padding: 8px 4px 6px;
            background: none; border: none;
            cursor: pointer; position: relative;
            font-family: system-ui, sans-serif;
            -webkit-tap-highlight-color: transparent;
            min-height: 52px;
          }
          .bottom-tab-icon { font-size: 18px; line-height: 1; margin-bottom: 2px; }
          .bottom-tab-label { font-size: 10px; font-weight: 500; letter-spacing: 0.02em; }
          .bottom-tab-bar {
            position: absolute; top: 0; left: 20%; right: 20%;
            height: 2px; border-radius: 0 0 2px 2px;
          }

          /* Input bar — sits above bottom nav */
          .input-bar { padding: 8px 12px; padding-bottom: 8px; }
          .chat-input { font-size: 16px; /* prevents iOS zoom */ }
          .send-btn { width: 42px; height: 42px; }

          /* Body padding: account for input + bottom nav */
          .app-body { padding: 12px 14px 16px; }
          .app-body.qa-mode { padding-bottom: 16px; }

          /* Cards */
          .card { padding: 14px; }
          .msg-bubble { max-width: 88%; }
          .prompt-block { font-size: 11px; }

          /* Onboarding */
          .onboarding-card { padding: 0; }
          .title-lg { font-size: 20px; }
          .choice-card { padding: 18px 20px; }
        }

        /* ── DESKTOP ENHANCEMENTS ── */
        @media (min-width: 768px) {
          .bottom-nav { display: none; }
          .app-body { padding: 20px 24px 32px; }
          .app-body.qa-mode { padding-bottom: 120px; }
          .app-header { padding: 12px 24px; }
          .input-bar { padding: 12px 24px 20px; }
          .chat-input { font-size: 14px; }
          .title-lg { font-size: 24px; }
          .body-md { font-size: 14px; }
        }
      `}</style>
    </div>
  );
}
