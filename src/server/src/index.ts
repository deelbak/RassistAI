import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/assistant', async (req, res) => {
    try{
        const { message } = req.body;
        const aiResponse = `AI response to: ${message}`;
        res.json({response: aiResponse});
    }catch(e){
        console.error('AI Assistant error:', e);
        res.status(500).json({ error: 'Failed to process request' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
