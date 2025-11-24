import express, { Request, Response } from 'express';
import { ResponseData } from '../types';
import { GoogleGenAI } from '@google/genai';

type GenerateContentResult = {
    candidates?: Array<{
        content?: {
            parts?: Array<{
                text?: string;
            }>;
        };
    }>;
};
const aiRouter = express.Router();
const googleGenAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
});
// normal promt
aiRouter.get('/prompt', async (req: Request, res: Response) => {
    try {
        const prompt = typeof req.query.prompt === 'string' ? req.query.prompt.trim() : '';

        if (!prompt) {
            const response: ResponseData = {
                message: 'Prompt is required.',
                data: null,
                success: false
            };
            return res.status(400).json(response);
        }

        const responseFromAI = await googleGenAI.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: {
                role: 'user',
                parts: [{ text: prompt }]
            },
        });

        const aiText = (responseFromAI as GenerateContentResult)?.candidates?.[0]?.content?.parts?.map(part => part.text ?? '').join('').trim();

        if (!aiText) {
            throw new Error('No text returned from AI.');
        }

        const response: ResponseData = {
            message: 'AI text generated successfully.',
            data: aiText,
            success: true
        };
        res.json(response);
    } catch (err) {
        console.error(err);
        const response: ResponseData = {
            message: 'Failed to retrieve texts',
            data: err instanceof Error ? err.message : err,
            success: false
        };
        res.status(500).json(response);
    }
});
export default aiRouter;