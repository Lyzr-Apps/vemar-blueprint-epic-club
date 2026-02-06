# VEMAR.AI - Agentic Workflow Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         VEMAR.AI Multi-Agent System                          │
│                    (Next.js 14.2.13 + React + TypeScript)                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Frontend Layer (Client-Side)

### **app/page.tsx** - Main Application Component

```
┌──────────────────────────────────────────────────────────────┐
│                      User Interface                           │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐        │
│  │  Agent Tabs │  │ Quick Actions│  │ Payment      │        │
│  │  (7 Agents) │  │  - Pitch     │  │ Gateway Btn  │        │
│  │             │  │  - Tech Stack│  │              │        │
│  │  1. CEO     │  │  - Roadmap   │  └──────────────┘        │
│  │  2. Architect│  │  - Bus Plan │                          │
│  │  3. AI/ML   │  └─────────────┘                          │
│  │  4. RAG     │                                            │
│  │  5. Security│  ┌─────────────┐                          │
│  │  6. GTM     │  │ File Upload │                          │
│  │  7. Investor│  │ (Deepfake)  │                          │
│  └─────────────┘  └─────────────┘                          │
│                                                               │
└──────────────────────────────────────────────────────────────┘
        │                    │                    │
        ▼                    ▼                    ▼
```

---

## 2. Client Utilities Layer

### **lib/aiAgent.ts** - AI Agent Communication

```typescript
callAIAgent(message: string, agent_id: string, options?)
    │
    ├─ Sends POST to /api/agent
    ├─ Parameters: { message, agent_id, user_id, session_id }
    └─ Returns: { success, response: { status, result } }
```

### **lib/payment.ts** - Payment Gateway Communication

```typescript
getPaymentUrl()
    │
    ├─ Sends GET to /api/payment
    └─ Returns: { success, payment_url, message }

createPaymentSession(amount?, description?, metadata?)
    │
    ├─ Sends POST to /api/payment
    └─ Returns: { success, payment_url, message }
```

---

## 3. API Routes Layer (Server-Side)

### **app/api/agent/route.ts** - AI Agent Proxy

```
┌─────────────────────────────────────────────────────┐
│          /api/agent (Next.js API Route)             │
├─────────────────────────────────────────────────────┤
│                                                      │
│  POST Request:                                       │
│  {                                                   │
│    message: string,                                  │
│    agent_id: string,                                 │
│    user_id?: string,                                 │
│    session_id?: string                               │
│  }                                                   │
│                                                      │
│  ┌─────────────────────────────────┐                │
│  │ 1. Validate API Key (server)   │                │
│  │ 2. Generate UUID if needed     │                │
│  │ 3. Forward to Lyzr Agent API   │                │
│  │ 4. Parse JSON response         │                │
│  │ 5. Normalize response format   │                │
│  └─────────────────────────────────┘                │
│                                                      │
│  Response:                                           │
│  {                                                   │
│    success: boolean,                                 │
│    response: {                                       │
│      status: 'success' | 'error',                   │
│      result: { ...agent_response }                  │
│    }                                                 │
│  }                                                   │
│                                                      │
└─────────────────────────────────────────────────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  Lyzr Agent API       │
        │  (External Service)   │
        │  agent-prod.studio... │
        └───────────────────────┘
```

### **app/api/payment/route.ts** - Payment Gateway Proxy

```
┌─────────────────────────────────────────────────────┐
│        /api/payment (Next.js API Route)             │
├─────────────────────────────────────────────────────┤
│                                                      │
│  GET Request: (Get payment URL)                     │
│  - No parameters required                           │
│                                                      │
│  POST Request: (Create session)                     │
│  {                                                   │
│    amount?: number,                                  │
│    description?: string,                             │
│    user_id?: string,                                 │
│    session_id?: string,                              │
│    metadata?: object                                 │
│  }                                                   │
│                                                      │
│  ┌─────────────────────────────────┐                │
│  │ 1. Validate API Key (server)   │                │
│  │ 2. Return payment gateway URL  │                │
│  │ 3. Handle errors gracefully    │                │
│  └─────────────────────────────────┘                │
│                                                      │
│  Response:                                           │
│  {                                                   │
│    success: boolean,                                 │
│    payment_url: "https://pay.lyzr.ai",              │
│    message: string,                                  │
│    timestamp: string                                 │
│  }                                                   │
│                                                      │
└─────────────────────────────────────────────────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  Lyzr Payment API     │
        │  (External Service)   │
        │  pay.lyzr.ai          │
        └───────────────────────┘
```

