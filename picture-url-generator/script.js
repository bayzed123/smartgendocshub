const IMGBB_API_KEY = '714d7f0a23dac6b1a4d3728583280179';

const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const loading = document.getElementById('loading');
const statusMessage = document.getElementById('statusMessage');
const previewSection = document.getElementById('previewSection');
const imagePreview = document.getElementById('imagePreview');
const urlOutput = document.getElementById('urlOutput');
const deleteUrlContainer = document.getElementById('deleteUrlContainer');
const deleteUrlOutput = document.getElementById('deleteUrlOutput');
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
    uploadArea.style.display = 'block';
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
    uploadArea.style.display = 'none';

    try {
        const formData = new FormData();
        formData.append('image', file);

        // API Integration Rule: Append key to URL
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            // CRITICAL REQUIREMENT: Extract response.data.url
            const imageUrl = data.data.url;
            const deleteUrl = data.data.delete_url;
            
            // Bonus UI: Show preview
            imagePreview.src = imageUrl;
            urlOutput.textContent = imageUrl;
            
            // Requirement 7: Provide delete_url
            if (deleteUrlOutput) {
                deleteUrlOutput.textContent = deleteUrl;
                deleteUrlOutput.href = deleteUrl;
            }
            
            previewSection.classList.add('active');
            showStatus('Image uploaded successfully!', 'success');
        } else {
            showStatus('Upload failed: ' + (data.error?.message || 'Unknown error'), 'error');
            uploadArea.style.display = 'block';
        }
    } catch (error) {
        console.error('Upload error:', error);
        showStatus('Upload failed: ' + error.message, 'error');
        uploadArea.style.display = 'block';
    } finally {
        loading.classList.remove('active');
    }
}

function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message active status-${type}`;
    // For errors, keep them visible longer
    const duration = type === 'error' ? 6000 : 4000;
    setTimeout(() => {
        statusMessage.classList.remove('active');
    }, duration);
}
