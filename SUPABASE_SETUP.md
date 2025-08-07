# 🏡 House Hunt Platform - Complete Supabase Setup Guide

## Overview

This guide walks you through setting up Supabase PostgreSQL for your House Hunt Platform with proper configuration for family collaboration, real-time features, and Vercel deployment.

## 1. Create Supabase Project

### Step 1: Project Creation
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New project"
3. Configure:
   - **Name**: `house-hunt-platform`
   - **Database Password**: Generate strong password (save this!)
   - **Region**: `ap-southeast-2` (Sydney - closest to Adelaide)
   - **Plan**: Free tier (upgrade when needed)

### Step 2: Get Project Details
After creation (2-3 minutes), note these from your dashboard:

**Project Reference**: Found in URL: `https://supabase.com/dashboard/project/[PROJECT-REF]`

**From Settings > Database**:
- Host: `aws-0-ap-southeast-2.pooler.supabase.com`
- Database: `postgres`
- Username: `postgres.project-ref`
- Password: `[your-password]`
- Port: 6543 (Transaction) / 5432 (Session)

**From Settings > API**:
- Project URL: `https://[project-ref].supabase.co`
- Anon Key: `eyJ...` (public)
- Service Role: `eyJ...` (secret)

## 2. Database URL Configuration

### For Vercel (Serverless) - Use Transaction Mode
```env
# Recommended for serverless/edge functions
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# Optional: Direct connection for migrations
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres"
```

### Environment Variables Template
```env
# Database
DATABASE_URL="postgresql://postgres.abcdefghijklmn:your-password@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# NextAuth.js
NEXTAUTH_SECRET="your-32-char-secret"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (Family Authentication)
GOOGLE_CLIENT_ID="123456789-abcd.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your-secret"

# Supabase (Real-time Features)
NEXT_PUBLIC_SUPABASE_URL="https://abcdefghijklmn.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." # Optional
```

## 3. Initialize Database Schema

### Setup Commands
```bash
# 1. Copy environment template
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 2. Install dependencies
npm install

# 3. Generate Prisma client
npm run db:generate

# 4. Push schema to Supabase (creates tables)
npm run db:push

# 5. Optional: Add sample data
npm run db:seed

# 6. Verify with Prisma Studio
npm run db:studio
```

## 4. Supabase Dashboard Configuration

### Authentication Setup
1. **Go to Authentication > Settings**
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/api/auth/callback/google`

2. **Go to Authentication > Providers**
   - Enable Google provider
   - Add your Google OAuth credentials
   - Configure allowed domains (your family email domains)

3. **For Production (Vercel)**
   - Add production Site URL: `https://your-app.vercel.app`
   - Add production redirect: `https://your-app.vercel.app/api/auth/callback/google`

### Row Level Security (RLS)

Run these SQL commands in **SQL Editor**:

```sql
-- Enable RLS on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Property" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SuburbProfile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Note" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Analysis" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Document" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Activity" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PropertyComparison" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SavedSearch" ENABLE ROW LEVEL SECURITY;

-- Family collaboration policies
-- Users can manage their own profile
CREATE POLICY "Users manage own profile" ON "User"
    FOR ALL USING (auth.uid()::text = id);

-- All family members can collaborate on properties
CREATE POLICY "Family property collaboration" ON "Property"
    FOR ALL USING (auth.role() = 'authenticated');

-- Notes are fully collaborative
CREATE POLICY "Family note collaboration" ON "Note"
    FOR ALL USING (auth.role() = 'authenticated');

-- Suburb data is read-only for all
CREATE POLICY "Public suburb data" ON "SuburbProfile"
    FOR SELECT USING (true);

-- Analysis is collaborative
CREATE POLICY "Family analysis collaboration" ON "Analysis"
    FOR ALL USING (auth.role() = 'authenticated');

-- Documents require authentication
CREATE POLICY "Authenticated document access" ON "Document"
    FOR ALL USING (auth.role() = 'authenticated');

-- Activity log is read-only
CREATE POLICY "Activity read access" ON "Activity"
    FOR SELECT USING (auth.role() = 'authenticated');

-- Comparisons are user-specific but viewable by family
CREATE POLICY "Comparison collaboration" ON "PropertyComparison"
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users create own comparisons" ON "PropertyComparison"
    FOR INSERT WITH CHECK (auth.uid()::text = "createdById");

-- Saved searches are user-specific
CREATE POLICY "Personal saved searches" ON "SavedSearch"
    FOR ALL USING (auth.uid()::text = "userId");
```

