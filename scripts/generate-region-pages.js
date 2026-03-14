const fs = require('fs');
const path = require('path');

const villesEstrie = [
  "Sherbrooke", "Magog", "Coaticook", "Stratford", "Richmond", "Val-des-Sources", "Lac-Mégantic", "Cookshire-Eaton", "Windsor", "Orford",
  "Saint-Denis-de-Brompton", "Danville", "East Angus", "Ascot Corner", "Compton", "Stoke", "Stanstead", "Sainte-Catherine-de-Hatley", "Weedon", "Saint-François-Xavier-de-Brompton",
  "Waterville", "Eastman", "Valcourt", "Potton", "Frontenac", "Dudswell", "Austin", "Val-Joli", "Lambton", "Cleveland",
  "Wotton", "Nantes", "Racine", "Bury", "Ayer's Cliff", "Stukely-Sud", "Saint-Claude", "Bolton-Est", "Westbury", "Melbourne",
  "Saint-Ludger", "Lac-Drolet", "Notre-Dame-des-Bois", "Saint-Georges-de-Windsor", "Sainte-Cécile-de-Whitton", "Saint-Étienne-de-Bolton", "Courcelles", "La Patrie", "Marston", "Hatley",
  "Ogden", "Dixville", "Saint-Romain", "Audet", "Newport", "Saint-Herménégilde", "North Hatley", "Saint-Sébastien", "Saint-Isidore-de-Clifton", "Saint-Augustin-de-Woburn",
  "Bonsecours", "Stanstead-Est", "Sainte-Anne-de-la-Rochelle", "Lawrenceville", "Saint-Camille", "Barnston-Ouest", "Sainte-Edwidge-de-Clifton", "Stornoway", "Saint-Robert-Bellarmin", "Saint-Adrien",
  "Saint-Malo", "Scotstown", "Lingwick", "Maricourt", "Martinville", "Hampden", "Ulverton", "Piopolis", "Chartierville", "Milan",
  "East Hereford", "Ham-Sud", "Val-Racine", "Kingsbury", "Saint-Venant-de-Paquette", "Saint-Benoît-du-Lac"
];

function slug(ville) {
  return ville
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s) {
  return String(s).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function pageHtml(ville, baseUrl) {
  const s = slug(ville);
  const title = `Achat, vente et évaluation gratuite à ${ville} | Sophie Manzerolle`;
  const desc = `Sophie Manzerolle, courtier immobilier RE/MAX, vous accompagne à ${ville} en Estrie : achat de propriété, vente de propriété et évaluation gratuite. Contactez-moi pour votre projet immobilier.`;
  const canonical = baseUrl ? `${baseUrl.replace(/\/$/, '')}/regions/${s}.html` : '';

  return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
  <title>${escapeHtml(title)}</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="${escapeAttr(desc)}">
  <meta name="keywords" content="achat propriété ${escapeAttr(ville)}, vente propriété ${escapeAttr(ville)}, évaluation gratuite ${escapeAttr(ville)}, immobilier ${escapeAttr(ville)}, courtier ${escapeAttr(ville)} Estrie, Sophie Manzerolle">
  <meta name="robots" content="index, follow">
${canonical ? `  <link rel="canonical" href="${escapeAttr(canonical)}">` : ''}
  <meta property="og:title" content="${escapeAttr(title)}">
  <meta property="og:description" content="${escapeAttr(desc)}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="fr_CA">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(title)}">
  <meta name="twitter:description" content="${escapeAttr(desc)}">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Jost', 'sans-serif'],
            serif: ['Playfair Display', 'serif'],
          }
        }
      }
    }
  </script>
