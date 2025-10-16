const express = require('express');
const app = express();
app.use(express.json());
app.post('/predict', (req, res) => {
    // Your ML logic here
    res.json({ prediction: 'spam', confidence: 85 });
});
app.listen(3000);