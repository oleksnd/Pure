// ============================================================
// PURE — Palette Engine v2
// Requires globals: RESEARCH_DATA (defined in index.html), lang
// ============================================================

// --- DEPENDENCY GUARD ---
if (typeof RESEARCH_DATA === 'undefined') {
    console.error('[PaletteEngine] RESEARCH_DATA is not defined. Make sure index.html loads the data before paletteEngine.js.');
}
if (typeof lang === 'undefined') {
    window.lang = 'en';
    console.warn('[PaletteEngine] lang is not defined. Falling back to "en".');
}

// --- SEMANTIC THESAURUS ---
// Keys: words in Russian and English. Values: color names matching RESEARCH_DATA.colors[].name.en
const EMOTION_THESAURUS = {
    // Fire / Heat
    'огонь': ['Red', 'Orange', 'Yellow'], 'fire': ['Red', 'Orange', 'Yellow'],
    'flame': ['Red', 'Orange', 'Yellow'], 'пламя': ['Red', 'Orange', 'Yellow'],
    'жар': ['Red', 'Orange'], 'heat': ['Red', 'Orange'], 'hot': ['Red', 'Orange'],
    // Love / Romance
    'любовь': ['Red', 'Violet'], 'love': ['Red', 'Violet'],
    'romance': ['Red', 'Violet'], 'романтика': ['Red', 'Violet'],
    'страсть': ['Red', 'Violet'], 'passion': ['Red', 'Violet'],
    // Anger / Rage
    'ярость': ['Red', 'Orange'], 'rage': ['Red', 'Orange'],
    'anger': ['Red', 'Orange'], 'гнев': ['Red', 'Orange'],
    'агрессия': ['Red', 'Orange'], 'aggression': ['Red', 'Orange'],
    // Joy / Happiness
    'радость': ['Yellow', 'Orange'], 'joy': ['Yellow', 'Orange'],
    'happiness': ['Yellow', 'Orange'], 'счастье': ['Yellow', 'Orange'],
    'веселье': ['Yellow', 'Orange'], 'fun': ['Yellow', 'Orange'],
    // Childhood / Nostalgia
    'детство': ['Yellow', 'Orange'], 'childhood': ['Yellow', 'Orange'],
    'nostalgia': ['Yellow', 'Orange'], 'ностальгия': ['Yellow', 'Orange'],
    'воспоминания': ['Yellow', 'Orange'], 'memories': ['Yellow', 'Orange'],
    // Warmth / Coziness
    'тепло': ['Orange', 'Yellow', 'Red'], 'warmth': ['Orange', 'Yellow', 'Red'],
    'warm': ['Orange', 'Yellow'], 'cozy': ['Orange', 'Yellow'], 'уют': ['Orange', 'Yellow'],
    // Nature
    'природа': ['Green', 'Yellow'], 'nature': ['Green', 'Yellow'],
    'forest': ['Green'], 'лес': ['Green'],
    'earth': ['Orange', 'Yellow', 'Black'], 'земля': ['Orange', 'Yellow', 'Black'],
    'почва': ['Orange', 'Black'], 'soil': ['Orange', 'Black'],
    'трава': ['Green'], 'grass': ['Green'],
    'растения': ['Green'], 'plants': ['Green'],
    // Poison / Toxic
    'яд': ['Green', 'Yellow'], 'poison': ['Green', 'Yellow'],
    'toxic': ['Green', 'Yellow'], 'токсичность': ['Green', 'Yellow'],
    // Ocean / Water / Sea
    'море': ['Blue', 'Green'], 'ocean': ['Blue', 'Green'], 'sea': ['Blue', 'Green'],
    'вода': ['Blue'], 'water': ['Blue'],
    'волна': ['Blue', 'Green'], 'wave': ['Blue', 'Green'],
    'река': ['Blue', 'Green'], 'river': ['Blue', 'Green'],
    // Sky / Air
    'небо': ['Blue'], 'sky': ['Blue'],
    'воздух': ['Blue', 'White'], 'air': ['Blue', 'White'],
    'ветер': ['Blue', 'White'], 'wind': ['Blue', 'White'],
    // Space / Cosmos
    'космос': ['Blue', 'Violet', 'Black'], 'space': ['Blue', 'Violet', 'Black'],
    'galaxy': ['Blue', 'Violet', 'Black'], 'галактика': ['Blue', 'Violet', 'Black'],
    'universe': ['Blue', 'Violet', 'Black'], 'вселенная': ['Blue', 'Violet', 'Black'],
    'звезды': ['Blue', 'Violet', 'Black'], 'stars': ['Blue', 'Violet', 'Black'],
    // Night / Darkness
    'ночь': ['Black', 'Blue', 'Violet'], 'night': ['Black', 'Blue', 'Violet'],
    'midnight': ['Black', 'Blue', 'Violet'], 'полночь': ['Black', 'Blue', 'Violet'],
    'тьма': ['Black', 'Violet'], 'darkness': ['Black', 'Violet'], 'темнота': ['Black'],
    // Serenity / Calm
    'спокойствие': ['Blue', 'Green', 'White'], 'serenity': ['Blue', 'Green', 'White'],
    'calm': ['Blue', 'Green'], 'покой': ['Blue', 'Green', 'White'],
    'peace': ['Blue', 'Green', 'White'], 'мир': ['Blue', 'Green', 'White'],
    'relax': ['Blue', 'Green'], 'расслабление': ['Blue', 'Green'],
    'meditation': ['Blue', 'Violet'], 'медитация': ['Blue', 'Violet'],
    // Mysticism / Magic
    'мистика': ['Violet', 'Black'], 'mysticism': ['Violet', 'Black'],
    'magic': ['Violet', 'Black'], 'магия': ['Violet', 'Black'],
    'тайна': ['Violet', 'Black'], 'mystery': ['Violet', 'Black'],
    'загадка': ['Violet'], 'fantasy': ['Violet', 'Blue'], 'фантазия': ['Violet', 'Blue'],
    'dream': ['Violet', 'Blue'], 'мечта': ['Violet', 'Blue'],
    // Loneliness / Sadness
    'одиночество': ['Blue', 'Grey', 'Black'], 'loneliness': ['Blue', 'Grey', 'Black'],
    'sad': ['Blue', 'Grey'], 'грусть': ['Blue', 'Grey'], 'sadness': ['Blue', 'Grey'],
    'печаль': ['Blue', 'Grey'],
    'меланхолия': ['Blue', 'Grey', 'Violet'], 'melancholy': ['Blue', 'Grey', 'Violet'],
    // Boredom / Monotony
    'скука': ['Grey'], 'boredom': ['Grey'], 'boring': ['Grey'],
    'скучный': ['Grey'], 'monotony': ['Grey'], 'монотонность': ['Grey'],
    // Anxiety / Fear
    'тревога': ['Red', 'Orange', 'Violet'], 'anxiety': ['Red', 'Orange', 'Violet'],
    'panic': ['Red', 'Orange'], 'паника': ['Red', 'Orange'],
    'страх': ['Black', 'Violet'], 'fear': ['Black', 'Violet'],
    'ужас': ['Black', 'Red'], 'horror': ['Black', 'Red'],
    // Death / Darkness
    'смерть': ['Black', 'Violet'], 'death': ['Black', 'Violet'],
    'траур': ['Black'], 'mourning': ['Black'],
    'темный': ['Black'], 'dark': ['Black', 'Violet'],
    // Power / Strength / Energy
    'сила': ['Red', 'Black'], 'power': ['Red', 'Black'],
    'strength': ['Red', 'Black'], 'мощь': ['Red', 'Black'],
    'энергия': ['Red', 'Orange', 'Yellow'], 'energy': ['Red', 'Orange', 'Yellow'],
    // Luxury / Royal / Gold
    'роскошь': ['Violet', 'Black'], 'luxury': ['Violet', 'Black'],
    'royal': ['Violet', 'Black'], 'величие': ['Violet', 'Black'],
    'grandeur': ['Violet', 'Black'],
    'gold': ['Yellow', 'Orange'], 'золото': ['Yellow', 'Orange'],
    // Purity / Minimalism
    'чистота': ['White', 'Grey'], 'purity': ['White', 'Grey'],
    'pure': ['White'], 'clean': ['White', 'Grey'],
    'minimal': ['White', 'Grey'], 'минимализм': ['White', 'Grey'],
    'свет': ['White', 'Yellow'], 'light': ['White', 'Yellow'],
    // Metal / Technology / Future
    'металл': ['Grey'], 'metal': ['Grey'], 'steel': ['Grey'], 'сталь': ['Grey'],
    'technology': ['Grey', 'Blue'], 'технологии': ['Grey', 'Blue'],
    'future': ['Blue', 'Violet', 'Grey'], 'будущее': ['Blue', 'Violet', 'Grey'],
    // Sunset / Dawn
    'закат': ['Orange', 'Red', 'Violet'], 'sunset': ['Orange', 'Red', 'Violet'],
    'dusk': ['Orange', 'Red', 'Violet'], 'сумерки': ['Violet', 'Orange'],
    'рассвет': ['Orange', 'Yellow', 'Red'], 'dawn': ['Orange', 'Yellow', 'Red'],
    'sunrise': ['Orange', 'Yellow', 'Red'],
    'утро': ['Yellow', 'Orange'], 'morning': ['Yellow', 'Orange'],
    // Cold / Ice / Winter
    'холод': ['Blue', 'White', 'Grey'], 'cold': ['Blue', 'White', 'Grey'],
    'ice': ['Blue', 'White'], 'лед': ['Blue', 'White'],
    'снег': ['White', 'Blue'], 'snow': ['White', 'Blue'],
    'frost': ['White', 'Blue'], 'мороз': ['White', 'Blue'],
    'зима': ['White', 'Blue', 'Grey'], 'winter': ['White', 'Blue', 'Grey'],
    // Life / Growth / Spring
    'жизнь': ['Green', 'Yellow', 'Red'], 'life': ['Green', 'Yellow', 'Red'],
    'vitality': ['Green', 'Red', 'Orange'], 'витальность': ['Green', 'Red', 'Orange'],
    'здоровье': ['Green'], 'health': ['Green'],
    'рост': ['Green'], 'growth': ['Green'],
    'весна': ['Green', 'Yellow'], 'spring': ['Green', 'Yellow'],
    // Autumn / Summer
    'осень': ['Orange', 'Yellow', 'Red'], 'autumn': ['Orange', 'Yellow', 'Red'],
    'fall': ['Orange', 'Yellow', 'Red'],
    'лето': ['Yellow', 'Orange', 'Green'], 'summer': ['Yellow', 'Orange', 'Green'],

    // --- CLUSTER 1: Drama & Mystery ---
    'нуар': ['Violet', 'Black'], 'noir': ['Violet', 'Black'],
    'бездна': ['Black', 'Violet', 'Blue'], 'abyss': ['Black', 'Violet', 'Blue'],
    'тень': ['Black', 'Grey', 'Violet'], 'shadow': ['Black', 'Grey', 'Violet'],
    'театр': ['Violet', 'Black'], 'theater': ['Violet', 'Black'], 'theatre': ['Violet', 'Black'],
    'бархат': ['Violet', 'Black'], 'velvet': ['Violet', 'Black'],
    'драма': ['Violet', 'Black', 'Red'], 'drama': ['Violet', 'Black', 'Red'],
    'заговор': ['Black', 'Violet'], 'conspiracy': ['Black', 'Violet'],
    'элита': ['Violet', 'Black'], 'elite': ['Violet', 'Black'],
    'тяжесть': ['Black', 'Grey'], 'weight': ['Black', 'Grey'],
    'глубина': ['Black', 'Violet', 'Blue'], 'depth': ['Black', 'Violet', 'Blue'],
    'власть': ['Black', 'Violet', 'Red'], 'domination': ['Black', 'Violet', 'Red'],

    // --- CLUSTER 2: Euphoria & Celebration ---
    'триумф': ['Yellow', 'Orange', 'Red'], 'triumph': ['Yellow', 'Orange', 'Red'],
    'восторг': ['Yellow', 'Orange'], 'delight': ['Yellow', 'Orange'],
    'карнавал': ['Orange', 'Yellow', 'Red', 'Violet'], 'carnival': ['Orange', 'Yellow', 'Red', 'Violet'],
    'блеск': ['Yellow', 'Orange', 'White'], 'glitter': ['Yellow', 'Orange', 'White'], 'shine': ['Yellow', 'Orange', 'White'],
    'искры': ['Yellow', 'Orange', 'Red'], 'sparks': ['Yellow', 'Orange', 'Red'],
    'солнце': ['Yellow', 'Orange'], 'sun': ['Yellow', 'Orange'],
    'витамины': ['Orange', 'Yellow', 'Green'], 'vitamins': ['Orange', 'Yellow', 'Green'],
    'цитрус': ['Yellow', 'Orange'], 'citrus': ['Yellow', 'Orange'],
    'праздник': ['Orange', 'Yellow', 'Red'], 'holiday': ['Orange', 'Yellow', 'Red'], 'celebration': ['Orange', 'Yellow', 'Red'],
    'успех': ['Yellow', 'Orange'], 'success': ['Yellow', 'Orange'],
    'азарт': ['Red', 'Orange'], 'excitement': ['Red', 'Orange'],
    'смех': ['Yellow', 'Orange'], 'laughter': ['Yellow', 'Orange'],
    'скорость': ['Red', 'Orange'], 'speed': ['Red', 'Orange'],
    'динамика': ['Red', 'Orange', 'Yellow'], 'dynamic': ['Red', 'Orange', 'Yellow'],

    // --- CLUSTER 3: Sterility & Cold ---
    'стекло': ['White', 'Grey', 'Blue'], 'glass': ['White', 'Grey', 'Blue'],
    'арктика': ['White', 'Blue'], 'arctic': ['White', 'Blue'],
    'вакуум': ['White', 'Grey'], 'vacuum': ['White', 'Grey'],
    'лаборатория': ['White', 'Grey', 'Blue'], 'laboratory': ['White', 'Grey', 'Blue'], 'lab': ['White', 'Grey', 'Blue'],
    'алмаз': ['White', 'Blue'], 'diamond': ['White', 'Blue'],
    'фарфор': ['White'], 'porcelain': ['White'],
    'тишина': ['White', 'Grey'], 'silence': ['White', 'Grey'],
    'интеллект': ['Blue', 'White', 'Grey'], 'intellect': ['Blue', 'White', 'Grey'], 'intelligence': ['Blue', 'White', 'Grey'],
    'логика': ['Blue', 'Grey'], 'logic': ['Blue', 'Grey'],
    'аналитика': ['Blue', 'Grey', 'White'], 'analytics': ['Blue', 'Grey', 'White'],

    // --- CLUSTER 4: Cozy & Earth ---
    'дом': ['Orange', 'Yellow'], 'home': ['Orange', 'Yellow'], 'house': ['Orange', 'Yellow'],
    'хлеб': ['Orange', 'Yellow'], 'bread': ['Orange', 'Yellow'],
    'кофе': ['Orange', 'Black'], 'coffee': ['Orange', 'Black'],
    'дерево': ['Orange', 'Yellow'], 'wood': ['Orange', 'Yellow'], 'tree': ['Green', 'Orange'],
    'глина': ['Orange', 'Yellow'], 'clay': ['Orange', 'Yellow'],
    'традиции': ['Orange', 'Yellow'], 'tradition': ['Orange', 'Yellow'],
    'корица': ['Orange', 'Red'], 'cinnamon': ['Orange', 'Red'],
    'шерсть': ['Orange', 'Yellow'], 'wool': ['Orange', 'Yellow'],
    'песок': ['Yellow', 'Orange'], 'sand': ['Yellow', 'Orange'],
    'старина': ['Orange', 'Yellow', 'Grey'], 'antique': ['Orange', 'Yellow', 'Grey'],
    'забота': ['Orange', 'Yellow', 'Green'], 'care': ['Orange', 'Yellow', 'Green'],
    'рожь': ['Yellow', 'Orange'], 'rye': ['Yellow', 'Orange'],
    'крафт': ['Orange', 'Yellow'], 'craft': ['Orange', 'Yellow'],
    'баланс': ['Green', 'Yellow'], 'balance': ['Green', 'Yellow'],
    'гармония': ['Green', 'Yellow', 'Blue'], 'harmony': ['Green', 'Yellow', 'Blue'],

    // --- CLUSTER 5: Cyberpunk & Neon ---
    'токсин': ['Green', 'Yellow'], 'toxin': ['Green', 'Yellow'],
    'радиация': ['Yellow', 'Green'], 'radiation': ['Yellow', 'Green'],
    'глитч': ['Violet', 'Blue', 'Green'], 'glitch': ['Violet', 'Blue', 'Green'],
    'лазер': ['Red', 'Green', 'Violet'], 'laser': ['Red', 'Green', 'Violet'],
    'неон': ['Green', 'Yellow', 'Violet', 'Blue'], 'neon': ['Green', 'Yellow', 'Violet', 'Blue'],
    'вирус': ['Green', 'Yellow'], 'virus': ['Green', 'Yellow'],
    'мутация': ['Green', 'Violet', 'Yellow'], 'mutation': ['Green', 'Violet', 'Yellow'],
    'техно': ['Blue', 'Violet', 'Grey'], 'techno': ['Blue', 'Violet', 'Grey'],
    'синтетика': ['Blue', 'Green', 'Grey'], 'synthetic': ['Blue', 'Green', 'Grey'],
    'шок': ['Red', 'Yellow'], 'shock': ['Red', 'Yellow'],
    'сигнал': ['Yellow', 'Red', 'Green'], 'signal': ['Yellow', 'Red', 'Green'],
    'кислота': ['Yellow', 'Green'], 'acid': ['Yellow', 'Green'],
    'электричество': ['Yellow', 'Blue'], 'electricity': ['Yellow', 'Blue'], 'electric': ['Yellow', 'Blue'],
    'киберпанк': ['Violet', 'Blue', 'Green'], 'cyberpunk': ['Violet', 'Blue', 'Green'],

    // --- CLUSTER 6: Fading & Grief ---
    'пыль': ['Grey'], 'dust': ['Grey'],
    'пепел': ['Grey', 'Black'], 'ash': ['Grey', 'Black'],
    'туман': ['Grey', 'White'], 'fog': ['Grey', 'White'], 'mist': ['Grey', 'White'],
    'забытье': ['Grey', 'Black'], 'oblivion': ['Grey', 'Black'],
    'усталость': ['Grey'], 'fatigue': ['Grey'], 'tired': ['Grey'],
    'бессонница': ['Black', 'Blue', 'Grey'], 'insomnia': ['Black', 'Blue', 'Grey'],
    'дождь': ['Grey', 'Blue'], 'rain': ['Grey', 'Blue'],
    'призрак': ['Grey', 'White', 'Violet'], 'ghost': ['Grey', 'White', 'Violet'],
    'бетон': ['Grey'], 'concrete': ['Grey'],
    'руины': ['Grey', 'Black'], 'ruins': ['Grey', 'Black'],
    'тлен': ['Grey', 'Black'], 'decay': ['Grey', 'Black'],
    'пустота': ['Grey', 'Black', 'White'], 'emptiness': ['Grey', 'Black', 'White'], 'void': ['Grey', 'Black'],
    'смог': ['Grey', 'Black'], 'smog': ['Grey', 'Black'],

    // --- CLUSTER 7: Childhood & Fragility ---
    'зефир': ['White', 'Violet'], 'marshmallow': ['White', 'Violet'],
    'сахар': ['White', 'Yellow'], 'sugar': ['White', 'Yellow'],
    'ласка': ['Violet', 'Red'], 'affection': ['Violet', 'Red'],
    'нежность': ['Violet', 'Red', 'White'], 'tenderness': ['Violet', 'Red', 'White'],
    'кукла': ['Violet', 'Red', 'White'], 'doll': ['Violet', 'Red', 'White'],
    'вата': ['White', 'Grey'], 'cotton': ['White', 'Grey'],
    'облако': ['White', 'Grey', 'Blue'], 'cloud': ['White', 'Grey', 'Blue'],
    'цветок': ['Red', 'Violet', 'Yellow'], 'flower': ['Red', 'Violet', 'Yellow'],
    'невинность': ['White'], 'innocence': ['White'],
    'юность': ['Yellow', 'Green'], 'youth': ['Yellow', 'Green'],
    'пудра': ['White', 'Grey', 'Violet'], 'powder': ['White', 'Grey', 'Violet'],
    'сладкий': ['Yellow', 'Violet'], 'sweet': ['Yellow', 'Violet'],
    'хрупкость': ['White', 'Grey'], 'fragility': ['White', 'Grey'], 'fragile': ['White', 'Grey'],
    'пастель': ['White', 'Violet', 'Yellow'], 'pastel': ['White', 'Violet', 'Yellow'],
    'романс': ['Violet', 'Red'], 'romans': ['Violet', 'Red'],
};

