'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './AIChatbot.module.css';

interface Message {
    id: number;
    text: string;
    isBot: boolean;
    isTyping?: boolean;
}

// Pre-built Q&A database about Abhijat
const qaDatabase = [
    {
        keywords: ['hello', 'hi', 'hey', 'greetings'],
        response: "Hello! I'm Abhijat's AI assistant. I can tell you about his experience, skills, projects, and more. What would you like to know?",
    },
    {
        keywords: ['who', 'about', 'tell me about', 'introduce'],
        response: "Abhijat Sarari is a System Engineer at Wipro and Microsoft Learn Student Ambassador. He's passionate about AI/ML, cloud computing, and building innovative solutions. With 148+ hackathons and 600+ certifications, he's constantly pushing the boundaries of technology!",
    },
    {
        keywords: ['experience', 'work', 'job', 'career', 'wipro'],
        response: "Currently, Abhijat works as a System Engineer at Wipro, handling Citibank and RBS projects. Previously, he was an AI/ML Intern at Sciffer Analytics and a Research Intern at IIT Kharagpur working on NLP and computer vision.",
    },
    {
        keywords: ['skill', 'technology', 'tech', 'stack', 'programming'],
        response: "Abhijat's core skills include: Python, TensorFlow, PyTorch, AWS, Azure, Google Cloud, Docker, Kubernetes, React, and more. He specializes in AI/ML, cloud architecture, and full-stack development.",
    },
    {
        keywords: ['project', 'build', 'create', 'made'],
        response: "Some notable projects: SustainaPal (Microsoft Imagine Cup winner), CLIMA.AI (Dell Hackathon winner), BridgeQuest (Google Cloud winner), and Olifie (AI assistant). He has 36+ projects on DevPost!",
    },
    {
        keywords: ['hackathon', 'competition', 'contest'],
        response: "Abhijat has participated in 148+ hackathons worldwide! He's won multiple awards including at Microsoft Imagine Cup, Dell Hackathon, and Google Cloud events. Hackathons are his playground for innovation!",
    },
    {
        keywords: ['education', 'study', 'degree', 'university', 'college', 'bits'],
        response: "Abhijat holds a Master's degree from BITS Pilani in Computer Systems. He also has a Bachelor's degree in Computer Applications. He's a lifelong learner with 600+ certifications!",
    },
    {
        keywords: ['certification', 'certificate', 'credential'],
        response: "With 600+ certifications from Google, Microsoft, AWS, IBM, and more, Abhijat is highly credentialed. Notable ones include AWS Solutions Architect, Azure AI Engineer, and Google Cloud certifications.",
    },
    {
        keywords: ['microsoft', 'ambassador', 'mlsa'],
        response: "Abhijat is a Microsoft Learn Student Ambassador! He helps students learn about Microsoft technologies, organizes events, and builds community around tech education.",
    },
    {
        keywords: ['contact', 'email', 'reach', 'hire', 'connect'],
        response: "You can reach Abhijat at abhijatsarari@gmail.com or connect on LinkedIn (/in/abhijatsarari). He's open to exciting opportunities and collaborations!",
    },
    {
        keywords: ['ai', 'machine learning', 'ml', 'deep learning'],
        response: "AI/ML is Abhijat's passion! He works with TensorFlow, PyTorch, Scikit-learn, and has experience in NLP, computer vision, and generative AI. His IIT Kharagpur research focused on cutting-edge AI applications.",
    },
    {
        keywords: ['cloud', 'aws', 'azure', 'gcp'],
        response: "Abhijat is multi-cloud certified! He has expertise in AWS (Solutions Architect), Azure (AI Engineer), and Google Cloud. He designs scalable, secure cloud architectures.",
    },
    {
        keywords: ['hobby', 'interest', 'fun', 'free time'],
        response: "Besides coding, Abhijat enjoys participating in hackathons, writing technical articles on Medium, and exploring emerging technologies. He's always learning something new!",
    },
    {
        keywords: ['achievement', 'award', 'win', 'accomplishment'],
        response: "Key achievements: Microsoft Imagine Cup Global Recognition, Dell Hackathon Winner, Google Cloud Hackathon Winner, 148+ hackathons participated, 600+ certifications, and published research papers!",
    },
];

const defaultResponse = "I'm not sure about that specific topic (I'm a simple AI without internet access!). Try asking about Abhijat's skills, projects, experience, education, or achievements!";

function findBestResponse(input: string): string {
    const lowerInput = input.toLowerCase();

    for (const qa of qaDatabase) {
        if (qa.keywords.some(keyword => lowerInput.includes(keyword))) {
            return qa.response;
        }
    }

    return defaultResponse;
}

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 0,
            text: "Hi! I'm Abhijat's AI assistant. Ask me anything about his experience, skills, or projects!",
            isBot: true,
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: inputValue,
            isBot: false,
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');

        // Add typing indicator
        const typingId = Date.now() + 1;
        setMessages(prev => [...prev, { id: typingId, text: '', isBot: true, isTyping: true }]);

        // Simulate AI thinking time
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        // Get response
        const response = findBestResponse(inputValue);

        // Remove typing indicator and add response
        setMessages(prev =>
            prev.filter(m => m.id !== typingId).concat({
                id: Date.now() + 2,
                text: response,
                isBot: true,
            })
        );
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const quickQuestions = [
        "What are your skills?",
        "Tell me about your projects",
        "What's your experience?",
        "How can I contact you?",
    ];

    return (
        <>
            {/* Chat button */}
            <button
                className={`${styles.chatButton} ${isOpen ? styles.hidden : ''}`}
                onClick={() => setIsOpen(true)}
                aria-label="Open AI chat"
            >
                <span className={styles.chatIcon}>🤖</span>
                <span className={styles.chatLabel}>Ask AI</span>
                <div className={styles.chatPulse} />
            </button>

            {/* Chat window */}
            <div className={`${styles.chatWindow} ${isOpen ? styles.open : ''}`}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerInfo}>
                        <span className={styles.botAvatar}>🤖</span>
                        <div>
                            <h3>Abhijat AI</h3>
                            <span className={styles.status}>
                                <span className={styles.statusDot} />
                                Online
                            </span>
                        </div>
                    </div>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                        ✕
                    </button>
                </div>

                {/* Messages */}
                <div className={styles.messages}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`${styles.message} ${message.isBot ? styles.botMessage : styles.userMessage}`}
                        >
                            {message.isTyping ? (
                                <div className={styles.typing}>
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            ) : (
                                message.text
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick questions */}
                {messages.length === 1 && (
                    <div className={styles.quickQuestions}>
                        {quickQuestions.map((q) => (
                            <button
                                key={q}
                                className={styles.quickBtn}
                                onClick={() => {
                                    setInputValue(q);
                                    setTimeout(() => handleSend(), 100);
                                }}
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div className={styles.inputArea}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything..."
                        className={styles.input}
                    />
                    <button
                        className={styles.sendBtn}
                        onClick={handleSend}
                        disabled={!inputValue.trim()}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}