---

## 4. Complete Agent Workflow

### **User Interaction Flow**

```
┌─────────────┐
│    USER     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────┐
│  Selects Agent (e.g., "Founder & CEO")  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Enters Query OR Uses Default Query     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│     AI Guardrails Check                 │
│  - Security validation                  │
│  - Length validation                    │
│  - Prohibited patterns                  │
└──────────────┬──────────────────────────┘
               │
               ├─ FAIL → Display Warning
               │
               ▼ PASS
┌─────────────────────────────────────────┐
│  handleConsultAgent() OR                │
│  handleQuickAction()                    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  callAIAgent(message, agent_id)         │
│  (lib/aiAgent.ts)                       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  POST /api/agent                        │
│  - Validates LYZR_API_KEY               │
│  - Generates user_id/session_id         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Lyzr Agent API                         │
│  https://agent-prod.studio.lyzr.ai/...  │
│  - Processes with GPT-4o                │
│  - RAG retrieval if needed              │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Response Parsing & Normalization       │
│  (parseLLMJson + normalizeResponse)     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Return to Frontend                     │
│  { success, response: { status, result }}│
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Render Response Component              │
│  - FounderCEORenderer                   │
│  - ProductArchitectRenderer             │
│  - AIMLRenderer, etc.                   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Auto-save to Agent History             │
│  Display "Up to date" status            │
└─────────────────────────────────────────┘
```

---

## 5. Payment Gateway Workflow

```
┌─────────────┐
│    USER     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────┐
│  Clicks "Payment Gateway" Button        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  handlePaymentGateway()                 │
│  (app/page.tsx)                         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  getPaymentUrl()                        │
│  (lib/payment.ts)                       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  GET /api/payment                       │
│  - Validates LYZR_API_KEY               │
│  - Returns payment URL                  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Response:                              │
│  {                                      │
│    success: true,                       │
│    payment_url: "https://pay.lyzr.ai",  │
│    message: "Payment gateway available" │
│  }                                      │
└──────────────┬──────────────────────────┘
               │
               ├─ SUCCESS → window.open(payment_url)
               │
               └─ FAIL → setError(message)
```

---

## 6. Quick Actions Workflow

```
┌─────────────┐
│    USER     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────┐
│  Clicks Quick Action Button             │
│  - Pitch Deck                           │
│  - Tech Stack                           │
│  - Roadmap                              │
│  - Business Plan                        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  handleQuickAction(actionType)          │
│                                         │
│  Action Map:                            │
│  - pitch-deck   → Agent 6 (Investor)    │
│  - tech-stack   → Agent 1 (Architect)   │
│  - roadmap      → Agent 1 (Architect)   │
│  - business-plan→ Agent 0 (CEO)         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  1. Switch to target agent              │
│  2. Set predefined query                │
│  3. Run AI Guardrails                   │
│  4. Auto-trigger consultation           │
└──────────────┬──────────────────────────┘
               │
               ▼
         [Same as Agent Workflow Above]
```

---

## 7. Security & Environment Configuration

### **Environment Variables (.env)**

```env
LYZR_API_KEY=sk-default-*********************
VITE_LYZR_API_KEY=sk-default-****************
```

### **Security Features**

```
┌─────────────────────────────────────────┐
│  AI Guardrails (Client-Side)            │
├─────────────────────────────────────────┤
│  ✓ Malicious query detection            │
│  ✓ Security bypass prevention           │
│  ✓ Input length validation              │
│  ✓ Personal data protection             │
│  ✓ Spam/phishing filtering              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  API Key Protection (Server-Side)       │
├─────────────────────────────────────────┤
│  ✓ Never exposed to client              │
│  ✓ All external calls proxied           │
│  ✓ Validated on every request           │
│  ✓ Error handling without leak          │
└─────────────────────────────────────────┘
```

---

## 8. Agent Registry

