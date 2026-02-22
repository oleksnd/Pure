// --- LOGIC-BASED PALETTE ENGINE ---
function findPalette(query) {
    if (!query || query.trim() === '') return null;
    query = query.toLowerCase().trim();

    function fuzzyMatch(str, q) {
        if (!str) return 0;
        str = str.toLowerCase();
        if (str === q) return 100;
        if (str.includes(q)) return 50;
        const tokens = q.split(/\s+/);
        let score = 0;
        tokens.forEach(t => {
            if (t.length > 2 && str.includes(t)) score += 10;
        });
        return score;
    }

    let colorMatches = [];
    RESEARCH_DATA.colors.forEach(col => {
        let score = 0;
        const searchSpace = [
            col.name?.ru, col.name?.en,
            col.physics?.ru, col.physics?.en,
            col.physiology?.ru, col.physiology?.en,
            col.profile?.ru, col.profile?.en,
            col.advice?.ru, col.advice?.en,
            col.feelings?.ru, col.feelings?.en,
            col.tip?.ru, col.tip?.en
        ];
        searchSpace.forEach(text => { score += fuzzyMatch(text, query); });

        if (col.shades) {
            col.shades.forEach(shade => {
                score += fuzzyMatch(shade.name?.ru, query) * 0.5;
                score += fuzzyMatch(shade.name?.en, query) * 0.5;
                score += fuzzyMatch(shade.desc?.ru, query) * 0.5;
                score += fuzzyMatch(shade.desc?.en, query) * 0.5;
            });
        }
        if (score > 0) colorMatches.push({ color: col, score });
    });

    colorMatches.sort((a, b) => b.score - a.score);

    // Only returning colors pool for building the palette dynamically
    let bestColorsPool = colorMatches.filter(m => m.score > 0);

    return {
        bestColorsPool
    };
}

// Helper to determine text color for contrast
function getContrastYIQ(hexcolor) {
    if (!hexcolor || hexcolor === 'transparent') return 'var(--black)';
    hexcolor = hexcolor.replace("#", "");
    if (hexcolor.length === 3) {
        hexcolor = hexcolor.split('').map(x => x + x).join('');
    }
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#1a1a1a' : '#ffffff';
}

