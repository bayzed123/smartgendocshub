const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const loading = document.getElementById('loading');
const previewSection = document.getElementById('previewSection');
const imagePreview = document.getElementById('imagePreview');
const paletteGrid = document.getElementById('paletteGrid');
const resetBtn = document.getElementById('resetBtn');

uploadArea.addEventListener('click', () => imageInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleImageUpload(files[0]);
    }
});

imageInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleImageUpload(e.target.files[0]);
    }
});

resetBtn.addEventListener('click', () => {
    imageInput.value = '';
    previewSection.classList.remove('active');
    loading.classList.remove('active');
});

function handleImageUpload(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
    }

    loading.classList.add('active');
    previewSection.classList.remove('active');

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            imagePreview.src = img.src;
            const colors = extractColors(img);
            displayPalette(colors);
            previewSection.classList.add('active');
            loading.classList.remove('active');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function extractColors(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const colorMap = {};

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a < 125) continue;

        const hex = rgbToHex(r, g, b);
        colorMap[hex] = (colorMap[hex] || 0) + 1;
    }

    const sortedColors = Object.entries(colorMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([hex]) => hex);

    return sortedColors;
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function displayPalette(colors) {
    paletteGrid.innerHTML = colors.map(hex => {
        const rgb = hexToRgb(hex);
        const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        
        return `
            <div class="color-card">
                <div class="color-swatch" style="background-color: ${hex};" title="Click to copy"></div>
                <div class="color-info">
                    <div class="color-label">HEX</div>
                    <div class="color-value">${hex}</div>
                    <button class="copy-btn" onclick="copyToClipboard('${hex}')">Copy HEX</button>
                    <div class="color-label" style="margin-top: 0.5rem;">RGB</div>
                    <div class="color-value">${rgbString}</div>
                    <button class="copy-btn" onclick="copyToClipboard('${rgbString}')">Copy RGB</button>
                </div>
            </div>
        `;
    }).join('');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied: ' + text);
    }).catch(() => {
        alert('Failed to copy');
    });
}