</head>
<body class="antialiased bg-white text-gray-800 font-sans">

  <nav class="sticky top-0 z-50 bg-[#000e35] py-6 px-6 lg:px-12 shadow-lg">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="../index.html" class="flex-shrink-0">
        <span class="text-xl md:text-2xl font-light tracking-widest text-white uppercase">
          Sophie <span class="font-bold text-[#660000]">Manzerolle</span>
        </span>
      </a>
      <div class="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.15em] text-white font-medium">
        <a href="../index.html" class="hover:text-[#660000] transition-colors">Accueil</a>
        <a href="../index.html#services" class="hover:text-[#660000] transition-colors">Expertise</a>
        <a href="../index.html#about" class="hover:text-[#660000] transition-colors">À propos</a>
        <a href="../index.html#Contact" class="hover:text-[#660000] transition-colors">Contact</a>
      </div>
      <a href="tel:4388804685" class="hidden md:flex items-center gap-3 border border-white/40 rounded-full px-6 py-2.5 text-white hover:bg-white hover:text-[#000e35] transition-colors">
        <span class="text-[11px] font-medium tracking-widest">(438) 880-4685</span>
      </a>
    </div>
  </nav>

  <header class="relative bg-[#000e35] py-16 lg:py-24 overflow-hidden">
    <div class="absolute inset-0 z-0 opacity-20">
      <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80" alt="Immobilier ${escapeAttr(ville)}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-[#000e35]/80"></div>
    </div>
    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
      <a href="../regiondesservies.html" class="inline-flex items-center gap-2 text-white/70 hover:text-[#660000] text-sm font-light mb-6 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        Toutes les régions desservies
      </a>
      <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
        Immobilier à <span class="italic text-[#660000]">${escapeHtml(ville)}</span>
      </h1>
      <p class="text-white/80 font-light text-lg mt-4 max-w-2xl">
        Achat, vente et évaluation gratuite de propriétés à ${escapeHtml(ville)} et environs en Estrie.
      </p>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
    <div class="grid md:grid-cols-1 gap-12 max-w-4xl">
      <section class="bg-white border border-[#000e35]/10 rounded-2xl p-8 lg:p-10 hover:border-[#660000]/20 transition-colors">
        <h2 class="font-serif text-2xl text-[#000e35] font-light mb-4 pb-2 border-b border-[#660000]/20">Achat de propriété ${escapeHtml(ville)}</h2>
        <p class="text-gray-600 font-light leading-relaxed">
          Je vous accompagne pour trouver la propriété idéale à ${escapeHtml(ville)} et ses environs. Que vous recherchiez une maison, un condo ou un terrain en Estrie, je mets mon expertise du marché local et mon réseau RE/MAX au service de votre projet d'achat à ${escapeHtml(ville)}.
        </p>
      </section>
      <section class="bg-white border border-[#000e35]/10 rounded-2xl p-8 lg:p-10 hover:border-[#660000]/20 transition-colors">
        <h2 class="font-serif text-2xl text-[#000e35] font-light mb-4 pb-2 border-b border-[#660000]/20">Vente de propriété ${escapeHtml(ville)}</h2>
        <p class="text-gray-600 font-light leading-relaxed">
          Vous souhaitez vendre votre bien à ${escapeHtml(ville)} ? Je vous propose une stratégie de mise en marché adaptée au secteur, une estimation précise et un accompagnement jusqu'à la signature. Vente de propriété à ${escapeHtml(ville)} avec transparence et professionnalisme.
        </p>
      </section>
      <section class="bg-white border border-[#000e35]/10 rounded-2xl p-8 lg:p-10 hover:border-[#660000]/20 transition-colors">
        <h2 class="font-serif text-2xl text-[#000e35] font-light mb-4 pb-2 border-b border-[#660000]/20">Évaluation gratuite ${escapeHtml(ville)}</h2>
        <p class="text-gray-600 font-light leading-relaxed">
          Obtenez une évaluation gratuite et sans engagement de votre propriété à ${escapeHtml(ville)}. Basée sur les données du marché local en Estrie et mon expertise, cette estimation vous permet de connaître la valeur de votre bien et de planifier sereinement votre projet.
        </p>
      </section>
    </div>

    <div class="mt-16 p-8 bg-[#000e35]/5 rounded-2xl border border-[#000e35]/10">
      <p class="text-[#000e35] font-light text-lg mb-6">
        Vous avez un projet immobilier à ${escapeHtml(ville)} ? Contactez-moi pour une évaluation gratuite ou pour découvrir les propriétés disponibles dans le secteur.
      </p>
      <a href="../index.html#Contact" class="inline-flex items-center gap-2 bg-[#660000] text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest font-medium hover:bg-[#550000] transition-colors">
        Me contacter
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
      </a>
    </div>
  </main>

  <footer class="bg-[#1a1a1a] py-16 font-sans mt-24">
    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-10 pb-12 border-b border-white/10">
        <div class="flex flex-col sm:flex-row items-center gap-6">
          <div class="w-32 h-12 flex items-center justify-center opacity-80">
            <img src="../public/remaxblanc.svg" alt="RE/MAX Logo" class="w-full h-full object-contain">
          </div>
          <div class="text-center sm:text-left">
            <span class="block text-xl font-serif font-light text-white tracking-wide">Sophie Manzerolle</span>
            <span class="block text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">Courtier Immobilier Estrie</span>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <a href="tel:4388804685" class="text-white/70 hover:text-[#660000] transition-colors text-sm">(438) 880-4685</a>
          <a href="mailto:sophie.manzerolle@remax.com" class="text-white/70 hover:text-[#660000] transition-colors text-sm">Courriel</a>
        </div>
      </div>
      <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p class="text-white/30 text-xs font-light">© 2026 Sophie Manzerolle. Tous droits réservés.</p>
        <div class="flex items-center gap-8 text-xs text-white/30 font-light">
          <a href="../regiondesservies.html" class="hover:text-white transition-colors">Régions desservies</a>
          <a href="../index.html" class="hover:text-white transition-colors">Accueil</a>
          <a href="../index.html#Contact" class="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>
`;
}

const outDir = path.join(__dirname, '..', 'regions');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const baseUrl = process.env.SITE_URL || '';
let count = 0;
for (const ville of villesEstrie) {
  const s = slug(ville);
  const filePath = path.join(outDir, `${s}.html`);
  fs.writeFileSync(filePath, pageHtml(ville, baseUrl), 'utf8');
  count++;
  console.log(`Generated ${s}.html (${ville})`);
}
console.log(`\nDone. ${count} region pages written to regions/`);