// Helper to shuffle array elements
function shuffleArray(array) {
    let arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function extractColorInfo(item) {
    if (!item) return { hex: 'transparent', name: '', emotion: '' };

    // If it's a shade object
    if (item.desc && item.name[lang] && item.name[lang].includes('/')) {
        const parts = item.name[lang].split('/');
        return {
            hex: item.hex,
            name: parts[0].trim(),
            emotion: parts[1] ? parts[1].trim() : ''
        };
    }
    // If it's a main color object
    if (item.physics) {
        let em = '';
        if (item.feelings && item.feelings[lang]) {
            em = item.feelings[lang].split(',')[0].trim();
        }
        return {
            hex: item.hex,
            name: item.name[lang],
            emotion: em
        };
    }
    // Fallback (e.g. from predefined pairings)
    return {
        hex: item.hex,
        name: item.name?.[lang] || item.name || '',
        emotion: '' // Don't show emotion for these to keep it clean
    };
}

function renderColorBlock(flexWeight, colorInfo, extraStyleStr = '') {
    let textColor = getContrastYIQ(colorInfo.hex);
    let labelsHtml = '';

    if (colorInfo.name || colorInfo.emotion) {
        labelsHtml = `
            <div style="position: absolute; bottom: 20px; left: 20px; font-size: 11px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: ${textColor}; z-index: 10;">
                ${colorInfo.name}
            </div>
            <div style="position: absolute; bottom: 20px; right: 20px; font-size: 11px; font-weight: 400; text-transform: lowercase; color: ${textColor}; opacity: 0.8; z-index: 10;">
                ${colorInfo.emotion}
            </div>
        `;
    }

    return `
        <div style="flex: ${flexWeight}; background: ${colorInfo.hex}; position: relative; overflow: hidden; ${extraStyleStr}">
            ${labelsHtml}
        </div>
    `;
}

function renderNeuralBlock(parentColorInfo, childColorInfo, extraStyleStr = '') {
    let textColor = getContrastYIQ(parentColorInfo.hex);
    let labelsHtml = '';

    if (parentColorInfo.name || parentColorInfo.emotion) {
        labelsHtml = `
            <div style="position: absolute; bottom: 20px; left: 20px; font-size: 11px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: ${textColor}; z-index: 10;">
                ${parentColorInfo.name}
            </div>
            <div style="position: absolute; bottom: 20px; right: 20px; font-size: 11px; font-weight: 400; text-transform: lowercase; color: ${textColor}; opacity: 0.8; z-index: 10;">
                ${parentColorInfo.emotion}
            </div>
        `;
    }

    let childTextColor = getContrastYIQ(childColorInfo.hex);
    let childLabelsHtml = '';
    if (childColorInfo.name) {
        childLabelsHtml = `
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 10px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: ${childTextColor}; text-align: center;">
                ${childColorInfo.name}
            </div>
        `;
    }

    return `
        <div style="flex: 1; background: ${parentColorInfo.hex}; position: relative; overflow: hidden; display: flex; justify-content: center; align-items: center; ${extraStyleStr}">
            ${labelsHtml}
            <div style="width: 30%; height: 30%; background: ${childColorInfo.hex}; border-radius: 50%; border: 1px solid var(--black); position: relative;">
                 ${childLabelsHtml}
            </div>
        </div>
    `;
}

function renderGeneratedPalette(matches, principle) {
    const heroRight = document.querySelector('.hero-right');
    const chatResultTitle = document.getElementById('chatResultTitle');

    let sourceItems = [];
    let title = '';

    if (matches.bestColorsPool.length > 0) {
        // As per user request: ALWAYS base palettes on base colors / shades, NOT predefined emotion palettes.
        let cPool = shuffleArray(matches.bestColorsPool.slice(0, 5)).map(m => m.color);

        // Expand selection by tossing in their shades into the source items pool
        cPool.forEach(c => {
            sourceItems.push(c);
            if (c.shades) {
                let shuffledShades = shuffleArray(c.shades).slice(0, 2);
                sourceItems.push(...shuffledShades);
            }
        });
        sourceItems = shuffleArray(sourceItems);
        title = cPool[0].name[lang] + ' — ' + principle;
    } else {
        if (chatResultTitle) chatResultTitle.textContent = lang === 'ru' ? 'Ничего не найдено' : 'Nothing found';
        return;
    }

    if (chatResultTitle) {
        chatResultTitle.textContent = title;
        chatResultTitle.style.opacity = 0;
        setTimeout(() => { chatResultTitle.style.opacity = 1; }, 50);
        chatResultTitle.style.transition = 'opacity 0.3s ease';
    }

    let html = '';
    const baseStyle = "grid-column: 1 / -1; grid-row: 1 / -1; width: 100%; height: 100%; display: flex;";

    if (principle.includes('60 / 30 / 10')) {
        let c1 = extractColorInfo(sourceItems[0]);
        let c2 = extractColorInfo(sourceItems[1]);
        let c3 = extractColorInfo(sourceItems[2]);
        html = `<div style="${baseStyle} flex-direction:column;">
            ${renderColorBlock(6, c1)}
            ${renderColorBlock(3, c2, 'border-top: 1px solid var(--black)')}
            ${renderColorBlock(1, c3, 'border-top: 1px solid var(--black)')}
        </div>`;
    } else if (principle.includes('90 / 10')) {
        // Find a dark or very light background for 90%
        let c1 = extractColorInfo({ hex: '#F5F5F7', name: { ru: 'Основа', en: 'Base' } });
        let accentIndex = 0;
        if (sourceItems[0]?.hex && getContrastYIQ(sourceItems[0].hex) === '#ffffff') {
            // It's a dark color, let's use it as main
            c1 = extractColorInfo(sourceItems[0]);
            accentIndex = 1;
        }

        let c2 = extractColorInfo(sourceItems[accentIndex] || sourceItems[0]);
        html = `<div style="${baseStyle} flex-direction:column;">
            ${renderColorBlock(9, c1)}
            ${renderColorBlock(1, c2, 'border-top: 1px solid var(--black)')}
        </div>`;
    } else if (principle.includes('50 / 50')) {
        let c1 = extractColorInfo(sourceItems[0]);
        let c2 = extractColorInfo(sourceItems[1]);
        html = `<div style="${baseStyle} flex-direction:row;">
            ${renderColorBlock(1, c1)}
            ${renderColorBlock(1, c2, 'border-left: 1px solid var(--black)')}
        </div>`;
    } else if (principle.includes('70 / 20 / 10')) {
        let c1 = extractColorInfo(sourceItems[0]);
        let c2 = extractColorInfo(sourceItems[1]);
        let c3 = extractColorInfo(sourceItems[2]);
        html = `<div style="${baseStyle} flex-direction:column;">
            ${renderColorBlock(7, c1)}
            ${renderColorBlock(2, c2, 'border-top: 1px solid var(--black)')}
            ${renderColorBlock(1, c3, 'border-top: 1px solid var(--black)')}
        </div>`;
    } else if (principle.includes('Neural Opponency')) {
        // Need a color and its theoretical opposite. 
        // We'll just grab the first source item, and if it has a pairing, use it, else pick random.
        let mainColorInfo = extractColorInfo(sourceItems[0]);
        let oppItem = sourceItems[0]?.pairings ? sourceItems[0].pairings[0] : sourceItems[1];
        let oppColorInfo = extractColorInfo(oppItem || sourceItems[0]);
        html = `<div style="${baseStyle} flex-direction:row;">
            ${renderNeuralBlock(mainColorInfo, oppColorInfo)}
        </div>`;
    } else {
        html = '';
        let toShow = sourceItems.slice(0, 4);
        let gridHtml = '';
        toShow.forEach((c, idx) => {
            let info = extractColorInfo(c);
            let styleExtra = '';
            if (idx === 1 || idx === 3) styleExtra += 'border-left: 1px solid var(--black);';
            if (idx === 2 || idx === 3) styleExtra += 'border-top: 1px solid var(--black);';

            let textColor = getContrastYIQ(info.hex);
            gridHtml += `
                <div class="hero-block" style="${styleExtra} position:relative; overflow:hidden;">
                    <div class="color-block" style="background:${info.hex}"></div>
                    <div style="position: absolute; bottom: 20px; left: 20px; font-size: 11px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; color: ${textColor}; z-index: 10;">
                        ${info.name}
                    </div>
                </div>`;
        });
        for (let i = toShow.length; i < 4; i++) {
            let styleExtra = '';
            if (i === 1 || i === 3) styleExtra += 'border-left: 1px solid var(--black);';
            if (i === 2 || i === 3) styleExtra += 'border-top: 1px solid var(--black);';
            gridHtml += `<div class="hero-block" style="${styleExtra}"><div class="color-block" style="background:transparent"></div></div>`;
        }
        html = `<div style="grid-column: 1 / -1; grid-row: 1 / -1; width: 100%; height: 100%; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr;">${gridHtml}</div>`;
    }

    // Animate transition
    heroRight.style.opacity = '0';
    setTimeout(() => {
        heroRight.innerHTML = html;
        heroRight.style.opacity = '1';
        heroRight.style.transition = 'opacity 0.3s ease';
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.querySelector('.chat-input');
    const chatSearchBtn = document.getElementById('chatSearchBtn') || document.querySelector('.chat-btn-submit');

    function handleChatSubmit() {
        const query = chatInput.value;
        if (!query) return;

        // Re-running findPalette will just use the pool and shuffle it on each call
        const matches = findPalette(query);
        if (matches) {
            const principle = document.getElementById('chatPrincipleLabel') ? document.getElementById('chatPrincipleLabel').outerText || document.getElementById('chatPrincipleLabel').textContent : 'Auto';
            renderGeneratedPalette(matches, principle);
        }
    }

    chatSearchBtn?.addEventListener('click', handleChatSubmit);

    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleChatSubmit();
            }
        });
    }
});