## 5. Real-time Features Setup

### Enable Realtime
1. Go to **Settings > API**
2. Scroll to **Realtime**
3. Enable realtime for these tables:
   - `Property`
   - `Note`
   - `Activity`
   - `Analysis`

### Realtime Policies
```sql
-- Allow realtime subscriptions for authenticated users
ALTER PUBLICATION supabase_realtime ADD TABLE "Property";
ALTER PUBLICATION supabase_realtime ADD TABLE "Note";
ALTER PUBLICATION supabase_realtime ADD TABLE "Activity";
```

## 6. Family User Management

### Create Family User Roles
```sql
-- Custom function to assign user roles after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public."User" (id, email, name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    CASE 
      WHEN new.email LIKE '%@yourdomain.com' THEN 'EDITOR'::public."UserRole"
      ELSE 'VIEWER'::public."UserRole"
    END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run function on new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## 7. Backup and Migration Strategy

### Environment-Specific URLs
```bash
# Development
DATABASE_URL="postgresql://postgres.project-ref:pass@...pooler.supabase.com:6543/postgres?pgbouncer=true"

# Production (same but different project)
DATABASE_URL="postgresql://postgres.prod-ref:pass@...pooler.supabase.com:6543/postgres?pgbouncer=true"
```

### Migration Commands
```bash
# Create migration after schema changes
npx prisma db push --preview-feature

# Generate migration files
npx prisma migrate dev --name add_new_feature

# Deploy to production
npx prisma migrate deploy
```

## 8. Performance Optimization

### Database Indexing
Your Prisma schema already includes optimized indexes:
- Property searches by suburb, status, price
- User activity tracking
- Note threading and mentions
- Real-time subscription efficiency

### Connection Pooling
- **Transaction mode**: Best for serverless (Vercel)
- **Connection limit**: Set to 1 for serverless
- **Timeout**: 30 seconds default

## 9. Troubleshooting

### Common Issues

**Connection Errors**:
- Verify DATABASE_URL format
- Check project-ref and password
- Ensure using transaction mode (port 6543)

**Authentication Issues**:
- Check redirect URLs in Supabase dashboard
- Verify Google OAuth setup
- Ensure NEXTAUTH_SECRET is set

**RLS Policies**:
- Test policies in SQL Editor
- Check auth.uid() returns correct user
- Verify role-based access

### Useful Commands
```bash
# Test database connection
npx prisma db pull

# Reset database (destructive!)
npx prisma db push --force-reset

# Check database status
npx prisma studio

# View logs
# Check Vercel function logs for connection issues
```

## 10. Production Deployment

### Vercel Environment Variables
Set these in Vercel dashboard:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Security Checklist
- [ ] RLS enabled on all tables
- [ ] Family-appropriate policies configured
- [ ] Google OAuth configured with production URLs
- [ ] Service role key secured (not in client code)
- [ ] Database password secured
- [ ] Connection pooling optimized

---

## Quick Start Summary

1. **Create Supabase project** (ap-southeast-2 region)
2. **Copy credentials** to `.env.local`
3. **Run setup script**: `./setup-supabase.sh`
4. **Push database schema**: `npm run db:push`
5. **Configure authentication** in Supabase dashboard
6. **Set up RLS policies** via SQL Editor
7. **Start development**: `npm run dev`

Your House Hunt Platform will be ready for family collaboration with real-time updates, secure authentication, and optimized for Vercel deployment!