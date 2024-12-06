import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import './AITrainer.css';

const AITrainer = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [questionsAnswered, setQuestionsAnswered] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [plan, setPlan] = useState(null); // To store the generated plan
    const navigate = useNavigate(); // Initialize navigate hook for redirection

    // Questions to ask when creating the plan
    const questions = [
        "What are your fitness goals (e.g., weight loss, muscle gain, etc.)?",
        "How many days a week can you commit to working out?",
        "Do you have any dietary restrictions or preferences?",
        "What equipment do you have access to (e.g., dumbbells, resistance bands, etc.)?"
    ];

    // Check if the user is logged in (for example purposes, assuming localStorage has a flag)
    const isLoggedIn = localStorage.getItem("userEmail") !== null;

    // Handle sending a regular fitness question to Gemini
    const handleSendMessage = async () => {
        if (!message.trim()) return;

        // Display the user's message in the chat
        const userMessage = { sender: 'user', text: message };
        setChatHistory((prev) => [...prev, userMessage]);
        setMessage('');
        setIsLoading(true);

        try {
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=Apikey`;

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

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                console.error('API Error:', response.status, response.statusText);
                throw new Error(`API returned status ${response.status}`);
            }

            const data = await response.json();
            const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn’t generate a response.';
            const botMessage = { sender: 'bot', text: botReply };

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

    // Handle Create a Plan button click
    const handleCreatePlan = () => {
        if (!isLoggedIn) {
            navigate('/loginPage'); // Redirect to login page if user is not logged in
            return;
        }

        // Clear chat history and reset states for plan creation
        setChatHistory([]);
        setQuestionsAnswered([]);
        setCurrentQuestionIndex(0);

        // Start asking the first question
        setChatHistory([
            { sender: 'bot', text: questions[0] }
        ]);
    };

    // Handle user answer to a question
    const handleAnswerQuestion = async () => {
        if (!message.trim()) return;

        // Display the user's answer in the chat
        const userMessage = { sender: 'user', text: message };
        setChatHistory((prev) => [...prev, userMessage]);
        setMessage('');

        // Save the answer to the current question
        setQuestionsAnswered((prev) => [
            ...prev,
            { question: questions[currentQuestionIndex], answer: message }
        ]);

        // Move to the next question or create the plan if all questions are answered
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setChatHistory((prev) => [
                ...prev,
                { sender: 'bot', text: questions[currentQuestionIndex + 1] }
            ]);
        } else {
            await createFitnessPlan();
        }
    };

    // Create fitness plan via Gemini API
    const createFitnessPlan = async () => {
        setIsLoading(true);

        const userAnswers = questionsAnswered.map((item) => item.answer);

        const planRequest = {
            contents: [
                {
                    parts: [
                        {
                            text: `Create a personalized fitness plan based on the following answers: 
                            1. Fitness Goals: ${userAnswers[0]} 
                            2. Workout Days: ${userAnswers[1]} 
                            3. Dietary Restrictions: ${userAnswers[2]} 
                            4. Available Equipment: ${userAnswers[3]}`
                        },
                    ],
                },
            ],
        };

        try {
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAJGgPFEjAl-26wI1Dz8Gc4sERqd3OJaNU`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(planRequest),
            });

            if (!response.ok) {
                console.error('API Error:', response.status, response.statusText);
                throw new Error(`API returned status ${response.status}`);
            }

            const data = await response.json();
            const generatedPlan = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, there was an issue generating the plan.';
            setPlan(generatedPlan); // Save the generated plan
            const botMessage = { sender: 'bot', text: generatedPlan };

            setChatHistory((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error creating fitness plan:', error);
            setChatHistory((prev) => [
                ...prev,
                { sender: 'bot', text: 'Sorry, there was an error processing your plan request. Please try again later.' },
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
                        <button className="new-chat-btn" onClick={() => setChatHistory([])}>
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
                                    <strong>{chat.sender === 'user' ? 'You' : 'AI Trainer'}:</strong> {chat.text}
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
                        onKeyDown={(e) => e.key === 'Enter' && (currentQuestionIndex < questions.length ? handleAnswerQuestion() : handleSendMessage())}
                    />
                    <button onClick={currentQuestionIndex < questions.length ? handleAnswerQuestion : handleSendMessage} disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default AITrainer;