// --- THESAURUS LOOKUP WITH STEMMING ---
// Handles inflected forms by comparing word roots (first N chars).
// Works for both Russian (зимний → зима) and English (wintry → winter).
function thesaurusLookup(token) {
    if (!token || token.length < 2) return null;
    // 1. Exact match
    if (EMOTION_THESAURUS[token]) return EMOTION_THESAURUS[token];
    if (token.length < 4) return null;
    // 2. Stem match: compare token against each key using a shared root window.
    // "зимний" (6) vs key "зима" (4): root = min(keyLen-1, 5) = 3 → "зим".
    // "зимний".startsWith("зим") = true → match.
    for (const key of Object.keys(EMOTION_THESAURUS)) {
        if (key.length < 4) continue;
        const kRoot = key.slice(0, Math.min(key.length - 1, 5));
        const tRoot = token.slice(0, Math.min(token.length - 1, 5));
        if (token.startsWith(kRoot) || key.startsWith(tRoot)) {
            return EMOTION_THESAURUS[key];
        }
    }
    return null;
}

// --- COLOR MATH ---

function getLuminance(hex) {
    if (!hex || hex === 'transparent') return 0;
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    const lin = c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function hexToHsl(hex) {
    if (!hex || typeof hex !== 'string') return [0, 0, 50];
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
    if (hex.length !== 6) return [0, 0, 50];
    let r = parseInt(hex.substr(0, 2), 16) / 255;
    let g = parseInt(hex.substr(2, 2), 16) / 255;
    let b = parseInt(hex.substr(4, 2), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return [h * 360, s * 100, l * 100];
}

function hslToHex(h, s, l) {
    h = h % 360; if (h < 0) h += 360;
    s /= 100; l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60)       { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else              { r = c; g = 0; b = x; }
    const toHex = v => Math.round((v + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getComplementaryColor(hex) {
    if (!hex || hex === 'transparent') return '#888888';
    try {
        const [h, s, l] = hexToHsl(hex);
        return hslToHex(h + 180, s, l);
    } catch (e) {
        return '#888888';
    }
}

// --- HARMONY MATH ---

// Angular distance between two hues on the 360° wheel (always 0–180)
function hueDiff(h1, h2) {
    const d = Math.abs(h1 - h2) % 360;
    return d > 180 ? 360 - d : d;
}

// Two items are "too similar" when hue gap < 15° AND lightness gap < 12 points.
// Prevents picking near-identical shades for different roles.
function isTooSimilar(hexA, hexB) {
    if (!hexA || !hexB || hexA === 'transparent' || hexB === 'transparent') return false;
    try {
        const [hA, , lA] = hexToHsl(hexA);
        const [hB, , lB] = hexToHsl(hexB);
        return hueDiff(hA, hB) < 15 && Math.abs(lA - lB) < 12;
    } catch (e) { return false; }
}

// Generate a synthetic shade object when the pool cannot fill a role.
// hueOffset: degrees to rotate from anchorHex's hue.
// lightnessOverride: if set, force L% to this value (for Neutral role).
function synthesizeShade(anchorHex, hueOffset, lightnessOverride) {
    if (!anchorHex || anchorHex === 'transparent') anchorHex = '#888888';
    let [h, s, l] = hexToHsl(anchorHex);
    h = (h + hueOffset + 360) % 360;
    if (lightnessOverride !== undefined) {
        l = lightnessOverride;
        s = Math.min(s, 20); // desaturate to keep it neutral
    }
    // Ensure minimum saturation so the color is visible
    s = Math.max(s, 8);
    const hex = hslToHex(h, s, l);
    return {
        hex,
        name: { en: 'Auto', ru: 'Авто' },
        _synthesized: true
    };
}

// --- SEMANTIC SEARCH ---
function findPalette(query) {
    if (typeof RESEARCH_DATA === 'undefined') return null;
    if (!query || query.trim() === '') return null;
    query = query.toLowerCase().trim();

    const tokens = query.split(/\s+/).filter(t => t.length > 1);

    function fuzzyMatch(str, q) {
        if (!str) return 0;
        str = str.toLowerCase();
        if (str === q) return 100;
        if (str.includes(q)) return 50;
        const tkns = q.split(/\s+/);
        let score = 0;
        tkns.forEach(t => { if (t.length > 2 && str.includes(t)) score += 10; });
        return score;
    }

    // Step 1: thesaurus lookup — per token, find matching color names
    const tokenTagMap = new Map(); // token -> Set<colorNameEn>
    tokens.forEach(token => {
        const colorNames = thesaurusLookup(token);
        if (colorNames && colorNames.length > 0) {
            tokenTagMap.set(token, new Set(colorNames));
        }
    });

    // Step 2: balanced thesaurus pool — each token contributes proportionally
    const quota = Math.ceil(5 / Math.max(tokens.length, 1));
    const selectedColorNames = new Set();
    const resultPool = [];

    tokenTagMap.forEach((colorNameSet) => {
        let added = 0;
        colorNameSet.forEach(colorName => {
            if (added >= quota) return;
            const col = RESEARCH_DATA.colors.find(c => c.name.en === colorName);
            if (col && !selectedColorNames.has(colorName)) {
                selectedColorNames.add(colorName);
                resultPool.push({ color: col, score: 200 });
                added++;
            }
        });
    });

    // Step 3: fuzzy search across base colors AND individual shades
    const fuzzyPool = [];
    const shadeMatches = []; // specific shades that matched the query

    RESEARCH_DATA.colors.forEach(col => {
        let colorScore = 0;
        const colorSearchSpace = [
            col.name?.ru, col.name?.en,
            col.physics?.ru, col.physics?.en,
            col.physiology?.ru, col.physiology?.en,
            col.profile?.ru, col.profile?.en,
            col.advice?.ru, col.advice?.en,
            col.feelings?.ru, col.feelings?.en,
            col.tip?.ru, col.tip?.en
        ];
        tokens.forEach(token => {
            colorSearchSpace.forEach(text => { colorScore += fuzzyMatch(text, token); });
        });

        // Search each shade individually — track matches separately
        if (col.shades) {
            col.shades.forEach(shade => {
                let shadeScore = 0;
                tokens.forEach(token => {
                    shadeScore += fuzzyMatch(shade.name?.ru, token) * 2;
                    shadeScore += fuzzyMatch(shade.name?.en, token) * 2;
                    shadeScore += fuzzyMatch(shade.desc?.ru, token);
                    shadeScore += fuzzyMatch(shade.desc?.en, token);
                });
                if (shadeScore > 0) {
                    shadeMatches.push({ shade, parentColor: col, score: shadeScore });
                    colorScore += shadeScore * 0.3; // shade hit also boosts base color
                }
            });
        }

        if (!selectedColorNames.has(col.name.en) && colorScore > 0) {
            fuzzyPool.push({ color: col, score: colorScore });
        }
    });

    fuzzyPool.sort((a, b) => b.score - a.score);
    shadeMatches.sort((a, b) => b.score - a.score);
    fuzzyPool.forEach(item => resultPool.push(item));

    // Fallback: full-query fuzzy search if nothing found
    let bestColorsPool = resultPool;
    if (bestColorsPool.length === 0) {
        RESEARCH_DATA.colors.forEach(col => {
            const searchSpace = [col.name?.ru, col.name?.en, col.physics?.ru, col.physics?.en,
                col.physiology?.ru, col.physiology?.en, col.profile?.ru, col.profile?.en];
            let score = 0;
            searchSpace.forEach(text => { score += fuzzyMatch(text, query); });
            if (score > 0) bestColorsPool.push({ color: col, score });
        });
        bestColorsPool.sort((a, b) => b.score - a.score);
    }

    return {
        bestColorsPool,
        shadeMatches,
        tokenCount: tokens.length,
        thesaurusHit: tokenTagMap.size > 0
    };
}

// --- CONTRAST HELPER ---
function getContrastYIQ(hexcolor) {
    if (!hexcolor || hexcolor === 'transparent') return 'var(--black)';
    hexcolor = hexcolor.replace('#', '');
    if (hexcolor.length === 3) hexcolor = hexcolor.split('').map(x => x + x).join('');
    if (hexcolor.length !== 6) return '#1a1a1a';
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#1a1a1a' : '#ffffff';
}

function shuffleArray(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// --- SHADE DETECTION ---
// Shade objects have no `physics` field; main color objects always have it.
function isShadeObject(item) {
    return item && typeof item === 'object' && !item.physics && item.hex !== undefined;
}

// --- COLOR INFO EXTRACTION ---
function extractColorInfo(item) {
    if (!item) return { hex: 'transparent', name: '', emotion: '' };

    if (isShadeObject(item)) {
        const rawName = item.name?.[lang] || item.name?.en || '';
        const parts = rawName.includes('/') ? rawName.split('/') : [rawName, ''];
        return {
            hex: item.hex || 'transparent',
            name: parts[0].trim(),
            emotion: parts[1] ? parts[1].trim() : ''
        };
    }

    if (item.physics) {
        let emotion = '';
        if (item.feelings?.[lang]) emotion = item.feelings[lang].split(',')[0].trim();
        return {
            hex: item.hex || 'transparent',
            name: item.name?.[lang] || item.name?.en || '',
            emotion
        };
    }

    // Fallback — pairings object or manually constructed item
    return {
        hex: item.hex || 'transparent',
        name: item.name?.[lang] || item.name?.en || item.name || '',
        emotion: ''
    };
}

// --- NAVIGATE TO SHADE ON CLICK ---
// Global so it can be called from inline onclick attributes in generated HTML.
function navigateToShade(hex) {
    if (typeof RESEARCH_DATA === 'undefined' || typeof showProfile === 'undefined') return;
    hex = hex.toLowerCase();
    let foundColorIdx = null;
    let foundShadeIdx = null;

    RESEARCH_DATA.colors.forEach((col, ci) => {
        if (col.hex?.toLowerCase() === hex) {
            foundColorIdx = ci;
        }
        col.shades?.forEach((shade, si) => {
            if (shade.hex?.toLowerCase() === hex) {
                foundColorIdx = ci;
                foundShadeIdx = si;
            }
        });
    });

    if (foundColorIdx === null) return;

    const matrixSection = document.getElementById('matrix-section');
    if (matrixSection) {
        matrixSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Small delay so scroll starts before profile renders
    setTimeout(() => {
        showProfile(foundColorIdx, foundShadeIdx);
    }, 300);
}

// --- RENDER HELPERS ---
function renderColorBlock(flexWeight, colorInfo, extraStyleStr = '') {
    const textColor = getContrastYIQ(colorInfo.hex);
    const isClickable = colorInfo.hex && colorInfo.hex !== 'transparent';
    const clickStyle = isClickable ? 'cursor:pointer;' : '';
    const clickAttr = isClickable ? `onclick="navigateToShade('${colorInfo.hex}')"` : '';
    let labelsHtml = '';
    if (colorInfo.name || colorInfo.emotion) {
        labelsHtml = `
            <div style="position:absolute;bottom:20px;left:20px;font-size:11px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${textColor};z-index:10;">${colorInfo.name}</div>
            <div style="position:absolute;bottom:20px;right:20px;font-size:11px;font-weight:400;text-transform:lowercase;color:${textColor};opacity:0.8;z-index:10;">${colorInfo.emotion}</div>
        `;
    }
    if (isClickable) {
        labelsHtml += `<div style="position:absolute;top:16px;right:16px;width:20px;height:20px;border-radius:50%;border:1.5px solid ${textColor};opacity:0.4;display:flex;align-items:center;justify-content:center;z-index:10;"><svg width='8' height='8' viewBox='0 0 8 8' fill='none'><path d='M1 7L7 1M7 1H2M7 1V6' stroke='${textColor}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg></div>`;
    }
    return `<div ${clickAttr} style="flex:${flexWeight};background:${colorInfo.hex};position:relative;overflow:hidden;${clickStyle}${extraStyleStr}">${labelsHtml}</div>`;
}

function renderNeuralBlock(parentColorInfo, childColorInfo, extraStyleStr = '') {
    const textColor = getContrastYIQ(parentColorInfo.hex);
    const childTextColor = getContrastYIQ(childColorInfo.hex);
    const pIsClickable = parentColorInfo.hex && parentColorInfo.hex !== 'transparent';
    const pClick = pIsClickable ? `onclick="navigateToShade('${parentColorInfo.hex}')"` : '';
    const pCursor = pIsClickable ? 'cursor:pointer;' : '';
    const cClick = childColorInfo.hex && childColorInfo.hex !== 'transparent'
        ? `onclick="event.stopPropagation();navigateToShade('${childColorInfo.hex}')"` : '';
    const labelsHtml = (parentColorInfo.name || parentColorInfo.emotion) ? `
        <div style="position:absolute;bottom:20px;left:20px;font-size:11px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${textColor};z-index:10;">${parentColorInfo.name}</div>
        <div style="position:absolute;bottom:20px;right:20px;font-size:11px;font-weight:400;text-transform:lowercase;color:${textColor};opacity:0.8;z-index:10;">${parentColorInfo.emotion}</div>
    ` : '';
    const childLabel = childColorInfo.name ? `
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:10px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${childTextColor};text-align:center;cursor:pointer;">${childColorInfo.name}</div>
    ` : '';
    return `
        <div ${pClick} style="flex:1;background:${parentColorInfo.hex};position:relative;overflow:hidden;${pCursor}display:flex;justify-content:center;align-items:center;${extraStyleStr}">
            ${labelsHtml}
            <div ${cClick} style="width:30%;height:30%;background:${childColorInfo.hex};border-radius:50%;border:1px solid var(--black);position:relative;cursor:pointer;">${childLabel}</div>
        </div>`;
}

// --- PALETTE HARMONIZER ---
// Accepts the raw sourceItems pool (shade objects) from findPalette and returns
// a structured set of 4 colour roles: anchor / support / accent / neutral.
// If the pool is too small, missing roles are synthesized mathematically.
//
// Returns: { anchor, support, accent, neutral, ordered[] }
// ordered[] has exactly `count` elements (1-4), safe to index without guards.
function organizePalette(pool, count) {
    count = Math.min(Math.max(count || 4, 1), 4);

    // ---- ANCHOR: most relevant item (first in pool by search score) ----
    const anchor = pool[0] || synthesizeShade('#888888', 0);
    const anchorHex = anchor.hex || '#888888';
    const [anchorH, anchorS, anchorL] = hexToHsl(anchorHex);

    // ---- SUPPORT: analogous — hueDiff ≤ 45°, not too similar to anchor ----
    let support = null;
    for (let i = 1; i < pool.length; i++) {
        const item = pool[i];
        if (!item?.hex) continue;
        const [h] = hexToHsl(item.hex);
        if (hueDiff(anchorH, h) <= 45 && !isTooSimilar(anchorHex, item.hex)) {
            support = item;
            break;
        }
    }
    if (!support) {
        // Try +30° first, then -30° if that's too similar
        let candidate = synthesizeShade(anchorHex, 30);
        if (isTooSimilar(anchorHex, candidate.hex)) {
            candidate = synthesizeShade(anchorHex, -30);
        }
        support = candidate;
    }
    const supportHex = support.hex || '#888888';

    // ---- ACCENT: contrasting — hueDiff ≥ 120° from anchor ----
    const usedForAccent = new Set([anchorHex, supportHex]);
    let accent = null;
    for (let i = 1; i < pool.length; i++) {
        const item = pool[i];
        if (!item?.hex || usedForAccent.has(item.hex)) continue;
        const [h] = hexToHsl(item.hex);
        if (hueDiff(anchorH, h) >= 120) {
            accent = item;
            break;
        }
    }
    if (!accent) {
        let candidate = synthesizeShade(anchorHex, 180);
        // If anchor is very dark, ensure accent has enough lightness to contrast
        if (anchorL < 20 && getLuminance(candidate.hex) < 0.1) {
            candidate = synthesizeShade(anchorHex, 180, 65);
        }
        accent = candidate;
    }
    const accentHex = accent.hex || '#888888';

    // ---- NEUTRAL: extreme lightness or darkness to "rest" the composition ----
    const usedForNeutral = new Set([anchorHex, supportHex, accentHex]);
    let neutral = null;
    for (let i = 0; i < pool.length; i++) {
        const item = pool[i];
        if (!item?.hex || usedForNeutral.has(item.hex)) continue;
        const lum = getLuminance(item.hex);
        if (lum > 0.75 || lum < 0.04) {
            neutral = item;
            break;
        }
    }
    if (!neutral) {
        // Synthesize opposite-lightness neutral based on anchor brightness
        neutral = anchorL > 50
            ? synthesizeShade(anchorHex, 0, 12)   // anchor is light → dark neutral
            : synthesizeShade(anchorHex, 0, 90);   // anchor is dark  → light neutral
    }

    const ordered = [anchor, support, accent, neutral].slice(0, count);
    return { anchor, support, accent, neutral, ordered };
}

// --- EXTENDED PALETTE: 6 colour roles for complex balance rules ---
function organizePalette6(pool) {
    // Start with the standard 4 roles
    const base = organizePalette(pool, 4);
    const usedHex = new Set([base.anchor.hex, base.support.hex, base.accent.hex, base.neutral.hex]);

    // c5 — second analogous (hueDiff ≤ 60° from anchor, not yet used)
    const [anchorH6] = hexToHsl(base.anchor.hex || '#808080');
    let c5 = null;
    for (let i = 1; i < pool.length; i++) {
        const item = pool[i];
        if (!item?.hex || usedHex.has(item.hex)) continue;
        const [h] = hexToHsl(item.hex);
        if (hueDiff(anchorH6, h) <= 60) { c5 = item; break; }
    }
    if (!c5) { c5 = synthesizeShade(base.anchor.hex, -45); }
    usedHex.add(c5.hex);

    // c6 — darkest available (for deep shadow role)
    let c6 = null;
    let minLum = Infinity;
    for (let i = 0; i < pool.length; i++) {
        const item = pool[i];
        if (!item?.hex || usedHex.has(item.hex)) continue;
        const lum = getLuminance(item.hex);
        if (lum < minLum) { minLum = lum; c6 = item; }
    }
    if (!c6) { c6 = synthesizeShade(base.anchor.hex, 0, 8); }

    return { ...base, c5, c6, all6: [base.anchor, base.support, base.accent, base.neutral, c5, c6] };
}

// --- MAIN RENDER FUNCTION ---
function renderGeneratedPalette(matches, principle) {
    if (typeof RESEARCH_DATA === 'undefined') return;
    const heroRight = document.querySelector('.hero-right');
    const chatResultTitle = document.getElementById('chatResultTitle');
    if (!heroRight) return;

    if (matches.bestColorsPool.length === 0) {
        if (chatResultTitle) chatResultTitle.textContent = lang === 'ru' ? 'Ничего не найдено' : 'Nothing found';
        // Show a visual no-results state so the user sees feedback in the palette area
        heroRight.style.transition = 'opacity 0.3s ease';
        heroRight.style.opacity = '0';
        setTimeout(() => {
            heroRight.innerHTML = `<div style="${baseStyle}flex-direction:column;align-items:center;justify-content:center;background:var(--bg);">
                <div style="font-size:13px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;opacity:0.3;">${lang === 'ru' ? 'Ничего не найдено' : 'Nothing found'}</div>
            </div>`;
            heroRight.style.opacity = '1';
        }, 300);
        return;
    }

    // Resolve 'Auto' principle based on result richness
    let resolvedPrinciple = principle;
    if (!principle || principle === 'Auto' || principle === 'Авто') {
        const poolSize = matches.bestColorsPool.length;
        if (poolSize <= 2 || (matches.tokenCount === 1 && !matches.thesaurusHit)) {
            resolvedPrinciple = 'Neural Opponency';
        } else {
            resolvedPrinciple = '60 / 30 / 10';
        }
    }

    // Build source items — SHADE-FIRST.
    // A palette shows specific shades, never a flat base color.
    // Base colors are only a lookup category, not a display element.
    const cPool = matches.bestColorsPool.slice(0, 6).map(m => m.color);
    const usedHex = new Set();
    const sourceItems = [];

    // Priority 1: shades that directly matched the query text (most relevant)
    (matches.shadeMatches || []).slice(0, 5).forEach(m => {
        if (m.shade?.hex && !usedHex.has(m.shade.hex)) {
            sourceItems.push(m.shade);
            usedHex.add(m.shade.hex);
        }
    });

    // Priority 2: for every matched base color, pick shuffled shades.
    // This handles thesaurus hits where no specific shade text matched.
    // Quota per color = 3, shuffled each time for variety on re-search.
    cPool.forEach(c => {
        if (!c.shades || c.shades.length === 0) return;
        let added = 0;
        shuffleArray(c.shades).forEach(shade => {
            if (added >= 3) return;
            if (shade?.hex && !usedHex.has(shade.hex)) {
                sourceItems.push(shade);
                usedHex.add(shade.hex);
                added++;
            }
        });
    });

    // Priority 3: only if almost nothing found, fall back to base colors themselves
    if (sourceItems.length < 2) {
        cPool.forEach(c => {
            if (c?.hex && !usedHex.has(c.hex)) {
                sourceItems.push(c);
                usedHex.add(c.hex);
            }
        });
    }

    // --- Harmonize the pool into 4 colour roles ---
    const organized = organizePalette(sourceItems, 4);

    // Update title: use the anchor shade name
    const anchorItem = organized.anchor;
    let titleName = '';
    if (anchorItem) {
        if (isShadeObject(anchorItem)) {
            const rawName = anchorItem.name?.[lang] || anchorItem.name?.en || '';
            titleName = rawName.includes('/') ? rawName.split('/')[0].trim() : rawName;
        } else {
            titleName = anchorItem.name?.[lang] || anchorItem.name?.en || '';
        }
    }
    if (chatResultTitle) {
        chatResultTitle.textContent = titleName + ' — ' + resolvedPrinciple;
        chatResultTitle.style.transition = 'opacity 0.3s ease';
        chatResultTitle.style.opacity = '0';
        setTimeout(() => { chatResultTitle.style.opacity = '1'; }, 50);
    }

    const baseStyle = 'grid-column:1/-1;grid-row:1/-1;width:100%;height:100%;display:flex;';
    let html = '';

    if (resolvedPrinciple.includes('60 / 30 / 10')) {
        // 60% Anchor · 30% Support · 10% Accent
        const c1 = extractColorInfo(organized.anchor);
        const c2 = extractColorInfo(organized.support);
        const c3 = extractColorInfo(organized.accent);
        html = `<div style="${baseStyle}flex-direction:column;">
            ${renderColorBlock(6, c1)}
            ${renderColorBlock(3, c2, 'border-top:1px solid var(--black)')}
            ${renderColorBlock(1, c3, 'border-top:1px solid var(--black)')}
        </div>`;

    } else if (resolvedPrinciple.includes('90 / 10')) {
        // 90% dominant (lightest = Neutral if bright, else Anchor) · 10% Accent
        const anchorLum = getLuminance(organized.anchor.hex);
        const neutralLum = getLuminance(organized.neutral.hex);
        const baseItem  = neutralLum > anchorLum ? organized.neutral : organized.anchor;
        const accentItem = organized.accent;
        const c1 = extractColorInfo(baseItem);
        const c2 = extractColorInfo(accentItem);
        html = `<div style="${baseStyle}flex-direction:column;">
            ${renderColorBlock(9, c1)}
            ${renderColorBlock(1, c2, 'border-top:1px solid var(--black)')}
        </div>`;

    } else if (resolvedPrinciple.includes('50 / 50')) {
        // 50% Anchor · 50% Accent — guaranteed contrast
        const c1 = extractColorInfo(organized.anchor);
        const c2 = extractColorInfo(organized.accent);
        html = `<div style="${baseStyle}flex-direction:row;">
            ${renderColorBlock(1, c1)}
            ${renderColorBlock(1, c2, 'border-left:1px solid var(--black)')}
        </div>`;

    } else if (resolvedPrinciple.includes('70 / 20 / 10')) {
        // 70% Anchor · 20% Support · 10% Accent
        const c1 = extractColorInfo(organized.anchor);
        const c2 = extractColorInfo(organized.support);
        const c3 = extractColorInfo(organized.accent);
        html = `<div style="${baseStyle}flex-direction:column;">
            ${renderColorBlock(7, c1)}
            ${renderColorBlock(2, c2, 'border-top:1px solid var(--black)')}
            ${renderColorBlock(1, c3, 'border-top:1px solid var(--black)')}
        </div>`;

    } else if (resolvedPrinciple.includes('Neural Opponency')) {
        // Center = Anchor · surrounding circle = Accent (guaranteed ≥120° hueDiff)
        const mainColorInfo = extractColorInfo(organized.anchor);
        const oppColorInfo  = extractColorInfo(organized.accent);
        html = `<div style="${baseStyle}flex-direction:row;">
            ${renderNeuralBlock(mainColorInfo, oppColorInfo)}
        </div>`;

    } else if (resolvedPrinciple.includes('Geometric Resonance')) {
        // Large left: Anchor · right column: Support / Accent / Neutral
        const c1 = extractColorInfo(organized.anchor);
        const c2 = extractColorInfo(organized.support);
        const c3 = extractColorInfo(organized.accent);
        const c4 = extractColorInfo(organized.neutral);
        const c1tc = getContrastYIQ(c1.hex);
        html = `<div style="${baseStyle}flex-direction:row;">
            <div onclick="navigateToShade('${c1.hex}')" style="flex:2;background:${c1.hex};position:relative;overflow:hidden;cursor:pointer;">
                <div style="position:absolute;bottom:20px;left:20px;font-size:11px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${c1tc};">${c1.name}</div>
                <div style="position:absolute;top:16px;right:16px;width:20px;height:20px;border-radius:50%;border:1.5px solid ${c1tc};opacity:0.4;display:flex;align-items:center;justify-content:center;"><svg width='8' height='8' viewBox='0 0 8 8' fill='none'><path d='M1 7L7 1M7 1H2M7 1V6' stroke='${c1tc}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg></div>
            </div>
            <div style="flex:1;display:flex;flex-direction:column;border-left:1px solid var(--black);">
                ${renderColorBlock(1, c2, 'min-height:0;')}
                ${renderColorBlock(1, c3, 'border-top:1px solid var(--black);min-height:0;')}
                ${renderColorBlock(1, c4, 'border-top:1px solid var(--black);min-height:0;')}
            </div>
        </div>`;

    } else if (resolvedPrinciple.includes('Circadian Validity')) {
        // dawn (Neutral/lightest) · day (Anchor/most saturated) · dusk (Accent/darkest)
        const neutralLum = getLuminance(organized.neutral.hex);
        const accentLum  = getLuminance(organized.accent.hex);
        const dawn = extractColorInfo(neutralLum > accentLum ? organized.neutral : organized.accent);
        const day  = extractColorInfo(organized.anchor);
        const dusk = extractColorInfo(neutralLum <= accentLum ? organized.neutral : organized.accent);
        html = `<div style="${baseStyle}flex-direction:row;">
            ${renderColorBlock(1, dawn)}
            ${renderColorBlock(1, day, 'border-left:1px solid var(--black)')}
            ${renderColorBlock(1, dusk, 'border-left:1px solid var(--black)')}
        </div>`;

    } else if (resolvedPrinciple.includes('Itten Radiance Force')) {
        // Sort 6 colours by luminance: darkest gets the most area (Itten's inverse-force law).
        // Flex weights [9,8,6,6,4,3] correspond to darkest→lightest.
        const org6 = organizePalette6(sourceItems);
        const sorted6 = org6.all6.slice().sort((a, b) => getLuminance(a.hex) - getLuminance(b.hex));
        const weights = [9, 8, 6, 6, 4, 3]; // darkest=9, lightest=3
        const blocks6 = sorted6.map((c, i) => {
            const info = extractColorInfo(c);
            const border = i > 0 ? 'border-left:1px solid var(--black)' : '';
            return renderColorBlock(weights[i], info, border);
        }).join('');
        html = `<div style="${baseStyle}flex-direction:row;">${blocks6}</div>`;

    } else if (resolvedPrinciple.includes('Stratified Depth')) {
        // 6 horizontal layers: 60/20/10/5/3/2 — atmospheric cocoon to deep shadows.
        const org6 = organizePalette6(sourceItems);
        // Sort by saturation ascending so that least-saturated becomes the atmospheric "cocoon".
        const sorted6 = org6.all6.slice().sort((a, b) => {
            const [,sA] = hexToHsl(a.hex || '#808080');
            const [,sB] = hexToHsl(b.hex || '#808080');
            return sA - sB;
        });
        const depths = [
            { weight: 60, item: sorted6[0] },  // most muted — atmospheric cocoon
            { weight: 20, item: sorted6[1] },  // spatial transition
            { weight: 10, item: sorted6[5] },  // most saturated — semantic core
            { weight: 5,  item: sorted6[4] },  // counterpoint
            { weight: 3,  item: sorted6[2] },  // light accents (lightest muted)
            { weight: 2,  item: sorted6[3] }   // deep shadows
        ];
        const blocks6 = depths.map((d, i) => {
            const info = extractColorInfo(d.item);
            const border = i > 0 ? 'border-top:1px solid var(--black)' : '';
            return renderColorBlock(d.weight, info, border);
        }).join('');
        html = `<div style="${baseStyle}flex-direction:column;">${blocks6}</div>`;

    } else if (resolvedPrinciple.includes('Luscher Quartet')) {
        // Left 3/4: 2×2 grid of 4 base colours. Right 1/4: 2-stack of 2 correctors.
        const org6 = organizePalette6(sourceItems);
        const bases = [org6.anchor, org6.support, org6.accent, org6.neutral];
        const correctors = [org6.c5, org6.c6];
        const baseHtml = bases.map((c, i) => {
            const info = extractColorInfo(c);
            const tc = getContrastYIQ(info.hex);
            const clickAttr = info.hex && info.hex !== 'transparent' ? `onclick="navigateToShade('${info.hex}')"` : '';
            const bl = i % 2 === 1 ? '' : 'border-right:1px solid var(--black);';
            const bb = i < 2 ? 'border-bottom:1px solid var(--black);' : '';
            const cursorStyle = info.hex && info.hex !== 'transparent' ? 'cursor:pointer;' : '';
            return `<div ${clickAttr} style="flex:1;min-width:0;min-height:0;background:${info.hex};position:relative;overflow:hidden;${cursorStyle}${bl}${bb}">
                <div style="position:absolute;bottom:10px;left:10px;font-size:10px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${tc};">${info.name}</div>
            </div>`;
        }).join('');
        const corrHtml = correctors.map((c, i) => {
            const info = extractColorInfo(c);
            const tc = getContrastYIQ(info.hex);
            const clickAttr = info.hex && info.hex !== 'transparent' ? `onclick="navigateToShade('${info.hex}')"` : '';
            const bb = i === 0 ? 'border-bottom:1px solid var(--black);' : '';
            const cursorStyle = info.hex && info.hex !== 'transparent' ? 'cursor:pointer;' : '';
            return `<div ${clickAttr} style="flex:1;background:${info.hex};position:relative;overflow:hidden;${cursorStyle}${bb}">
                <div style="position:absolute;bottom:10px;left:10px;font-size:10px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${tc};">${info.name}</div>
            </div>`;
        }).join('');
        html = `<div style="${baseStyle}flex-direction:row;">
            <div style="flex:3;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;">${baseHtml}</div>
            <div style="flex:1;display:flex;flex-direction:column;border-left:1px solid var(--black);">${corrHtml}</div>
        </div>`;

    } else if (resolvedPrinciple.includes('Seasonal Resonance')) {
        // 6 equal cells in a 3×2 grid — seasonal palette harmony.
        const org6 = organizePalette6(sourceItems);
        const cells = org6.all6.map((c, i) => {
            const info = extractColorInfo(c);
            const tc = getContrastYIQ(info.hex);
            const isClickable = info.hex && info.hex !== 'transparent';
            const clickAttr = isClickable ? `onclick="navigateToShade('${info.hex}')"` : '';
            const bl = i % 3 !== 0 ? 'border-left:1px solid var(--black);' : '';
            const bt = i >= 3 ? 'border-top:1px solid var(--black);' : '';
            const cursorStyle = isClickable ? 'cursor:pointer;' : '';
            return `<div ${clickAttr} style="background:${info.hex};position:relative;overflow:hidden;${cursorStyle}${bl}${bt}">
                <div style="position:absolute;bottom:8px;left:8px;font-size:9px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${tc};">${info.name}</div>
            </div>`;
        }).join('');
        html = `<div style="${baseStyle}flex-direction:row;">
            <div style="width:100%;height:100%;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);">${cells}</div>
        </div>`;

    } else if (resolvedPrinciple.includes('Neural Shimmer')) {
        // 3 complementary pairs — 3 columns, 2 rows each.
        // Pair1: anchor/accent, Pair2: support/synthesized-complement-of-support, Pair3: c5/c6
        const org6 = organizePalette6(sourceItems);
        const suppComplement = synthesizeShade(org6.support.hex, 180);
        const pairs = [
            [org6.anchor, org6.accent],
            [org6.support, suppComplement],
            [org6.c5, org6.c6]
        ];
        const colHtml = pairs.map((pair, ci) => {
            const colBorder = ci > 0 ? 'border-left:1px solid var(--black);' : '';
            const cellsHtml = pair.map((c, ri) => {
                const info = extractColorInfo(c);
                const tc = getContrastYIQ(info.hex);
                const clickAttr = info.hex ? `onclick="navigateToShade('${info.hex}')"` : '';
                const bt = ri > 0 ? 'border-top:1px solid var(--black);' : '';
                return `<div ${clickAttr} style="flex:1;background:${info.hex};position:relative;overflow:hidden;cursor:pointer;${bt}">
                    <div style="position:absolute;bottom:8px;left:8px;font-size:9px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${tc};">${info.name}</div>
                </div>`;
            }).join('');
            return `<div style="flex:1;display:flex;flex-direction:column;${colBorder}">${cellsHtml}</div>`;
        }).join('');
        html = `<div style="${baseStyle}flex-direction:row;">${colHtml}</div>`;

    } else {
        // Default: 2×2 grid — Anchor / Support / Accent / Neutral
        const toShow = organized.ordered;
        let gridHtml = '';
        toShow.forEach((c, idx) => {
            const info = extractColorInfo(c);
            let styleExtra = '';
            if (idx === 1 || idx === 3) styleExtra += 'border-left:1px solid var(--black);';
            if (idx === 2 || idx === 3) styleExtra += 'border-top:1px solid var(--black);';
            const textColor = getContrastYIQ(info.hex);
            const clickable = info.hex && info.hex !== 'transparent';
            const clickAttr = clickable ? `onclick="navigateToShade('${info.hex}')"` : '';
            const cursorStyle = clickable ? 'cursor:pointer;' : '';
            const arrowIcon = clickable ? `<div style="position:absolute;top:16px;right:16px;width:20px;height:20px;border-radius:50%;border:1.5px solid ${textColor};opacity:0.4;display:flex;align-items:center;justify-content:center;z-index:10;"><svg width='8' height='8' viewBox='0 0 8 8' fill='none'><path d='M1 7L7 1M7 1H2M7 1V6' stroke='${textColor}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg></div>` : '';
            gridHtml += `
                <div ${clickAttr} class="hero-block" style="${styleExtra}${cursorStyle}position:relative;overflow:hidden;">
                    <div class="color-block" style="background:${info.hex}"></div>
                    <div style="position:absolute;bottom:20px;left:20px;font-size:11px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${textColor};z-index:10;">${info.name}</div>
                    ${arrowIcon}
                </div>`;
        });
        for (let i = toShow.length; i < 4; i++) {
            let styleExtra = '';
            if (i === 1 || i === 3) styleExtra += 'border-left:1px solid var(--black);';
            if (i === 2 || i === 3) styleExtra += 'border-top:1px solid var(--black);';
            gridHtml += `<div class="hero-block" style="${styleExtra}"><div class="color-block" style="background:transparent"></div></div>`;
        }
        html = `<div style="grid-column:1/-1;grid-row:1/-1;width:100%;height:100%;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;">${gridHtml}</div>`;
    }

    // Smooth fade transition
    heroRight.style.transition = 'opacity 0.3s ease';
    heroRight.style.opacity = '0';
    setTimeout(() => {
        heroRight.innerHTML = html;
        heroRight.style.opacity = '1';
    }, 300);
}

// --- EVENT BINDING ---
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.querySelector('.chat-input');
    const chatSearchBtn = document.getElementById('chatSearchBtn') || document.querySelector('.chat-btn-submit');

    function handleChatSubmit() {
        const query = chatInput?.value;
        if (!query || !query.trim()) return;

        const matches = findPalette(query);
        if (!matches || matches.bestColorsPool.length === 0) {
            const chatResultTitle = document.getElementById('chatResultTitle');
            if (chatResultTitle) chatResultTitle.textContent = lang === 'ru' ? 'Ничего не найдено' : 'Nothing found';
            return;
        }

        const principleLabel = document.getElementById('chatPrincipleLabel');
        const principle = principleLabel
            ? (principleLabel.dataset.principle || principleLabel.textContent.trim())
            : 'Auto';
        renderGeneratedPalette(matches, principle);
    }

    chatSearchBtn?.addEventListener('click', handleChatSubmit);
    chatInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); handleChatSubmit(); }
    });
});

