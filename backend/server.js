const express = require('express');
const cors = require('cors');
const Reverso = require('reverso-api');

const app = express();
const reverso = new Reverso();
const PORT = 3001; // This should be a different port from your React app

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

app.post('/translate', (req, res) => {
    const { text } = req.body;
    reverso.getContext(
        text,
        'english',
        'french',
        (err, response) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ ok: false, message: err.message });
            }
            res.json({ ok: true, data: response });
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
