export const sendToAssistant = async (message: string, context?: any) => {
    try {
        const response = await fetch('http://localhost:5000/api/assistant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, context }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to reach assistant:', error);
        return {
            success: false,
            error: 'Failed to connect to AI service',
        };
    }
};
