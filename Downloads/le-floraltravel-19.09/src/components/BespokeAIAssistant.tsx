import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLocalization } from '../hooks/useLocalization';
import { getAIService, ChatSession } from '../services/aiService';
import type { TranslationKey } from '../locales';
import type { View } from '../App';

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);

interface Message {
    role: 'user' | 'assistant';
    text: string;
    showActions?: boolean;
    isStreaming?: boolean;
}

interface BespokeAIAssistantProps {
    onNavigate: (view: View) => void;
}


export const BespokeAIAssistant: React.FC<BespokeAIAssistantProps> = ({ onNavigate }) => {
    const { t, language } = useLocalization();
    const [chat, setChat] = useState<ChatSession | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const chatWindowRef = useRef<HTMLDivElement>(null);

    const systemInstruction = `You are "Chú Bơm", a very friendly, enthusiastic, and highly knowledgeable travel expert for Le FloralTravel. Your name is Vietnamese and you project a warm, avuncular, and trustworthy personality. Your goal is to help users plan their dream trip by providing clear, well-structured, and persuasive advice.

**Core Directives:**

1.  **Personality:** Be energetic, positive, and passionate about travel. Use a slightly informal but very clear tone. You are the user's go-to expert.
2.  **Structure & Visuals:**
    *   **MANDATORY:** You MUST use emojis and icons to structure your response and make it easy to read. Break down your answer into clear, distinct sections.
    *   **Example Structure:**
        *   \`✨ **Destination Analysis:**\` (Briefly state why the user's idea is great).
        *   \`🗺️ **Suggested Itinerary:**\` (Provide a sample plan. Use bullet points for days or activities).
        *   \`🔬 **The Science of Beauty:**\` (Explain the best time to go with a factual reason, e.g., "The tulips in Keukenhof peak in mid-April due to the specific climate conditions, ensuring the most vibrant colors.").
        *   \`💎 **The Le FloralTravel Edge:**\` (Highlight what makes booking with the company special, e.g., "Our guides have exclusive access to a private section of the gardens...").
        *   \`🚀 **Ready for Adventure?**\` (End with a clear, engaging call to action or a question to continue the conversation).
3.  **Persuasion Style:**
    *   Be persuasive without being pushy or using clichés.
    *   Ground your recommendations in facts, unique value, and benefits. Instead of "It's a trip of a lifetime!", say "You'll see the lavender fields without the usual crowds because we time our visits for early morning light, which is also best for photography."
    *   Create a sense of value and opportunity, not just a sales pitch.
4.  **Language:**
    *   **CRITICAL:** You MUST respond in the language of the user's prompt. The current user's language code is: ${language}. If the user writes in English, respond in English. If they write in Vietnamese, respond in Vietnamese, etc.`;

    useEffect(() => {
        try {
            const aiService = getAIService();
            const newChat = aiService.createChat(systemInstruction);
            setChat(newChat);
            setMessages([{ role: 'assistant', text: t('ai_assistant.welcome_message') }]);
            setError(null);
        } catch (e) {
            console.error(e);
            setError(t('ai_assistant.error.generic'));
        } finally {
            setIsLoading(false);
        }
    }, [language, t, systemInstruction]);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSendMessage = useCallback(async (prompt: string) => {
        if (!prompt.trim() || !chat || isLoading) return;

        setUserInput('');
        setIsLoading(true);
        setError(null);
        setMessages(prev => [...prev, { role: 'user', text: prompt }]);

        // Add empty assistant message for streaming
        setMessages(prev => [...prev, { role: 'assistant', text: '', showActions: false, isStreaming: true }]);

        try {
            const aiService = getAIService();
            let fullResponse = '';
            
            for await (const chunk of aiService.sendChatMessageStream(chat, prompt)) {
                fullResponse += chunk;
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage.role === 'assistant') {
                        lastMessage.text = fullResponse;
                    }
                    return newMessages;
                });
            }
            
            // Mark the final message as complete with actions and stop streaming
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === 'assistant') {
                    lastMessage.showActions = true;
                    lastMessage.isStreaming = false;
                }
                return newMessages;
            });
        } catch (e) {
            console.error(e);
            setError(t('ai_assistant.error.generic'));
            // Stop streaming and remove the empty assistant message on error
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === 'assistant' && lastMessage.isStreaming) {
                    return newMessages.slice(0, -1);
                }
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    }, [chat, isLoading, t]);
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSendMessage(userInput);
    };

    const handleSuggestionClick = (prompt: string) => {
        setUserInput(prompt);
        handleSendMessage(prompt);
    }

    const suggestionPrompts: TranslationKey[] = [
        'ai_assistant.suggestions.prompt1',
        'ai_assistant.suggestions.prompt2',
        'ai_assistant.suggestions.prompt3'
    ];

    return (
        <div className="bespoke-ai-assistant">
            <div className="ai-assistant-header">
                <h3>{t('ai_assistant.title')}</h3>
                <p>{t('ai_assistant.description')}</p>
            </div>
            <div className="chat-window" ref={chatWindowRef}>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.role}`}>
                            <div className="message-avatar" aria-label={msg.role}>
                                {msg.role === 'assistant' ? 'CB' : 'U'}
                            </div>
                            <div className={`message-content ${msg.isStreaming ? 'streaming' : ''}`}>
                                {msg.role === 'assistant' ? (
                                     <>
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                                        {msg.showActions && (
                                            <div className="chat-actions">
                                                <button className="btn-secondary" onClick={() => onNavigate({ page: 'bestsellers' })}>
                                                    {t('ai_assistant.button.explore')}
                                                </button>
                                                <button className="btn-secondary" onClick={() => onNavigate({ page: 'contact' })}>
                                                    {t('ai_assistant.button.get_in_touch')}
                                                </button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    msg.text
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="suggestion-pills">
                {suggestionPrompts.map(key => (
                    <button 
                        key={key} 
                        className="suggestion-pill" 
                        onClick={() => handleSuggestionClick(t(key))}
                        disabled={isLoading}
                    >
                        {t(key)}
                    </button>
                ))}
            </div>

            <form className="chat-input-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="chat-input"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder={t('ai_assistant.input_placeholder')}
                    aria-label={t('ai_assistant.input_placeholder')}
                    disabled={isLoading || !!error}
                />
                <button type="submit" className="btn chat-submit-btn" disabled={!userInput.trim() || isLoading || !!error} aria-label={t('ai_assistant.send_button_aria')}>
                    <SendIcon />
                </button>
            </form>
             {error && <p className="chat-error">{error}</p>}
        </div>
    );
};