```typescript
const agents = [
  {
    id: '6985a1bbb37fff3a03c07c44',
    name: 'Founder & CEO',
    role: 'Strategic vision, mission, competitive moat',
    outputs: ['value_proposition', 'mission', 'vision', 'positioning',
              'north_star_metrics', 'moat_strategy']
  },
  {
    id: '6985a1d176d4fd436bf4b7bd',
    name: 'Product Architect',
    role: 'System architecture and product design',
    outputs: ['system_architecture', 'core_modules', 'mvp_features',
              'v1_features', 'v2_features', 'api_strategy']
  },
  {
    id: '6985a1fb301c62c7ca2c7daf',
    name: 'AI/ML Research',
    role: 'ML model design and evaluation',
    outputs: ['deepfake_model', 'behavioral_biometrics_model',
              'liveness_model', 'evaluation_metrics']
  },
  {
    id: '6985a21376d4fd436bf4b7c1',
    name: 'RAG & Knowledge',
    role: 'RAG workflows and knowledge management',
    outputs: ['vector_db_schema', 'knowledge_sources', 'rag_workflow',
              'explainability_approach', 'identity_memory_design']
  },
  {
    id: '6985a22af7f7d3ffa5d8664c',
    name: 'Security & Compliance',
    role: 'Security architecture and compliance',
    outputs: ['security_architecture', 'compliance_roadmap', 'threat_model',
              'data_retention_policy', 'privacy_techniques']
  },
  {
    id: '6985a2455eb49186d63e5dc9',
    name: 'GTM & Growth',
    role: 'Go-to-market and customer acquisition',
    outputs: ['icps', 'buyer_personas', 'pricing_tiers',
              'zero_to_one_strategy', 'channels']
  },
  {
    id: '6985a25f8ce1fc653cfdee55',
    name: 'Investor & Fundraising',
    role: 'Investor narrative and metrics',
    outputs: ['investor_narrative', 'tam_sam_som', 'funding_rounds',
              'key_metrics', 'pitch_deck_outline']
  }
]
```

---

## 9. Data Flow Summary

```
┌──────────────────────────────────────────────────────────────┐
│                     COMPLETE DATA FLOW                        │
└──────────────────────────────────────────────────────────────┘

USER INPUT
    │
    ├─→ Agent Selection
    ├─→ Query Input
    ├─→ Quick Action Click
    └─→ Payment Gateway Click
         │
         ▼
CLIENT-SIDE VALIDATION
    │
    ├─→ AI Guardrails (Security)
    ├─→ Input Sanitization
    └─→ State Management (React Hooks)
         │
         ▼
CLIENT UTILITY FUNCTIONS
    │
    ├─→ callAIAgent() → /api/agent
    └─→ getPaymentUrl() → /api/payment
         │
         ▼
NEXT.JS API ROUTES (Server-Side)
    │
    ├─→ Validate LYZR_API_KEY
    ├─→ Generate UUIDs
    ├─→ Forward to External APIs
    └─→ Parse & Normalize Responses
         │
         ▼
EXTERNAL SERVICES
    │
    ├─→ Lyzr Agent API (GPT-4o)
    └─→ Lyzr Payment Gateway
         │
         ▼
RESPONSE NORMALIZATION
    │
    └─→ { success, response: { status, result } }
         │
         ▼
FRONTEND RENDERING
    │
    ├─→ Type-safe Response Renderers
    ├─→ Auto-save to History
    └─→ Display Results/Errors
```

---

## 10. Key Features

### **Multi-Agent Collaboration**
- 7 specialized AI agents
- Shared session history
- Cross-agent context awareness

### **AI Guardrails**
- Real-time security validation
- Content moderation
- Input sanitization

### **Payment Integration**
- Secure server-side proxy
- External gateway integration
- Error handling

### **User Experience**
- Typewriter effect hero
- Auto-save functionality
- Theme switcher (Light/Dark/System)
- Export capabilities (JSON blueprints)
- File upload for deepfake detection

---

## 11. Technology Stack

```
┌─────────────────────────────────────────┐
│  Frontend                               │
├─────────────────────────────────────────┤
│  - Next.js 14.2.13 (App Router)        │
│  - React 18                             │
│  - TypeScript                           │
│  - Tailwind CSS                         │
│  - react-icons (FiIcons, SiIcons)      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Backend (API Routes)                   │
├─────────────────────────────────────────┤
│  - Next.js API Routes                   │
│  - Server-side validation               │
│  - Environment variable security        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  External Services                      │
├─────────────────────────────────────────┤
│  - Lyzr Agent API (GPT-4o)             │
│  - Lyzr Payment Gateway                 │
│  - OAuth (Pre-integrated)               │
└─────────────────────────────────────────┘
```

---

## 12. Deployment & Running

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Server runs on
http://localhost:3333

# Build for production
npm run build

# Start production server
npm start
```

---

## Conclusion

This agentic workflow provides:
- **Secure** API key management
- **Scalable** multi-agent architecture
- **Type-safe** TypeScript implementation
- **User-friendly** React interface
- **Production-ready** error handling
- **Payment gateway** integration

All components work together seamlessly to create a comprehensive AI-powered venture studio platform.
