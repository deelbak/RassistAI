import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function getAIResponse(prompt: string): Promise<string> {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        return response.choices[0]?.message?.content || "No response generated";
    } catch (error) {
        console.error("OpenAI error:", error);
        throw error;
    }
}
