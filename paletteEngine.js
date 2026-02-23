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
    'костер': ['Red', 'Orange', 'Yellow'], 'bonfire': ['Red', 'Orange', 'Yellow'],
    'факел': ['Orange', 'Yellow', 'Red'], 'torch': ['Orange', 'Yellow', 'Red'],
    'горение': ['Red', 'Orange'], 'burning': ['Red', 'Orange'], 'blazing': ['Red', 'Orange'],
    'уголек': ['Orange', 'Red'], 'ember': ['Orange', 'Red'], 'embers': ['Orange', 'Red'],
    'искра': ['Orange', 'Yellow', 'Red'], 'spark': ['Orange', 'Yellow', 'Red'],
    'раскаленный': ['Red', 'Orange'], 'incandescent': ['Red', 'Orange', 'Yellow'],
    'свеча огонь': ['Orange', 'Yellow'], 'candlelight': ['Orange', 'Yellow'],
    'горячий': ['Red', 'Orange'], 'fiery': ['Red', 'Orange'], 'жгучий': ['Red', 'Orange'],
    'зной': ['Red', 'Orange', 'Yellow'], 'scorching': ['Red', 'Orange', 'Yellow'],
    'пылающий': ['Red', 'Orange'], 'ablaze': ['Red', 'Orange'],
    'искрящийся': ['Orange', 'Yellow'], 'sparkling fire': ['Orange', 'Yellow'],
    // Love / Romance
    'любовь': ['Red', 'Violet'], 'love': ['Red', 'Violet'],
    'страсть': ['Red', 'Violet'], 'passion': ['Red', 'Violet'],
    'влечение': ['Red', 'Violet'], 'attraction': ['Red', 'Violet'],
    'обожание': ['Red', 'Violet', 'Yellow'], 'adoration': ['Red', 'Violet', 'Yellow'],
    'флирт': ['Red', 'Violet', 'Orange'], 'flirt': ['Red', 'Violet', 'Orange'],
    'поцелуй': ['Red', 'Violet'], 'kiss': ['Red', 'Violet'],
    'объятие': ['Orange', 'Violet'], 'embrace': ['Orange', 'Violet'], 'hug': ['Orange', 'Violet'],
    'свидание': ['Red', 'Violet', 'Orange'], 'date': ['Red', 'Violet', 'Orange'],
    'сердце': ['Red', 'Violet'], 'heart': ['Red', 'Violet'],
    'страстный': ['Red', 'Orange'], 'ardent': ['Red', 'Orange'],
    // Anger / Rage
    'ярость': ['Red', 'Orange'], 'rage': ['Red', 'Orange'],
    'anger': ['Red', 'Orange'], 'гнев': ['Red', 'Orange'],
    'агрессия': ['Red', 'Orange'], 'aggression': ['Red', 'Orange'],
    'злость': ['Red', 'Orange'], 'wrath': ['Red', 'Orange'],
    'ненависть': ['Red', 'Black'], 'hatred': ['Red', 'Black'], 'hate': ['Red', 'Black'],
    'бешенство': ['Red', 'Orange'], 'fury': ['Red', 'Orange'],
    'враждебность': ['Red', 'Black'], 'hostility': ['Red', 'Black'],
    'злоба': ['Red', 'Black'], 'malice': ['Red', 'Black'],
    'фрустрация': ['Red', 'Orange'], 'frustration': ['Red', 'Orange'],
    'вспыльчивый': ['Red', 'Orange'], 'temper': ['Red', 'Orange'],
    'конфликт': ['Red', 'Black', 'Orange'], 'conflict': ['Red', 'Black', 'Orange'],
    'напряжение': ['Red', 'Grey'], 'tension': ['Red', 'Grey'],
    // Joy / Happiness
    'радость': ['Yellow', 'Orange'], 'joy': ['Yellow', 'Orange'],
    'happiness': ['Yellow', 'Orange'], 'счастье': ['Yellow', 'Orange'],
    'веселье': ['Yellow', 'Orange'], 'fun': ['Yellow', 'Orange'],
    'ликование': ['Yellow', 'Orange', 'Red'], 'jubilation': ['Yellow', 'Orange', 'Red'],
    'блаженство': ['Yellow', 'White', 'Violet'], 'bliss': ['Yellow', 'White', 'Violet'],
    'жизнерадостность': ['Yellow', 'Orange'], 'cheerfulness': ['Yellow', 'Orange'],
    'игривость': ['Yellow', 'Orange'], 'playfulness': ['Yellow', 'Orange'],
    'улыбка': ['Yellow', 'Orange'], 'smile': ['Yellow', 'Orange'],
    'смех': ['Yellow', 'Orange'], 'laughter': ['Yellow', 'Orange'],
    'бодрость': ['Yellow', 'Green', 'Orange'], 'vitality joy': ['Yellow', 'Green', 'Orange'],
    'солнечный': ['Yellow', 'Orange'], 'sunny': ['Yellow', 'Orange'], 'bright': ['Yellow', 'White'],
    // Childhood / Nostalgia
    'детство': ['Yellow', 'Orange'], 'childhood': ['Yellow', 'Orange'],
    'nostalgia': ['Yellow', 'Orange'], 'ностальгия': ['Yellow', 'Orange'],
    'воспоминания': ['Yellow', 'Orange'], 'memories': ['Yellow', 'Orange'],
    'игра': ['Yellow', 'Orange', 'Green'], 'play': ['Yellow', 'Orange', 'Green'],
    'игрушка': ['Orange', 'Yellow', 'Red'], 'toy': ['Orange', 'Yellow', 'Red'],
    'сказка': ['Yellow', 'Violet', 'Blue'], 'fairy tale': ['Yellow', 'Violet', 'Blue'],
    'мультфильм': ['Yellow', 'Orange', 'Blue'], 'cartoon': ['Yellow', 'Orange', 'Blue'],
    'детская комната': ['Yellow', 'Orange', 'Blue'], 'nursery': ['Yellow', 'Orange', 'Blue'],
    'наивность': ['White', 'Yellow'], 'naivety': ['White', 'Yellow'],
    'беззащитность': ['White', 'Yellow'], 'vulnerability': ['White', 'Yellow'],
    'школа': ['Yellow', 'Orange', 'Blue'], 'school': ['Yellow', 'Orange', 'Blue'],
    // Warmth / Coziness
    'тепло': ['Orange', 'Yellow', 'Red'], 'warmth': ['Orange', 'Yellow', 'Red'],
    'warm': ['Orange', 'Yellow'], 'cozy': ['Orange', 'Yellow'], 'уют': ['Orange', 'Yellow'],
    'домашний': ['Orange', 'Yellow'], 'homely': ['Orange', 'Yellow'],
    'мягкость': ['Orange', 'Yellow', 'White'], 'softness': ['Orange', 'Yellow', 'White'],
    'нега': ['Orange', 'Violet', 'Yellow'], 'languor': ['Orange', 'Violet', 'Yellow'],
    'уединение': ['Orange', 'Yellow'], 'solitude home': ['Orange', 'Yellow'],
    'спокойный вечер': ['Orange', 'Yellow'], 'quiet evening': ['Orange', 'Yellow'],
    'согревающий': ['Orange', 'Red', 'Yellow'], 'warming': ['Orange', 'Red', 'Yellow'],
    'кульминация': ['Orange', 'Red'], 'climax': ['Orange', 'Red'],
    'азарт': ['Orange', 'Red'], 'excitement': ['Orange', 'Red'],
    'аппетит': ['Orange', 'Red'], 'appetite': ['Orange', 'Red'],
    'растворение': ['Orange', 'Violet'], 'dissolution': ['Orange', 'Violet'],
    'радикальность': ['Orange', 'Red', 'Black'], 'radicality': ['Orange', 'Red', 'Black'],
    'благополучие': ['Orange', 'Yellow', 'Green'], 'well-being': ['Orange', 'Yellow', 'Green'],
    'авторитет': ['Black', 'Grey', 'Orange'], 'authority': ['Black', 'Grey', 'Orange'],
    // Nature
    'природа': ['Green', 'Yellow', 'Orange'], 'nature': ['Green', 'Yellow', 'Orange'],
    'forest': ['Green'], 'лес': ['Green'],
    'earth': ['Orange', 'Yellow', 'Black'], 'земля': ['Orange', 'Yellow', 'Black'],
    'почва': ['Orange', 'Black'], 'soil': ['Orange', 'Black'],
    'трава': ['Green'], 'grass': ['Green'],
    'растения': ['Green'], 'plants': ['Green'],
    'экология': ['Green', 'Yellow'], 'ecology': ['Green', 'Yellow'],
    'дикая природа': ['Green', 'Orange', 'Yellow'], 'wilderness': ['Green', 'Orange', 'Yellow'], 'wild': ['Green', 'Orange'],
    'экосистема': ['Green', 'Yellow', 'Blue'], 'ecosystem': ['Green', 'Yellow', 'Blue'],
    'заповедник': ['Green', 'Yellow'], 'wildlife reserve': ['Green', 'Yellow'],
    'биом': ['Green', 'Yellow', 'Blue'], 'biome': ['Green', 'Yellow', 'Blue'],
    'флора': ['Green', 'Yellow'], 'flora': ['Green', 'Yellow'],
    'фауна': ['Green', 'Orange', 'Yellow'], 'fauna': ['Green', 'Orange', 'Yellow'],
    'биотоп': ['Green', 'Blue'], 'habitat': ['Green', 'Blue'],
    'открытое пространство': ['Green', 'Blue', 'Yellow'], 'open space': ['Green', 'Blue', 'Yellow'],
    'поляна': ['Green', 'Yellow'], 'glade': ['Green', 'Yellow'],
    'роща': ['Green', 'Yellow'], 'grove': ['Green', 'Yellow'],
    // Poison / Toxic
    'яд': ['Green', 'Yellow'], 'poison': ['Green', 'Yellow'],
    'toxic': ['Green', 'Yellow'], 'токсичность': ['Green', 'Yellow'],
    'ядовитый': ['Green', 'Yellow'], 'venomous': ['Green', 'Yellow'],
    'едкий': ['Green', 'Yellow'], 'corrosive': ['Green', 'Yellow'],
    'химикат': ['Green', 'Yellow', 'Grey'], 'chemical': ['Green', 'Yellow', 'Grey'],
    'зараза': ['Green', 'Yellow'], 'contamination': ['Green', 'Yellow'],
    'биохазард': ['Green', 'Yellow'], 'biohazard': ['Green', 'Yellow'],
    // Ocean / Water / Sea
    'море': ['Blue', 'Green'], 'ocean': ['Blue', 'Green'], 'sea': ['Blue', 'Green'],
    'вода': ['Blue'], 'water': ['Blue'],
    'волна': ['Blue', 'Green'], 'wave': ['Blue', 'Green'],
    'река': ['Blue', 'Green'], 'river': ['Blue', 'Green'],
    'глубь': ['Blue', 'Black'], 'depths': ['Blue', 'Black'], 'abyss sea': ['Blue', 'Black'],
    'пучина': ['Blue', 'Black', 'Green'], 'deep sea': ['Blue', 'Black', 'Green'],
    'шторм морской': ['Blue', 'Grey', 'White'], 'sea storm': ['Blue', 'Grey', 'White'],
    'штиль': ['Blue', 'White', 'Grey'], 'calm sea': ['Blue', 'White', 'Grey'],
    'прибрежный': ['Blue', 'White', 'Yellow'], 'coastal': ['Blue', 'White', 'Yellow'],
    'морской бриз': ['Blue', 'White'], 'sea breeze': ['Blue', 'White'],
    'дно океана': ['Blue', 'Black'], 'ocean floor': ['Blue', 'Black'],
    'морские водоросли': ['Green', 'Blue'], 'seaweed': ['Green', 'Blue'],
    'соленый': ['Blue', 'White'], 'salty': ['Blue', 'White'],
    'тихий океан': ['Blue', 'White'], 'pacific': ['Blue', 'White'],
    // Sky / Air
    'небо': ['Blue'], 'sky': ['Blue'],
    'воздух': ['Blue', 'White'], 'air': ['Blue', 'White'],
    'ветер': ['Blue', 'White'], 'wind': ['Blue', 'White'],
    'облака': ['White', 'Grey', 'Blue'], 'clouds': ['White', 'Grey', 'Blue'],
    'ясное небо': ['Blue', 'White'], 'clear sky': ['Blue', 'White'],
    'атмосфера': ['Blue', 'White', 'Grey'], 'atmosphere': ['Blue', 'White', 'Grey'],
    'бескрайний': ['Blue', 'White'], 'vast': ['Blue', 'White'], 'boundless': ['Blue', 'White'],
    'высота': ['Blue', 'White'], 'altitude': ['Blue', 'White'], 'height': ['Blue', 'White'],
    'бриз': ['Blue', 'White'], 'breeze': ['Blue', 'White'],
    'дуновение': ['Blue', 'White'], 'gust': ['Blue', 'White'],
    'горизонт неба': ['Blue', 'Orange', 'Yellow'], 'skyline': ['Blue', 'Orange', 'Yellow'],
    'кучевые': ['White', 'Grey'], 'cumulus': ['White', 'Grey'],
    'перистые': ['White', 'Blue'], 'cirrus': ['White', 'Blue'],
    // Space / Cosmos
    'космос': ['Blue', 'Violet', 'Black'], 'space': ['Blue', 'Violet', 'Black'],
    'galaxy': ['Blue', 'Violet', 'Black'], 'галактика': ['Blue', 'Violet', 'Black'],
    'universe': ['Blue', 'Violet', 'Black'], 'вселенная': ['Blue', 'Violet', 'Black'],
    'звезды': ['Blue', 'Violet', 'Black'], 'stars': ['Blue', 'Violet', 'Black'],
    'млечный путь': ['Blue', 'Violet', 'White'], 'milky way': ['Blue', 'Violet', 'White'],
    'орбита': ['Blue', 'Black'], 'orbit': ['Blue', 'Black'],
    'бесконечный': ['Blue', 'Black', 'Violet'], 'infinite': ['Blue', 'Black', 'Violet'],
    'вакуум космос': ['Black', 'Blue'], 'interstellar': ['Black', 'Blue', 'Violet'],
    'звездопад': ['Blue', 'Violet', 'White'], 'meteor shower': ['Blue', 'Violet', 'White'],
    'астрология': ['Violet', 'Blue', 'Black'], 'astrology': ['Violet', 'Blue', 'Black'],
    'зодиак': ['Violet', 'Blue', 'Yellow'], 'zodiac': ['Violet', 'Blue', 'Yellow'],
    'планеты': ['Blue', 'Orange', 'Grey'], 'planets': ['Blue', 'Orange', 'Grey'],
    // Night / Darkness
    'ночь': ['Black', 'Blue', 'Violet'], 'night': ['Black', 'Blue', 'Violet'],
    'midnight': ['Black', 'Blue', 'Violet'], 'полночь': ['Black', 'Blue', 'Violet'],
    'тьма': ['Black', 'Violet'], 'darkness': ['Black', 'Violet'], 'темнота': ['Black'],
    'мгла': ['Black', 'Grey', 'Violet'], 'murk': ['Black', 'Grey', 'Violet'],
    'силуэт': ['Black', 'Grey'], 'silhouette': ['Black', 'Grey'],
    'ночное небо': ['Black', 'Blue', 'Violet'], 'night sky': ['Black', 'Blue', 'Violet'],
    'беззвездный': ['Black', 'Blue'], 'starless': ['Black', 'Blue'],
    'ночной': ['Black', 'Blue', 'Violet'], 'nocturnal': ['Black', 'Blue', 'Violet'],
    'густая тьма': ['Black', 'Violet'], 'pitch black': ['Black', 'Violet'],
    'теневой': ['Black', 'Grey'], 'shadowed': ['Black', 'Grey'],
    // Serenity / Calm
    'спокойствие': ['Blue', 'Green', 'White'], 'serenity': ['Blue', 'Green', 'White'],
    'calm': ['Blue', 'Green'], 'покой': ['Blue', 'Green', 'White'],
    'peace': ['Blue', 'Green', 'White'], 'мир': ['Blue', 'Green', 'White'],
    'relax': ['Blue', 'Green'], 'расслабление': ['Blue', 'Green'],
    'meditation': ['Blue', 'Violet'], 'медитация': ['Blue', 'Violet'],
    'умиротворение': ['Blue', 'Green', 'White'], 'tranquility': ['Blue', 'Green', 'White'],
    'тишина природы': ['Green', 'Blue', 'White'], 'silence of nature': ['Green', 'Blue', 'White'],
    'дзен': ['White', 'Grey', 'Blue'], 'zen': ['White', 'Grey', 'Blue'],
    'минута тишины': ['White', 'Grey'], 'moment of silence': ['White', 'Grey'],
    'расслабленный': ['Blue', 'Green'], 'laid-back': ['Blue', 'Green'],
    'медленный': ['Blue', 'Grey'], 'slow': ['Blue', 'Grey'],
    'тихий': ['White', 'Grey', 'Blue'], 'quiet': ['White', 'Grey', 'Blue'],
    // Mysticism / Magic
    'мистика': ['Violet', 'Black'], 'mysticism': ['Violet', 'Black'],
    'magic': ['Violet', 'Black'], 'магия': ['Violet', 'Black'],
    'тайна': ['Violet', 'Black'], 'mystery': ['Violet', 'Black'],
    'загадка': ['Violet'], 'fantasy': ['Violet', 'Blue'], 'фантазия': ['Violet', 'Blue'],
    'dream': ['Violet', 'Blue'], 'мечта': ['Violet', 'Blue'],
    'колдовство': ['Violet', 'Black'], 'witchcraft': ['Violet', 'Black'],
    'заклинание': ['Violet', 'Blue', 'White'], 'spell': ['Violet', 'Blue', 'White'],
    'ритуал': ['Violet', 'Black', 'Red'], 'ritual': ['Violet', 'Black', 'Red'],
    'оккультный': ['Black', 'Violet'], 'occult': ['Black', 'Violet'],
    'потустороннее': ['Violet', 'Black', 'Blue'], 'supernatural': ['Violet', 'Black', 'Blue'],
    'чары': ['Violet', 'Blue', 'White'], 'enchantment': ['Violet', 'Blue', 'White'],
    'прорицание': ['Violet', 'Black'], 'divination': ['Violet', 'Black'],
    'астрал': ['Violet', 'Blue'], 'astral': ['Violet', 'Blue'],
    'эзотерика': ['Violet', 'Black', 'Blue'], 'esoteric': ['Violet', 'Black', 'Blue'],
    'амулет': ['Violet', 'Yellow', 'Black'], 'amulet': ['Violet', 'Yellow', 'Black'],
    'пророчество': ['Violet', 'Black', 'Yellow'], 'prophecy': ['Violet', 'Black', 'Yellow'],
    // Loneliness / Sadness
    'sad': ['Blue', 'Grey'], 'грусть': ['Blue', 'Grey'], 'sadness': ['Blue', 'Grey'],
    'печаль': ['Blue', 'Grey'],
    'меланхолия': ['Blue', 'Grey', 'Violet'], 'melancholy': ['Blue', 'Grey', 'Violet'],
    'подавленность': ['Blue', 'Grey', 'Black'], 'depression': ['Blue', 'Grey', 'Black'],
    'уныние': ['Grey', 'Blue'], 'dejection': ['Grey', 'Blue'],
    'разочарование': ['Grey', 'Blue'], 'disappointment': ['Grey', 'Blue'],
    'сплин': ['Grey', 'Blue', 'Violet'], 'spleen': ['Grey', 'Blue', 'Violet'],
    'отчаяние': ['Black', 'Grey', 'Blue'], 'despair': ['Black', 'Grey', 'Blue'],
    'сердечная боль': ['Violet', 'Grey', 'Blue'], 'heartbreak': ['Violet', 'Grey', 'Blue'],
    'опустошенность': ['Grey', 'Black', 'Blue'], 'desolation': ['Grey', 'Black', 'Blue'],
    'тихая грусть': ['Blue', 'Grey'], 'wistful': ['Blue', 'Grey'],
    // Boredom / Monotony
    'скука': ['Grey'], 'boredom': ['Grey'], 'boring': ['Grey'],
    'скучный': ['Grey'], 'monotony': ['Grey'], 'монотонность': ['Grey'],
    'рутина': ['Grey'], 'routine': ['Grey'],
    'однообразие': ['Grey'], 'sameness': ['Grey'],
    'серость': ['Grey'], 'grayness': ['Grey'], 'dullness': ['Grey'],
    'безликий': ['Grey', 'White'], 'bland': ['Grey', 'White'],
    'тягомотина': ['Grey'], 'tedium': ['Grey'],
    'обыденность': ['Grey', 'White'], 'mundane': ['Grey', 'White'],
    // Anxiety / Fear
    'тревога': ['Red', 'Orange', 'Violet'], 'anxiety': ['Red', 'Orange', 'Violet'],
    'panic': ['Red', 'Orange'], 'паника': ['Red', 'Orange'],
    'страх': ['Black', 'Violet'], 'fear': ['Black', 'Violet'],
    'ужас': ['Black', 'Red'], 'horror': ['Black', 'Red'],
    'нервозность': ['Red', 'Orange'], 'nervousness': ['Red', 'Orange'],
    'беспокойство': ['Red', 'Orange', 'Violet'], 'worry': ['Red', 'Orange', 'Violet'], 'unease': ['Red', 'Orange'],
    'смятение': ['Red', 'Violet', 'Grey'], 'confusion': ['Red', 'Violet', 'Grey'],
    'паранойя': ['Black', 'Violet', 'Red'], 'paranoia': ['Black', 'Violet', 'Red'],
    'фобия': ['Black', 'Violet'], 'phobia': ['Black', 'Violet'],
    'предчувствие': ['Violet', 'Grey', 'Black'], 'foreboding': ['Violet', 'Grey', 'Black'],
    'напряженность': ['Red', 'Orange', 'Grey'], 'stress': ['Red', 'Orange', 'Grey'],
    'дрожь': ['Blue', 'Grey', 'Violet'], 'trembling': ['Blue', 'Grey', 'Violet'],
    'ужасный': ['Black', 'Red'], 'dread': ['Black', 'Red'],
    // Death / Darkness
    'смерть': ['Black', 'Violet'], 'death': ['Black', 'Violet'],
    'темный': ['Black'], 'dark': ['Black', 'Violet'],
    'погребение': ['Black', 'Grey', 'Violet'], 'burial': ['Black', 'Grey', 'Violet'],
    'некроз': ['Black', 'Grey'], 'necrosis': ['Black', 'Grey'],
    'эпитафия': ['Black', 'Grey'], 'epitaph': ['Black', 'Grey'],
    'реквием': ['Black', 'Violet'], 'requiem': ['Black', 'Violet'],
    'прощание с жизнью': ['Black', 'Violet', 'Grey'], 'passing': ['Black', 'Violet', 'Grey'],
    'бренность': ['Grey', 'Black'], 'mortality': ['Grey', 'Black'],
    'увядание': ['Grey', 'Orange'], 'withering': ['Grey', 'Orange'], 'fading': ['Grey', 'Orange'],
    // Power / Strength / Energy
    'сила': ['Red', 'Black'], 'power': ['Red', 'Black'],
    'strength': ['Red', 'Black'], 'мощь': ['Red', 'Black'],
    'энергия': ['Red', 'Orange', 'Yellow'], 'energy': ['Red', 'Orange', 'Yellow'],
    'натиск': ['Red', 'Orange'], 'onslaught': ['Red', 'Orange'],
    'напор': ['Red', 'Orange'], 'force': ['Red', 'Orange'],
    'заряд': ['Red', 'Yellow', 'Orange'], 'charge': ['Red', 'Yellow', 'Orange'], 'impulse': ['Red', 'Yellow'],
    'напряжение силы': ['Red', 'Black'], 'tension power': ['Red', 'Black'],
    'доминирование': ['Black', 'Red'], 'dominance': ['Black', 'Red'],
    'несгибаемый': ['Red', 'Black'], 'indomitable': ['Red', 'Black'],
    'атака': ['Red', 'Orange'], 'attack': ['Red', 'Orange'],
    'боевой': ['Red', 'Orange'], 'warrior': ['Red', 'Orange'],
    // Luxury / Royal / Gold
    'роскошь': ['Violet', 'Black', 'Orange'], 'luxury': ['Violet', 'Black', 'Orange'],
    'royal': ['Violet', 'Black', 'Orange'], 'величие': ['Violet', 'Black', 'Orange'],
    'gold': ['Yellow', 'Orange'], 'золото': ['Yellow', 'Orange'],
    'бронза': ['Orange', 'Grey'], 'bronze': ['Orange', 'Grey'],
    'аристократия': ['Violet', 'Black', 'Yellow', 'Orange'], 'aristocracy': ['Violet', 'Black', 'Yellow', 'Orange'],
    'императорский': ['Violet', 'Black', 'Yellow'], 'imperial': ['Violet', 'Black', 'Yellow'],
    'гламур': ['Violet', 'Yellow', 'White'], 'glamour': ['Violet', 'Yellow', 'White'],
    'декаданс': ['Violet', 'Black'], 'decadence': ['Violet', 'Black'],
    'экстравагантность': ['Violet', 'Orange', 'Yellow'], 'extravagance': ['Violet', 'Orange', 'Yellow'],
    'престиж': ['Violet', 'Black', 'Grey'], 'prestige': ['Violet', 'Black', 'Grey'],
    'утонченность': ['Violet', 'White', 'Grey'], 'refinement': ['Violet', 'White', 'Grey'],
    'богатство': ['Yellow', 'Violet', 'Black'], 'wealth': ['Yellow', 'Violet', 'Black'],
    'опулентность': ['Violet', 'Yellow', 'Black'], 'opulence': ['Violet', 'Yellow', 'Black'],
    'статус': ['Violet', 'Yellow', 'Black', 'Orange'], 'status': ['Violet', 'Yellow', 'Black', 'Orange'],
    'преемственность': ['Yellow', 'Orange', 'Red'], 'continuity': ['Yellow', 'Orange', 'Red'],
    'интеллект': ['Yellow', 'Blue', 'White', 'Grey'], 'intellect': ['Yellow', 'Blue', 'White', 'Grey'],
    'память': ['Yellow', 'Grey', 'Orange'], 'memory': ['Yellow', 'Grey', 'Orange'],
    'осторожность': ['Yellow', 'Orange'], 'caution': ['Yellow', 'Orange'],
    'диссонанс': ['Green', 'Yellow', 'Red'], 'dissonance': ['Green', 'Yellow', 'Red'],
    'экспансия': ['Red', 'Yellow', 'Orange'], 'expansion': ['Red', 'Yellow', 'Orange'],
    'надежность': ['Yellow', 'Orange', 'Green', 'Grey'], 'reliability': ['Yellow', 'Orange', 'Green', 'Grey'],
    'стабильность': ['Yellow', 'Grey', 'Orange'], 'stability': ['Yellow', 'Grey', 'Orange'],
    'смирение': ['Green', 'Violet'], 'humility': ['Green', 'Violet'],
    'статика': ['Green', 'Black', 'Grey'], 'stasis': ['Green', 'Black', 'Grey'],
    'торможение': ['Green', 'Blue', 'Black'], 'inhibition': ['Green', 'Blue', 'Black'],
    'объективность': ['Green', 'Grey', 'Blue'], 'objectivity': ['Green', 'Grey', 'Blue'],
    'плодородие': ['Green', 'Yellow', 'Orange'], 'fertility': ['Green', 'Yellow', 'Orange'],
    'доверие': ['Green', 'Blue', 'White'], 'trust': ['Green', 'Blue', 'White'],
    // Purity / Minimalism
    'чистота': ['White', 'Grey'], 'purity': ['White', 'Grey'],
    'pure': ['White'], 'clean': ['White', 'Grey'],
    'minimal': ['White', 'Grey'], 'минимализм': ['White', 'Grey'],
    'свет': ['White', 'Yellow'], 'light': ['White', 'Yellow'],
    'белизна': ['White'], 'whiteness': ['White'],
    'кристальный': ['White', 'Blue', 'Grey'], 'pristine': ['White', 'Blue', 'Grey'],
    'незапятнанный': ['White', 'Grey'], 'spotless': ['White', 'Grey'], 'immaculate': ['White', 'Grey'],
    'ясность': ['White', 'Blue', 'Yellow', 'Orange'], 'clarity': ['White', 'Blue', 'Yellow', 'Orange'],
    'открытый': ['White', 'Blue'], 'open': ['White', 'Blue'],
    'прозрачный': ['White', 'Blue', 'Grey'], 'transparent': ['White', 'Blue', 'Grey'],
    // Metal / Technology / Future
    'металл': ['Grey'], 'metal': ['Grey'], 'steel': ['Grey'], 'сталь': ['Grey'],
    'technology': ['Grey', 'Blue', 'Yellow'], 'технологии': ['Grey', 'Blue', 'Yellow'],
    'future': ['Blue', 'Violet', 'Grey', 'Yellow'], 'будущее': ['Blue', 'Violet', 'Grey', 'Yellow'],
    'футуризм': ['Blue', 'Violet', 'Yellow'], 'futurism': ['Blue', 'Violet', 'Yellow'],
    'промышленный': ['Grey', 'Black'], 'industrial': ['Grey', 'Black'],
    'машина': ['Grey', 'Black'], 'machine': ['Grey', 'Black'],
    'механизм': ['Grey', 'Black'], 'mechanism': ['Grey', 'Black'],
    'инновация': ['Blue', 'Grey'], 'innovation': ['Blue', 'Grey'],
    'цифровой': ['Blue', 'Grey', 'White'], 'digital': ['Blue', 'Grey', 'White'],
    'автоматизация': ['Grey', 'Blue'], 'automation': ['Grey', 'Blue'],
    'нержавейка': ['Grey', 'White'], 'stainless': ['Grey', 'White'],
    'арматура': ['Grey', 'Black'], 'rebar': ['Grey', 'Black'],
    'конструкция': ['Grey', 'Black'], 'structure': ['Grey', 'Black'],
    // Sunset / Dawn
    'закат': ['Orange', 'Red', 'Violet'], 'sunset': ['Orange', 'Red', 'Violet'],
    'dusk': ['Orange', 'Red', 'Violet'], 'сумерки': ['Violet', 'Orange'],
    'рассвет': ['Orange', 'Yellow', 'Red'], 'dawn': ['Orange', 'Yellow', 'Red'],
    'sunrise': ['Orange', 'Yellow', 'Red'],
    'утро': ['Yellow', 'Orange'], 'morning': ['Yellow', 'Orange'],
    'алый закат': ['Red', 'Orange'], 'scarlet sunset': ['Red', 'Orange'],
    'малиновый закат': ['Red', 'Violet', 'Orange'], 'crimson dusk': ['Red', 'Violet', 'Orange'],
    'золотой закат': ['Yellow', 'Orange'], 'golden sunset': ['Yellow', 'Orange'],
    'фиолетовый закат': ['Violet', 'Orange'], 'purple dusk': ['Violet', 'Orange'],
    'переход дня': ['Orange', 'Violet', 'Yellow'], 'day transition': ['Orange', 'Violet', 'Yellow'],
    'утренняя заря': ['Orange', 'Yellow', 'Red'], 'morning glow': ['Orange', 'Yellow', 'Red'],
    'предзакатный': ['Orange', 'Red'], 'pre-sunset': ['Orange', 'Red'],
    'вечерний свет': ['Orange', 'Yellow'], 'evening light': ['Orange', 'Yellow'],
    // Cold / Ice / Winter
    'холод': ['Blue', 'White', 'Grey'], 'cold': ['Blue', 'White', 'Grey'],
    'ice': ['Blue', 'White'], 'лед': ['Blue', 'White'],
    'снег': ['White', 'Blue'], 'snow': ['White', 'Blue'],
    'frost': ['White', 'Blue'], 'мороз': ['White', 'Blue'],
    'стужа': ['Blue', 'White', 'Grey'], 'chill': ['Blue', 'White', 'Grey'],
    'вьюга': ['White', 'Blue', 'Grey'], 'snowstorm': ['White', 'Blue', 'Grey'],
    'свежесть': ['Blue', 'White', 'Green'], 'freshness': ['Blue', 'White', 'Green'],
    'ледяной': ['Blue', 'White'], 'icy': ['Blue', 'White'],
    'кристальный лед': ['White', 'Blue'], 'crystalline': ['White', 'Blue'],
    'полярный': ['White', 'Blue', 'Grey'], 'polar': ['White', 'Blue', 'Grey'],
    'ледниковый': ['White', 'Blue', 'Grey'], 'glacial': ['White', 'Blue', 'Grey'],
    'замерзший': ['White', 'Blue'], 'frozen': ['White', 'Blue'],
    'хрустящий': ['White', 'Blue'], 'crisp': ['White', 'Blue'],
    // Life / Growth / Spring
    'жизнь': ['Green', 'Yellow', 'Red'], 'life': ['Green', 'Yellow', 'Red'],
    'рост': ['Green'], 'growth': ['Green'],
    'цветение': ['Violet', 'Yellow', 'White'], 'blossoming': ['Violet', 'Yellow', 'White'], 'bloom': ['Violet', 'Yellow', 'White'],
    'всходы': ['Green', 'Yellow'], 'sprouts': ['Green', 'Yellow'], 'shoots': ['Green', 'Yellow'],
    'почки': ['Green', 'Yellow'], 'buds': ['Green', 'Yellow'],
    'листопад': ['Green', 'Yellow', 'Orange'], 'leafing': ['Green', 'Yellow'],
    'плодородие': ['Green', 'Yellow', 'Orange'], 'fertility': ['Green', 'Yellow', 'Orange'],
    'свежая зелень': ['Green', 'Yellow'], 'fresh green': ['Green', 'Yellow'],
    'живой': ['Green', 'Yellow'], 'alive': ['Green', 'Yellow'],
    'созревание': ['Green', 'Yellow', 'Orange'], 'ripening': ['Green', 'Yellow', 'Orange'],
    // Autumn / Summer
    'fall': ['Orange', 'Yellow', 'Red'],
    'листва осенняя': ['Orange', 'Yellow', 'Red'], 'autumn foliage': ['Orange', 'Yellow', 'Red'],
    'сбор урожая': ['Orange', 'Yellow'], 'harvest': ['Orange', 'Yellow'],
    'золотая осень': ['Yellow', 'Orange'], 'golden autumn': ['Yellow', 'Orange'],
    'бархатный сезон': ['Orange', 'Yellow', 'Green'], 'velvet season': ['Orange', 'Yellow', 'Green'],
    'жаркий': ['Red', 'Orange', 'Yellow'], 'hot summer': ['Red', 'Orange', 'Yellow'], 'heatwave': ['Red', 'Orange'],
    'летний зной': ['Yellow', 'Orange'], 'summery': ['Yellow', 'Orange'],
    'солнечное лето': ['Yellow', 'Orange'], 'sunny summer': ['Yellow', 'Orange'],
    'августовский': ['Orange', 'Yellow'], 'august': ['Orange', 'Yellow'],
    'сентябрьский': ['Orange', 'Yellow', 'Red'], 'september': ['Orange', 'Yellow', 'Red'],

    // --- CLUSTER 1: Drama & Mystery ---
    'нуар': ['Violet', 'Black'], 'noir': ['Violet', 'Black'],
    'тень': ['Black', 'Grey', 'Violet'], 'shadow': ['Black', 'Grey', 'Violet'],
    'театр': ['Violet', 'Black'], 'theater': ['Violet', 'Black'], 'theatre': ['Violet', 'Black'],
    'заговор': ['Black', 'Violet'], 'conspiracy': ['Black', 'Violet'],
    'тяжесть': ['Black', 'Grey'], 'weight': ['Black', 'Grey'],
    'власть': ['Black', 'Violet', 'Red'], 'domination': ['Black', 'Violet', 'Red'],
    'авторитет': ['Blue', 'Black', 'Violet'], 'authority': ['Blue', 'Black', 'Violet'],
    'статус': ['Black', 'Violet', 'Blue'], 'status': ['Black', 'Violet', 'Blue'],
    'иерархия': ['Black', 'Blue', 'Violet'], 'hierarchy': ['Black', 'Blue', 'Violet'],
    'отчуждение': ['Blue', 'Grey', 'Violet'], 'alienation': ['Blue', 'Grey', 'Violet'],
    'стерильность': ['White', 'Blue'], 'sterility': ['White', 'Blue'],
    'дисциплина': ['Blue', 'Black', 'Violet'], 'discipline': ['Blue', 'Black', 'Violet'],
    'превосходство': ['Violet', 'Yellow', 'Black'], 'superiority': ['Violet', 'Yellow', 'Black'],
    'доминирование': ['Violet', 'Black', 'Red'], 'dominance': ['Violet', 'Black', 'Red'],
    'интроспекция': ['Violet', 'Blue', 'Black'], 'introspection': ['Violet', 'Blue', 'Black'],
    'трансформация': ['Violet', 'Blue', 'Black'], 'transformation': ['Violet', 'Blue', 'Black'],
    'статика': ['Grey', 'Black', 'Violet'], 'stasis': ['Grey', 'Black', 'Violet'],
    'нейтралитет': ['Grey', 'White', 'Violet'], 'neutrality': ['Grey', 'White', 'Violet'],
    'кротость': ['White', 'Violet', 'Blue'], 'meekness': ['White', 'Violet', 'Blue'],
    'диссонанс': ['Violet', 'Red', 'Yellow'], 'dissonance': ['Violet', 'Red', 'Yellow'],
    'интрига': ['Black', 'Violet'], 'intrigue': ['Black', 'Violet'],
    'коварство': ['Black', 'Violet', 'Grey'], 'cunning': ['Black', 'Violet', 'Grey'],
    'загадочность': ['Violet', 'Black'], 'enigmatic': ['Violet', 'Black'],
    'вуаль тайны': ['Black', 'Violet', 'Grey'], 'veil of mystery': ['Black', 'Violet', 'Grey'],
    'мрачный': ['Black', 'Violet', 'Grey'], 'gloomy': ['Black', 'Violet', 'Grey'],
    'роковой': ['Black', 'Violet', 'Red'], 'fateful': ['Black', 'Violet', 'Red'],
    'детектив': ['Black', 'Grey', 'Violet'], 'detective': ['Black', 'Grey', 'Violet'],
    'шпион': ['Black', 'Grey', 'Violet'], 'spy': ['Black', 'Grey', 'Violet'],
    'маскировка': ['Black', 'Grey'], 'camouflage': ['Black', 'Grey'],
    'засада': ['Black', 'Green', 'Grey'], 'ambush': ['Black', 'Green', 'Grey'],

    'триумф': ['Red', 'Violet', 'Yellow', 'Orange', 'Green'], 'triumph': ['Red', 'Violet', 'Yellow', 'Orange', 'Green'],
    'воодушевление': ['Violet', 'Yellow', 'Orange', 'Red', 'Green'], 'inspiration': ['Violet', 'Yellow', 'Orange', 'Red', 'Green'],
    'жертвенность': ['Red'], 'sacrifice': ['Red'],
    'удача': ['Red', 'Yellow'], 'luck': ['Red', 'Yellow'],
    'процветание': ['Green', 'Yellow', 'Red'], 'prosperity': ['Green', 'Yellow', 'Red'],
    'империя': ['Red', 'Violet'], 'empire': ['Red', 'Violet'],
    'ритуал': ['Violet', 'Red'], 'ritual': ['Violet', 'Red'],
    'исцеление': ['Green', 'Red'], 'healing': ['Green', 'Red'],
    'инфернальный': ['Red', 'Black'], 'infernal': ['Red', 'Black'],
    'разрушение': ['Red', 'Black'], 'destruction': ['Red', 'Black'],
    'архетип': ['Red', 'Yellow'], 'archetype': ['Red', 'Yellow'],
    'экстаз': ['Red'], 'ecstasy': ['Red'],
    'озарение': ['Yellow', 'Red', 'White'], 'illumination': ['Yellow', 'Red', 'White'],
    'галлюцинация': ['Red', 'Violet'], 'hallucination': ['Red', 'Violet'],
    'кризис': ['Red', 'Black'], 'crisis': ['Red', 'Black'],
    'истощение': ['Red', 'Grey', 'Black'], 'exhaustion': ['Red', 'Grey', 'Black'],
    'восторг': ['Yellow', 'Orange', 'Violet', 'Red'], 'delight': ['Yellow', 'Orange', 'Violet', 'Red'],
    'карнавал': ['Orange', 'Yellow', 'Red', 'Violet'], 'carnival': ['Orange', 'Yellow', 'Red', 'Violet'],
    'блеск': ['Yellow', 'Orange', 'White'], 'glitter': ['Yellow', 'Orange', 'White'], 'shine': ['Yellow', 'Orange', 'White'],
    'искры': ['Yellow', 'Orange', 'Red'], 'sparks': ['Yellow', 'Orange', 'Red'],
    'солнце': ['Yellow', 'Orange'], 'sun': ['Yellow', 'Orange'],
    'витамины': ['Orange', 'Yellow', 'Green'], 'vitamins': ['Orange', 'Yellow', 'Green'],
    'цитрус': ['Yellow', 'Orange'], 'citrus': ['Yellow', 'Orange'],
    'праздник': ['Orange', 'Yellow', 'Red'], 'holiday': ['Orange', 'Yellow', 'Red'], 'celebration': ['Orange', 'Yellow', 'Red'],
    'успех': ['Yellow', 'Orange'], 'success': ['Yellow', 'Orange'],
    'азарт': ['Red', 'Orange'], 'excitement': ['Red', 'Orange'],
    'скорость': ['Red', 'Orange'], 'speed': ['Red', 'Orange'],
    'динамика': ['Red', 'Orange', 'Yellow'], 'dynamic': ['Red', 'Orange', 'Yellow'],
    'фейерверк': ['Orange', 'Yellow', 'Red', 'Blue'], 'fireworks': ['Orange', 'Yellow', 'Red', 'Blue'],
    'конфетти': ['Yellow', 'Orange', 'Red', 'Violet'], 'confetti': ['Yellow', 'Orange', 'Red', 'Violet'],
    'сюрприз': ['Yellow', 'Orange'], 'surprise': ['Yellow', 'Orange'],
    'аплодисменты': ['Yellow', 'Orange'], 'applause': ['Yellow', 'Orange'],
    'оватция': ['Yellow', 'Orange', 'Red'], 'ovation': ['Yellow', 'Orange', 'Red'],
    'фиеста': ['Orange', 'Yellow', 'Red'], 'fiesta': ['Orange', 'Yellow', 'Red'],
    'дионис': ['Orange', 'Red', 'Violet'], 'dionysus': ['Orange', 'Red', 'Violet'],
    'щедрость': ['Orange', 'Yellow'], 'generosity': ['Orange', 'Yellow'],

    // --- CLUSTER 3: Sterility & Cold ---
    'стекло': ['White', 'Grey', 'Blue'], 'glass': ['White', 'Grey', 'Blue'],
    'арктика': ['White', 'Blue'], 'arctic': ['White', 'Blue'],
    'вакуум': ['White', 'Grey'], 'vacuum': ['White', 'Grey'],
    'лаборатория': ['White', 'Grey', 'Blue'], 'laboratory': ['White', 'Grey', 'Blue'], 'lab': ['White', 'Grey', 'Blue'],
    'алмаз': ['White', 'Blue'], 'diamond': ['White', 'Blue'],
    'фарфор': ['White'], 'porcelain': ['White'],
    'логика': ['Blue', 'Grey'], 'logic': ['Blue', 'Grey'],
    'точность': ['Blue', 'Grey', 'White'], 'precision': ['Blue', 'Grey', 'White'],
    'хладнокровие': ['Blue', 'Grey', 'White'], 'cold-blooded': ['Blue', 'Grey', 'White'],
    'нейтральный': ['Grey', 'White'], 'neutral': ['Grey', 'White'],
    'отстраненность': ['Grey', 'Blue', 'White'], 'detachment': ['Grey', 'Blue', 'White'],
    'клинический': ['White', 'Grey', 'Blue'], 'clinical': ['White', 'Grey', 'Blue'],
    'асептика': ['White', 'Grey'], 'aseptic': ['White', 'Grey'],
    'стерильный': ['White', 'Grey'], 'sterile': ['White', 'Grey'],
    'мрамор белый': ['White', 'Grey'], 'white marble': ['White', 'Grey'],
    'керамика': ['White', 'Grey'], 'ceramic': ['White', 'Grey'],
    'эстетика холода': ['White', 'Blue', 'Grey'], 'cold aesthetics': ['White', 'Blue', 'Grey'],

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
    'рожь': ['Yellow', 'Orange'], 'rye': ['Yellow', 'Orange'],
    'крафт': ['Orange', 'Yellow'], 'craft': ['Orange', 'Yellow'],
    'гармония': ['Green', 'Yellow', 'Blue'], 'harmony': ['Green', 'Yellow', 'Blue'],
    'деревня': ['Green', 'Orange', 'Yellow'], 'village': ['Green', 'Orange', 'Yellow'],
    'ферма': ['Orange', 'Green', 'Yellow'], 'farm': ['Orange', 'Green', 'Yellow'],
    'амбар': ['Orange', 'Yellow', 'Black'], 'barn': ['Orange', 'Yellow', 'Black'],
    'очаг': ['Orange', 'Red', 'Yellow'], 'hearth': ['Orange', 'Red', 'Yellow'],
    'тесто': ['Yellow', 'White', 'Orange'], 'dough': ['Yellow', 'White', 'Orange'],
    'выпечка': ['Yellow', 'Orange'], 'baking': ['Yellow', 'Orange'],
    'пряности': ['Orange', 'Red', 'Yellow'], 'spices': ['Orange', 'Red', 'Yellow'],
    'деревянный': ['Orange', 'Yellow'], 'wooden': ['Orange', 'Yellow'],
    'бревно': ['Orange', 'Yellow'], 'log': ['Orange', 'Yellow'],
    'сухие листья': ['Orange', 'Yellow'], 'dried leaves': ['Orange', 'Yellow'],
    'скошенная трава': ['Green', 'Yellow'], 'mown grass': ['Green', 'Yellow'],
    'солома': ['Yellow', 'Orange'], 'straw': ['Yellow', 'Orange'],
    'плетеное': ['Orange', 'Yellow'], 'wicker': ['Orange', 'Yellow'],
    'утро на даче': ['Yellow', 'Green', 'Orange'], 'dacha morning': ['Yellow', 'Green', 'Orange'],
    'деревенский': ['Orange', 'Yellow', 'Green'], 'rustic': ['Orange', 'Yellow', 'Green'],

    // --- CLUSTER 5: Cyberpunk & Neon ---
    'токсин': ['Green', 'Yellow'], 'toxin': ['Green', 'Yellow'],
    'глитч': ['Violet', 'Blue', 'Green'], 'glitch': ['Violet', 'Blue', 'Green'],
    'лазер': ['Red', 'Green', 'Violet'], 'laser': ['Red', 'Green', 'Violet'],
    'неон': ['Green', 'Yellow', 'Violet', 'Blue'], 'neon': ['Green', 'Yellow', 'Violet', 'Blue'],
    'вирус': ['Green', 'Yellow'], 'virus': ['Green', 'Yellow'],
    'мутация': ['Green', 'Violet', 'Yellow'], 'mutation': ['Green', 'Violet', 'Yellow'],
    'техно': ['Blue', 'Violet', 'Grey'], 'techno': ['Blue', 'Violet', 'Grey'],
    'синтетика': ['Blue', 'Green', 'Grey'], 'synthetic': ['Blue', 'Green', 'Grey'],
    'сигнал': ['Yellow', 'Red', 'Green'], 'signal': ['Yellow', 'Red', 'Green'],
    'кислота': ['Yellow', 'Green'], 'acid': ['Yellow', 'Green'],
    'электричество': ['Yellow', 'Blue'], 'electricity': ['Yellow', 'Blue'], 'electric': ['Yellow', 'Blue'],
    'киберпанк': ['Violet', 'Blue', 'Green'], 'cyberpunk': ['Violet', 'Blue', 'Green'],
    'пиксель': ['Blue', 'Green', 'Violet'], 'pixel': ['Blue', 'Green', 'Violet'],
    'байт': ['Green', 'Blue'], 'byte': ['Green', 'Blue'],
    'чип': ['Grey', 'Blue', 'Green'], 'chip': ['Grey', 'Blue', 'Green'],
    'протокол': ['Blue', 'Grey'], 'protocol': ['Blue', 'Grey'],
    'шифрование': ['Blue', 'Grey', 'Black'], 'encryption': ['Blue', 'Grey', 'Black'],
    'бинарный': ['Black', 'Green'], 'binary': ['Black', 'Green'],
    'хакер': ['Black', 'Green'], 'hacker': ['Black', 'Green'],
    'дистопия': ['Black', 'Grey', 'Violet'], 'dystopia': ['Black', 'Grey', 'Violet'],
    'ультрафиолет': ['Violet', 'Blue'], 'ultraviolet': ['Violet', 'Blue'],
    'плазменный': ['Violet', 'Blue', 'White'], 'plasma glow': ['Violet', 'Blue', 'White'],
    'интерфейс': ['Blue', 'Grey', 'White'], 'interface': ['Blue', 'Grey', 'White'],
    'голограммный': ['Blue', 'Green', 'Violet'], 'holographic': ['Blue', 'Green', 'Violet'],

    // --- CLUSTER 6: Fading & Grief ---
    'пыль': ['Grey'], 'dust': ['Grey'],
    'пепел': ['Grey', 'Black'], 'ash': ['Grey', 'Black'],
    'забытье': ['Grey', 'Black'], 'oblivion': ['Grey', 'Black'],
    'усталость': ['Grey'], 'fatigue': ['Grey'], 'tired': ['Grey'],
    'бессонница': ['Black', 'Blue', 'Grey'], 'insomnia': ['Black', 'Blue', 'Grey'],
    'дождь': ['Grey', 'Blue'], 'rain': ['Grey', 'Blue'],
    'призрак': ['Grey', 'White', 'Violet'], 'ghost': ['Grey', 'White', 'Violet'],
    'бетон': ['Grey'], 'concrete': ['Grey'],
    'смог': ['Grey', 'Black'], 'smog': ['Grey', 'Black'],
    'мрачность': ['Grey', 'Black'], 'dreariness': ['Grey', 'Black'],
    'ветхость': ['Grey', 'Orange'], 'dilapidation': ['Grey', 'Orange'],
    'заброшенный': ['Grey', 'Black'], 'abandoned': ['Grey', 'Black'],
    'запустение': ['Grey', 'Black'], 'desolation': ['Grey', 'Black'],
    'серый день': ['Grey', 'White'], 'grey day': ['Grey', 'White'],
    'хмурый': ['Grey', 'Blue'], 'gloomy day': ['Grey', 'Blue'],
    'поблекший': ['Grey', 'White'], 'faded': ['Grey', 'White'],
    'выцветший': ['Grey', 'White'], 'bleached': ['Grey', 'White'],
    'эрозия': ['Grey', 'Orange'], 'erosion': ['Grey', 'Orange'],
    'шрам': ['Grey', 'Black'], 'scar': ['Grey', 'Black'],
    'послевоенный': ['Grey', 'Black', 'Orange'], 'post-war': ['Grey', 'Black', 'Orange'],
    'дождливый': ['Grey', 'Blue'], 'rainy': ['Grey', 'Blue'],
    'пасмурный': ['Grey', 'White'], 'overcast': ['Grey', 'White'],
    'меланхольный': ['Grey', 'Blue', 'Violet'], 'melancholic': ['Grey', 'Blue', 'Violet'],

    // --- CLUSTER 7: Childhood & Fragility ---
    'зефир': ['White', 'Violet'], 'marshmallow': ['White', 'Violet'],
    'сахар': ['White', 'Yellow'], 'sugar': ['White', 'Yellow'],
    'ласка': ['Violet', 'Red'], 'affection': ['Violet', 'Red'],
    'кукла': ['Violet', 'Red', 'White'], 'doll': ['Violet', 'Red', 'White'],
    'вата': ['White', 'Grey'], 'cotton': ['White', 'Grey'],
    'облако': ['White', 'Grey', 'Blue'], 'cloud': ['White', 'Grey', 'Blue'],
    'цветок': ['Red', 'Violet', 'Yellow'], 'flower': ['Red', 'Violet', 'Yellow'],
    'невинность': ['White'], 'innocence': ['White'],
    'пудра': ['White', 'Grey', 'Violet'], 'powder': ['White', 'Grey', 'Violet'],
    'сладкий': ['Yellow', 'Violet'], 'sweet': ['Yellow', 'Violet'],
    'хрупкость': ['White', 'Grey'], 'fragility': ['White', 'Grey'], 'fragile': ['White', 'Grey'],
    'пастель': ['White', 'Violet', 'Yellow'], 'pastel': ['White', 'Violet', 'Yellow'],
    'романс': ['Violet', 'Red'], 'romans': ['Violet', 'Red'],
    'зефирный': ['White', 'Violet'], 'fluffy': ['White', 'Violet'],
    'нежно-розовый': ['Violet', 'White'], 'baby pink': ['Violet', 'White'],
    'нежно-голубой': ['Blue', 'White'], 'baby blue': ['Blue', 'White'],
    'мягкая игрушка': ['Orange', 'Yellow', 'White'], 'plushie': ['Orange', 'Yellow', 'White'],
    'карусель': ['Yellow', 'Violet', 'Red'], 'carousel': ['Yellow', 'Violet', 'Red'],
    'мороженое': ['White', 'Yellow', 'Violet'], 'ice cream': ['White', 'Yellow', 'Violet'],
    'леденец': ['Red', 'Yellow', 'Violet'], 'lollipop': ['Red', 'Yellow', 'Violet'],
    'конфеты': ['Yellow', 'Red', 'Violet'], 'candy': ['Yellow', 'Red', 'Violet'],
    'пузыри': ['Blue', 'White', 'Violet'], 'bubbles': ['Blue', 'White', 'Violet'],
    'радужный': ['Violet', 'Blue', 'Yellow', 'Red'], 'rainbow pastel': ['Violet', 'Blue', 'Yellow'],
    'сказочный': ['Violet', 'Yellow', 'Blue'], 'magical': ['Violet', 'Yellow', 'Blue'],
    'плюшевый': ['Orange', 'Yellow', 'White'], 'plush': ['Orange', 'Yellow', 'White'],
    'детская мечта': ['Yellow', 'Violet', 'Blue'], 'childhood dream': ['Yellow', 'Violet', 'Blue'],
    'нежно': ['White', 'Violet'], 'gently': ['White', 'Violet'],

    // --- FLOWERS ---
    'роза': ['Red', 'Violet'], 'rose': ['Red', 'Violet'],
    'тюльпан': ['Red', 'Yellow', 'Violet'], 'tulip': ['Red', 'Yellow', 'Violet'],
    'лаванда': ['Violet'], 'lavender': ['Violet'],
    'орхидея': ['Violet', 'White'], 'orchid': ['Violet', 'White'],
    'лилия': ['White', 'Yellow', 'Orange'], 'lily': ['White', 'Yellow', 'Orange'],
    'подсолнух': ['Yellow', 'Orange'], 'sunflower': ['Yellow', 'Orange'],
    'фиалка': ['Violet'], 'violet': ['Violet'],
    'пион': ['Red', 'Violet', 'White'], 'peony': ['Red', 'Violet', 'White'],
    'гвоздика': ['Red', 'White'], 'carnation': ['Red', 'White'],
    'хризантема': ['Yellow', 'White', 'Violet'], 'chrysanthemum': ['Yellow', 'White', 'Violet'],
    'мак': ['Red', 'Orange'], 'poppy': ['Red', 'Orange'],
    'ирис': ['Violet', 'Blue', 'Yellow'], 'iris': ['Violet', 'Blue', 'Yellow'],
    'нарцисс': ['Yellow', 'White'], 'narcissus': ['Yellow', 'White'], 'daffodil': ['Yellow', 'White'],
    'жасмин': ['White', 'Yellow'], 'jasmine': ['White', 'Yellow'],
    'клевер': ['Green', 'Violet'], 'clover': ['Green', 'Violet'],
    'магнолия': ['White', 'Violet'], 'magnolia': ['White', 'Violet'],
    'лотос': ['White', 'Violet', 'Red'], 'lotus': ['White', 'Violet', 'Red'],
    'мимоза': ['Yellow'], 'mimosa': ['Yellow'],
    'сирень': ['Violet'], 'lilac': ['Violet'],
    'азалия': ['Red', 'Violet', 'White'], 'azalea': ['Red', 'Violet', 'White'],
    'герань': ['Red', 'Violet'], 'geranium': ['Red', 'Violet'],
    'бегония': ['Red', 'Orange', 'Yellow'], 'begonia': ['Red', 'Orange', 'Yellow'],
    'гортензия': ['Blue', 'Violet', 'White'], 'hydrangea': ['Blue', 'Violet', 'White'],
    'цикламен': ['Red', 'Violet', 'White'], 'cyclamen': ['Red', 'Violet', 'White'],
    'сосна': ['Green'], 'pine': ['Green'],
    'кактус': ['Green', 'Yellow'], 'cactus': ['Green', 'Yellow'],
    'листья': ['Green', 'Yellow', 'Orange'], 'leaves': ['Green', 'Yellow', 'Orange'],
    'крапива': ['Green', 'Yellow'], 'nettle': ['Green', 'Yellow'],
    'мох': ['Green'], 'moss': ['Green'],
    'плющ': ['Green'], 'ivy': ['Green'],
    'бамбук': ['Green'], 'bamboo': ['Green'],
    'жимолость': ['Yellow', 'White'], 'honeysuckle': ['Yellow', 'White'],
    'эдельвейс': ['White', 'Grey'], 'edelweiss': ['White', 'Grey'],
    'анемон': ['Red', 'Violet', 'White'], 'anemone': ['Red', 'Violet', 'White'],
    'гладиолус': ['Red', 'Orange', 'Violet'], 'gladiolus': ['Red', 'Orange', 'Violet'],
    'петуния': ['Violet', 'White', 'Red'], 'petunia': ['Violet', 'White', 'Red'],
    'примула': ['Yellow', 'Violet', 'White'], 'primrose': ['Yellow', 'Violet', 'White'],
    'валериана': ['White', 'Violet'], 'valerian': ['White', 'Violet'],
    'зверобой': ['Yellow', 'Orange'], 'st johns wort': ['Yellow', 'Orange'],
    'календула': ['Orange', 'Yellow'], 'marigold': ['Orange', 'Yellow'],
    'гвоздика турецкая': ['Red', 'Violet'], 'sweet william': ['Red', 'Violet'],
    'иван-чай': ['Violet', 'Red'], 'fireweed': ['Violet', 'Red'],
    'лотос нилуфар': ['White', 'Violet'], 'nymphaea': ['White', 'Violet'],
    'водяная лилия': ['White', 'Yellow'], 'water lily': ['White', 'Yellow'],
    'рябина': ['Red', 'Orange'], 'rowan': ['Red', 'Orange'],
    'сирень белая': ['White', 'Violet'], 'white lilac': ['White', 'Violet'],
    'тюльпан чёрный': ['Black', 'Violet'], 'black tulip': ['Black', 'Violet'],
    'роза чайная': ['Yellow', 'Orange'], 'tea rose': ['Yellow', 'Orange'],
    'роза алая': ['Red', 'Violet'], 'crimson rose': ['Red', 'Violet'],
    'роза белая': ['White', 'Violet'], 'white rose': ['White', 'Violet'],
    'занесчий': ['Blue', 'Violet'],
    'дельфиниум': ['Blue', 'Violet', 'White'], 'delphinium': ['Blue', 'Violet', 'White'],
    'эхинацея': ['Red', 'Violet'], 'echinacea': ['Red', 'Violet'],
    'тысячелистник': ['White', 'Yellow'], 'yarrow': ['White', 'Yellow'],
    'ковыль': ['White', 'Grey'], 'feather grass': ['White', 'Grey'],
    'лаконос': ['Black', 'Violet'], 'pokeweed': ['Black', 'Violet'],
    'мирт': ['White', 'Green'], 'myrtle': ['White', 'Green'],
    'акация': ['Yellow', 'White'], 'acacia': ['Yellow', 'White'],
    'форзиция': ['Yellow'], 'forsythia': ['Yellow'],
    'верещатник': ['Violet', 'Orange'], 'moorland': ['Violet', 'Orange'],
    'вербена': ['Violet', 'White', 'Red'], 'verbena': ['Violet', 'White', 'Red'],
    'шалфей': ['Blue', 'Violet'], 'sage': ['Blue', 'Violet'],
    'иссоп': ['Blue', 'Violet'], 'hyssop': ['Blue', 'Violet'],
    'душица': ['Violet', 'White'], 'oregano': ['Violet', 'White'],
    'тимьян': ['Violet', 'Green'], 'thyme': ['Violet', 'Green'],
    'мелисса': ['Green', 'White'], 'lemon balm': ['Green', 'White'],

    // --- NATURAL PHENOMENA ---
    'гроза': ['Black', 'Blue', 'Violet'], 'thunderstorm': ['Black', 'Blue', 'Violet'], 'storm': ['Black', 'Blue', 'Violet'],
    'молния': ['Yellow', 'White', 'Blue'], 'lightning': ['Yellow', 'White', 'Blue'],
    'метель': ['White', 'Grey', 'Blue'], 'blizzard': ['White', 'Grey', 'Blue'],
    'буря': ['Black', 'Grey', 'Blue'], 'hurricane': ['Black', 'Grey', 'Blue'],
    'гром': ['Black', 'Grey'], 'thunder': ['Black', 'Grey'],
    'туча': ['Grey', 'Black'], 'stormcloud': ['Grey', 'Black'],
    'ливень': ['Grey', 'Blue'], 'downpour': ['Grey', 'Blue'],
    'капля': ['Blue', 'White'], 'drop': ['Blue', 'White'],
    'роса': ['Blue', 'White', 'Green'], 'dew': ['Blue', 'White', 'Green'],
    'иней': ['White', 'Blue'], 'hoarfrost': ['White', 'Blue'],
    'снегопад': ['White', 'Blue', 'Grey'], 'snowfall': ['White', 'Blue', 'Grey'],
    'лавина': ['White', 'Grey', 'Blue'], 'avalanche': ['White', 'Grey', 'Blue'],
    'вулкан': ['Red', 'Orange', 'Black'], 'volcano': ['Red', 'Orange', 'Black'],
    'лава': ['Red', 'Orange', 'Black'], 'lava': ['Red', 'Orange', 'Black'],
    'извержение': ['Red', 'Orange', 'Black'], 'eruption': ['Red', 'Orange', 'Black'],
    'торнадо': ['Grey', 'Black', 'Blue'], 'tornado': ['Grey', 'Black', 'Blue'],
    'прилив': ['Blue', 'Green'], 'tide': ['Blue', 'Green'],
    'водопад': ['Blue', 'White', 'Green'], 'waterfall': ['Blue', 'White', 'Green'],
    'вечер': ['Orange', 'Violet', 'Red'], 'evening': ['Orange', 'Violet', 'Red'],
    'затмение': ['Black', 'Violet', 'Orange'], 'eclipse': ['Black', 'Violet', 'Orange'],
    'северное сияние': ['Green', 'Violet', 'Blue'], 'aurora': ['Green', 'Violet', 'Blue'], 'northern lights': ['Green', 'Violet', 'Blue'],
    'туман над рекой': ['Grey', 'White', 'Blue'], 'haze': ['Grey', 'White'],
    'пожар': ['Red', 'Orange', 'Black'], 'wildfire': ['Red', 'Orange', 'Black'],
    'зарево': ['Red', 'Orange', 'Yellow'], 'glow': ['Red', 'Orange', 'Yellow'],
    'смерч': ['Grey', 'Black'], 'whirlwind': ['Grey', 'Black'],
    'радиация': ['Yellow', 'Green'], 'radioactivity': ['Yellow', 'Green'],
    'сумрак': ['Violet', 'Grey', 'Blue'], 'twilight': ['Violet', 'Grey', 'Blue'],
    'засуха': ['Orange', 'Yellow', 'White'], 'drought': ['Orange', 'Yellow', 'White'],
    'землетрясение': ['Grey', 'Black', 'Orange'], 'earthquake': ['Grey', 'Black', 'Orange'],
    'наводнение': ['Blue', 'Grey'], 'flood': ['Blue', 'Grey'],
    'кратер': ['Black', 'Orange', 'Red'], 'crater': ['Black', 'Orange', 'Red'],
    'горячий источник': ['Blue', 'White', 'Orange'], 'hot spring': ['Blue', 'White', 'Orange'],
    'грот': ['Blue', 'Grey', 'Green'], 'grotto': ['Blue', 'Grey', 'Green'],
    'ущелье': ['Grey', 'Black', 'Orange'], 'gorge': ['Grey', 'Black', 'Orange'],
    'коралловый риф': ['Red', 'Orange', 'Blue'], 'coral reef': ['Red', 'Orange', 'Blue'],
    'мираж': ['White', 'Yellow', 'Orange'], 'mirage': ['White', 'Yellow', 'Orange'],
    'пыльная буря': ['Orange', 'Yellow', 'Grey'], 'sandstorm': ['Orange', 'Yellow', 'Grey'],
    'карстовое озеро': ['Blue', 'Green'], 'karst lake': ['Blue', 'Green'],
    'солончак': ['White', 'Grey', 'Orange'], 'salt flat': ['White', 'Grey', 'Orange'],
    'льдина': ['White', 'Blue'], 'ice floe': ['White', 'Blue'],
    'пурга': ['White', 'Grey', 'Blue'], 'blizzard wind': ['White', 'Grey', 'Blue'],
    'туман ночной': ['Grey', 'Violet', 'Blue'], 'night fog': ['Grey', 'Violet', 'Blue'],
    'осадки': ['Grey', 'Blue'], 'precipitation': ['Grey', 'Blue'],
    'заморозки': ['White', 'Blue'], 'frost': ['White', 'Blue'],

    // --- ANIMALS ---
    'лиса': ['Orange', 'Red'], 'fox': ['Orange', 'Red'],
    'волк': ['Grey', 'Black'], 'wolf': ['Grey', 'Black'],
    'медведь': ['Orange', 'Black', 'Grey'], 'bear': ['Orange', 'Black', 'Grey'],
    'пантера': ['Black', 'Violet'], 'panther': ['Black', 'Violet'],
    'фламинго': ['Red', 'Violet', 'White'], 'flamingo': ['Red', 'Violet', 'White'],
    'попугай': ['Green', 'Red', 'Yellow', 'Blue'], 'parrot': ['Green', 'Red', 'Yellow', 'Blue'],
    'ворона': ['Black', 'Grey'], 'crow': ['Black', 'Grey'],
    'лебедь': ['White', 'Grey'], 'swan': ['White', 'Grey'],
    'тигр': ['Orange', 'Black'], 'tiger': ['Orange', 'Black'],
    'леопард': ['Orange', 'Yellow', 'Black'], 'leopard': ['Orange', 'Yellow', 'Black'],
    'жираф': ['Orange', 'Yellow'], 'giraffe': ['Orange', 'Yellow'],
    'слон': ['Grey'], 'elephant': ['Grey'],
    'пингвин': ['Black', 'White'], 'penguin': ['Black', 'White'],
    'колибри': ['Green', 'Red', 'Blue', 'Violet'], 'hummingbird': ['Green', 'Red', 'Blue', 'Violet'],
    'павлин': ['Blue', 'Green', 'Violet'], 'peacock': ['Blue', 'Green', 'Violet'],
    'бабочка': ['Yellow', 'Orange', 'Violet', 'Blue'], 'butterfly': ['Yellow', 'Orange', 'Violet', 'Blue'],
    'кит': ['Blue', 'Grey'], 'whale': ['Blue', 'Grey'],
    'осьминог': ['Blue', 'Grey', 'Violet'], 'octopus': ['Blue', 'Grey', 'Violet'],
    'коралл': ['Red', 'Orange'], 'coral': ['Red', 'Orange'],
    'акула': ['Grey', 'Blue'], 'shark': ['Grey', 'Blue'],
    'орел': ['Grey', 'Black', 'Orange'], 'eagle': ['Grey', 'Black', 'Orange'],
    'сова': ['Orange', 'Grey', 'Black'], 'owl': ['Orange', 'Grey', 'Black'],
    'змея': ['Green', 'Black', 'Yellow'], 'snake': ['Green', 'Black', 'Yellow'],
    'оленя': ['Orange', 'Yellow', 'Green'], 'deer': ['Orange', 'Yellow', 'Green'],
    'кролик': ['White', 'Grey'], 'rabbit': ['White', 'Grey'],
    'кошка': ['Grey', 'Black', 'White', 'Orange'], 'cat': ['Grey', 'Black', 'White', 'Orange'],
    'лошадь': ['Orange', 'Black', 'Grey'], 'horse': ['Orange', 'Black', 'Grey'],
    'скорпион': ['Black', 'Red'], 'scorpion': ['Black', 'Red'],
    'рысь': ['Orange', 'Yellow', 'Grey'], 'lynx': ['Orange', 'Yellow', 'Grey'],
    'медуза': ['Violet', 'Blue', 'White'], 'jellyfish': ['Violet', 'Blue', 'White'],
    'светлячок': ['Yellow', 'Green'], 'firefly': ['Yellow', 'Green'],
    'ягуар': ['Orange', 'Black', 'Yellow'], 'jaguar': ['Orange', 'Black', 'Yellow'],
    'зебра': ['Black', 'White'], 'zebra': ['Black', 'White'],
    'лось': ['Orange', 'Grey', 'Green'], 'moose': ['Orange', 'Grey', 'Green'],
    'белка': ['Orange', 'Grey', 'White'], 'squirrel': ['Orange', 'Grey', 'White'],
    'еж': ['Grey', 'Black'], 'hedgehog': ['Grey', 'Black'],
    'черепаха': ['Grey', 'Green', 'Yellow'], 'turtle': ['Grey', 'Green', 'Yellow'],
    'крокодил': ['Green', 'Yellow', 'Black'], 'crocodile': ['Green', 'Yellow', 'Black'],
    'обезьяна': ['Yellow', 'Orange', 'Grey'],
    'горилла': ['Black', 'Grey'], 'gorilla': ['Black', 'Grey'],
    'пеликан': ['White', 'Orange', 'Yellow'], 'pelican': ['White', 'Orange', 'Yellow'],
    'ястреб': ['Black', 'White'], 'ostrich': ['Black', 'White'],
    'пума': ['White', 'Grey', 'Blue'], 'puma': ['Grey', 'Black'],
    'коала': ['Grey', 'White'], 'koala': ['Grey', 'White'],
    'кенгуру': ['Orange', 'Yellow', 'Grey'], 'kangaroo': ['Orange', 'Yellow', 'Grey'],
    'насекомое': ['Green', 'Yellow', 'Black'], 'insect': ['Green', 'Yellow', 'Black'],
    'пчела': ['Yellow', 'Black'], 'bee': ['Yellow', 'Black'],
    'стрекоза': ['Blue', 'Green'],
    'жук': ['Black', 'Green'], 'beetle': ['Black', 'Green'],
    'льв': ['Orange', 'Yellow'], 'lion': ['Orange', 'Yellow'],
    'гепард': ['Orange', 'Black', 'Yellow'],
    'носорог': ['Grey', 'White', 'Black'], 'rhinoceros': ['Grey', 'White', 'Black'],
    'бегемот': ['Green', 'Grey', 'Black'], 'hippo': ['Grey', 'Green'],
    'дельфин': ['Blue', 'Grey', 'White'], 'dolphin': ['Blue', 'Grey', 'White'],
    'сельдь': ['Blue', 'White', 'Grey'], 'seal': ['Blue', 'White', 'Grey'],
    'морж': ['Orange', 'Grey', 'Blue'], 'walrus': ['Orange', 'Grey', 'Blue'],
    'лютня': ['Grey', 'Blue', 'White'], 'otter': ['Grey', 'Orange', 'White'],
    'бобер': ['Black', 'Grey', 'Orange'], 'beaver': ['Black', 'Grey', 'Orange'],
    'ласточка': ['White', 'Grey'], 'swallow': ['Black', 'White', 'Blue'],
    'воробей': ['Grey', 'Brown'], 'sparrow': ['Grey', 'Orange', 'White'],
    'снегирь': ['White', 'Grey', 'Blue'], 'bullfinch': ['Red', 'White', 'Grey'],
    'синица': ['Blue', 'Yellow'], 'tit': ['Blue', 'Yellow'],
    'попугай-корелла': ['Green', 'Blue'],
    'осьминог-осьминог': ['Blue', 'Grey', 'White'],

    // --- FOOD & DRINK ---
    'шоколад': ['Orange', 'Black'], 'chocolate': ['Orange', 'Black'],
    'мёд': ['Yellow', 'Orange'], 'honey': ['Yellow', 'Orange'],
    'лимон': ['Yellow'], 'lemon': ['Yellow'],
    'арбуз': ['Red', 'Green'], 'watermelon': ['Red', 'Green'],
    'вишня': ['Red', 'Violet'], 'cherry': ['Red', 'Violet'],
    'мята': ['Green', 'White'], 'mint': ['Green', 'White'],
    'малина': ['Red', 'Violet'], 'raspberry': ['Red', 'Violet'],
    'черника': ['Blue', 'Violet'], 'blueberry': ['Blue', 'Violet'],
    'виноград': ['Violet', 'Green'], 'grape': ['Violet', 'Green'],
    'авокадо': ['Green', 'Yellow'], 'avocado': ['Green', 'Yellow'],
    'манго': ['Orange', 'Yellow'], 'mango': ['Orange', 'Yellow'],
    'персик': ['Orange', 'Yellow', 'Red'], 'peach': ['Orange', 'Yellow', 'Red'],
    'клубника': ['Red', 'Yellow'], 'strawberry': ['Red', 'Yellow'],
    'тыква': ['Orange', 'Yellow'], 'pumpkin': ['Orange', 'Yellow'],
    'вино': ['Red', 'Violet'], 'wine': ['Red', 'Violet'],
    'молоко': ['White', 'Yellow'], 'milk': ['White', 'Yellow'],
    'чай': ['Orange', 'Yellow', 'Green'], 'tea': ['Orange', 'Yellow', 'Green'],
    'апельсин': ['Orange'], 'orange fruit': ['Orange'],
    'банан': ['Yellow'], 'banana': ['Yellow'],
    'ананас': ['Yellow', 'Orange'], 'pineapple': ['Yellow', 'Orange'],
    'кокос': ['White', 'Orange'], 'coconut': ['White', 'Orange'],
    'гранат': ['Red', 'Violet'], 'pomegranate': ['Red', 'Violet'],
    'черешня': ['Red', 'Violet'], 'sweet cherry': ['Red', 'Violet'],
    'ежевика': ['Black', 'Violet', 'Blue'], 'blackberry': ['Black', 'Violet', 'Blue'],
    'абрикос': ['Orange', 'Yellow'], 'apricot': ['Orange', 'Yellow'],
    'карамель': ['Orange', 'Yellow'], 'caramel': ['Orange', 'Yellow'],
    'ваниль': ['White', 'Yellow'], 'vanilla': ['White', 'Yellow'],
    'шафран': ['Orange', 'Yellow'], 'saffron': ['Orange', 'Yellow'],
    'паприка': ['Red', 'Orange'], 'paprika': ['Red', 'Orange'],
    'перец': ['Red', 'Green', 'Yellow'], 'pepper': ['Red', 'Green', 'Yellow'],
    'базилик': ['Green'], 'basil': ['Green'],
    'мята перечная': ['Green', 'White'], 'peppermint': ['Green', 'White'],
    'лайм': ['Green', 'Yellow'], 'lime': ['Green', 'Yellow'],
    'яблоко': ['Red', 'Green', 'Yellow'], 'apple': ['Red', 'Green', 'Yellow'],
    'груша': ['Yellow', 'Green'], 'pear': ['Yellow', 'Green'],
    'киви': ['Green', 'Yellow'], 'kiwi': ['Green', 'Yellow'],
    'клюква': ['Red', 'Violet'], 'cranberry': ['Red', 'Violet'],
    'смородина': ['Black', 'Red', 'Violet'], 'currant': ['Black', 'Red', 'Violet'],
    'крыжовник': ['Green', 'Yellow'], 'gooseberry': ['Green', 'Yellow'],
    'фиг': ['Violet', 'Green'], 'fig': ['Violet', 'Green'],
    'финик': ['Orange', 'Yellow'], 'date fruit': ['Orange', 'Yellow'],
    'хурма': ['Orange', 'Yellow'], 'date palm': ['Orange', 'Yellow'],
    'папайя': ['Orange', 'Yellow', 'Green'], 'papaya': ['Orange', 'Yellow', 'Green'],
    'гуава': ['Green', 'Yellow', 'Violet'], 'guava': ['Green', 'Yellow', 'Violet'],
    'личи': ['Red', 'White'], 'lychee': ['Red', 'White'],
    'маракуйя': ['Yellow', 'Orange'], 'maracuja': ['Yellow', 'Orange'],
    'нектарин': ['White', 'Yellow'], 'nectarine': ['White', 'Yellow'],
    'айва': ['Orange', 'Yellow'], 'quince': ['Orange', 'Yellow'],
    'вишневый сок': ['Red', 'Violet'], 'cherry juice': ['Red', 'Violet'],
    'коктейль': ['Red', 'Orange', 'Yellow'], 'cocktail': ['Red', 'Orange', 'Yellow'],
    'лимонад': ['Yellow', 'White'], 'lemonade': ['Yellow', 'White'],
    'морозеное': ['White', 'Violet', 'Yellow'], 'ice cream': ['White', 'Violet', 'Yellow'],
    'торт': ['Yellow', 'Orange', 'White'], 'cake': ['Yellow', 'Orange', 'White'],
    'макарун': ['Violet', 'Yellow', 'White'], 'macaron': ['Violet', 'Yellow', 'White'],
    'капкейк': ['Yellow', 'Orange', 'Violet'], 'cupcake': ['Yellow', 'Orange', 'Violet'],
    'пицца': ['Orange', 'Red', 'Yellow'], 'pizza': ['Orange', 'Red', 'Yellow'],
    'томат': ['Red', 'Orange'], 'tomato': ['Red', 'Orange'],
    'морковь': ['Orange', 'Yellow'], 'carrot': ['Orange', 'Yellow'],
    'свекла': ['Red', 'Violet'], 'beet': ['Red', 'Violet'], 'beetroot': ['Red', 'Violet'],
    'брокколи': ['Green'], 'broccoli': ['Green'],
    'шпинат': ['Green'], 'spinach': ['Green'],
    'капуста': ['Green', 'White'], 'cabbage': ['Green', 'White'],
    'салат': ['Green', 'Yellow'], 'salad': ['Green', 'Yellow'],
    'эспрессо': ['Black', 'Orange'], 'espresso': ['Black', 'Orange'],
    'чай матча': ['Green', 'White'], 'matcha': ['Green', 'White'],
    'какао': ['Orange', 'Black', 'Yellow'], 'cacao': ['Orange', 'Black', 'Yellow'],
    'молочный шоколад': ['White', 'Yellow'], 'white chocolate': ['White', 'Yellow'],
    'тёмный шоколад': ['Black', 'Orange'], 'dark chocolate': ['Black', 'Orange'],

    // --- GEMS & MINERALS ---
    'рубин': ['Red', 'Violet'], 'ruby': ['Red', 'Violet'],
    'сапфир': ['Blue', 'Violet'], 'sapphire': ['Blue', 'Violet'],
    'изумруд': ['Green'], 'emerald': ['Green'],
    'жемчуг': ['White', 'Grey'], 'pearl': ['White', 'Grey'],
    'янтарь': ['Orange', 'Yellow'], 'amber': ['Orange', 'Yellow'],
    'опал': ['White', 'Violet', 'Blue'], 'opal': ['White', 'Violet', 'Blue'],
    'малахит': ['Green', 'Black'], 'malachite': ['Green', 'Black'],
    'аметист': ['Violet'], 'amethyst': ['Violet'],
    'топаз': ['Yellow', 'Blue'], 'topaz': ['Yellow', 'Blue'],
    'оникс': ['Black', 'Grey'], 'onyx': ['Black', 'Grey'],
    'турмалин': ['Green', 'Violet', 'Red'], 'tourmaline': ['Green', 'Violet', 'Red'],
    'мрамор': ['White', 'Grey'], 'marble': ['White', 'Grey'],
    'гранит': ['Grey', 'Black'], 'granite': ['Grey', 'Black'],
    'обсидиан': ['Black'], 'obsidian': ['Black'],
    'лазурит': ['Blue', 'Violet'], 'lapis lazuli': ['Blue', 'Violet'],
    'бирюза': ['Blue', 'Green'], 'turquoise': ['Blue', 'Green'],
    'хрусталь': ['White', 'Blue', 'Grey'], 'crystal': ['White', 'Blue', 'Grey'],
    'серебро': ['Grey', 'White'], 'silver': ['Grey', 'White'],
    'медь': ['Orange', 'Red'], 'copper': ['Orange', 'Red'],
    'бронза': ['Orange', 'Yellow'], 'bronze': ['Orange', 'Yellow'],
    'платина': ['Grey', 'White'], 'platinum': ['Grey', 'White'],
    'каменный уголь': ['Black', 'Grey'], 'coal': ['Black', 'Grey'],
    'гарнет': ['Red', 'Violet'], 'garnet': ['Red', 'Violet'],
    'александрит': ['Violet', 'Green'], 'alexandrite': ['Violet', 'Green'],
    'танзанит': ['Blue', 'Violet'], 'tanzanite': ['Blue', 'Violet'],
    'жадеит': ['Green', 'White'], 'jade': ['Green', 'White'],
    'шпинель': ['Red', 'Violet'], 'spinel': ['Red', 'Violet'],
    'циркон': ['Yellow', 'Blue', 'Orange'], 'zircon': ['Yellow', 'Blue', 'Orange'],
    'перидот': ['Green', 'Yellow'], 'peridot': ['Green', 'Yellow'],
    'цветной кварц': ['Yellow', 'Orange', 'Violet'], 'colored quartz': ['Yellow', 'Orange', 'Violet'],
    'лазурный камень': ['Blue', 'Violet'], 'lazurite': ['Blue', 'Violet'],
    'железо': ['Grey', 'Black'], 'iron': ['Grey', 'Black'],
    'свинец': ['Grey', 'Black'], 'lead': ['Grey', 'Black'],
    'зинк': ['Grey', 'White'], 'zinc': ['Grey', 'White'],
    'алюминий': ['Grey', 'White'], 'aluminum': ['Grey', 'White'],
    'титан': ['Grey', 'White', 'Blue'], 'titanium': ['Grey', 'White', 'Blue'],

    // --- LANDSCAPES / PLACES ---
    'пустыня': ['Orange', 'Yellow'], 'desert': ['Orange', 'Yellow'],
    'джунгли': ['Green', 'Black'], 'jungle': ['Green', 'Black'],
    'горы': ['Grey', 'White', 'Blue'], 'mountains': ['Grey', 'White', 'Blue'],
    'степь': ['Yellow', 'Orange', 'Green'], 'steppe': ['Yellow', 'Orange', 'Green'],
    'тропики': ['Green', 'Orange', 'Yellow'], 'tropics': ['Green', 'Orange', 'Yellow'], 'tropical': ['Green', 'Orange', 'Yellow'],
    'саванна': ['Orange', 'Yellow', 'Green'], 'savanna': ['Orange', 'Yellow', 'Green'],
    'тундра': ['Grey', 'White', 'Green'], 'tundra': ['Grey', 'White', 'Green'],
    'болота': ['Green', 'Black', 'Grey'], 'marshes': ['Green', 'Black', 'Grey'],
    'побережье': ['Blue', 'White', 'Yellow'], 'coast': ['Blue', 'White', 'Yellow'],
    'пляж': ['Yellow', 'Blue', 'White'], 'beach': ['Yellow', 'Blue', 'White'],
    'риф': ['Blue', 'Green', 'Orange'], 'reef': ['Blue', 'Green', 'Orange'],
    'пещера': ['Black', 'Grey'], 'cave': ['Black', 'Grey'],
    'скала': ['Grey', 'Orange'], 'cliff': ['Grey', 'Orange'], 'rock': ['Grey', 'Orange'],
    'поле': ['Green', 'Yellow'], 'field': ['Green', 'Yellow'],
    'луг': ['Green', 'Yellow'], 'meadow': ['Green', 'Yellow'],
    'озеро': ['Blue', 'Green'], 'lake': ['Blue', 'Green'],
    'болото': ['Green', 'Grey', 'Black'], 'marsh': ['Green', 'Grey', 'Black'],
    'равнина': ['Green', 'Yellow', 'Orange'], 'plain': ['Green', 'Yellow', 'Orange'],
    'канyon': ['Orange', 'Red', 'Yellow'], 'canyon': ['Orange', 'Red', 'Yellow'],
    'долина': ['Green', 'Yellow', 'Blue'], 'valley': ['Green', 'Yellow', 'Blue'],
    'фьорд': ['Blue', 'Grey', 'Green'], 'fjord': ['Blue', 'Grey', 'Green'],
    'бухта': ['Blue', 'Green'], 'bay': ['Blue', 'Green'],
    'айсберг': ['White', 'Blue'], 'iceberg': ['White', 'Blue'],
    'оазис': ['Green', 'Yellow', 'Blue'], 'oasis': ['Green', 'Yellow', 'Blue'],
    'дюна': ['Yellow', 'Orange'], 'dune': ['Yellow', 'Orange'],

    // --- CULTURAL / AESTHETIC ---
    'япония': ['Red', 'White', 'Violet'], 'japan': ['Red', 'White', 'Violet'], 'japanese': ['Red', 'White', 'Violet'],
    'индия': ['Orange', 'Yellow', 'Red'], 'india': ['Orange', 'Yellow', 'Red'], 'indian': ['Orange', 'Yellow', 'Red'],
    'африка': ['Orange', 'Red', 'Yellow', 'Black'], 'africa': ['Orange', 'Red', 'Yellow', 'Black'],
    'скандинавия': ['White', 'Grey', 'Blue'], 'scandinavia': ['White', 'Grey', 'Blue'],
    'средиземноморье': ['Blue', 'White', 'Yellow'], 'mediterranean': ['Blue', 'White', 'Yellow'],
    'восток': ['Orange', 'Red', 'Violet', 'Yellow'], 'orient': ['Orange', 'Red', 'Violet', 'Yellow'],
    'импрессионизм': ['Yellow', 'Orange', 'Violet', 'Blue'], 'impressionism': ['Yellow', 'Orange', 'Violet', 'Blue'],
    'барокко': ['Violet', 'Black', 'Orange'], 'baroque': ['Violet', 'Black', 'Orange'],
    'ретро': ['Orange', 'Yellow', 'Green'], 'retro': ['Orange', 'Yellow', 'Green'],
    'винтаж': ['Orange', 'Yellow', 'Grey'], 'vintage': ['Orange', 'Yellow', 'Grey'],
    'гранж': ['Grey', 'Black', 'Green'], 'grunge': ['Grey', 'Black', 'Green'],
    'аниме': ['Violet', 'Blue', 'Red', 'White'], 'anime': ['Violet', 'Blue', 'Red', 'White'],
    'арт-деко': ['Black', 'Yellow', 'Orange'], 'art deco': ['Black', 'Yellow', 'Orange'],
    'готика': ['Black', 'Violet', 'Red'], 'gothic': ['Black', 'Violet', 'Red'],
    'хиппи': ['Orange', 'Yellow', 'Green', 'Violet'], 'hippie': ['Orange', 'Yellow', 'Green', 'Violet'],
    'бохо': ['Orange', 'Yellow', 'Green'], 'boho': ['Orange', 'Yellow', 'Green'],
    'романтизм': ['Red', 'Violet', 'White'], 'romanticism': ['Red', 'Violet', 'White'],
    'сюрреализм': ['Violet', 'Blue', 'Orange', 'Black'], 'surrealism': ['Violet', 'Blue', 'Orange', 'Black'],
    'поп-арт': ['Yellow', 'Red', 'Blue'], 'pop art': ['Yellow', 'Red', 'Blue'],
    'стимпанк': ['Orange', 'Black', 'Grey'], 'steampunk': ['Orange', 'Black', 'Grey'],

    // --- MOODS / STATES ---
    'эйфория': ['Yellow', 'Orange', 'Violet'], 'euphoria': ['Yellow', 'Orange', 'Violet'],
    'вдохновение': ['Yellow', 'Violet', 'Orange'], 'inspiration': ['Yellow', 'Violet', 'Orange'],
    'концентрация': ['Blue', 'Grey'], 'focus': ['Blue', 'Grey'], 'concentration': ['Blue', 'Grey'],
    'экстаз': ['Red', 'Violet', 'Orange'], 'ecstasy': ['Red', 'Violet', 'Orange'],
    'ностальгия': ['Orange', 'Yellow', 'Violet'], 'sentimental': ['Orange', 'Yellow', 'Violet'],
    'вина': ['Grey', 'Violet'], 'guilt': ['Grey', 'Violet'],
    'обида': ['Violet', 'Red', 'Grey'], 'resentment': ['Violet', 'Red', 'Grey'],
    'восхищение': ['Yellow', 'Orange', 'Violet'], 'admiration': ['Yellow', 'Orange', 'Violet'],
    'отвага': ['Red', 'Orange'], 'courage': ['Red', 'Orange'], 'brave': ['Red', 'Orange'],
    'честь': ['Black', 'White', 'Blue'], 'honor': ['Black', 'White', 'Blue'],
    'целеустремленность': ['Red', 'Orange'], 'ambition': ['Red', 'Orange'],
    'прощение': ['White', 'Blue', 'Green'], 'forgiveness': ['White', 'Blue', 'Green'],
    'благодарность': ['Yellow', 'Green', 'Orange'], 'gratitude': ['Yellow', 'Green', 'Orange'],
    'одержимость': ['Red', 'Violet', 'Black'], 'obsession': ['Red', 'Violet', 'Black'],
    'презрение': ['Grey', 'Black'], 'contempt': ['Grey', 'Black'],
    'непокорность': ['Red', 'Black'], 'defiance': ['Red', 'Black'],

    // --- MORE FLOWERS & PLANTS ---
    'ромашка': ['White', 'Yellow'], 'chamomile': ['White', 'Yellow'],
    'незабудка': ['Blue', 'White'], 'forget-me-not': ['Blue', 'White'],
    'георгин': ['Red', 'Violet', 'Orange'], 'dahlia': ['Red', 'Violet', 'Orange'],
    'флокс': ['Violet', 'White', 'Red'], 'phlox': ['Violet', 'White', 'Red'],
    'астра': ['Violet', 'Blue', 'White'], 'aster': ['Violet', 'Blue', 'White'],
    'шиповник': ['Red', 'Orange'], 'rosehip': ['Red', 'Orange'],
    'боярышник': ['Red', 'White'], 'hawthorn': ['Red', 'White'],
    'одуванчик': ['Yellow', 'White'], 'dandelion': ['Yellow', 'White'],
    'василек': ['Blue', 'Violet'], 'cornflower': ['Blue', 'Violet'],
    'люпин': ['Violet', 'Blue', 'Red'], 'lupin': ['Violet', 'Blue', 'Red'],
    'колокольчик': ['Blue', 'Violet'], 'bluebell': ['Blue', 'Violet'],
    'вереск': ['Violet'], 'heather': ['Violet'],
    'алоэ': ['Green'], 'aloe': ['Green'],
    'агава': ['Green', 'Grey'], 'agave': ['Green', 'Grey'],
    'суккулент': ['Green', 'Grey'], 'succulent': ['Green', 'Grey'],
    'папоротник': ['Green'], 'bracken': ['Green'],
    'рогоз': ['Green', 'Orange'], 'cattail': ['Green', 'Orange'],
    'камыш': ['Green', 'Yellow'], 'reed': ['Green', 'Yellow'],
    'ель': ['Green', 'Black'], 'spruce': ['Green', 'Black'],
    'дуб': ['Green', 'Orange'], 'oak': ['Green', 'Orange'],
    'береза': ['White', 'Black', 'Green'], 'birch': ['White', 'Black', 'Green'],
    'клен': ['Orange', 'Red', 'Yellow'], 'maple': ['Orange', 'Red', 'Yellow'],
    'сакура': ['Violet', 'White', 'Red'], 'wisteria': ['Violet', 'Blue'],
    'бугенвиллия': ['Red', 'Violet', 'Orange'],
    'протея': ['Red', 'Orange', 'White'], 'protea': ['Red', 'Orange', 'White'],
    'антуриум': ['Red', 'White'], 'anthurium': ['Red', 'White'],
    'стрелиция': ['Orange', 'Blue'], 'bird of paradise': ['Orange', 'Blue'],
    'пассифлора': ['Violet', 'Blue', 'White'], 'passionflower': ['Violet', 'Blue', 'White'],
    'алтей': ['Violet', 'White'], 'hollyhock': ['Violet', 'White'],
    'наперстянка': ['Violet', 'White'], 'foxglove': ['Violet', 'White'],

    // --- FABRICS & TEXTURES ---
    'шелк': ['White', 'Violet', 'Yellow'], 'silk': ['White', 'Violet', 'Yellow'],
    'лен': ['White', 'Yellow'], 'linen': ['White', 'Yellow'],
    'бархат': ['Violet', 'Black'], 'velour': ['Violet', 'Black'],
    'кожа': ['Black', 'Orange'], 'leather': ['Black', 'Orange'],
    'мех': ['White', 'Grey', 'Orange'], 'fur': ['White', 'Grey', 'Orange'],
    'замша': ['Orange', 'Grey'], 'suede': ['Orange', 'Grey'],
    'вельвет': ['Orange', 'Grey', 'Blue'], 'corduroy': ['Orange', 'Grey', 'Blue'],
    'твид': ['Grey', 'Orange'], 'tweed': ['Grey', 'Orange'],
    'атлас': ['White', 'Yellow', 'Violet'], 'satin': ['White', 'Yellow', 'Violet'],
    'кружево': ['White', 'Violet'], 'lace': ['White', 'Violet'],
    'деним': ['Blue', 'Grey'], 'denim': ['Blue', 'Grey'],
    'джинса': ['Blue', 'Grey'], 'jeans': ['Blue', 'Grey'],
    'хлопок': ['White'], 'cotton': ['White'],
    'тюль': ['White', 'Grey'], 'tulle': ['White', 'Grey'],
    'органза': ['White', 'Violet'], 'organza': ['White', 'Violet'],
    'твердый': ['Grey', 'Black'], 'rough': ['Grey', 'Black'],
    'гладкий': ['White', 'Grey'], 'smooth': ['White', 'Grey'],
    'зернистый': ['Orange', 'Grey'], 'grainy': ['Orange', 'Grey'],
    'матовый': ['Grey', 'White'], 'matte': ['Grey', 'White'],
    'глянец': ['White', 'Yellow'], 'glossy': ['White', 'Yellow'],
    'рельеф': ['Grey', 'Orange'], 'relief': ['Grey', 'Orange'],

    // --- MUSIC & SOUND ---
    'джаз': ['Black', 'Orange', 'Yellow'], 'jazz': ['Black', 'Orange', 'Yellow'],
    'блюз': ['Blue', 'Black', 'Violet'], 'blues': ['Blue', 'Black', 'Violet'],
    'классика': ['Black', 'White', 'Grey'], 'classical': ['Black', 'White', 'Grey'],
    'электронная': ['Blue', 'Violet', 'Green'], 'electronic': ['Blue', 'Violet', 'Green'],
    'поп': ['Yellow', 'Red', 'Violet'], 'pop': ['Yellow', 'Red', 'Violet'],
    'метал': ['Black', 'Red', 'Grey'], 'metal music': ['Black', 'Red', 'Grey'],
    'соул': ['Orange', 'Yellow', 'Violet'], 'soul': ['Orange', 'Yellow', 'Violet'],
    'регги': ['Green', 'Yellow', 'Red'], 'reggae': ['Green', 'Yellow', 'Red'],
    'опера': ['Violet', 'Black', 'Red'], 'opera': ['Violet', 'Black', 'Red'],
    'фолк': ['Green', 'Orange', 'Yellow'], 'folk': ['Green', 'Orange', 'Yellow'],
    'мелодия': ['Blue', 'Violet', 'Yellow'], 'melody': ['Blue', 'Violet', 'Yellow'],
    'ритм': ['Orange', 'Red', 'Yellow'], 'rhythm': ['Orange', 'Red', 'Yellow'],
    'нота': ['Blue', 'White'], 'note': ['Blue', 'White'],
    'аккорд': ['Blue', 'Violet'], 'chord': ['Blue', 'Violet'],
    'барабан': ['Red', 'Orange'], 'drum': ['Red', 'Orange'],
    'скрипка': ['Orange', 'Yellow'], 'violin': ['Orange', 'Yellow'],
    'рояль': ['Black', 'White'], 'piano': ['Black', 'White'],
    'труба': ['Yellow', 'Orange'], 'trumpet': ['Yellow', 'Orange'],
    'гитара': ['Orange', 'Yellow'], 'guitar': ['Orange', 'Yellow'],

    // --- ARCHITECTURE & SPACES ---
    'замок': ['Grey', 'Black'], 'castle': ['Grey', 'Black'],
    'собор': ['Grey', 'White', 'Violet'], 'cathedral': ['Grey', 'White', 'Violet'],
    'храм': ['White', 'Yellow', 'Violet'], 'temple': ['White', 'Yellow', 'Violet'],
    'дворец': ['Yellow', 'Violet', 'White'], 'palace': ['Yellow', 'Violet', 'White'],
    'руины': ['Grey', 'Orange'], 'ruins': ['Grey', 'Orange'],
    'маяк': ['White', 'Yellow', 'Blue'], 'lighthouse': ['White', 'Yellow', 'Blue'],
    'вилла': ['White', 'Yellow'], 'villa': ['White', 'Yellow'],
    'хижина': ['Orange', 'Green'], 'cabin': ['Orange', 'Green'], 'hut': ['Orange', 'Green'],
    'библиотека': ['Orange', 'Grey', 'Black'], 'library': ['Orange', 'Grey', 'Black'],
    'музей': ['Grey', 'White', 'Orange'], 'museum': ['Grey', 'White', 'Orange'],
    'galerie': ['White', 'Grey'], 'gallery': ['White', 'Grey'],
    'рынок': ['Orange', 'Yellow', 'Red'], 'market': ['Orange', 'Yellow', 'Red'],
    'улица': ['Grey', 'Orange'], 'street': ['Grey', 'Orange'],
    'мост': ['Grey', 'Blue'], 'bridge': ['Grey', 'Blue'],
    'тоннель': ['Black', 'Grey'], 'tunnel': ['Black', 'Grey'],
    'арка': ['Grey', 'Orange', 'Yellow'], 'arch': ['Grey', 'Orange', 'Yellow'],
    'колонна': ['White', 'Grey'], 'column': ['White', 'Grey'],
    'башня': ['Grey', 'Black'], 'tower': ['Grey', 'Black'],
    'подвал': ['Black', 'Grey'], 'basement': ['Black', 'Grey'], 'cellar': ['Black', 'Grey'],
    'чердак': ['Orange', 'Grey'], 'attic': ['Orange', 'Grey'],
    'сад': ['Green', 'Yellow'], 'garden': ['Green', 'Yellow'],
    'парк': ['Green', 'Yellow', 'Blue'], 'park': ['Green', 'Yellow', 'Blue'],
    'лабиринт': ['Black', 'Grey', 'Violet'], 'labyrinth': ['Black', 'Grey', 'Violet'],
    'руина': ['Grey', 'Black', 'Orange'], 'ruin': ['Grey', 'Black', 'Orange'],

    // --- ASTRONOMY & SPACE ---
    'луна': ['White', 'Grey', 'Blue'], 'moon': ['White', 'Grey', 'Blue'],
    'планета': ['Blue', 'Orange', 'Violet'], 'planet': ['Blue', 'Orange', 'Violet'],
    'марс': ['Red', 'Orange'], 'mars': ['Red', 'Orange'],
    'сатурн': ['Orange', 'Yellow', 'Grey'], 'saturn': ['Orange', 'Yellow', 'Grey'],
    'солнечная система': ['Orange', 'Yellow', 'Blue'], 'solar system': ['Orange', 'Yellow', 'Blue'],
    'туманность': ['Violet', 'Blue', 'Orange'], 'nebula': ['Violet', 'Blue', 'Orange'],
    'черная дыра': ['Black', 'Violet'], 'black hole': ['Black', 'Violet'],
    'метеор': ['Orange', 'Yellow', 'White'], 'meteor': ['Orange', 'Yellow', 'White'],
    'комета': ['White', 'Blue', 'Yellow'], 'comet': ['White', 'Blue', 'Yellow'],
    'астероид': ['Grey', 'Orange'], 'asteroid': ['Grey', 'Orange'],
    'квазар': ['Violet', 'Blue', 'White'], 'quasar': ['Violet', 'Blue', 'White'],
    'пульсар': ['Blue', 'White', 'Violet'], 'pulsar': ['Blue', 'White', 'Violet'],
    'сверхнова': ['White', 'Yellow', 'Orange'], 'supernova': ['White', 'Yellow', 'Orange'],
    'созвездие': ['Blue', 'Violet', 'White'], 'constellation': ['Blue', 'Violet', 'White'],
    'горизонт': ['Blue', 'Orange', 'Yellow'], 'horizon': ['Blue', 'Orange', 'Yellow'],

    // --- ELEMENTS & CHEMISTRY ---
    'кислород': ['Blue', 'White'], 'oxygen': ['Blue', 'White'],
    'водород': ['Blue', 'White', 'Grey'], 'hydrogen': ['Blue', 'White', 'Grey'],
    'углерод': ['Black', 'Grey'], 'carbon': ['Black', 'Grey'],
    'азот': ['Blue', 'White'], 'nitrogen': ['Blue', 'White'],
    'дым': ['Grey', 'Black'], 'smoke': ['Grey', 'Black'],
    'пар': ['White', 'Grey'], 'steam': ['White', 'Grey'],
    'магма': ['Red', 'Orange', 'Black'], 'magma': ['Red', 'Orange', 'Black'],
    'плазма': ['Violet', 'Blue', 'White'], 'plasma': ['Violet', 'Blue', 'White'],
    'флюоресценция': ['Green', 'Yellow', 'Violet'], 'fluorescence': ['Green', 'Yellow', 'Violet'],
    'фосфоресценция': ['Blue', 'Green', 'White'], 'phosphorescence': ['Blue', 'Green', 'White'],
    'ферментация': ['Orange', 'Yellow'], 'fermentation': ['Orange', 'Yellow'],
    'ржавчина': ['Orange', 'Red'], 'rust': ['Orange', 'Red'],
    'патина': ['Green', 'Blue', 'Grey'], 'patina': ['Green', 'Blue', 'Grey'],
    'окисление': ['Orange', 'Grey', 'Green'], 'oxidation': ['Orange', 'Grey', 'Green'],

    // --- MYTHOLOGY & LEGEND ---
    'дракон': ['Red', 'Orange', 'Green'], 'dragon': ['Red', 'Orange', 'Green'],
    'феникс': ['Red', 'Orange', 'Yellow'], 'phoenix': ['Red', 'Orange', 'Yellow'],
    'единорог': ['White', 'Violet', 'Blue'], 'unicorn': ['White', 'Violet', 'Blue'],
    'русалка': ['Blue', 'Green', 'Violet'], 'mermaid': ['Blue', 'Green', 'Violet'],
    'кентавр': ['Orange', 'Grey'], 'centaur': ['Orange', 'Grey'],
    'ангел': ['White', 'Yellow', 'Blue'], 'angel': ['White', 'Yellow', 'Blue'],
    'демон': ['Red', 'Black', 'Violet'], 'demon': ['Red', 'Black', 'Violet'],
    'вампир': ['Red', 'Black', 'Violet'], 'vampire': ['Red', 'Black', 'Violet'],
    'оборотень': ['Grey', 'Black'], 'werewolf': ['Grey', 'Black'],
    'гидра': ['Green', 'Blue', 'Black'], 'hydra': ['Green', 'Blue', 'Black'],
    'горгона': ['Green', 'Grey', 'Black'], 'gorgon': ['Green', 'Grey', 'Black'],
    'минотавр': ['Black', 'Red', 'Grey'], 'minotaur': ['Black', 'Red', 'Grey'],
    'медуза горгона': ['Green', 'Grey'], 'olympus': ['White', 'Blue', 'Yellow'],
    'олимп': ['White', 'Blue', 'Yellow'],
    'хаос': ['Black', 'Violet', 'Grey'], 'chaos': ['Black', 'Violet', 'Grey'],
    'рай': ['White', 'Yellow', 'Blue'], 'heaven': ['White', 'Yellow', 'Blue'],
    'ад': ['Red', 'Black', 'Orange'], 'hell': ['Red', 'Black', 'Orange'],
    'нирвана': ['Blue', 'Violet', 'White'],
    'судьба': ['Black', 'Violet', 'Grey'], 'fate': ['Black', 'Violet', 'Grey'],
    'рок': ['Black', 'Violet'], 'doom': ['Black', 'Violet'],
    'удача': ['Yellow', 'Green', 'Orange'], 'luck': ['Yellow', 'Green', 'Orange'],
    'проклятие': ['Black', 'Violet', 'Red'], 'curse': ['Black', 'Violet', 'Red'],

    // --- SPORT & MOVEMENT ---
    'бег': ['Red', 'Orange', 'Yellow'], 'running': ['Red', 'Orange', 'Yellow'], 'sprint': ['Red', 'Orange'],
    'прыжок': ['Orange', 'Yellow'], 'jump': ['Orange', 'Yellow'],
    'борьба': ['Red', 'Black'], 'wrestling': ['Red', 'Black'], 'fight': ['Red', 'Black'],
    'танец': ['Red', 'Violet', 'Orange'], 'dance': ['Red', 'Violet', 'Orange'],
    'балет': ['White', 'Violet'], 'ballet': ['White', 'Violet'],
    'йога': ['Blue', 'Green', 'White'], 'yoga': ['Blue', 'Green', 'White'],
    'велоспорт': ['Orange', 'Yellow', 'Blue'], 'cycling': ['Orange', 'Yellow', 'Blue'],
    'футбол': ['Green', 'White'], 'football': ['Green', 'White'], 'soccer': ['Green', 'White'],
    'баскетбол': ['Orange', 'Black'], 'basketball': ['Orange', 'Black'],
    'теннис': ['Yellow', 'White'], 'tennis': ['Yellow', 'White'],
    'плавание': ['Blue', 'White', 'Green'], 'surf': ['Blue', 'White'],
    'лыжи': ['White', 'Blue'], 'skiing': ['White', 'Blue'],
    'восхождение': ['Grey', 'Orange'], 'climbing': ['Grey', 'Orange'],
    'военный': ['Green', 'Black'], 'military': ['Green', 'Black'],
    'охота': ['Orange', 'Green'], 'hunt': ['Orange', 'Green'], 'hunting': ['Orange', 'Green'],

    // --- FASHION & STYLE ---
    'парфюм': ['Violet', 'Yellow', 'Orange'], 'perfume': ['Violet', 'Yellow', 'Orange'],
    'украшения': ['Yellow', 'White'], 'jewelry': ['Yellow', 'White'],
    'бриллиант': ['White', 'Blue'], 'brilliant': ['White', 'Blue'],
    'корона': ['Yellow', 'Orange'], 'crown': ['Yellow', 'Orange'],
    'фрак': ['Black', 'White'], 'tuxedo': ['Black', 'White'],
    'пальто': ['Grey', 'Black', 'Orange'], 'coat': ['Grey', 'Black', 'Orange'],
    'вуаль': ['White', 'Grey'], 'veil': ['White', 'Grey'],
    'тиара': ['White', 'Yellow', 'Violet'], 'tiara': ['White', 'Yellow', 'Violet'],
    'плащ': ['Black', 'Violet'], 'cloak': ['Black', 'Violet'],
    'халат': ['White', 'Blue'], 'robe': ['White', 'Blue'],
    'карнавальный': ['Orange', 'Yellow', 'Violet'], 'masquerade': ['Black', 'Violet', 'Orange'],
    'маскарад': ['Black', 'Violet', 'Orange'],
    'маска': ['Black', 'Violet'], 'mask': ['Black', 'Violet'],
    'перья': ['White', 'Red', 'Yellow'], 'feathers': ['White', 'Red', 'Yellow'],
    'стразы': ['White', 'Violet', 'Yellow'], 'rhinestones': ['White', 'Violet', 'Yellow'],
    'глиттер': ['Yellow', 'Violet', 'White'], 'sequins': ['Yellow', 'Violet', 'White'],

    // --- INTERIOR & HOME ---
    'свеча': ['Yellow', 'Orange'], 'candle': ['Yellow', 'Orange'],
    'камин': ['Red', 'Orange', 'Yellow'], 'fireplace': ['Red', 'Orange', 'Yellow'],
    'подушка': ['White', 'Violet', 'Orange'], 'pillow': ['White', 'Violet', 'Orange'],
    'одеяло': ['Orange', 'Yellow', 'White'], 'blanket': ['Orange', 'Yellow', 'White'],
    'ковер': ['Orange', 'Red'], 'carpet': ['Orange', 'Red'], 'rug': ['Orange', 'Red'],
    'витраж': ['Blue', 'Violet', 'Yellow', 'Red'], 'stained glass': ['Blue', 'Violet', 'Yellow', 'Red'],
    'обои': ['White', 'Grey', 'Yellow'], 'wallpaper': ['White', 'Grey', 'Yellow'],
    'плитка': ['White', 'Grey', 'Blue'], 'tile': ['White', 'Grey', 'Blue'],
    'паркет': ['Orange', 'Yellow'], 'parquet': ['Orange', 'Yellow'],
    'терраса': ['Orange', 'Yellow', 'Green'], 'terrace': ['Orange', 'Yellow', 'Green'],
    'веранда': ['White', 'Yellow', 'Green'], 'porch': ['White', 'Yellow', 'Green'],
    'люстра': ['Yellow', 'White'], 'chandelier': ['Yellow', 'White'],
    'абажур': ['Orange', 'Yellow'], 'lampshade': ['Orange', 'Yellow'],

    // --- SCIENCE & TECHNOLOGY ---
    'искусственный интеллект': ['Blue', 'Grey', 'Violet'], 'artificial intelligence': ['Blue', 'Grey', 'Violet'],
    'робот': ['Grey', 'Blue'], 'robot': ['Grey', 'Blue'],
    'голограмма': ['Blue', 'Green', 'Violet'], 'hologram': ['Blue', 'Green', 'Violet'],
    'программирование': ['Blue', 'Grey'], 'programming': ['Blue', 'Grey'], 'coding': ['Blue', 'Grey'],
    'матрица': ['Green', 'Black'], 'matrix': ['Green', 'Black'],
    'сеть': ['Blue', 'Grey'], 'network': ['Blue', 'Grey'],
    'данные': ['Blue', 'Grey', 'White'], 'data': ['Blue', 'Grey', 'White'],
    'алгоритм': ['Blue', 'Grey'], 'algorithm': ['Blue', 'Grey'],
    'квантовый': ['Blue', 'Violet', 'White'], 'quantum': ['Blue', 'Violet', 'White'],
    'нейрон': ['Blue', 'Yellow'], 'neuron': ['Blue', 'Yellow'],
    'ракета': ['Grey', 'White', 'Orange'], 'rocket': ['Grey', 'White', 'Orange'],
    'спутник': ['Grey', 'Blue'], 'satellite': ['Grey', 'Blue'],
    'микроскоп': ['White', 'Grey', 'Blue'], 'microscope': ['White', 'Grey', 'Blue'],
    'атом': ['Blue', 'White', 'Grey'], 'atom': ['Blue', 'White', 'Grey'],

    // --- SEASONS & TIME (expanded) ---
    'полночь': ['Black', 'Blue', 'Violet'],
    'предрассветный': ['Violet', 'Orange', 'Blue'], 'pre-dawn': ['Violet', 'Orange', 'Blue'],
    'полдень': ['Yellow', 'White', 'Orange'],
    'час волка': ['Black', 'Blue', 'Violet'], 'witching hour': ['Black', 'Blue', 'Violet'],
    'золотой час': ['Yellow', 'Orange'], 'golden hour': ['Yellow', 'Orange'],
    'зимнее солнцестояние': ['Black', 'Blue', 'White'], 'winter solstice': ['Black', 'Blue', 'White'],
    'летнее солнцестояние': ['Yellow', 'Green', 'White'], 'summer solstice': ['Yellow', 'Green', 'White'],
    'равноденствие': ['Green', 'Yellow'], 'equinox': ['Green', 'Yellow'],
    'новолуние': ['Black', 'Violet'], 'new moon': ['Black', 'Violet'],
    'полнолуние': ['White', 'Blue', 'Yellow'], 'full moon': ['White', 'Blue', 'Yellow'],
    'зима': ['White', 'Blue', 'Grey'],
    'весна': ['Green', 'Yellow', 'Violet'],
    'лето': ['Yellow', 'Orange', 'Green'],
    'осень': ['Orange', 'Red', 'Yellow'],
    'декабрь': ['White', 'Blue'], 'december': ['White', 'Blue'],
    'март': ['Green', 'Yellow'], 'march': ['Green', 'Yellow'],
    'июнь': ['Yellow', 'Green'], 'june': ['Yellow', 'Green'],
    'октябрь': ['Orange', 'Red'], 'october': ['Orange', 'Red'],

    // --- WATER FORMS ---
    'лужа': ['Grey', 'Blue'], 'puddle': ['Grey', 'Blue'],
    'ручей': ['Blue', 'Green'], 'stream': ['Blue', 'Green'], 'brook': ['Blue', 'Green'],
    'водоем': ['Blue', 'Green'], 'pond2': ['Blue', 'Green'],
    'пруд': ['Blue', 'Green', 'Grey'], 'lagoon': ['Blue', 'Green'],
    'лагуна': ['Blue', 'Green', 'White'],
    'фонтан': ['Blue', 'White'], 'fountain': ['Blue', 'White'],
    'дельта': ['Blue', 'Green'], 'delta': ['Blue', 'Green'],
    'порог': ['Blue', 'White', 'Grey'], 'rapids': ['Blue', 'White', 'Grey'],
    'купель': ['Blue', 'White'], 'pool': ['Blue', 'White'],
    'гейзер': ['White', 'Blue'], 'geyser': ['White', 'Blue'],
    'цунами': ['Blue', 'Grey', 'White'], 'tsunami': ['Blue', 'Grey', 'White'],
    'ледник': ['White', 'Blue', 'Grey'], 'glacier': ['White', 'Blue', 'Grey'],
    'горный ручей': ['Blue', 'White'], 'torrent': ['Blue', 'White', 'Grey'],
    'прибой': ['Blue', 'White'], 'breaker': ['Blue', 'White'],

    // --- ABSTRACT & PHILOSOPHY ---
    'бесконечность': ['Blue', 'Violet', 'Black'], 'infinity': ['Blue', 'Violet', 'Black'],
    'абстракция': ['Violet', 'Blue', 'Grey'], 'abstraction': ['Violet', 'Blue', 'Grey'],
    'реальность': ['Grey', 'White', 'Blue'], 'reality': ['Grey', 'White', 'Blue'],
    'иллюзия': ['Violet', 'Blue', 'White'], 'illusion': ['Violet', 'Blue', 'White'],
    'параллельный мир': ['Violet', 'Blue', 'Black'], 'parallel world': ['Violet', 'Blue', 'Black'],
    'время': ['Blue', 'Grey', 'Black'], 'time': ['Blue', 'Grey', 'Black'],
    'вечность': ['Blue', 'Violet', 'Black'], 'eternity': ['Blue', 'Violet', 'Black'],
    'момент': ['Yellow', 'Orange', 'White'], 'moment': ['Yellow', 'Orange', 'White'],
    'прошлое': ['Grey', 'Orange', 'Yellow'], 'past': ['Grey', 'Orange', 'Yellow'],
    'настоящее': ['White', 'Yellow', 'Green'], 'present': ['White', 'Yellow', 'Green'],
    'пространство': ['Blue', 'Grey', 'Violet'], 'space2': ['Blue', 'Grey', 'Violet'],
    'трансформация': ['Violet', 'Orange', 'Blue'], 'transformation': ['Violet', 'Orange', 'Blue'],
    'эволюция': ['Green', 'Blue', 'Yellow'], 'evolution': ['Green', 'Blue', 'Yellow'],
    'революция': ['Red', 'Black', 'Orange'], 'revolution': ['Red', 'Black', 'Orange'],
    'прогресс': ['Blue', 'Green', 'Grey'], 'progress': ['Blue', 'Green', 'Grey'],
    'цикл': ['Blue', 'Green', 'Orange'], 'cycle': ['Blue', 'Green', 'Orange'],
    'спираль': ['Violet', 'Blue', 'Orange'], 'spiral': ['Violet', 'Blue', 'Orange'],
    'симметрия': ['White', 'Grey', 'Blue'], 'symmetry': ['White', 'Grey', 'Blue'],

    // --- LIGHT EFFECTS ---
    'радуга': ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet'],
    'призма': ['White', 'Violet', 'Blue', 'Yellow'], 'prism': ['White', 'Violet', 'Blue', 'Yellow'],
    'преломление': ['Blue', 'Violet', 'Yellow'], 'refraction': ['Blue', 'Violet', 'Yellow'],
    'отражение': ['Blue', 'White', 'Grey'], 'reflection': ['Blue', 'White', 'Grey'],
    'полутень': ['Grey', 'Blue'], 'penumbra': ['Grey', 'Blue'],
    'ореол': ['White', 'Yellow', 'Orange'], 'halo': ['White', 'Yellow', 'Orange'],
    'нимб': ['Yellow', 'White'], 'nimbus': ['Yellow', 'White'],
    'бликование': ['White', 'Yellow'], 'glare': ['White', 'Yellow'],
    'полутон': ['Grey', 'White'], 'halftone': ['Grey', 'White'],
    'тонкий свет': ['White', 'Yellow'], 'subtle light': ['White', 'Yellow'],
    'мрак': ['Black', 'Violet'], 'gloom': ['Black', 'Violet'],
    'полумрак': ['Black', 'Grey', 'Violet'], 'dimness': ['Black', 'Grey', 'Violet'],
    'пятно света': ['Yellow', 'White'], 'spotlight': ['Yellow', 'White'],
    'световая волна': ['Yellow', 'White', 'Orange'], 'light wave': ['Yellow', 'White', 'Orange'],
    'сумеречный': ['Violet', 'Grey', 'Blue'], 'crepuscular': ['Violet', 'Grey', 'Blue'],

    // --- MATERIALS & SUBSTANCES ---
    'смола': ['Orange', 'Yellow'], 'resin': ['Orange', 'Yellow'],
    'воск': ['Yellow', 'White'], 'wax': ['Yellow', 'White'],
    'пластик': ['White', 'Grey', 'Blue'], 'plastic': ['White', 'Grey', 'Blue'],
    'резина': ['Black', 'Grey'], 'rubber': ['Black', 'Grey'],
    'акрил': ['White', 'Blue', 'Grey'], 'acrylic': ['White', 'Blue', 'Grey'],
    'эмаль': ['White', 'Blue'], 'enamel': ['White', 'Blue'],
    'глазурь': ['White', 'Blue', 'Violet'], 'glaze': ['White', 'Blue', 'Violet'],
    'краска': ['Red', 'Yellow', 'Blue'], 'paint': ['Red', 'Yellow', 'Blue'],
    'чернила': ['Black', 'Blue'], 'inks': ['Black', 'Blue'],
    'мел': ['White', 'Yellow'], 'chalk': ['White', 'Yellow'],
    'уголь': ['Black', 'Grey'], 'charcoal': ['Black', 'Grey'],
    'гуашь': ['White', 'Yellow', 'Red'], 'gouache': ['White', 'Yellow', 'Red'],
    'акварель': ['Blue', 'Violet', 'Yellow'], 'watercolor': ['Blue', 'Violet', 'Yellow'],
    'масло': ['Orange', 'Yellow'], 'oil paint': ['Orange', 'Yellow'],
    'граффити': ['Orange', 'Green', 'Violet', 'Red'], 'graffiti': ['Orange', 'Green', 'Violet', 'Red'],
    'мозаика': ['Blue', 'Violet', 'Yellow', 'Red'], 'mosaic': ['Blue', 'Violet', 'Yellow', 'Red'],
    'эпоксид': ['White', 'Blue', 'Green'], 'epoxy': ['White', 'Blue', 'Green'],
    'бетонный': ['Grey', 'White'], 'cement': ['Grey', 'White'],
    'асфальт': ['Black', 'Grey'], 'asphalt': ['Black', 'Grey'],
    'деготь': ['Black'], 'tar': ['Black'],

    // --- SOCIAL & EMOTIONAL CONTEXTS ---
    'вечеринка': ['Orange', 'Yellow', 'Violet'], 'party': ['Orange', 'Yellow', 'Violet'],
    'свадьба': ['White', 'Violet', 'Yellow'], 'wedding': ['White', 'Violet', 'Yellow'],
    'похороны': ['Black', 'Grey', 'Violet'], 'funeral': ['Black', 'Grey', 'Violet'],
    'рождение': ['White', 'Yellow', 'Green'], 'birth': ['White', 'Yellow', 'Green'],
    'выпускной': ['Black', 'White', 'Yellow'], 'graduation': ['Black', 'White', 'Yellow'],
    'день рождения': ['Orange', 'Yellow', 'Red'], 'birthday': ['Orange', 'Yellow', 'Red'],
    'новый год': ['White', 'Blue', 'Yellow'], 'new year': ['White', 'Blue', 'Yellow'],
    'пасха': ['Yellow', 'Green', 'Violet'], 'easter': ['Yellow', 'Green', 'Violet'],
    'рождество': ['Red', 'Green', 'White'], 'christmas': ['Red', 'Green', 'White'],
    'хэллоуин': ['Orange', 'Black', 'Violet'], 'halloween': ['Orange', 'Black', 'Violet'],
    'апокалипсис': ['Red', 'Black', 'Orange'], 'apocalypse': ['Red', 'Black', 'Orange'],
    'победа': ['Yellow', 'Orange', 'Red'], 'victory': ['Yellow', 'Orange', 'Red'],
    'поражение': ['Grey', 'Black'], 'defeat': ['Grey', 'Black'],
    'путешествие': ['Blue', 'Orange', 'Yellow'], 'journey': ['Blue', 'Orange', 'Yellow'], 'travel': ['Blue', 'Orange', 'Yellow'],
    'приключение': ['Orange', 'Red', 'Blue'], 'adventure': ['Orange', 'Red', 'Blue'],
    'исследование': ['Blue', 'Green', 'Orange'], 'exploration': ['Blue', 'Green', 'Orange'],
    'открытие': ['Yellow', 'Orange', 'Blue'], 'discovery': ['Yellow', 'Orange', 'Blue'],
    'первый шаг': ['Green', 'Yellow'], 'first step': ['Green', 'Yellow'],
    'прощание': ['Grey', 'Blue', 'Violet'], 'farewell': ['Grey', 'Blue', 'Violet'],
    'встреча': ['Yellow', 'Orange'], 'reunion': ['Yellow', 'Orange'],
    'влюбленность': ['Red', 'Violet', 'Yellow'], 'infatuation': ['Red', 'Violet', 'Yellow'],

    // --- SPORTS & NATURE COLORS ---
    'хаки': ['Green', 'Yellow'], 'khaki': ['Green', 'Yellow'],
    'оливковый': ['Green', 'Yellow'], 'olive': ['Green', 'Yellow'],
    'бордовый': ['Red', 'Violet'], 'burgundy': ['Red', 'Violet'], 'maroon': ['Red', 'Violet'],
    'индиго': ['Blue', 'Violet'], 'indigo': ['Blue', 'Violet'],
    'коралловый': ['Red', 'Orange'], 'coral color': ['Red', 'Orange'],
    'мятный': ['Green', 'White'], 'mint color': ['Green', 'White'],
    'лазурный': ['Blue'], 'azure': ['Blue'],
    'аквамарин': ['Blue', 'Green'], 'aquamarine': ['Blue', 'Green'],
    'пурпурный': ['Violet', 'Red'], 'purple': ['Violet', 'Red'], 'magenta': ['Violet', 'Red'],
    'малиновый': ['Red', 'Violet'], 'crimson': ['Red', 'Violet'],
    'слоновая кость': ['White', 'Yellow'], 'ivory': ['White', 'Yellow'],
    'кремовый': ['White', 'Yellow'], 'cream': ['White', 'Yellow'],
    'бежевый': ['White', 'Yellow', 'Orange'], 'beige': ['White', 'Yellow', 'Orange'],
    'терракота': ['Orange', 'Red'], 'terracotta': ['Orange', 'Red'],
    'охра': ['Yellow', 'Orange'], 'ochre': ['Yellow', 'Orange'],
    'сиена': ['Orange', 'Yellow'], 'sienna': ['Orange', 'Yellow'],
    'умбра': ['Orange', 'Black'], 'umber': ['Orange', 'Black'],
    'персиковый': ['Orange', 'Yellow', 'White'], 'peach color': ['Orange', 'Yellow', 'White'],
    'лиловый': ['Violet', 'Blue'], 'lilac color': ['Violet', 'Blue'],
    'фиолетовый': ['Violet'], 'фуксия': ['Violet', 'Red'], 'fuchsia': ['Violet', 'Red'],
    'бирюзовый': ['Blue', 'Green'], 'teal': ['Blue', 'Green'],
    'изумрудный': ['Green'], 'emerald color': ['Green'],
    'сапфировый': ['Blue'], 'sapphire color': ['Blue'],
    'рубиновый': ['Red', 'Violet'], 'ruby color': ['Red', 'Violet'],
    'янтарный': ['Orange', 'Yellow'], 'amber color': ['Orange', 'Yellow'],
    'графит': ['Grey', 'Black'], 'graphite': ['Grey', 'Black'],
    'антрацит': ['Black', 'Grey'], 'anthracite': ['Black', 'Grey'],
    'молочный': ['White', 'Yellow'], 'milky': ['White', 'Yellow'],
    'жемчужный': ['White', 'Grey'], 'pearly': ['White', 'Grey'],
    'серебристый': ['Grey', 'White'], 'silvery': ['Grey', 'White'],
    'золотистый': ['Yellow', 'Orange'], 'golden': ['Yellow', 'Orange'],
    'медный': ['Orange', 'Red'], 'coppery': ['Orange', 'Red'],
    'стальной': ['Grey', 'Blue'], 'steely': ['Grey', 'Blue'],
    'свинцовый': ['Grey'], 'leaden': ['Grey'],
    'шоколадный': ['Orange', 'Black'], 'chocolatey': ['Orange', 'Black'],
    'карамельный': ['Orange', 'Yellow'], 'caramelized': ['Orange', 'Yellow'],
    'слива': ['Violet', 'Blue'], 'plum color': ['Violet', 'Blue'],
    'дымчатый': ['Grey', 'Violet'], 'smoky': ['Grey', 'Violet'],
    'пепельный': ['Grey', 'Black'], 'ashen': ['Grey', 'Black'],
    'сливочный': ['White', 'Yellow', 'Orange'], 'creamy': ['White', 'Yellow', 'Orange'],

    // ============================================================
    // === SHADE-LEVEL PRECISION EMOTION MAPPING ===
    // Every shade's emotional keyword + rich synonym cloud → exact base-color arrays.
    // Paired with enriched desc fields, this gives deterministic shade targeting.
    // Rule: array[0] = shade's own base; additional bases = shades sharing same concept.
    // ============================================================

    // --- RED SHADES ---
    'беззаботность': ['Red', 'Blue'],                    // Rose/Red + Sky Blue/Blue
    'carefreeness': ['Red', 'Blue'],
    'беззаботный': ['Red', 'Blue'],
    'мягкая витальность': ['Red', 'Orange'],             // Coral
    'soft vitality': ['Red', 'Orange'],
    'уязвимость': ['Red', 'Green', 'Violet'],            // Ash Rose/Red + Pale Green/Green + Thistle/Violet
    'vulnerability': ['Red', 'Green', 'Violet'],
    'ранимость': ['Red', 'Green', 'Violet'],
    'эмоциональная хрупкость': ['Red', 'Violet'],
    'теплая печаль': ['Red', 'Grey', 'Violet'],
    'warm sadness': ['Red', 'Grey'],
    'ностальгическая нежность': ['Red', 'Orange', 'Violet'],
    'экспансия': ['Red', 'Orange'],                      // Flame Red
    'expansion': ['Red', 'Orange'],
    'завоевание': ['Red', 'Orange'],
    'неукротимая воля': ['Red', 'Orange'],
    'indomitable will': ['Red', 'Orange'],
    'радостное возбуждение': ['Red', 'Orange'],          // Cinnabar
    'joyful arousal': ['Red', 'Orange'],
    'интимность': ['Red', 'Violet'],                     // Marsala
    'intimacy': ['Red', 'Violet'],
    'интимный': ['Red', 'Violet'],
    'intimate': ['Red', 'Violet'],
    'психологический комфорт': ['Red', 'Violet', 'Orange'],
    'psychological comfort': ['Red', 'Violet', 'Orange'],
    'уютное убежище': ['Red', 'Orange'],
    'заземленность': ['Red', 'Orange', 'Green'],         // Brick Red + Terracotta/Orange + Mossy/Green
    'groundedness': ['Red', 'Orange', 'Green'],
    'укорененность': ['Red', 'Orange', 'Green'],
    'прочная основа': ['Red', 'Orange'],
    'физический уют': ['Red', 'Orange'],                 // Terracotta/Red
    'physical comfort': ['Red', 'Orange'],
    'чувство безопасности': ['Red', 'Orange', 'Yellow'],
    'sense of safety': ['Red', 'Orange', 'Yellow'],
    'уютный очаг': ['Red', 'Orange', 'Yellow'],
    'hearth': ['Red', 'Orange', 'Yellow'],
    'импульс': ['Red', 'Orange'],                        // Scarlet
    'порыв': ['Red', 'Orange'],
    'решительность': ['Red', 'Orange'],
    'decisiveness': ['Red', 'Orange'],
    'болезненная чувственность': ['Red', 'Violet'],      // Alizarin Crimson
    'morbid sensuality': ['Red', 'Violet'],
    'внутренний конфликт': ['Red', 'Violet', 'Black'],
    'inner conflict': ['Red', 'Violet', 'Black'],
    'театральность': ['Red', 'Violet'],
    'theatricality': ['Red', 'Violet'],
    'бунтарство': ['Red', 'Violet'],                     // Magenta
    'rebellion': ['Red', 'Violet'],
    'бунт': ['Red', 'Violet'],
    'мятеж': ['Red', 'Violet'],
    'диссонанс': ['Red', 'Violet', 'Yellow'],
    'dissonance': ['Red', 'Violet', 'Yellow'],
    'артистическая смелость': ['Red', 'Violet'],
    'artistic courage': ['Red', 'Violet'],
    'юношеский задор': ['Red', 'Orange'],                // Crimson
    'youthful zest': ['Red', 'Orange'],
    'молодежный': ['Red', 'Orange', 'Yellow'],
    'жизнерадостный': ['Red', 'Orange', 'Yellow'],
    'земная страсть': ['Red', 'Orange'],                 // Cadmium Red
    'earthly passion': ['Red', 'Orange'],
    'физическое тепло': ['Red', 'Orange'],
    'physical heat': ['Red', 'Orange'],
    'витальный': ['Red', 'Orange', 'Green'],
    'vital': ['Red', 'Orange', 'Green'],
    'историческая преемственность': ['Red', 'Orange', 'Yellow'], // Venetian Red
    'historical continuity': ['Red', 'Orange', 'Yellow'],
    'почтение к прошлому': ['Red', 'Orange', 'Yellow'],
    'интроспекция': ['Red', 'Blue', 'Violet'],           // Wine
    'introspection': ['Red', 'Blue', 'Violet'],
    'рефлексия': ['Red', 'Blue', 'Violet'],
    'reflection2': ['Red', 'Blue', 'Violet'],
    'умственная концентрация': ['Red', 'Blue'],
    'торжественность': ['Red', 'Violet'],                // Carmine + Byzantian/Violet
    'solemnity': ['Red', 'Violet'],
    'церемония': ['Red', 'Violet'],
    'sacred ceremony': ['Red', 'Violet'],
    'высокая ответственность': ['Red', 'Violet', 'Black'],
    'стабильная власть': ['Red', 'Violet', 'Black'],     // Bordeaux
    'stable power': ['Red', 'Violet', 'Black'],
    'элита': ['Red', 'Violet', 'Black'],
    'элитарность': ['Red', 'Violet', 'Black'],
    'накопленный опыт': ['Red', 'Orange', 'Yellow'],
    'угроза': ['Red', 'Black'],                          // Dark Red
    'threat': ['Red', 'Black'],
    'скрытая опасность': ['Red', 'Black', 'Violet'],
    'hidden danger': ['Red', 'Black', 'Violet'],
    'экзистенциальный дискомфорт': ['Red', 'Black'],
    'скрытая страсть': ['Red', 'Violet', 'Black'],       // Garnet/Red + Licorice/Black
    'hidden passion': ['Red', 'Violet', 'Black'],
    'тайное напряжение': ['Red', 'Violet', 'Black'],
    'невысказанное чувство': ['Red', 'Violet', 'Blue'],
    'unspoken feeling': ['Red', 'Violet', 'Blue'],
    'деструкция': ['Red', 'Black'],                      // Blood Red
    'destruction': ['Red', 'Black'],
    'шок': ['Red', 'Black', 'Orange'],
    'ужасающий': ['Red', 'Black'],
    'предельное напряжение': ['Red', 'Black'],

    // --- ORANGE SHADES ---
    'открытость': ['Orange', 'Yellow', 'Blue'],          // Peach
    'openness': ['Orange', 'Yellow', 'Blue'],
    'гостеприимство': ['Orange', 'Yellow'],
    'hospitality': ['Orange', 'Yellow'],
    'искренняя открытость': ['Orange', 'Yellow'],
    'мягкое доверие': ['Orange', 'Yellow'],              // Apricot
    'soft trust': ['Orange', 'Yellow'],
    'детская нежность': ['Orange', 'Yellow', 'White'],
    'душевный покой': ['Orange', 'Yellow', 'White'],
    'inner peace': ['Orange', 'Yellow', 'White'],
    'безмятежность': ['Orange', 'Blue', 'White'],        // Pastel Orange/Orange + Cerulean/Blue
    'serenity2': ['Orange', 'Blue', 'White'],
    'тихая радость': ['Orange', 'Yellow'],
    'quiet joy': ['Orange', 'Yellow'],
    'экзотика': ['Orange', 'Yellow'],                    // Papaya
    'exotic': ['Orange', 'Yellow'],
    'экзотический': ['Orange', 'Yellow'],
    'тяга к путешествиям': ['Orange', 'Yellow', 'Blue'],
    'wanderlust': ['Orange', 'Yellow', 'Blue'],
    'открытие нового': ['Orange', 'Yellow', 'Blue'],
    'природная бодрость': ['Orange', 'Green'],           // Carrot
    'natural vigor': ['Orange', 'Green'],
    'витальная сила': ['Orange', 'Green', 'Red'],
    'здоровье': ['Orange', 'Green', 'Yellow'],
    'health': ['Orange', 'Green', 'Yellow'],
    'социальный импульс': ['Orange', 'Red'],             // Deep Orange
    'social impulse': ['Orange', 'Red'],
    'социальная активность': ['Orange', 'Red', 'Yellow'],
    'общительность': ['Orange', 'Yellow'],
    'эмпатия': ['Orange', 'Blue', 'Violet'],             // Salmon
    'empathy': ['Orange', 'Blue', 'Violet'],
    'сочувствие': ['Orange', 'Blue', 'Violet'],
    'мягкая чувственность': ['Orange', 'Violet', 'Red'],
    'soft sensuality': ['Orange', 'Violet', 'Red'],
    'психологический диалог': ['Orange', 'Blue'],
    'изобилие': ['Orange', 'Yellow'],                    // Pumpkin
    'abundance': ['Orange', 'Yellow'],
    'урожай': ['Orange', 'Yellow', 'Red'],
    'harvest': ['Orange', 'Yellow', 'Red'],
    'процветание': ['Orange', 'Yellow', 'Green'],
    'prosperity': ['Orange', 'Yellow', 'Green'],
    'полнота жизни': ['Orange', 'Yellow', 'Green'],
    'fullness of life': ['Orange', 'Yellow', 'Green'],
    'жизненная сила': ['Orange', 'Red', 'Green'],        // Bright Coral
    'vital force': ['Orange', 'Red', 'Green'],
    'экстремальная активность': ['Orange', 'Red'],
    'историческая память': ['Orange', 'Yellow', 'Red'],  // Ochre Orange
    'historical memory': ['Orange', 'Yellow', 'Red'],
    'глубокая традиция': ['Orange', 'Yellow', 'Red'],
    'ремесло': ['Orange', 'Yellow'],
    'craft': ['Orange', 'Yellow'],
    'artisanal': ['Orange', 'Yellow'],
    'ценность': ['Orange', 'Yellow', 'White'],           // Copper + Golden Ochre/Yellow
    'value2': ['Orange', 'Yellow', 'White'],
    'материальное благополучие': ['Orange', 'Yellow'],
    'артефакт': ['Orange', 'Yellow', 'Black'],
    'фокусировка': ['Orange', 'Red', 'Yellow'],          // Safety Orange
    'сосредоточенность': ['Orange', 'Blue'],
    'навигационный': ['Orange', 'Red'],
    'срочность': ['Orange', 'Red'],
    'urgency': ['Orange', 'Red'],
    'осенняя мудрость': ['Orange', 'Yellow'],            // Burnt Orange
    'autumn wisdom': ['Orange', 'Yellow'],
    'зрелость': ['Orange', 'Yellow', 'Violet'],
    'maturity': ['Orange', 'Yellow', 'Violet'],
    'интеллектуальная солидность': ['Orange', 'Yellow', 'Blue'],
    'скрытая энергия': ['Orange', 'Red', 'Black'],       // Dark Orange
    'hidden energy': ['Orange', 'Red', 'Black'],
    'внутренний потенциал': ['Orange', 'Red', 'Black'],
    'тяжесть времени': ['Orange', 'Black', 'Grey'],      // Rust
    'weight of time': ['Orange', 'Black', 'Grey'],
    'индустриальное': ['Orange', 'Black', 'Grey'],
    'industrial': ['Orange', 'Black', 'Grey'],
    'брутальность': ['Orange', 'Black', 'Grey'],
    'brutality': ['Orange', 'Black', 'Grey'],

    // --- YELLOW SHADES ---
    'спонтанность': ['Yellow', 'Orange', 'Red'],         // Light Yellow
    'spontaneity': ['Yellow', 'Orange', 'Red'],
    'свобода мысли': ['Yellow', 'White', 'Blue'],
    'лёгкость': ['Yellow', 'White', 'Blue'],
    'чистота разума': ['Yellow', 'White', 'Blue'],       // Linen
    'purity of mind': ['Yellow', 'White', 'Blue'],
    'умственная ясность': ['Yellow', 'White', 'Blue'],
    'аналитический': ['Yellow', 'White', 'Blue'],
    'analytical': ['Yellow', 'White', 'Blue'],
    'безумие': ['Yellow', 'Violet', 'Red'],              // Toxic Yellow
    'madness': ['Yellow', 'Violet', 'Red'],
    'умопомешательство': ['Yellow', 'Violet'],
    'когнитивная перегрузка': ['Yellow', 'Violet'],
    'кислотность': ['Yellow', 'Green'],                  // Lemon
    'acidity': ['Yellow', 'Green'],
    'раздражение': ['Yellow', 'Orange', 'Red'],
    'irritation': ['Yellow', 'Orange', 'Red'],
    'пробуждение': ['Yellow', 'Green', 'Violet'],        // also Awakening/Violet
    'awakening2': ['Yellow', 'Green', 'Violet'],
    'болезненная бодрость': ['Yellow', 'Green'],         // Chartreuse
    'morbid vigor': ['Yellow', 'Green'],
    'кислотный': ['Yellow', 'Green'],
    'неоновый': ['Yellow', 'Green', 'Violet'],
    'neon2': ['Yellow', 'Green', 'Violet'],
    'дружелюбие': ['Yellow', 'Orange', 'Green'],         // Corn
    'friendliness': ['Yellow', 'Orange', 'Green'],
    'дружелюбный': ['Yellow', 'Orange'],
    'семейный': ['Yellow', 'Orange'],
    'надежда': ['Yellow', 'Green', 'Blue'],              // Radiant Yellow
    'hope': ['Yellow', 'Green', 'Blue'],
    'весенний оптимизм': ['Yellow', 'Green'],
    'возрождение': ['Yellow', 'Green', 'Violet'],
    'зависть': ['Yellow', 'Green'],                      // Greenish Yellow
    'envy': ['Yellow', 'Green'],
    'зловещий': ['Yellow', 'Green', 'Black'],
    'токсичный': ['Yellow', 'Green', 'Black'],
    'toxic2': ['Yellow', 'Green', 'Black'],
    'простота': ['Yellow', 'White', 'Orange'],           // Banana
    'simplicity': ['Yellow', 'White', 'Orange'],
    'непосредственность': ['Yellow', 'Orange'],
    'комфорт': ['Yellow', 'Orange', 'White'],            // Honey
    'comfort2': ['Yellow', 'Orange', 'White'],
    'сладость': ['Yellow', 'Orange'],
    'sweetness': ['Yellow', 'Orange'],
    'домашняя привязанность': ['Yellow', 'Orange'],
    'жертвенность': ['Yellow', 'Violet'],                // Saffron
    'sacrifice': ['Yellow', 'Violet'],
    'самопожертвование': ['Yellow', 'Violet'],
    'духовная энергия': ['Yellow', 'Violet', 'White'],
    'spiritual energy': ['Yellow', 'Violet', 'White'],
    'отрешённость': ['Yellow', 'Violet', 'Blue'],
    'равнодушие': ['Yellow', 'Grey'],                    // Sand
    'indifference': ['Yellow', 'Grey'],
    'нейтральность': ['Yellow', 'Grey', 'White'],
    'ожидание': ['Yellow', 'Grey', 'Blue'],
    'надёжность': ['Yellow', 'Orange', 'Green'],         // Yellow Ochre
    'reliability': ['Yellow', 'Orange', 'Green'],
    'академичность': ['Yellow', 'Orange', 'Blue'],
    'academic': ['Yellow', 'Orange', 'Blue'],
    'опыт': ['Yellow', 'Orange', 'Grey'],                // Yellowish Brown
    'experience2': ['Yellow', 'Orange', 'Grey'],
    'груз прошлого': ['Yellow', 'Orange', 'Grey'],
    'мудрость': ['Yellow', 'Violet', 'Blue', 'White'],   // Golden Ochre + Jade/Green + Aquamarine
    'wisdom': ['Yellow', 'Violet', 'Blue', 'White'],
    'достоинство': ['Yellow', 'Violet', 'Blue'],         // also Dignity/Blue
    'dignity': ['Yellow', 'Violet', 'Blue'],
    'традиционный': ['Yellow', 'Orange', 'Red'],
    'распад': ['Yellow', 'Grey', 'Black'],               // Dirty Yellow
    'decay': ['Yellow', 'Grey', 'Black'],
    'тлен': ['Yellow', 'Grey', 'Black'],
    'предательство': ['Yellow', 'Grey', 'Black'],
    'betrayal': ['Yellow', 'Grey', 'Black'],

    // --- GREEN SHADES ---
    'релаксация': ['Green', 'Blue', 'White'],            // Mint
    'relaxation': ['Green', 'Blue', 'White'],
    'расслабление': ['Green', 'Blue', 'White'],
    'спа': ['Green', 'Blue', 'White'],
    'spa': ['Green', 'Blue', 'White'],
    'снятие напряжения': ['Green', 'Blue', 'White'],
    'творческий поток': ['Green', 'Blue', 'Violet'],     // Turquoise
    'creative flow': ['Green', 'Blue', 'Violet'],
    'творческий порыв': ['Green', 'Blue', 'Violet'],
    'бирюзовый поток': ['Green', 'Blue'],
    'витальность': ['Green', 'Red', 'Orange'],           // Emerald
    'vitality': ['Green', 'Red', 'Orange'],
    'процветающий': ['Green', 'Yellow', 'Orange'],
    'flourishing': ['Green', 'Yellow', 'Orange'],
    'авторитетность': ['Green', 'Violet', 'Black'],      // Malachite
    'мощь': ['Green', 'Violet', 'Black', 'Red'],
    'юность': ['Green', 'Yellow', 'Orange'],             // Lime
    'youth2': ['Green', 'Yellow', 'Orange'],
    'молодость': ['Green', 'Yellow', 'Orange'],
    'оптимизм': ['Green', 'Yellow', 'Orange'],           // Green Apple
    'optimism': ['Green', 'Yellow', 'Orange'],
    'здоровая активность': ['Green', 'Yellow', 'Orange'],
    'фитнес': ['Green', 'Yellow', 'Orange'],
    'заземление': ['Green', 'Orange', 'Red'],            // Mossy
    'grounding': ['Green', 'Orange', 'Red'],
    'корни': ['Green', 'Orange', 'Red'],
    'эко': ['Green', 'Yellow'],
    'eco': ['Green', 'Yellow'],
    'нейтралитет': ['Green', 'Grey', 'Blue'],            // Grey-Green
    'neutrality': ['Green', 'Grey', 'Blue'],
    'безопасная дистанция': ['Green', 'Grey', 'Blue'],
    'safe distance': ['Green', 'Grey', 'Blue'],
    'глубина чувств': ['Green', 'Blue', 'Violet'],       // Sea Green
    'depth of feelings': ['Green', 'Blue', 'Violet'],
    'причастность': ['Green', 'Blue', 'Violet'],
    'belonging': ['Green', 'Blue', 'Violet'],
    'холодная чистота': ['Green', 'White', 'Blue'],      // Viridian + Frost/White
    'cold purity': ['Green', 'White', 'Blue'],
    'стерильность': ['Green', 'White', 'Blue'],
    'медицинская чистота': ['Green', 'White', 'Blue'],
    'упругость воли': ['Green', 'Blue'],                 // Blue-Green (Luscher)
    'resilience': ['Green', 'Blue'],
    'настойчивость': ['Green', 'Blue', 'Red'],
    'persistence': ['Green', 'Blue', 'Red'],
    'тоска': ['Green', 'Grey', 'Blue'],                  // Marsh
    'inconsolable stillness': ['Green', 'Grey', 'Blue'],
    'болотный': ['Green', 'Grey'],
    'статика': ['Green', 'Grey'],                        // Coniferous
    'stasis': ['Green', 'Grey'],
    'консерватизм': ['Green', 'Grey'],
    'буржуазное спокойствие': ['Green', 'Grey'],
    'рациональность': ['Green', 'Blue', 'Grey'],         // Dark Teal + Teal/Blue
    'rationality': ['Green', 'Blue', 'Grey'],
    'аналитика': ['Green', 'Blue', 'Grey'],
    'финансовая уверенность': ['Green', 'Blue', 'Grey'],

    // --- BLUE SHADES ---
    'суровость': ['Blue', 'Grey', 'Black'],              // Ice Blue
    'austerity': ['Blue', 'Grey', 'Black'],
    'строгость': ['Blue', 'Grey', 'Black'],
    'эмоциональная отстраненность': ['Blue', 'Grey'],
    'emotional detachment': ['Blue', 'Grey'],
    'технологический минимализм': ['Blue', 'Grey', 'White'],
    'cognitive arousal': ['Blue', 'Orange'],             // Electric Blue
    'когнитивное возбуждение': ['Blue', 'Orange'],
    'алертность': ['Blue', 'Orange', 'Yellow'],
    'alertness2': ['Blue', 'Orange', 'Yellow'],
    'эфирность': ['Blue', 'White', 'Violet'],            // Glaze Blue
    'ethereality': ['Blue', 'White', 'Violet'],
    'призрачность': ['Blue', 'White', 'Violet'],
    'духовность': ['Blue', 'Violet', 'White'],
    'spirituality': ['Blue', 'Violet', 'White'],
    'нежная забота': ['Blue', 'White', 'Orange'],        // Pastel Blue
    'gentle care': ['Blue', 'White', 'Orange'],
    'доверие': ['Blue', 'Green', 'White'],
    'trust2': ['Blue', 'Green', 'White'],
    'свобода': ['Blue', 'Green', 'White'],               // Cerulean
    'freedom': ['Blue', 'Green', 'White'],
    'ментальное освобождение': ['Blue', 'White', 'Green'],
    'безграничnost': ['Blue', 'White'],
    'intellectualnaya chistota': ['Blue', 'White'],
    'снижение стресса': ['Blue', 'Violet', 'Green'],     // Lavender Blue
    'stress relief': ['Blue', 'Violet', 'Green'],
    'антистресс': ['Blue', 'Violet', 'Green'],
    'седативный': ['Blue', 'Violet'],
    'sedative': ['Blue', 'Violet'],
    'сон': ['Blue', 'Violet', 'Black'],
    'sleep': ['Blue', 'Violet', 'Black'],
    'созерцание': ['Blue', 'Violet', 'White'],
    'contemplation': ['Blue', 'Violet', 'White'],
    'романтика': ['Blue', 'Violet'],                     // Cornflower
    'romance': ['Blue', 'Violet'],
    'романтичный': ['Blue', 'Violet'],
    'romantic2': ['Blue', 'Violet'],
    'нежность': ['Blue', 'Violet', 'Red', 'Orange'],    // Cornflower + Wisteria/Violet + Apricot/Orange
    'tenderness': ['Blue', 'Violet', 'Red', 'Orange'],
    'верность': ['Blue', 'Violet'],                      // Cornflower + Cobalt
    'loyalty2': ['Blue', 'Violet'],
    'преданность': ['Blue', 'Violet'],
    'devotion': ['Blue', 'Violet'],
    'привязанность': ['Blue', 'Violet'],
    'attachment': ['Blue', 'Violet'],
    'поэтичность': ['Blue', 'Violet'],
    'poetic': ['Blue', 'Violet'],
    'лиричность': ['Blue', 'Violet'],
    'lyrical': ['Blue', 'Violet'],
    'лиризм': ['Blue', 'Violet'],
    'лирика': ['Blue', 'Violet'],
    'лирический': ['Blue', 'Violet'],
    'душевная близость': ['Blue', 'Violet'],
    'soulful closeness': ['Blue', 'Violet'],
    'искренняя привязанность': ['Blue', 'Violet'],
    'туман': ['Blue', 'Grey', 'White'],                  // Dove Blue
    'mist2': ['Blue', 'Grey', 'White'],
    'апатия': ['Blue', 'Grey'],
    'apathy': ['Blue', 'Grey'],
    'замедление реальности': ['Blue', 'Grey'],
    'обновление': ['Blue', 'Green', 'White'],            // Sea Wave
    'renewal': ['Blue', 'Green', 'White'],
    'поток': ['Blue', 'Green'],
    'flow2': ['Blue', 'Green'],
    'равновесие': ['Blue', 'Green', 'Grey'],
    'equilibrium': ['Blue', 'Green', 'Grey'],
    'вибрация': ['Blue', 'Violet', 'Orange'],            // Azure
    'vibration': ['Blue', 'Violet', 'Orange'],
    'атмосферная печаль': ['Blue', 'Grey', 'Violet'],    // Payne's Grey
    'atmospheric sadness': ['Blue', 'Grey', 'Violet'],
    'меланхолическое утро': ['Blue', 'Grey', 'Violet'],
    'живые тени': ['Blue', 'Grey', 'Black'],
    'living shadows': ['Blue', 'Grey', 'Black'],
    'повседневность': ['Blue', 'Grey', 'White'],         // Denim
    'заурядность': ['Blue', 'Grey'],
    'democratic': ['Blue', 'Grey'],
    'демократичный': ['Blue', 'Grey'],
    'холодный интеллект': ['Blue', 'Grey', 'Black'],     // Prussian Blue
    'cold intellect': ['Blue', 'Grey', 'Black'],
    'академическая строгость': ['Blue', 'Grey', 'Black'],
    'academic rigor': ['Blue', 'Grey', 'Black'],
    'одиночество': ['Blue', 'Grey', 'Black'],
    'solitude2': ['Blue', 'Grey', 'Black'],
    'погружение': ['Blue', 'Violet', 'Black'],           // Indigo
    'immersion': ['Blue', 'Violet', 'Black'],
    'подсознание': ['Blue', 'Violet', 'Black'],
    'subconscious': ['Blue', 'Violet', 'Black'],
    'глубокая интроспекция': ['Blue', 'Violet', 'Black'],
    'духовный покой': ['Blue', 'Violet', 'White'],       // Ultramarine
    'spiritual peace': ['Blue', 'Violet', 'White'],
    'небесный': ['Blue', 'Violet', 'White'],
    'celestial': ['Blue', 'Violet', 'White'],
    'сакральный': ['Blue', 'Violet', 'Red'],
    'sacred': ['Blue', 'Violet', 'Red'],
    'философская меланхолия': ['Blue', 'Violet', 'Grey'],
    'philosophical melancholy': ['Blue', 'Violet', 'Grey'],

    // --- VIOLET SHADES ---
    'смягчение': ['Violet', 'Blue', 'Green'],            // Lavender
    'softening': ['Violet', 'Blue', 'Green'],
    'исцеление': ['Violet', 'Green', 'Blue'],
    'healing2': ['Violet', 'Green', 'Blue'],
    'снятие тревоги': ['Violet', 'Blue', 'Green'],
    'мечтательность': ['Violet', 'Blue', 'White'],
    'dreaminess': ['Violet', 'Blue', 'White'],
    'утончённость': ['Violet', 'White', 'Grey'],         // Thistle
    'refinement': ['Violet', 'White', 'Grey'],
    'деликатность': ['Violet', 'White', 'Blue'],
    'лёгкая меланхолия': ['Violet', 'Blue', 'Grey'],
    'light melancholy': ['Violet', 'Blue', 'Grey'],
    'первая любовь': ['Violet', 'Blue', 'Red'],          // Mauve
    'first love': ['Violet', 'Blue', 'Red'],
    'возвышенная мечта': ['Violet', 'Blue', 'White'],
    'sublime dream': ['Violet', 'Blue', 'White'],
    'нежность воска': ['Violet', 'Yellow'],
    'глициния': ['Violet', 'Blue'],                      // Wisteria — also keywords
    'wisteria': ['Violet', 'Blue'],
    'светлая грусть': ['Violet', 'Blue', 'Grey'],
    'bright sadness': ['Violet', 'Blue', 'Grey'],
    'поэтическая хрупкость': ['Violet', 'Blue'],
    'весенняя романтика': ['Violet', 'Blue', 'Green'],   // Lilac
    'spring romance': ['Violet', 'Blue', 'Green'],
    'таинственный оптимизм': ['Violet', 'Blue', 'Yellow'],
    'mysterious optimism': ['Violet', 'Blue', 'Yellow'],
    'новое начало': ['Violet', 'Green', 'Yellow'],
    'new beginning': ['Violet', 'Green', 'Yellow'],
    'творчество': ['Violet', 'Blue', 'Orange'],          // Heliotrope
    'creativity': ['Violet', 'Blue', 'Orange'],
    'фантазия': ['Violet', 'Blue', 'Yellow'],
    'fantasy': ['Violet', 'Blue', 'Yellow'],
    'воображение': ['Violet', 'Blue', 'Yellow'],
    'imagination': ['Violet', 'Blue', 'Yellow'],
    'очарование': ['Violet', 'Blue', 'Red'],             // Orchid
    'charm': ['Violet', 'Blue', 'Red'],
    'обаяние': ['Violet', 'Red', 'Orange'],
    'чувственная роскошь': ['Violet', 'Red', 'Black'],
    'sensual luxury': ['Violet', 'Red', 'Black'],
    'интуиция': ['Violet', 'Blue'],                      // Amethyst
    'intuition': ['Violet', 'Blue'],
    'духовная защита': ['Violet', 'Blue', 'White'],
    'spiritual protection': ['Violet', 'Blue', 'White'],
    'величие': ['Violet', 'Yellow', 'Black'],            // Royal Purple
    'grandeur': ['Violet', 'Yellow', 'Black'],
    'великолепие': ['Violet', 'Yellow', 'Black'],
    'magnificence': ['Violet', 'Yellow', 'Black'],
    'королевская власть': ['Violet', 'Black', 'Yellow'],
    'royal authority': ['Violet', 'Black', 'Yellow'],
    'драма': ['Violet', 'Black', 'Red'],                 // Plum
    'drama': ['Violet', 'Black', 'Red'],
    'трагичность': ['Violet', 'Black', 'Grey'],
    'tragic': ['Violet', 'Black', 'Grey'],
    'груз судьбы': ['Violet', 'Black', 'Grey'],
    'за пределом': ['Violet', 'Blue', 'Black'],          // Ultra Violet
    'beyond': ['Violet', 'Blue', 'Black'],
    'будущее энергия': ['Violet', 'Blue', 'Black'],
    'прорыв': ['Violet', 'Blue', 'Orange'],
    'breakthrough': ['Violet', 'Blue', 'Orange'],
    'глубина': ['Violet', 'Blue', 'Black'],              // Blueberry
    'depth3': ['Violet', 'Blue', 'Black'],
    'интеллектуальная глубина': ['Violet', 'Blue', 'Black'],
    'тайное знание': ['Violet', 'Black'],                // Eggplant
    'hidden knowledge': ['Violet', 'Black'],
    'глубокая интроверсия': ['Violet', 'Black'],
    'сокровенная тайна': ['Violet', 'Black'],
    'насыщенность': ['Violet', 'Red', 'Orange'],         // Grape
    'satiety': ['Violet', 'Red', 'Orange'],
    'триумфальная полнота': ['Violet', 'Red', 'Yellow'],
    'аристократизм': ['Violet', 'Black', 'Grey'],        // Adelaide
    'aristocracy': ['Violet', 'Black', 'Grey'],
    'аристократическая меланхолия': ['Violet', 'Black', 'Grey'],
    'museum': ['Violet', 'Black', 'Grey'],
    'музейный': ['Violet', 'Black', 'Grey'],
    'священный ритуал': ['Violet', 'Black', 'Red'],      // Byzantine
    'sacred ritual': ['Violet', 'Black', 'Red'],
    'оригинальность': ['Violet', 'Blue', 'Red'],         // Violet shade
    'originality': ['Violet', 'Blue', 'Red'],
    'уникальность': ['Violet', 'Blue', 'Red'],
    'uniqueness': ['Violet', 'Blue', 'Red'],
    'инстинкт': ['Violet', 'Black'],                     // Blackberry
    'instinct': ['Violet', 'Black'],
    'ночной аромат': ['Violet', 'Black'],
    'ночное притяжение': ['Violet', 'Black'],
    'бездна': ['Violet', 'Black', 'Blue'],               // Deep Eggplant
    'abyss': ['Violet', 'Black', 'Blue'],
    'мистическое откровение': ['Violet', 'Black', 'Blue'],
    'mystical revelation': ['Violet', 'Black', 'Blue'],
    'бессознательное': ['Violet', 'Black', 'Blue'],
    'unconscious': ['Violet', 'Black', 'Blue'],
    'трансцендентность': ['Violet', 'Blue', 'Black'],    // Indigo Violet
    'transcendence': ['Violet', 'Blue', 'Black'],
    'трансцендентный': ['Violet', 'Blue', 'Black'],
    'космический транс': ['Violet', 'Black', 'Blue'],
    'философская трансформация': ['Violet', 'Blue', 'Yellow'],

    // --- BLACK SHADES ---
    'структура': ['Black', 'Grey', 'Blue'],              // Charcoal
    'structure2': ['Black', 'Grey', 'Blue'],
    'аналитический порядок': ['Black', 'Grey', 'Blue'],
    'твёрдость': ['Black', 'Grey'],                      // Onyx
    'hardness': ['Black', 'Grey'],
    'cold power': ['Black', 'Grey'],
    'непоколебимость': ['Black', 'Grey'],
    'immovability': ['Black', 'Grey'],
    'безразличие': ['Black', 'Grey', 'Blue'],            // Wet Asphalt
    'индифферентность': ['Black', 'Grey'],
    'городская меланхолия': ['Black', 'Grey', 'Blue'],
    'давление': ['Black', 'Grey'],                       // Anthracite
    'pressure': ['Black', 'Grey'],
    'сжатое время': ['Black', 'Grey'],
    'скорбь': ['Black', 'Grey', 'Blue'],                 // Soft Black
    'grief': ['Black', 'Grey', 'Blue'],
    'траур': ['Black', 'Grey', 'Violet'],
    'mourning2': ['Black', 'Grey', 'Violet'],
    'тепло тени': ['Black', 'Orange', 'Red'],            // Dark Chocolate
    'warm shadows': ['Black', 'Orange', 'Red'],
    'человеческая темнота': ['Black', 'Red'],
    'присутствие': ['Black', 'Grey'],                    // Shadow
    'presence': ['Black', 'Grey'],
    'скрытая угроза': ['Black', 'Red', 'Violet'],
    'hidden threat': ['Black', 'Red', 'Violet'],
    'тщеславие': ['Black', 'Violet'],                    // Raven
    'vanity': ['Black', 'Violet'],
    'скрытый блеск': ['Black', 'Violet'],
    'hidden luster': ['Black', 'Violet'],
    'острота': ['Black', 'Grey', 'Blue'],                // Obsidian
    'sharpness': ['Black', 'Grey', 'Blue'],
    'хрупкая опасность': ['Black', 'Red', 'Grey'],
    'авторитет': ['Black', 'Grey', 'Violet'],            // Ebon
    'authority2': ['Black', 'Grey', 'Violet'],
    'сдержанное благородство': ['Black', 'Grey', 'Violet'],
    'restrained nobility': ['Black', 'Grey', 'Violet'],
    'вязкость': ['Black'],                               // Oil
    'viscosity': ['Black'],
    'мистическая абстракция': ['Black', 'Violet'],
    'иссиня черный': ['Black', 'Blue'],                  // Midnight Blue-Black
    'night sky depth': ['Black', 'Blue', 'Violet'],
    'космическая глубина': ['Black', 'Blue', 'Violet'],
    'абсолютное одиночество': ['Black', 'Blue', 'Violet'], // Cosmic Dust
    'absolute solitude': ['Black', 'Blue', 'Violet'],
    'пустота': ['Black', 'Violet', 'Blue'],              // Midnight Ink
    'void': ['Black', 'Violet', 'Blue'],
    'первозданная тишина': ['Black', 'Violet'],
    'primordial silence': ['Black', 'Violet'],
    'финал': ['Black'],                                  // Void Black
    'final': ['Black'],
    'завершение': ['Black', 'Grey'],
    'completion': ['Black', 'Grey'],
    'точка невозврата': ['Black'],
    'point of no return': ['Black'],

    // --- GREY SHADES ---
    'изысканность': ['Grey', 'White', 'Violet'],         // Pearl Grey
    'sophistication': ['Grey', 'White', 'Violet'],
    'сдержанная роскошь': ['Grey', 'White', 'Violet'],
    'restrained luxury': ['Grey', 'White', 'Violet'],
    'интеллект': ['Grey', 'Blue', 'Violet'],             // Platinum
    'intellect': ['Grey', 'Blue', 'Violet'],
    'научный': ['Grey', 'Blue', 'White'],
    'scientific': ['Grey', 'Blue', 'White'],
    'прозрачность': ['Grey', 'White', 'Blue'],           // Gainsboro
    'transparency': ['Grey', 'White', 'Blue'],
    'воздушный': ['Grey', 'White', 'Blue'],
    'imperceptible': ['Grey', 'White', 'Blue'],
    'благородство': ['Grey', 'White', 'Violet'],         // Silver
    'nobility': ['Grey', 'White', 'Violet'],
    'холодный разум': ['Grey', 'Blue'],
    'cold reason': ['Grey', 'Blue'],
    'аристократическая техника': ['Grey', 'White', 'Violet'],
    'неопределённость': ['Grey', 'Blue', 'Violet'],      // Smoky
    'uncertainty': ['Grey', 'Blue', 'Violet'],
    'размытые границы': ['Grey', 'Blue', 'Violet'],
    'blurred boundaries': ['Grey', 'Blue', 'Violet'],
    'забвение': ['Grey', 'Black'],                       // Dusty
    'oblivion': ['Grey', 'Black'],
    'покинутость': ['Grey', 'Black'],
    'теплые воспоминания': ['Grey', 'Orange', 'Yellow'], // Warm Mist
    'warm memories': ['Grey', 'Orange', 'Yellow'],
    'уютная ностальгия': ['Grey', 'Orange', 'Yellow'],
    'смирение': ['Grey', 'White', 'Blue'],               // Pewter
    'humility': ['Grey', 'White', 'Blue'],
    'принятие': ['Grey', 'White', 'Blue'],
    'acceptance': ['Grey', 'White', 'Blue'],
    'устойчивость': ['Grey', 'Blue', 'Green'],           // Stone
    'steadiness': ['Grey', 'Blue', 'Green'],
    'природная надежность': ['Grey', 'Green'],
    'объективность': ['Grey', 'Blue', 'White'],          // Concrete
    'objectivity': ['Grey', 'Blue', 'White'],
    'урбанистика': ['Grey', 'Black', 'Blue'],
    'лофт': ['Grey', 'Black', 'Blue'],
    'баланс': ['Grey', 'Blue', 'White', 'Green'],        // Stone Grey
    'balance': ['Grey', 'Blue', 'White', 'Green'],
    'нейтральный компромисс': ['Grey', 'White', 'Blue'],
    'решимость': ['Grey', 'Blue', 'Black'],              // Steel
    'resolve': ['Grey', 'Blue', 'Black'],
    'промышленный прогресс': ['Grey', 'Blue'],
    'технология': ['Grey', 'Blue'],
    'тяжесть мысли': ['Grey', 'Blue', 'Black'],          // Leaden
    'gravity of thought': ['Grey', 'Blue', 'Black'],
    'серьёзная литература': ['Grey', 'Blue', 'Black'],
    'стойкость': ['Grey', 'Blue', 'Black'],              // Charcoal Grey
    'resilience3': ['Grey', 'Blue', 'Black'],
    'дисциплина': ['Grey', 'Blue', 'Black'],
    'discipline': ['Grey', 'Blue', 'Black'],
    'скрытая стойкость': ['Grey', 'Blue', 'Black'],
    'очищение': ['Grey', 'White', 'Blue'],               // Wet Stone
    'purification': ['Grey', 'White', 'Blue'],
    'свежесть после дождя': ['Grey', 'White', 'Blue'],
    'freshness after rain': ['Grey', 'White', 'Blue'],
    'путь': ['Grey', 'Orange', 'Blue'],                  // Asphalt
    'urban rhythm': ['Grey', 'Black', 'Blue'],
    'городской ритм': ['Grey', 'Black', 'Blue'],
    'основание': ['Grey', 'Black'],                      // Dark Graphite
    'foundation': ['Grey', 'Black'],
    'исторический вес': ['Grey', 'Black'],
    'historical drama': ['Grey', 'Black'],
    'космический покой': ['Grey', 'Black', 'Blue'],      // Space Grey
    'spacecraft silence': ['Grey', 'Black', 'Blue'],
    'будущее': ['Grey', 'Blue', 'Violet'],
    'эффективность': ['Grey', 'Blue', 'White'],
    'efficiency': ['Grey', 'Blue', 'White'],

    // --- WHITE SHADES ---
    'абсолютный идеал': ['White', 'Blue'],               // Pure White
    'absolute ideal': ['White', 'Blue'],
    'минимализм': ['White', 'Grey', 'Blue'],
    'minimalism': ['White', 'Grey', 'Blue'],
    'сакральное': ['White', 'Blue', 'Yellow'],
    'дыхание жизни': ['White', 'Yellow', 'Green'],       // Ivory
    'breath of life': ['White', 'Yellow', 'Green'],
    'благородная теплота': ['White', 'Yellow'],
    'материнская теплота': ['White', 'Orange', 'Yellow'], // Milky
    'maternal warmth': ['White', 'Orange', 'Yellow'],
    'безопасность': ['White', 'Orange', 'Yellow'],
    'забота': ['White', 'Orange', 'Yellow'],
    'care': ['White', 'Orange', 'Yellow'],
    'кристальная чистота': ['White', 'Blue', 'Grey'],    // Snow
    'crystal calm': ['White', 'Blue', 'Grey'],
    'зимняя свежесть': ['White', 'Blue', 'Grey'],
    'чистый лист': ['White', 'Grey', 'Blue'],
    'clean slate': ['White', 'Grey', 'Blue'],
    'мягкое прикосновение': ['White', 'Violet', 'Orange'], // Cotton
    'soft touch': ['White', 'Violet', 'Orange'],
    'свежевыстиранный': ['White', 'Yellow'],
    'домашний уют': ['White', 'Orange', 'Yellow'],
    'сладость текстиля': ['White', 'Violet', 'Yellow'],  // Cream
    'конфекционарность': ['White', 'Yellow', 'Orange'],
    'спокойная уверенность': ['White', 'Grey', 'Blue'],  // Alabaster
    'calm confidence': ['White', 'Grey', 'Blue'],
    'целостность': ['White', 'Grey', 'Blue'],
    'wholeness': ['White', 'Grey', 'Blue'],
    'велнес': ['White', 'Green', 'Blue'],
    'wellness': ['White', 'Green', 'Blue'],
    'японский минимализм': ['White', 'Grey'],            // Rice
    'eastern restraint': ['White', 'Grey'],
    'лаконичность': ['White', 'Grey'],
    'laconicism': ['White', 'Grey'],
    'японский': ['White', 'Grey', 'Red'],
    'призрачный свет': ['White', 'Blue', 'Violet'],      // Zinc White
    'ghostly light': ['White', 'Blue', 'Violet'],
    'туманный свет': ['White', 'Blue', 'Grey'],
    'эфирный переход': ['White', 'Violet', 'Blue'],      // Ethereal
    'ethereal transition': ['White', 'Violet', 'Blue'],
    'невидимый': ['White', 'Blue', 'Violet'],
    'выход из материи': ['White', 'Violet', 'Blue'],
    'детская невинность': ['White', 'Violet', 'Yellow'], // Marshmallow
    'child innocence': ['White', 'Violet', 'Yellow'],
    'сладкая лёгкость': ['White', 'Violet', 'Yellow'],
    'crystallization': ['White', 'Blue', 'Grey'],        // Frost
    'кристаллизация': ['White', 'Blue', 'Grey'],
    'зимняя пронзительность': ['White', 'Blue'],
    'тишина': ['White', 'Grey', 'Blue'],                 // Pale Sand
    'silence': ['White', 'Grey', 'Blue'],
    'нейтральное наблюдение': ['White', 'Grey'],
    'gallery': ['White', 'Grey'],
    'галерейный': ['White', 'Grey'],
    'невесомость': ['White', 'Blue', 'Violet'],          // Cloudy
    'weightlessness': ['White', 'Blue', 'Violet'],
    'воздушный сон': ['White', 'Violet', 'Blue'],
    'сухая интеллектуальная чистота': ['White', 'Yellow', 'Grey'], // Parchment
    'старинный свиток': ['White', 'Yellow', 'Orange'],
    'библиотечный': ['White', 'Yellow', 'Orange'],
    'сияние': ['White', 'Yellow', 'Violet'],             // Pearl
    'radiance': ['White', 'Yellow', 'Violet'],
    'скрытая глубина': ['White', 'Violet', 'Blue'],
    'ювелирный': ['White', 'Violet', 'Yellow'],
    'естественная ткань': ['White', 'Orange', 'Green'],  // Linen/White
    'эко-материал': ['White', 'Green', 'Orange'],
    'искренность': ['White', 'Green', 'Orange'],
    'sincerity': ['White', 'Green', 'Orange'],
    'аристократический': ['White', 'Violet', 'Grey'],    // Porcelain
    'aristocratic': ['White', 'Violet', 'Grey'],
    'высокое ремесло': ['White', 'Violet', 'Grey'],
    'хрупкая красота': ['White', 'Violet', 'Red'],
    'fragile beauty': ['White', 'Violet', 'Red'],
    'шёпот истории': ['White', 'Yellow', 'Orange'],      // Antique White
    'whisper of history': ['White', 'Yellow', 'Orange'],
    'музейный тепло': ['White', 'Yellow', 'Orange'],
    'природная деликатность': ['White', 'Green', 'Orange'], // Eggshell
    'natural delicacy': ['White', 'Green', 'Orange'],
    'мирное принятие': ['White', 'Green', 'Grey'],
    'peaceful acceptance': ['White', 'Green', 'Grey'],
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
function _hexToRgb(hex) {
    if (!hex || hex === 'transparent') return [128, 128, 128];
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
    return [parseInt(hex.substr(0,2),16), parseInt(hex.substr(2,2),16), parseInt(hex.substr(4,2),16)];
}

