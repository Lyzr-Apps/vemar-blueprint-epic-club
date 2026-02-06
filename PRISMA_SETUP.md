# Prisma Database Setup Instructions

## Current Status

The application is currently running with a **mock Prisma client** as a temporary fallback. This allows the UI to load without errors, but database operations will not persist data.

## Why the Mock Client?

Due to npm installation issues in the current environment, we couldn't install `@prisma/client` and `prisma` packages. The mock client provides placeholder responses so the application can still demonstrate its functionality.

## Setting Up Real Database (For Production)

Once you have a working npm environment, follow these steps:

### 1. Install Prisma Packages

```bash
npm install @prisma/client
npm install -D prisma
```

### 2. Set Up Database Connection

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/client_manager?schema=public"
```

Replace with your PostgreSQL connection string.

### 3. Initialize Prisma

The schema is already created at `prisma/schema.prisma`. Run:

```bash
# Create database tables
npx prisma db push

# Or use migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

### 4. Remove Mock Client

Once Prisma is installed, the application will automatically use the real Prisma client instead of the mock.

## Database Schema

The schema includes:

- **Client** - Client information and contact details
- **Request** - Client requests with categories, priorities, and statuses
- **Message** - Communication thread for each request
- **Attachment** - File attachments for requests
- **AgentAction** - Audit log of agent activities
- **ClientNote** - Internal notes about clients
- **AgentConfig** - Configuration for different agent types

## Features

- **8 Specialized Agents**: Support, Technical, Creative, Consulting, Content, Marketing, Analytics, General
- **Auto-Assignment**: Requests are automatically assigned to the most suitable agent based on category
- **Priority Queue**: Requests are prioritized (URGENT > HIGH > MEDIUM > LOW)
- **Load Balancing**: Distributes requests across agents based on capacity
- **Analytics Dashboard**: Track completion rates, agent performance, system load

## Troubleshooting

If you see warnings about "Mock Prisma Client", it means the real Prisma client isn't installed yet. The app will still work for UI demonstration, but data won't be saved.

To verify Prisma is working:
```bash
npx prisma studio
```

This opens a GUI to view and edit your database.
