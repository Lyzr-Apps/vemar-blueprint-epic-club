# VEMAR.AI - AI Models Studio

A comprehensive Next.js application featuring Text-to-Speech, Text Processing, RAG-powered Chat, Deepfake Detection, and Analytics.

## Features

- **Text-to-Speech (TTS)**: Convert text to natural speech with 6 different voices
- **Text Models**: Summarize, translate, paraphrase, analyze, and extract information
- **RAG Chat Widget**: Context-aware AI assistant with document retrieval
- **Deepfake Detection**: BFSI fraud prevention and media verification
- **Analytics Dashboard**: Comprehensive metrics and insights
- **Investor Pitch**: India market opportunity analysis
- **API Security**: Secure API key management
- **Pricing**: Flexible pricing plans

## Tech Stack

- **Framework**: Next.js 14.2.13
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: React Icons
- **Charts**: Recharts
- **State Management**: React Hooks
- **API Routes**: Next.js API Routes

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn or pnpm

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd nextjs-project
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key
   NEXT_PUBLIC_APP_URL=http://localhost:3333
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3333](http://localhost:3333) in your browser

## Project Structure

```
nextjs-project/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── chat/            # RAG chat endpoint
│   │   ├── text-model/      # Text processing endpoint
│   │   └── tts/             # Text-to-speech endpoint
│   ├── ai-models/           # AI Models page
│   ├── analytics/           # Analytics dashboard
│   ├── api-security/        # API security page
│   ├── dashboard/           # Main dashboard
│   ├── deepfake-detection/  # Deepfake detection page
│   ├── demo/                # Product demo
│   ├── investor-pitch/      # Investor pitch page
│   ├── pricing/             # Pricing page
│   ├── submit-request/      # Request submission
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # Reusable components
│   ├── chat-widget.tsx      # RAG chat widget
│   └── navigation.tsx       # Navigation component
├── lib/                     # Utility functions
│   ├── rag.ts              # RAG service
│   └── textModel.ts        # Text model service
├── public/                  # Static assets
│   └── vemar-logo.png      # Logo
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server on port 3333

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## Features Overview

### 1. Text-to-Speech (TTS)
- 6 AI voices: Alloy, Echo, Fable, Onyx, Nova, Shimmer
- Adjustable speech speed (0.25x - 4.0x)
- High-quality audio output
- Character limit: 4096

### 2. Text Models
- **Summarize**: Create concise summaries
- **Translate**: 10+ languages support
- **Paraphrase**: Rewrite content
- **Complete**: Auto-complete text
- **Analyze**: Extract insights
- **Extract**: Keywords, entities, sentiment

### 3. RAG Chat Widget
- Context-aware responses
- Document retrieval
- Source attribution
- Conversation history
- Collapsible interface

### 4. Deepfake Detection
- Video analysis
- Image verification
- Audio authenticity
- Real-time scanning

### 5. Analytics
- Request metrics
- Success rates
- Processing times
- Error tracking

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed Vercel deployment instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/yourrepo)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for TTS and text models | Optional |
| `NEXT_PUBLIC_APP_URL` | Application URL | Optional |

## API Routes

### Chat API
- **Endpoint**: `/api/chat`
- **Methods**: POST, GET
- **Description**: RAG-powered chat with document retrieval

### Text Model API
- **Endpoint**: `/api/text-model`
- **Method**: POST
- **Description**: Text processing (summarize, translate, etc.)

### TTS API
- **Endpoint**: `/api/tts`
- **Method**: POST
- **Description**: Text-to-speech conversion

## Contributing

This is a proprietary application. For support or questions, contact the development team.

## License

Proprietary - All rights reserved

## Support

For issues or questions:
- Email: support@vemar.ai
- Documentation: See DEPLOYMENT.md
- Next.js Docs: https://nextjs.org/docs

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - UI components
- [React Icons](https://react-icons.github.io/react-icons/) - Icons
- [Recharts](https://recharts.org/) - Charts
- [TypeScript](https://www.typescriptlang.org/) - Type safety

---

Built by the team at Lyzr
