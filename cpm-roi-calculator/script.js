function calculateCPM() {
    const cost = parseFloat(document.getElementById('cpmCost').value);
    const impressions = parseFloat(document.getElementById('cpmImpressions').value);

    if (isNaN(cost) || isNaN(impressions) || cost < 0 || impressions < 0) {
        alert('Please enter valid numbers for cost and impressions');
        return;
    }

    if (impressions === 0) {
        alert('Impressions cannot be zero');
        return;
    }

    const cpm = (cost / impressions) * 1000;
    const resultBox = document.getElementById('cpmResult');
    const resultValue = document.getElementById('cpmValue');

    resultValue.textContent = '$' + cpm.toFixed(2);
    resultBox.style.display = 'block';
}

function calculateROI() {
    const revenue = parseFloat(document.getElementById('roiRevenue').value);
    const cost = parseFloat(document.getElementById('roiCost').value);

    if (isNaN(revenue) || isNaN(cost) || revenue < 0 || cost < 0) {
        alert('Please enter valid numbers for revenue and cost');
        return;
    }

    if (cost === 0) {
        alert('Cost cannot be zero');
        return;
    }

    const roi = ((revenue - cost) / cost) * 100;
    const resultBox = document.getElementById('roiResult');
    const resultValue = document.getElementById('roiValue');

    resultValue.textContent = roi.toFixed(2) + '%';
    resultBox.style.display = 'block';
}

function clearAllCalculations() {
    document.getElementById('cpmCost').value = '';
    document.getElementById('cpmImpressions').value = '';
    document.getElementById('roiRevenue').value = '';
    document.getElementById('roiCost').value = '';
    document.getElementById('cpmResult').style.display = 'none';
    document.getElementById('roiResult').style.display = 'none';
}

// Allow Enter key to trigger calculations
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (document.getElementById('cpmCost').value || document.getElementById('cpmImpressions').value) {
            calculateCPM();
        } else if (document.getElementById('roiRevenue').value || document.getElementById('roiCost').value) {
            calculateROI();
        }
    }
});
