const IMGBB_API_KEY = '5d6a0e1a3b8c9f2e1d4a7b9c2e5f8a1b';

const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const loading = document.getElementById('loading');
const statusMessage = document.getElementById('statusMessage');
const previewSection = document.getElementById('previewSection');
const imagePreview = document.getElementById('imagePreview');
const urlOutput = document.getElementById('urlOutput');
const copyBtn = document.getElementById('copyBtn');
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

copyBtn.addEventListener('click', () => {
    const url = urlOutput.textContent;
    navigator.clipboard.writeText(url).then(() => {
        showStatus('URL copied to clipboard!', 'success');
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyBtn.textContent = '📋 Copy URL';
        }, 2000);
    }).catch(() => {
        showStatus('Failed to copy URL', 'error');
    });
});

resetBtn.addEventListener('click', () => {
    imageInput.value = '';
    previewSection.classList.remove('active');
    statusMessage.classList.remove('active');
    loading.classList.remove('active');
});

async function handleImageUpload(file) {
    if (!file.type.startsWith('image/')) {
        showStatus('Please select a valid image file', 'error');
        return;
    }

    if (file.size > 32 * 1024 * 1024) {
        showStatus('File size exceeds 32MB limit', 'error');
        return;
    }

    loading.classList.add('active');
    statusMessage.classList.remove('active');
    previewSection.classList.remove('active');

    try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('key', IMGBB_API_KEY);

        const response = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            const imageUrl = data.data.url;
            imagePreview.src = imageUrl;
            urlOutput.textContent = imageUrl;
            previewSection.classList.add('active');
            showStatus('Image uploaded successfully!', 'success');
        } else {
            showStatus('Upload failed: ' + (data.error?.message || 'Unknown error'), 'error');
        }
    } catch (error) {
        console.error('Upload error:', error);
        showStatus('Upload failed: ' + error.message, 'error');
    } finally {
        loading.classList.remove('active');
    }
}

function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message active status-${type}`;
    setTimeout(() => {
        statusMessage.classList.remove('active');
    }, 4000);
}
