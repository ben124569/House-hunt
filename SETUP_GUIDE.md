# 🏡 House Hunt Platform Setup Guide

## Quick Start

Follow these steps to get your House Hunt Platform running locally:

### 1. Environment Setup

1. Copy the environment template:
```bash
cp .env.local .env
```

2. Update the `.env` file with your actual credentials (see sections below)

3. Install dependencies:
```bash
npm install
```

### 2. Database Setup (Choose Option A or B)

#### Option A: Supabase (Recommended)

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings → Database
4. Copy the connection string and update your `.env`:
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres"
```
5. Go to Project Settings → API
6. Copy the URL and anon key:
```env
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT_ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[ANON_KEY]"
```

#### Option B: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database:
```bash
createdb house_hunt_dev
```
3. Update your `.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/house_hunt_dev"
```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth Client ID
5. Choose "Web Application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy Client ID and Client Secret to your `.env`:
```env
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

### 4. NextAuth Secret

Generate a secure secret:
```bash
openssl rand -base64 32
```

Add to your `.env`:
```env
NEXTAUTH_SECRET="your_generated_secret"
```

### 5. Database Migration

Run the database setup:
```bash
npm run db:migrate  # Create database tables
npm run db:seed     # Add sample data (optional)
```

### 6. Start Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Sample Environment File

Your `.env` file should look like this:

```env
# Database
DATABASE_URL="postgresql://postgres:password@db.project.supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_SECRET="your_secure_secret_from_openssl"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="123456789-abcdef.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_key"
```

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check PostgreSQL is running (local) or Supabase project is active
- Run `npm run db:studio` to test connection

### Authentication Issues
- Verify Google OAuth credentials
- Check redirect URIs match exactly
- Ensure NEXTAUTH_SECRET is set

### Build Issues
- Run `npm run type-check` to check for TypeScript errors
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database with sample data
```

## Next Steps

Once setup is complete:

1. Sign in with Google OAuth
2. Add your first property by pasting a realestate.com.au URL
3. Explore the suburb intelligence features
4. Test family collaboration with notes
5. Review the automated deal-breaker detection

The platform is now ready for property research and family collaboration!