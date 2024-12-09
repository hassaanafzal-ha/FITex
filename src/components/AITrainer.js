import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AITrainer.css';

const AITrainer = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [mode, setMode] = useState('chat'); // Modes: 'chat' or 'plan'
    const navigate = useNavigate();

    const questions = [
        'What are your fitness goals (e.g., muscle gain, weight loss, endurance)?',
        'How many days per week can you dedicate to working out?',
        'Do you go to the gym or do home workouts (what equipment do you have access to)?',
        'What is your current fitness level (e.g., beginner, intermediate, advanced)?',
        'Do you follow any specific diet or have any dietary restrictions (e.g., vegetarian, keto, etc.)?'
    ];
    

    const isLoggedIn = localStorage.getItem("userEmail") !== null;

    useEffect(() => {
        if (mode === 'chat') {
            setChatHistory([{ sender: 'bot', text: "Hi! I'm your AI fitness trainer—ready to help you crush your goals. Let's begin!" }]);
        }
    }, [mode]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = { sender: 'user', text: message };
        setChatHistory((prev) => [...prev, userMessage]);
        setMessage('');
        setIsLoading(true);

        try {
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=apikey`;

            const requestBody = {
                contents: [
                    {
                        parts: [
                            {
                                text: `You are a helpful personal trainer. Please provide a clear, concise, and small to medium length response. Please only respond to fitness-related questions. Do not answer queries outside of fitness, exercise, or health. The question is: "${message}"`,
                            },
                        ],
                    },
                ],
            };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) 
                throw new Error(`API error: ${response.status}`);

            const data = await response.json();
            const rawBotReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn’t generate a response.';
        
            const formattedBotReply = formatResponse(rawBotReply);
            const botMessage = { sender: 'bot', text: formattedBotReply };

            setChatHistory((prev) => [...prev, botMessage]);
        } catch (error) {
            setChatHistory((prev) => [
                ...prev,
                { sender: 'bot', text: 'Error processing your request. Please try again later.' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const formatResponse = (response) => {
        let formattedResponse = response.replace(/\*/g, '');
        formattedResponse = formattedResponse.replace(/(\*\*?[A-Za-z\s]+[\:]+)(\s?)/g, '\n\n$1');
        formattedResponse = formattedResponse.replace(/(\(Day [0-9]+[\:\)]\))/g, '\n$1\n');
        formattedResponse = formattedResponse.replace(/\|(\s?[\w\s]+[^\|]+)\|/g, '\n$1\n');
        formattedResponse = formattedResponse.replace(/[\|\-]/g, '');
        formattedResponse = formattedResponse.replace(/\n{2,}/g, '\n');
        formattedResponse = formattedResponse.replace(/\n/g, '<br />');
        formattedResponse = formattedResponse.trim();
        return formattedResponse;
    };
    
    

    const handleCreatePlan = () => {
        /*if (!isLoggedIn) {
            navigate('/loginPage');
            return;
        }*/
        setMode('plan');
        setChatHistory([]);
        setQuestionsAnswered([]);
        setCurrentQuestionIndex(0);
        setChatHistory([{ sender: 'bot', text: questions[0] }]);
    };

    const handleAnswerQuestion = async () => {
        if (!message.trim()) return;

        const userMessage = { sender: 'user', text: message };
        setChatHistory((prev) => [...prev, userMessage]);
        setQuestionsAnswered((prev) => [
            ...prev,
            { question: questions[currentQuestionIndex], answer: message }
        ]);
        setMessage('');

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setChatHistory((prev) => [
                ...prev,
                { sender: 'bot', text: questions[currentQuestionIndex + 1] }
            ]);
        } else {
            await createFitnessPlan();
        }
    };

    const createFitnessPlan = async () => {
        setIsLoading(true);

        const answers = questionsAnswered.map((item) => item.answer).join("\n");

        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: `You are a helpful personal trainer. Please provide a clear, concise, and medium to large length response. Please only respond to fitness-related questions. Do not answer queries outside of fitness, exercise, or health. Generate a fitness plan for: \n${answers}`
                        },
                    ],
                },
            ],
        };

        try {
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=apikey`;
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) throw new Error(`API error: ${response.status}`);

            const data = await response.json();
            const generatedPlan = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Could not generate a plan.';
            
            const formattedBotReply = formatResponse(generatedPlan);
    
            // Constructing the bot's message
            const botMessage = { sender: 'bot', text: formattedBotReply };
        
            // Updating the chat history with the new bot message
            setChatHistory((prev) => [...prev, botMessage]);
            
            
            //setChatHistory((prev) => [...prev, { sender: 'bot', text: generatedPlan }]);
        } catch (error) {
            setChatHistory((prev) => [
                ...prev,
                { sender: 'bot', text: 'Error generating the plan. Please try again later.' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ai-trainer-container">
            <header className="ai-trainer-header">
                <h1>
                    <span className="fitex">FITex</span>
                    <span className="ai-trainer">AI Trainer</span>
                </h1>
            </header>

            <div className="ai-trainer-main">
                <aside className="ai-trainer-sidebar">
                    <div className="sidebar-header">
                        <button className="new-chat-btn" onClick={() => { setMode('chat'); setChatHistory([]); }}>
                            + New Chat
                        </button>
                        <button className="new-chat-btn" onClick={handleCreatePlan}>
                            Create a Plan
                        </button>
                    </div>
                    <div className="chat-history">
                        <h3>Chat History</h3>
                        <ul>
                            {chatHistory.map((chat, index) => (
                                <li key={index} className={chat.sender === 'user' ? 'user-chat' : 'bot-chat'}>
                                    <strong>{chat.sender === 'user' ? 'You' : 'AI Trainer'}:</strong>
                                    {/* Render the bot's message with <br /> tags by using dangerouslySetInnerHTML */}
                                    <span dangerouslySetInnerHTML={{ __html: chat.text }} />
                                </li>
                            ))}
                        </ul>
                    </div>

                </aside>

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

            <footer className="ai-trainer-footer">
                <div className="chat-interface">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (mode === 'chat' ? handleSendMessage() : handleAnswerQuestion())}
                    />
                    <button onClick={mode === 'chat' ? handleSendMessage : handleAnswerQuestion} disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default AITrainer;
