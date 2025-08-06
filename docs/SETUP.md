# 🚀 Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or later
- **pnpm** 8.0 or later (or npm/yarn)
- **PostgreSQL** 14 or later (or use Supabase)
- **Git**
- **Chrome/Chromium** (for web scraping)

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/house-hunt.git
cd house-hunt
```

## Step 2: Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

## Step 3: Initialize T3 Stack

If starting fresh, create a new T3 app:

```bash
pnpm create t3-app@latest house-hunt --noGit

# Select the following options:
# ✓ TypeScript
# ✓ Tailwind CSS
# ✓ tRPC
# ✓ NextAuth.js
# ✓ Prisma
# ✓ App Router
```

## Step 4: Database Setup

### Option A: Using Supabase (Recommended)

1. Create a free account at [supabase.com](https://supabase.com)

2. Create a new project

3. Get your database URL from Project Settings → Database

4. Update `.env.local`:
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT_ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[ANON_KEY]"
```

### Option B: Local PostgreSQL

1. Install PostgreSQL:
```bash
# macOS
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/
```

2. Create database:
```bash
createdb househunt
```

3. Update `.env.local`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/househunt"
```

## Step 5: Environment Configuration

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Configure all required variables:

```env
# Database (from Step 4)
DATABASE_URL="your_database_url"

# NextAuth
NEXTAUTH_SECRET="generate_with_openssl_rand_base64_32"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (for authentication)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Optional: External APIs
DOMAIN_API_KEY=""  # If you have access
OPENAI_API_KEY=""  # For AI features
GOOGLE_PLACES_KEY=""  # For location data

# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
```

### Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth Client ID
5. Choose Web Application
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy Client ID and Client Secret

## Step 6: Database Schema Setup

1. Generate Prisma client:
```bash
pnpm db:generate
```

2. Push schema to database:
```bash
pnpm db:push
```

3. (Optional) Seed with sample data:
```bash
pnpm db:seed
```

4. Verify with Prisma Studio:
```bash
pnpm db:studio
```

## Step 7: Install Additional Dependencies

```bash
# Web scraping
pnpm add puppeteer puppeteer-extra puppeteer-extra-plugin-stealth

# Real-time features
pnpm add @supabase/supabase-js

# Data visualization
pnpm add recharts

# PDF generation
pnpm add @react-pdf/renderer

# File uploads
pnpm add uploadthing @uploadthing/react

# State management
pnpm add zustand

# Forms
pnpm add react-hook-form @hookform/resolvers zod

# UI components
pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu
pnpm add @radix-ui/react-tabs @radix-ui/react-toast
```

## Step 8: Configure Puppeteer

For web scraping to work, configure Puppeteer:

1. Install Chromium:
```bash
# macOS
brew install chromium

# Ubuntu/Debian
sudo apt install chromium-browser

# Windows - Download from chromium.org
```

2. Set environment variable:
```env
PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"  # Adjust path as needed
```

## Step 9: Start Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application!

## Step 10: Initial Setup in App

1. **Create your account**: Sign in with Google
2. **Invite family members**: Settings → Family → Invite
3. **Add first property**: Click "Add Property" and paste a listing URL
4. **Explore features**: Notes, suburb profiles, market analysis

## Project Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:e2e": "playwright test"
  }
}
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Failed
```
Error: Can't reach database server
```
**Solution**: Verify DATABASE_URL and ensure PostgreSQL is running

#### 2. Puppeteer Launch Failed
```
Error: Failed to launch the browser process
```
**Solution**: Install Chromium and set PUPPETEER_EXECUTABLE_PATH

#### 3. Authentication Not Working
```
Error: NEXTAUTH_URL mismatch
```
**Solution**: Ensure NEXTAUTH_URL matches your development URL

#### 4. Prisma Schema Issues
```
Error: Schema out of sync
```
**Solution**: Run `pnpm db:push` to sync schema

#### 5. TypeScript Errors
```
Error: Type errors in build
```
**Solution**: Run `pnpm type-check` and fix any issues

### Getting Help

1. Check the [documentation](../README.md)
2. Search [existing issues](https://github.com/yourusername/house-hunt/issues)
3. Ask in [discussions](https://github.com/yourusername/house-hunt/discussions)
4. Create a new issue with:
   - Error message
   - Steps to reproduce
   - Environment details

## Production Deployment

### Vercel Deployment

1. Push to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Import in Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Configure environment variables
   - Deploy!

3. Set production environment variables in Vercel dashboard

4. Update OAuth redirect URLs in Google Console

### Docker Deployment

1. Build image:
```bash
docker build -t house-hunt .
```

2. Run container:
```bash
docker run -p 3000:3000 \
  --env-file .env.production \
  house-hunt
```

### Database Migrations

For production:
```bash
# Generate migration
pnpm prisma migrate dev --name add_feature

# Apply to production
pnpm prisma migrate deploy
```

## Security Checklist

- [ ] Strong NEXTAUTH_SECRET
- [ ] HTTPS in production
- [ ] Environment variables secured
- [ ] Database connection encrypted
- [ ] Input validation enabled
- [ ] Rate limiting configured
- [ ] CORS properly set
- [ ] Content Security Policy added
- [ ] Regular dependency updates
- [ ] Backup strategy in place

## Performance Optimization

1. **Enable caching**:
```typescript
// In api routes
export const config = {
  runtime: 'edge',
  unstable_cache: ['property', 'suburb']
};
```

2. **Image optimization**:
```typescript
import Image from 'next/image';
// Use Next.js Image component
```

3. **Database indexes**:
```prisma
model Property {
  @@index([suburb])
  @@index([status])
  @@index([createdAt])
}
```

4. **API response caching**:
```typescript
// Cache suburb data
const suburbCache = new Map();
```

## Monitoring

1. **Set up error tracking** (Sentry):
```bash
pnpm add @sentry/nextjs
```

2. **Analytics** (Vercel Analytics):
```bash
pnpm add @vercel/analytics
```

3. **Performance monitoring**:
```bash
pnpm add @vercel/speed-insights
```

## Backup Strategy

1. **Database backups**:
   - Supabase: Automatic daily backups
   - Local: Use pg_dump

2. **Code backups**:
   - GitHub repository
   - Regular commits

3. **Media backups**:
   - Property images to cloud storage
   - Documents to secure storage

## Next Steps

1. ✅ Complete setup
2. 📝 Read [Features Documentation](FEATURES.md)
3. 🤖 Configure [AI Agents](AGENTS.md)
4. 👨‍👩‍👧‍👦 Invite family members
5. 🏡 Start adding properties!

---

Need help? Check our [troubleshooting guide](#troubleshooting) or [create an issue](https://github.com/yourusername/house-hunt/issues).