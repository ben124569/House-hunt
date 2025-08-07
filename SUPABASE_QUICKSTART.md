# 🚀 Supabase Quick Start - House Hunt Platform

## 1. Create Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New project"
3. Configure:
   - **Name**: `house-hunt-platform`
   - **Password**: Generate & save strong password
   - **Region**: `ap-southeast-2` (Sydney)

## 2. Get Your Connection String

**From Settings > Database**, use the Transaction pooling URI:

```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
```

**From Settings > API**:
```env
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 3. Set Up Environment

```bash
# Copy template and add your credentials
cp .env.example .env.local

# Run setup (includes dependencies, schema, policies)
npm run supabase:setup

# Push database schema to Supabase
npm run db:push

# Verify everything works
npm run supabase:verify

# Start development
npm run dev
```

## 4. Configure Authentication

**In Supabase Dashboard > Authentication > Settings:**

- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: `http://localhost:3000/api/auth/callback/google`

**Enable Google OAuth:**
1. Go to **Authentication > Providers**
2. Enable Google
3. Add your Google OAuth credentials

## 5. Database Security (Run in SQL Editor)

```sql
-- Enable RLS and set family collaboration policies
ALTER TABLE "Property" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Note" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

-- Family members can collaborate on all properties
CREATE POLICY "Family property access" ON "Property" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Family note access" ON "Note" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "User profile access" ON "User" FOR ALL USING (auth.uid()::text = id);
```

## 6. Production Deployment (Vercel)

Set these environment variables in Vercel:

- `DATABASE_URL` (same transaction pooling URL)
- `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL` (your production URL)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET` 
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Update Supabase auth URLs** for production:
- Site URL: `https://your-app.vercel.app`
- Redirect: `https://your-app.vercel.app/api/auth/callback/google`

---

**Need help?** Check the full guide: `/Users/benjaminmerritt/Code/Projects/house-hunt/SUPABASE_SETUP.md`