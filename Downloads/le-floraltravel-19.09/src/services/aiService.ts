import OpenAI from 'openai';

export interface AIConfig {
    model: string;
    apiKey: string;
    baseURL: string;
}

export interface TourRecommendationRequest {
    prompt: string;
    tours: Array<{
        id: string;
        title: string;
        country: string;
        experience: string;
        tripType?: string;
        durationDays?: number;
        activityLevel?: string;
        availableMonths?: string;
    }>;
}

export interface TourRecommendationResponse {
    recommendedTourIds: string[];
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    text: string;
    showActions?: boolean;
}

export class AIService {
    private client: OpenAI;
    private config: AIConfig;

    constructor(config: AIConfig) {
        this.config = config;
        this.client = new OpenAI({
            apiKey: config.apiKey,
            baseURL: config.baseURL,
            dangerouslyAllowBrowser: true,
        });
    }

    /**
     * Get tour recommendations based on user query
     */
    async getTourRecommendations(request: TourRecommendationRequest): Promise<TourRecommendationResponse> {
        const response = await this.client.chat.completions.create({
            model: this.config.model,
            messages: [
                {
                    role: "system",
                    content: "You are a travel recommendation assistant. Respond with valid JSON only."
                },
                {
                    role: "user",
                    content: `User wants to find a tour. Query: "${request.prompt}". Respond with a JSON object containing the "recommendedTourIds" array. These IDs must be from the following list of available tours: ${JSON.stringify(request.tours)}`
                }
            ],
            response_format: { type: "json_object" },
            stream: false
        });

        const content = response.choices[0]?.message?.content;
        if (!content) {
            throw new Error('No response content received');
        }

        return JSON.parse(content);
    }

    /**
     * Get tour recommendations for trip planning with structured data
     */
    async getTripPlanRecommendations(
        userRequest: string,
        tours: Array<{
            id: string;
            title: string;
            country: string;
            experience: string;
            activityLevel: string;
            duration: string;
        }>
    ): Promise<TourRecommendationResponse> {
        const prompt = `Based on the user's travel request, find the top 3 most suitable tours from the provided list. Prioritize tours that match the destination, interests, and duration.

User Request:
${userRequest}

Available Tours (JSON format):
${JSON.stringify(tours)}

Respond ONLY with a valid JSON object containing a single key "recommendedTourIds", which is an array of the 3 best-matching tour ID strings. Do not include any other text or explanation.`;

        const response = await this.client.chat.completions.create({
            model: this.config.model,
            messages: [
                {
                    role: "system",
                    content: "You are a travel planning assistant. Respond with valid JSON only."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            response_format: { type: "json_object" },
            stream: false
        });

        const content = response.choices[0]?.message?.content;
        if (!content) {
            throw new Error('No response content received');
        }

        return JSON.parse(content);
    }

    /**
     * Create a new chat session with system instruction
     */
    createChat(systemInstruction: string): ChatSession {
        return new ChatSession(this.client, this.config.model, systemInstruction);
    }

    /**
     * Send a message to an existing chat
     */
    async sendChatMessage(chat: ChatSession, message: string): Promise<string> {
        return await chat.sendMessage(message);
    }

    /**
     * Send a streaming message to an existing chat
     */
    async *sendChatMessageStream(chat: ChatSession, message: string): AsyncGenerator<string, void, unknown> {
        yield* chat.sendMessageStream(message);
    }
}

/**
 * Chat session wrapper for DeepSeek API
 */
export class ChatSession {
    private client: OpenAI;
    private model: string;
    private messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;

    constructor(client: OpenAI, model: string, systemInstruction: string) {
        this.client = client;
        this.model = model;
        this.messages = [
            { role: 'system', content: systemInstruction }
        ];
    }

    async sendMessage(message: string): Promise<string> {
        this.messages.push({ role: 'user', content: message });

        console.log(this.messages);
        const response = await this.client.chat.completions.create({
            model: this.model,
            messages: this.messages,
            stream: false,
            temperature: 0.7,
            max_tokens: 1000,
            top_p: 0.9
        });

        const content = response.choices[0]?.message?.content;
        if (!content) {
            throw new Error('No response content received');
        }

        this.messages.push({ role: 'assistant', content });
        return content;
    }

    async *sendMessageStream(message: string): AsyncGenerator<string, void, unknown> {
        this.messages.push({ role: 'user', content: message });

        console.log(this.messages);
        const stream = await this.client.chat.completions.create({
            model: this.model,
            messages: this.messages,
            stream: true,
            temperature: 0.7,
            max_tokens: 1000,
            top_p: 0.9
        });

        let fullContent = '';
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
                fullContent += content;
                yield content;
            }
        }

        this.messages.push({ role: 'assistant', content: fullContent });
    }
}

// Singleton instance
let aiServiceInstance: AIService | null = null;

/**
 * Get or create the AI service instance
 */
export function getAIService(): AIService {
    if (!aiServiceInstance) {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            throw new Error('API_KEY environment variable is required');
        }
        
        aiServiceInstance = new AIService({
            model: 'deepseek-chat',
            apiKey,
            baseURL: 'https://api.deepseek.com',
        });
    }
    
    return aiServiceInstance;
}

/**
 * Reset the AI service instance (useful for testing or reconfiguration)
 */
export function resetAIService(): void {
    aiServiceInstance = null;
}
