# DeepSeek API Setup Guide

This application now uses [DeepSeek API](https://api-docs.deepseek.com/) instead of Google Gemini for AI functionality.

## Setup Instructions

### 1. Get DeepSeek API Key

1. Visit [DeepSeek Platform](https://platform.deepseek.com/api_keys)
2. Sign up or log in to your account
3. Create a new API key
4. Copy the API key for configuration

### 2. Configure Environment Variables

Create a `.env` file in the project root with:

```bash
API_KEY=your_deepseek_api_key_here
```

### 3. Install Dependencies

```bash
npm install
```

The application will automatically use the DeepSeek API with the following configuration:
- **Base URL**: `https://api.deepseek.com`
- **Model**: `deepseek-chat` (DeepSeek-V3.1 non-thinking mode)
- **API Format**: OpenAI-compatible

## Features

- **Tour Recommendations**: AI-powered search and recommendations
- **Trip Planning**: Personalized travel planning with structured data
- **Chat Assistant**: Interactive AI chat with "Chú Bơm" personality
- **JSON Output**: Structured responses for reliable data parsing

## API Compatibility

DeepSeek provides an OpenAI-compatible API, making the integration seamless. The service uses the OpenAI SDK to communicate with DeepSeek's endpoints.

## Cost Benefits

DeepSeek offers competitive pricing compared to other AI providers, making it cost-effective for production use.
