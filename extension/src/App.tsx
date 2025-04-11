import React, { useState } from 'react';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';


const App: React.FC = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real extension, you'd use your backend API
      const res = await fetch('http://localhost:5000/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Failed to get response from AI');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <Box width="300px" p={4}>
        <VStack spacing={4}>
          <Text fontSize="xl" fontWeight="bold">AI Assistant</Text>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <VStack spacing={3}>
              <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything..."
              />
              <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={isLoading}
                  loadingText="Processing..."
              >
                Send
              </Button>
            </VStack>
          </form>
          {response && (
              <Box p={3} bg="gray.100" borderRadius="md" width="100%">
                <Text>{response}</Text>
              </Box>
          )}
        </VStack>
      </Box>
  );
};

export default App;
