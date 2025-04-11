import { Router, Request, Response } from 'express';
import { getAIResponse } from '../aiService';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message must be a string' });
        }

        const aiResponse = await getAIResponse(message);

        res.json({
            success: true,
            response: aiResponse
        });
    } catch (error) {
        console.error('Assistant error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});
export default router;
