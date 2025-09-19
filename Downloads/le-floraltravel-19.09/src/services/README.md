# AI Service

This directory contains the centralized AI service for the Le FloralTravel application.

## AIService

The `AIService` class provides a centralized interface for all AI-related functionality using [DeepSeek API](https://api-docs.deepseek.com/).

### Features

- **Tour Recommendations**: Get AI-powered tour recommendations based on user queries
- **Trip Planning**: Generate personalized trip plans with structured data
- **Chat Interface**: Create and manage chat sessions with the AI assistant
- **Singleton Pattern**: Ensures single instance across the application
- **Error Handling**: Centralized error handling for all AI operations
- **OpenAI Compatible**: Uses OpenAI SDK for DeepSeek API integration

### Usage

```typescript
import { getAIService } from '../services/aiService';

// Get tour recommendations
const aiService = getAIService();
const recommendations = await aiService.getTourRecommendations({
    prompt: "I want a cultural tour in Vietnam",
    tours: tourData
});

// Create a chat session
const chat = aiService.createChat(systemInstruction);
const response = await aiService.sendChatMessage(chat, "Hello!");
```

### Configuration

The service automatically uses the `API_KEY` environment variable and defaults to the `deepseek-chat` model with the DeepSeek API endpoint.

### DeepSeek API Integration

- **Base URL**: `https://api.deepseek.com`
- **Model**: `deepseek-chat` (non-thinking mode of DeepSeek-V3.1)
- **API Format**: OpenAI-compatible chat completions
- **JSON Output**: Structured responses for tour recommendations
- **Temperature**: 0.7 for balanced creativity and consistency

### Benefits

- **Reusability**: Single source of truth for all AI operations
- **Maintainability**: Centralized configuration and error handling
- **Consistency**: Uniform API across all components
- **Performance**: Singleton pattern prevents multiple API client instances
- **Cost Effective**: DeepSeek provides competitive pricing compared to other AI providers
