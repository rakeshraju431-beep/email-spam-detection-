document.getElementById('spamForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailContent = document.getElementById('emailContent').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    const predictionEl = document.getElementById('prediction');
    const confidenceEl = document.getElementById('confidence');
    const explanationEl = document.getElementById('explanation');
    
    // Simple spam keywords (expand this list for better accuracy)
    const spamKeywords = [
        'free', 'win', 'prize', 'urgent', 'limited time', 'click here', 'buy now',
        'guaranteed', 'earn money', 'viagra', 'lottery', 'congratulations'
    ];
    
    // Count matches
    let spamScore = 0;
    let matchedKeywords = [];
    
    spamKeywords.forEach(keyword => {
        if (emailContent.includes(keyword)) {
            spamScore++;
            matchedKeywords.push(keyword);
        }
    });
    
    // Simple confidence: percentage based on matches (out of total keywords)
    const totalKeywords = spamKeywords.length;
    const confidence = Math.round((spamScore / totalKeywords) * 100);
    
    let prediction, className, explanation;
    
    if (spamScore >= 3) {  // Threshold: 3+ matches = spam
        prediction = 'This email is likely SPAM!';
        className = 'spam';
        explanation = `Detected ${spamScore} spam indicators: ${matchedKeywords.join(', ')}. High confidence due to multiple suspicious keywords.`;
    } else if (spamScore >= 1) {
        prediction = 'This email might be SPAM (low confidence).';
        className = 'spam';
        explanation = `Detected ${spamScore} spam indicator(s): ${matchedKeywords.join(', ')}. Proceed with caution.`;
    } else {
        prediction = 'This email appears to be legitimate (not spam).';
        className = 'not-spam';
        explanation = 'No common spam keywords found. However, advanced spam can be more subtle.';
    }
    
    predictionEl.textContent = prediction;
    confidenceEl.textContent = `Confidence: ${confidence}%`;
    explanationEl.textContent = explanation;
    
    resultDiv.className = `result ${className}`;
    resultDiv.classList.remove('hidden');
});