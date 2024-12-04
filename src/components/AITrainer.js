import React, { useState } from 'react';
import './AITrainer.css';

const AITrainer = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle user input and get a response from Gemini API
    const handleSendMessage = async () => {
        if (!message.trim()) return;

        // Add the user's message to the chat
        const userMessage = { sender: 'user', text: message };
        setChatHistory((prev) => [...prev, userMessage]);
        setMessage('');
        setIsLoading(true);

        try {
            //const apiKey = 'your_actual_api_key'; // Replace with your API key
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key='apikey'`;

            // Request body matching the curl request
            const requestBody = {
                contents: [
                    {
                        parts: [
                            {
                                text: `You are a helpful personal trainer. Please provide a clear, concise, and small to medium length response, addressing all parts of the following question: "${message}"`,
                            },
                        ],
                    },
                ],
            };

            console.log('Request Body:', JSON.stringify(requestBody)); // Debug log for request body

            // Send a POST request to the API
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                console.error('API Error:', response.status, response.statusText);
                throw new Error(`API returned status ${response.status}`);
            }

            // Parse and log the API response
            const data = await response.json();
            console.log('API Response:', data);

            // Extract the bot's reply
            // const botReply = data?.contents?.[0]?.parts?.[0]?.text || 'Sorry, I couldn’t generate a response.';
	    // const botReply = data?.contents?.[0]?.parts?.[0]?.text || JSON.stringify(data) || 'No response from the bot.';

	    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn’t generate a response.';
            const botMessage = { sender: 'bot', text: botReply };

            // Add the bot's response to the chat
            setChatHistory((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error communicating with Gemini API:', error);
            setChatHistory((prev) => [
                ...prev,
                { sender: 'bot', text: 'Sorry, there was an error processing your request. Please try again later.' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ai-trainer-container">
            {/* Header Section */}
            <header className="ai-trainer-header">
                <h1>
                    <span className="fitex">FITex</span>
                    <span className="ai-trainer">AI Trainer</span>
                </h1>
            </header>

            <div className="ai-trainer-main">
                {/* Sidebar Section */}
                <aside className="ai-trainer-sidebar">
                    <div className="sidebar-header">
                        <button className="new-chat-btn" onClick={() => setChatHistory([])}>
                            + New Chat
                        </button>
                    </div>
                    <div className="chat-history">
                        <h3>Chat History</h3>
                        <ul>
                            {chatHistory.map((chat, index) => (
                                <li key={index} className={chat.sender === 'user' ? 'user-chat' : 'bot-chat'}>
                                    <strong>{chat.sender === 'user' ? 'You' : 'AI Trainer'}:</strong> {chat.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="sidebar-footer">
                        <ul>
                            <li>My Account</li>
                            <li>Updates & FAQ</li>
                            <li className="exit-option">Exit</li>
                        </ul>
                    </div>
                </aside>

                {/* Main Content Section */}
                <section className="ai-trainer-content">
                    <div className="ai-trainer-examples">
                        <h2>Examples</h2>
                        <p>"What exercises should I do daily?"</p>
                        <p>"How to stay fit while working long hours?"</p>
                        <p>"Best stretches after running?"</p>
                    </div>
                    <div className="ai-trainer-trainer">
                        <h2>Trainer Features</h2>
                        <p>Personalized advice and fitness tips</p>
                        <p>Motivational quotes to keep you going</p>
                        <p>Exercise suggestions for beginners</p>
                    </div>
                    <div className="ai-trainer-limitations">
                        <h2>Limitations</h2>
                        <p>May occasionally give incorrect advice</p>
                        <p>Knowledge is limited to fitness-related queries</p>
                        <p>Does not provide medical advice</p>
                    </div>
                </section>
            </div>

            {/* Footer Section */}
            <footer className="ai-trainer-footer">
                <div className="chat-interface">
                    <input
                        type="text"
                        placeholder="Ask a fitness question..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button onClick={handleSendMessage} disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default AITrainer;