function findClosestRealShade(targetHex) {
    if (typeof RESEARCH_DATA === 'undefined') return null;
    const [r1, g1, b1] = _hexToRgb(targetHex);
    let best = null, bestDist = Infinity;
    RESEARCH_DATA.colors.forEach(color => {
        (color.shades || []).forEach(shade => {
            if (!shade.hex) return;
            const [r2, g2, b2] = _hexToRgb(shade.hex);
            const dist = (r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2;
            if (dist < bestDist) { bestDist = dist; best = shade; }
        });
    });
    return best;
}

function synthesizeShade(anchorHex, hueOffset, lightnessOverride) {
    if (!anchorHex || anchorHex === 'transparent') anchorHex = '#888888';
    let [h, s, l] = hexToHsl(anchorHex);
    h = (h + hueOffset + 360) % 360;
    if (lightnessOverride !== undefined) {
        l = lightnessOverride;
        s = Math.min(s, 20);
    }
    s = Math.max(s, 8);
    const hex = hslToHex(h, s, l);
    // Snap to the nearest real shade so the name is meaningful and navigation works
    const real = findClosestRealShade(hex);
    if (real) return real;
    return { hex, name: { en: 'Auto', ru: 'Авто' }, _synthesized: true };
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
    const labelsHtml = colorInfo.name
        ? `<div style="position:absolute;bottom:16px;left:16px;font-size:11px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${textColor};z-index:10;">${colorInfo.name}</div>`
        : '';
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
    const labelsHtml = parentColorInfo.name
        ? `<div style="position:absolute;bottom:16px;left:16px;font-size:11px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${textColor};z-index:10;">${parentColorInfo.name}</div>`
        : '';
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

    // Resolve 'Auto' principle — random pick each request
    let resolvedPrinciple = principle;
    if (!principle || principle === 'Auto' || principle === 'Авто') {
        const autoPrinciples = [
            'Neural Opponency',
            '60 / 30 / 10',
            '70 / 20 / 10',
            '90 / 10',
            '50 / 50',
            'Geometric Resonance',
            'Circadian Validity',
            'Itten Radiance Force',
            'Stratified Depth',
            'Luscher Quartet'
        ];
        resolvedPrinciple = autoPrinciples[Math.floor(Math.random() * autoPrinciples.length)];
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
            const w = weights[i];
            const tc = getContrastYIQ(info.hex);
            const isClickable = info.hex && info.hex !== 'transparent';
            const clickAttr = isClickable ? `onclick="navigateToShade('${info.hex}')"` : '';
            const cursorStyle = isClickable ? 'cursor:pointer;' : '';
            const border = i > 0 ? 'border-left:1px solid var(--black);' : '';
            const nameHtml = info.name
                ? `<div style="position:absolute;bottom:16px;left:16px;font-size:10px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${tc};z-index:10;">${info.name}</div>`
                : '';
            return `<div ${clickAttr} style="flex:${w};background:${info.hex};position:relative;overflow:hidden;${cursorStyle}${border}">${nameHtml}</div>`;
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
            const tc = getContrastYIQ(info.hex);
            const isClickable = info.hex && info.hex !== 'transparent';
            const clickAttr = isClickable ? `onclick="navigateToShade('${info.hex}')"` : '';
            const cursorStyle = isClickable ? 'cursor:pointer;' : '';
            const border = i > 0 ? 'border-top:1px solid var(--black);' : '';
            const fontSize = d.weight >= 20 ? '11px' : d.weight >= 10 ? '10px' : '9px';
            const pad = d.weight >= 20 ? '16px' : d.weight >= 10 ? '12px' : '8px';
            const nameHtml = info.name
                ? `<span style="font-size:${fontSize};font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${tc};white-space:nowrap;">${info.name}</span>`
                : '';
            return `<div ${clickAttr} style="flex:${d.weight};background:${info.hex};display:flex;align-items:center;padding:0 ${pad};overflow:hidden;${cursorStyle}${border}">${nameHtml}</div>`;
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
            const isClickable = info.hex && info.hex !== 'transparent';
            const clickAttr = isClickable ? `onclick="navigateToShade('${info.hex}')"` : '';
            const bl = i % 2 === 1 ? '' : 'border-right:1px solid var(--black);';
            const bb = i < 2 ? 'border-bottom:1px solid var(--black);' : '';
            const cursorStyle = isClickable ? 'cursor:pointer;' : '';
            return `<div ${clickAttr} style="flex:1;min-width:0;min-height:0;background:${info.hex};position:relative;overflow:hidden;${cursorStyle}${bl}${bb}">
                <div style="position:absolute;bottom:10px;left:10px;font-size:10px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${tc};z-index:10;">${info.name}</div>
            </div>`;
        }).join('');
        const corrHtml = correctors.map((c, i) => {
            const info = extractColorInfo(c);
            const tc = getContrastYIQ(info.hex);
            const isClickable = info.hex && info.hex !== 'transparent';
            const clickAttr = isClickable ? `onclick="navigateToShade('${info.hex}')"` : '';
            const bb = i === 0 ? 'border-bottom:1px solid var(--black);' : '';
            const cursorStyle = isClickable ? 'cursor:pointer;' : '';
            return `<div ${clickAttr} style="flex:1;background:${info.hex};position:relative;overflow:hidden;${cursorStyle}${bb}">
                <div style="position:absolute;bottom:10px;left:10px;font-size:10px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${tc};z-index:10;">${info.name}</div>
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
                <div style="position:absolute;bottom:8px;left:8px;font-size:9px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${tc};z-index:10;">${info.name}</div>
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
                    <div style="position:absolute;bottom:8px;left:8px;font-size:9px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${tc};z-index:10;">${info.name}</div>
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
            gridHtml += `
                <div ${clickAttr} class="hero-block" style="${styleExtra}${cursorStyle}position:relative;overflow:hidden;">
                    <div class="color-block" style="background:${info.hex}"></div>
                    <div style="position:absolute;bottom:20px;left:20px;font-size:11px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;color:${textColor};z-index:10;">${info.name}</div>
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

