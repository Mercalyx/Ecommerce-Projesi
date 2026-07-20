// One-off generator for original, local placeholder illustrations.
// Run manually with `node scripts/generate-placeholder-art.mjs` only to fill in
// missing placeholders. Existing files are never overwritten, which protects
// bespoke and manually renewed artwork. Never imported by app code — invisible
// to Vite and Tailwind.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_ROOT = path.join(__dirname, "..", "assets", "products");

function starPoints(cx, cy, outerR, innerR, spikes, rotationDeg = -90) {
  const points = [];
  const step = Math.PI / spikes;
  let angle = (rotationDeg * Math.PI) / 180;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    points.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`);
    angle += step;
  }
  return points.join(" ");
}

function svgFile(inner, viewBox) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${inner}</svg>\n`;
}

// ---------------------------------------------------------------------------
// Prop / accessory icon library — each draws centered on local origin (0,0),
// caller positions via a wrapping <g transform="translate(x,y) ...">.
// ---------------------------------------------------------------------------
const icon = {
  flower: (c) => `
    <circle cx="-10" cy="0" r="8.5" fill="${c[0]}"/>
    <circle cx="10" cy="0" r="8.5" fill="${c[0]}"/>
    <circle cx="0" cy="-10" r="8.5" fill="${c[0]}"/>
    <circle cx="0" cy="9" r="8.5" fill="${c[0]}"/>
    <circle cx="0" cy="0" r="6.5" fill="${c[1]}"/>`,
  bookGlasses: (c) => `
    <rect x="-17" y="6" width="34" height="18" rx="2.5" fill="${c[0]}"/>
    <rect x="-17" y="6" width="34" height="5" fill="${c[1]}"/>
    <circle cx="-9" cy="-10" r="7.5" fill="none" stroke="${c[2]}" stroke-width="2.6"/>
    <circle cx="9" cy="-10" r="7.5" fill="none" stroke="${c[2]}" stroke-width="2.6"/>
    <line x1="-1.5" y1="-10" x2="1.5" y2="-10" stroke="${c[2]}" stroke-width="2.6"/>`,
  elephantMount: (c) => `
    <ellipse cx="0" cy="10" rx="34" ry="20" fill="${c[0]}"/>
    <path d="M -30 6 Q -42 10 -38 24 Q -35 28 -30 22" fill="none" stroke="${c[0]}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="-18" cy="-2" r="12" fill="${c[0]}"/>
    <circle cx="-20" cy="-10" r="6" fill="${c[1]}"/>
    <rect x="-30" y="24" width="7" height="12" rx="3" fill="${c[0]}"/>
    <rect x="-8" y="26" width="7" height="12" rx="3" fill="${c[0]}"/>
    <rect x="14" y="26" width="7" height="12" rx="3" fill="${c[0]}"/>
    <rect x="26" y="24" width="7" height="12" rx="3" fill="${c[0]}"/>`,
  flagHat: (c) => `
    <path d="M -18 12 A 20 12 0 0 1 22 12 Z" fill="${c[0]}"/>
    <ellipse cx="2" cy="12" rx="26" ry="5" fill="${c[0]}"/>
    <line x1="30" y1="-26" x2="30" y2="10" stroke="${c[1]}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 30 -26 L 50 -19 L 30 -12 Z" fill="${c[2]}"/>`,
  flute: (c) => `
    <rect x="-34" y="-4" width="68" height="8" rx="4" fill="${c[0]}" transform="rotate(-18)"/>
    <circle cx="-6" cy="-16" r="1.8" fill="${c[1]}"/>
    <circle cx="2" cy="-19" r="1.8" fill="${c[1]}"/>
    <circle cx="10" cy="-22" r="1.8" fill="${c[1]}"/>
    <path d="M -30 8 q 20 10 34 -2" fill="none" stroke="${c[2]}" stroke-width="2" opacity="0.6"/>`,
  scroll: (c) => `
    <rect x="-6" y="-20" width="12" height="40" rx="6" fill="${c[0]}"/>
    <circle cx="0" cy="-20" r="6.5" fill="${c[1]}"/>
    <circle cx="0" cy="20" r="6.5" fill="${c[1]}"/>`,
  jewelBox: (c) => `
    <rect x="-18" y="-6" width="36" height="22" rx="3" fill="${c[0]}"/>
    <path d="M -18 -6 Q 0 -18 18 -6 Z" fill="${c[1]}"/>
    <rect x="-4" y="0" width="8" height="8" fill="${c[2]}"/>`,
  key: (c) => `
    <circle cx="-14" cy="0" r="10" fill="none" stroke="${c[0]}" stroke-width="5"/>
    <rect x="-4" y="-3" width="26" height="6" fill="${c[0]}"/>
    <rect x="14" y="3" width="5" height="7" fill="${c[0]}"/>
    <rect x="21" y="3" width="5" height="10" fill="${c[0]}"/>`,
  banner: (c) => `
    <line x1="0" y1="-30" x2="0" y2="26" stroke="${c[0]}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 0 -26 L 34 -18 L 0 -6 Z" fill="${c[1]}"/>`,
  gemCollar: (c) => `
    <path d="M -14 0 Q 0 12 14 0" fill="none" stroke="${c[0]}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="0" cy="8" r="5.5" fill="${c[1]}"/>`,
  moonSparkle: (c) => `
    <path d="M 8 -18 A 14 14 0 1 0 8 10 A 11 11 0 1 1 8 -18 Z" fill="${c[0]}"/>
    <path d="M -22 8 l 2.4 5.4 5.4 2.4 -5.4 2.4 -2.4 5.4 -2.4 -5.4 -5.4 -2.4 5.4 -2.4 Z" fill="${c[1]}"/>`,
  lionHeadIcon: (c) => `
    <circle cx="0" cy="0" r="13" fill="${c[0]}"/>
    ${Array.from({ length: 10 })
      .map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        const x1 = Math.cos(a) * 15, y1 = Math.sin(a) * 15;
        const x2 = Math.cos(a) * 23, y2 = Math.sin(a) * 23;
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${c[0]}" stroke-width="4" stroke-linecap="round"/>`;
      })
      .join("")}
    <circle cx="-4.5" cy="-2" r="1.8" fill="${c[1]}"/>
    <circle cx="4.5" cy="-2" r="1.8" fill="${c[1]}"/>
    <path d="M -3 5 Q 0 8 3 5" fill="none" stroke="${c[1]}" stroke-width="1.6"/>`,
  sharpStarIcon: (c) => `<polygon points="${starPoints(0, 0, 20, 8, 6)}" fill="${c[0]}"/>`,
  dropletIcon: (c) => `<path d="M 0 -18 Q 14 2 0 16 Q -14 2 0 -18 Z" fill="${c[0]}"/>`,
  crystalIcon: (c) => `<polygon points="0,-18 12,-4 8,16 -8,16 -12,-4" fill="${c[0]}"/>`,
  archTierIcon: (c) => `
    <path d="M -16 16 L -16 2 A 16 16 0 0 1 16 2 L 16 16 Z" fill="${c[0]}"/>
    <path d="M -10 16 L -10 4 A 10 10 0 0 1 10 4 L 10 16 Z" fill="${c[1]}"/>`,
};

function withIcon(name, colors, tx, ty, scale = 1) {
  return `<g transform="translate(${tx},${ty}) scale(${scale})">${icon[name](colors)}</g>`;
}

// ---------------------------------------------------------------------------
// Character "family" body renderers — each returns a <g> centered on (120,120)
// within a 240x240 frame, with a soft tinted backdrop circle.
// ---------------------------------------------------------------------------
function backdrop(tint) {
  return `<circle cx="120" cy="120" r="112" fill="${tint}"/>`;
}

function frogBody({ skin, skinShade, belly, blush }) {
  return `
    <ellipse cx="120" cy="152" rx="60" ry="48" fill="${skin}"/>
    <ellipse cx="120" cy="166" rx="36" ry="26" fill="${belly}"/>
    <ellipse cx="72" cy="140" rx="16" ry="20" fill="${skin}"/>
    <ellipse cx="168" cy="140" rx="16" ry="20" fill="${skin}"/>
    <circle cx="93" cy="100" r="23" fill="${skin}"/>
    <circle cx="147" cy="100" r="23" fill="${skin}"/>
    <circle cx="93" cy="97" r="9" fill="#182420"/>
    <circle cx="147" cy="97" r="9" fill="#182420"/>
    <circle cx="90" cy="94" r="3" fill="#ffffff"/>
    <circle cx="144" cy="94" r="3" fill="#ffffff"/>
    <path d="M 104 132 Q 120 142 136 132" fill="none" stroke="${skinShade}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="80" cy="120" r="7" fill="${blush}" opacity="0.55"/>
    <circle cx="160" cy="120" r="7" fill="${blush}" opacity="0.55"/>
    <ellipse cx="96" cy="196" rx="14" ry="9" fill="${skin}"/>
    <ellipse cx="144" cy="196" rx="14" ry="9" fill="${skin}"/>`;
}

function royalBody({ robe, robeTrim, skin, headwear }) {
  return `
    <path d="M 76 210 Q 70 130 96 110 L 144 110 Q 170 130 164 210 Z" fill="${robe}"/>
    <path d="M 112 118 L 108 210 M 128 118 L 132 210" stroke="${robeTrim}" stroke-width="4" opacity="0.85"/>
    <circle cx="120" cy="88" r="30" fill="${skin}"/>
    <circle cx="110" cy="86" r="3" fill="#2a1f16"/>
    <circle cx="130" cy="86" r="3" fill="#2a1f16"/>
    <path d="M 111 100 Q 120 105 129 100" fill="none" stroke="#8a5a3a" stroke-width="2.4" stroke-linecap="round"/>
    ${headwear}`;
}

function catBody({ fur, furShade, eyes, gemColors }) {
  return `
    <ellipse cx="120" cy="168" rx="46" ry="34" fill="${fur}"/>
    <path d="M 168 176 Q 200 160 194 130 Q 186 144 166 152" fill="${fur}"/>
    <circle cx="120" cy="112" r="34" fill="${fur}"/>
    <path d="M 94 92 L 84 62 L 112 84 Z" fill="${fur}"/>
    <path d="M 146 92 L 156 62 L 128 84 Z" fill="${fur}"/>
    <path d="M 94 92 L 88 70 L 106 86 Z" fill="${furShade}"/>
    <path d="M 146 92 L 152 70 L 134 86 Z" fill="${furShade}"/>
    <path d="M 106 110 Q 112 104 118 110" fill="none" stroke="${eyes}" stroke-width="4" stroke-linecap="round"/>
    <path d="M 122 110 Q 128 104 134 110" fill="none" stroke="${eyes}" stroke-width="4" stroke-linecap="round"/>
    <path d="M 116 122 L 124 122 L 120 128 Z" fill="${furShade}"/>
    <path d="M 88 130 h -10 M 88 134 h -12 M 152 130 h 10 M 152 134 h 12" stroke="${furShade}" stroke-width="1.6" opacity="0.7"/>
    ${withIcon("gemCollar", gemColors, 120, 148, 1.05)}
    <ellipse cx="70" cy="150" rx="12" ry="8" fill="${fur}" transform="rotate(-18 70 150)"/>`;
}

function medallion({ ring, base, starA, starB, iconColors, iconName, starPointsCount = 8 }) {
  return `
    <circle cx="120" cy="120" r="98" fill="none" stroke="${ring}" stroke-width="4"/>
    <circle cx="120" cy="120" r="86" fill="${base}"/>
    <polygon points="${starPoints(120, 120, 78, 40, starPointsCount)}" fill="${starA}" opacity="0.9"/>
    <polygon points="${starPoints(120, 120, 78, 40, starPointsCount, -90 + 180 / starPointsCount)}" fill="${starB}" opacity="0.55"/>
    <circle cx="120" cy="120" r="40" fill="${base}" stroke="${ring}" stroke-width="2.5"/>
    ${withIcon(iconName, iconColors, 120, 120, 1.1)}`;
}

// ---------------------------------------------------------------------------
// Capsule / egg closed-shell art (product mainImage) + gallery "mystery lineup"
// ---------------------------------------------------------------------------
function eggArt(p) {
  return svgFile(
    `
    <defs>
      <radialGradient id="shine" cx="35%" cy="28%" r="70%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="100" cy="140" rx="78" ry="98" fill="${p.shell}"/>
    <ellipse cx="100" cy="140" rx="78" ry="98" fill="url(#shine)"/>
    ${Array.from({ length: 6 })
      .map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x = 100 + Math.cos(angle) * 46;
        const y = 140 + Math.sin(angle) * 62;
        return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(0.55)">${icon[p.motif](p.motifColors)}</g>`;
      })
      .join("")}
    <ellipse cx="100" cy="140" rx="78" ry="98" fill="none" stroke="${p.outline}" stroke-width="3" opacity="0.35"/>
  `,
    "0 0 200 280"
  );
}

function capsuleArt(p) {
  return svgFile(
    `
    <defs>
      <linearGradient id="cap" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${p.top}"/>
        <stop offset="100%" stop-color="${p.bottom}"/>
      </linearGradient>
    </defs>
    <rect x="26" y="24" width="148" height="232" rx="74" fill="url(#cap)"/>
    <rect x="26" y="132" width="148" height="16" fill="${p.seam}"/>
    <polygon points="${starPoints(100, 90, 30, 13, 8)}" fill="${p.starA}" opacity="0.9"/>
    <polygon points="${starPoints(100, 90, 30, 13, 8, -90 + 22.5)}" fill="${p.starB}" opacity="0.5"/>
    <polygon points="${starPoints(100, 190, 30, 13, 8)}" fill="${p.starA}" opacity="0.9"/>
    <polygon points="${starPoints(100, 190, 30, 13, 8, -90 + 22.5)}" fill="${p.starB}" opacity="0.5"/>
    <rect x="26" y="24" width="148" height="232" rx="74" fill="none" stroke="${p.gold}" stroke-width="4"/>
  `,
    "0 0 200 280"
  );
}

function lineupArt(p) {
  const dots = Array.from({ length: 5 })
    .map((_, i) => {
      const cx = 40 + i * 55;
      return `
        <circle cx="${cx}" cy="60" r="26" fill="${p.dot}"/>
        <text x="${cx}" y="70" font-family="Arial, sans-serif" font-size="26" font-weight="700" text-anchor="middle" fill="${p.mark}">?</text>`;
    })
    .join("");
  return svgFile(`<rect x="0" y="0" width="300" height="120" rx="18" fill="${p.bg}"/>${dots}`, "0 0 300 120");
}

// ---------------------------------------------------------------------------
// Collection data
// ---------------------------------------------------------------------------
const collections = [
  {
    slug: "froglove",
    palette: { tint: "#EAF6EE", skin: "#8FCBA4", skinShade: "#5E9C77", belly: "#F3FBEF", blush: "#F2A0B8" },
    capsule: {
      type: "egg",
      shell: "#9AD6B0",
      outline: "#3F7A57",
      motif: "flower",
      motifColors: ["#FBD3E0", "#FFFFFF"],
      dot: "#CDEBD8",
      mark: "#3F7A57",
      bg: "#F3FBEF",
    },
    figures: [
      {
        key: "lily-frog",
        name: "Lily Frog",
        prop: ["flower", ["#FBD3E0", "#FFFFFF"], 168, 118, 1.1],
      },
      {
        key: "scholar-frog",
        name: "Scholar Frog",
        prop: ["bookGlasses", ["#6F5B3E", "#8A6F4A", "#2C2620"], 166, 128, 1.05],
      },
      {
        key: "pink-elephant-rider-frog",
        name: "Pink Elephant Rider Frog",
        prop: ["elephantMount", ["#F2B8CE", "#7A3E56"], 120, 176, 1.0],
        mountFirst: true,
      },
      {
        key: "tour-guide-frog",
        name: "Tour Guide Frog",
        prop: ["flagHat", ["#F5D488", "#6F5B3E", "#E86A6A"], 158, 108, 1.0],
      },
      {
        key: "flutist-frog",
        name: "Flutist Frog",
        prop: ["flute", ["#D9B98C", "#6F5B3E", "#8FCBA4"], 160, 150, 1.05],
      },
    ],
  },
  {
    slug: "topkapi",
    palette: {},
    capsule: {
      type: "capsule",
      top: "#1B2A4A",
      bottom: "#123047",
      seam: "#D4AF37",
      gold: "#D4AF37",
      starA: "#2FB6A6",
      starB: "#F4ECD8",
      dot: "#274064",
      mark: "#D4AF37",
      bg: "#0F1E33",
    },
    figures: [
      {
        key: "mini-sultan-suleiman",
        name: "Mini Sultan Suleiman",
        royal: { robe: "#7A2036", robeTrim: "#D4AF37", skin: "#E9C6A0" },
        headwear: `<path d="M 92 78 Q 120 50 148 78 Q 120 68 92 78 Z" fill="#F4ECD8"/><circle cx="120" cy="58" r="5" fill="#D4AF37"/>`,
        prop: ["scroll", ["#F4ECD8", "#D4AF37"], 168, 150, 1.0],
      },
      {
        key: "mini-hurrem-sultan",
        name: "Mini Hurrem Sultan",
        royal: { robe: "#1F6E51", robeTrim: "#D4AF37", skin: "#E9C6A0" },
        headwear: `<path d="M 96 76 Q 120 56 144 76" fill="none" stroke="#D4AF37" stroke-width="5"/><circle cx="120" cy="66" r="5.5" fill="#7A2036"/>`,
        prop: ["jewelBox", ["#7A2036", "#D4AF37", "#F4ECD8"], 166, 152, 1.0],
      },
      {
        key: "treasury-keeper",
        name: "Treasury Keeper",
        royal: { robe: "#16213E", robeTrim: "#D4AF37", skin: "#E2B48C" },
        headwear: `<ellipse cx="120" cy="70" rx="20" ry="12" fill="#7A2036"/>`,
        prop: ["key", ["#D4AF37"], 166, 150, 1.05],
      },
      {
        key: "janissary-guard",
        name: "Janissary Guard",
        royal: { robe: "#123047", robeTrim: "#D4AF37", skin: "#E2B48C" },
        headwear: `<path d="M 100 78 Q 100 40 120 38 Q 140 40 140 78 Z" fill="#F4ECD8"/><rect x="100" y="74" width="40" height="8" fill="#D4AF37"/>`,
        prop: ["banner", ["#7A2036", "#2FB6A6"], 168, 140, 1.0],
      },
    ],
    secret: {
      key: "palace-cat",
      name: "Palace Cat",
      cat: { fur: "#F4ECD8", furShade: "#D8C79E", eyes: "#1F6E51", gemColors: ["#D4AF37", "#7A2036"] },
    },
  },
  {
    slug: "alhambra",
    palette: {},
    capsule: {
      type: "capsule",
      top: "#7A1F2B",
      bottom: "#16213E",
      seam: "#D4AF37",
      gold: "#D4AF37",
      starA: "#1F6E51",
      starB: "#F2F0EA",
      dot: "#3A2230",
      mark: "#D4AF37",
      bg: "#1B1220",
    },
    figures: [
      {
        key: "muqarnas-guardian",
        name: "Muqarnas Guardian",
        medallion: { ring: "#D4AF37", base: "#16213E", starA: "#1F6E51", starB: "#F2F0EA" },
        icon: ["archTierIcon", ["#D4AF37", "#F2F0EA"]],
      },
      {
        key: "court-of-the-lions",
        name: "Court of the Lions",
        medallion: { ring: "#D4AF37", base: "#7A1F2B", starA: "#D4AF37", starB: "#F2F0EA" },
        icon: ["lionHeadIcon", ["#F2F0EA", "#7A1F2B"]],
      },
      {
        key: "nasrid-star",
        name: "Nasrid Star",
        medallion: { ring: "#D4AF37", base: "#16213E", starA: "#D4AF37", starB: "#1F6E51" },
        icon: ["sharpStarIcon", ["#F2F0EA"]],
        starPointsCount: 8,
      },
      {
        key: "water-garden-spirit",
        name: "Water Garden Spirit",
        medallion: { ring: "#D4AF37", base: "#1F6E51", starA: "#F2F0EA", starB: "#16213E" },
        icon: ["dropletIcon", ["#F2F0EA"]],
      },
      {
        key: "alhambra-moon",
        name: "Alhambra Moon",
        medallion: { ring: "#D4AF37", base: "#16213E", starA: "#7A1F2B", starB: "#D4AF37" },
        icon: ["moonSparkle", ["#F2F0EA", "#D4AF37"]],
      },
    ],
  },
];

function buildFrogSvg(fig, palette) {
  const parts = [backdrop(palette.tint)];
  if (fig.mountFirst) {
    parts.push(withIcon(fig.prop[0], fig.prop[1], fig.prop[2], fig.prop[3], fig.prop[4]));
    parts.push(frogBody(palette));
  } else {
    parts.push(frogBody(palette));
    parts.push(withIcon(fig.prop[0], fig.prop[1], fig.prop[2], fig.prop[3], fig.prop[4]));
  }
  return svgFile(`<g>${parts.join("")}</g>`, "0 0 240 240");
}

function buildRoyalSvg(fig) {
  const parts = [backdrop("#F4ECD8"), royalBody({ ...fig.royal, headwear: fig.headwear })];
  parts.push(withIcon(fig.prop[0], fig.prop[1], fig.prop[2], fig.prop[3], fig.prop[4]));
  return svgFile(`<g>${parts.join("")}</g>`, "0 0 240 240");
}

function buildCatSvg(fig) {
  return svgFile(`<g>${backdrop("#FBF3DE")}${catBody(fig.cat)}</g>`, "0 0 240 240");
}

function buildMedallionSvg(fig) {
  const inner = medallion({ ...fig.medallion, iconColors: fig.icon[1], iconName: fig.icon[0], starPointsCount: fig.starPointsCount || 8 });
  return svgFile(`<g>${backdrop("#120C16")}${inner}</g>`, "0 0 240 240");
}

// ---------------------------------------------------------------------------
// Write everything
// ---------------------------------------------------------------------------
function writePlaceholderIfMissing(filePath, contents) {
  try {
    fs.writeFileSync(filePath, contents, { flag: "wx" });
    return true;
  } catch (error) {
    if (error.code === "EEXIST") return false;
    throw error;
  }
}

let createdCount = 0;
let skippedCount = 0;
for (const col of collections) {
  const dir = path.join(OUT_ROOT, col.slug);
  fs.mkdirSync(dir, { recursive: true });

  const isRoyal = col.slug === "topkapi";
  const isMedallion = col.slug === "alhambra";
  const isFrog = col.slug === "froglove";

  for (const fig of col.figures) {
    let svg;
    if (isFrog) svg = buildFrogSvg(fig, col.palette);
    else if (isRoyal) svg = buildRoyalSvg(fig);
    else if (isMedallion) svg = buildMedallionSvg(fig);
    const wasCreated = writePlaceholderIfMissing(path.join(dir, `${col.slug}-${fig.key}.svg`), svg);
    if (wasCreated) createdCount++;
    else skippedCount++;
  }

  if (col.secret) {
    const svg = buildCatSvg(col.secret);
    const wasCreated = writePlaceholderIfMissing(path.join(dir, `${col.slug}-${col.secret.key}.svg`), svg);
    if (wasCreated) createdCount++;
    else skippedCount++;
  }

  const cap = col.capsule;
  const capsuleSvg = cap.type === "egg" ? eggArt(cap) : capsuleArt(cap);
  const capsuleWasCreated = writePlaceholderIfMissing(path.join(dir, `${col.slug}-capsule-main.svg`), capsuleSvg);
  if (capsuleWasCreated) createdCount++;
  else skippedCount++;

  const gallerySvg = lineupArt(cap);
  const galleryWasCreated = writePlaceholderIfMissing(path.join(dir, `${col.slug}-capsule-gallery.svg`), gallerySvg);
  if (galleryWasCreated) createdCount++;
  else skippedCount++;
}

console.log(
  `Created ${createdCount} missing SVG placeholder(s); preserved ${skippedCount} existing asset(s) under ${path.relative(process.cwd(), OUT_ROOT)}`
);
