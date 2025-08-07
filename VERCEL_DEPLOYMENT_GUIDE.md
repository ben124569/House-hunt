# 🚀 House Hunt Platform - Vercel Deployment Guide

Your House Hunt Platform has been successfully built and is ready for deployment! Follow this guide to get it fully functional on Vercel.

## Current Status

✅ **Application Built** - All components and features implemented
✅ **Deployed to Vercel** - Available at your Vercel URL
⚠️ **Environment Variables Needed** - Database and auth not configured yet

## Quick Setup (Recommended)

Run the automated setup script:

```bash
./setup-vercel-env.sh
```

This script will guide you through configuring all required environment variables.

## Manual Setup Instructions

### 1. Database Setup (Supabase)

1. **Create Supabase Project** (if not done):
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Choose a region close to your users
   - Set a strong database password

2. **Get Database URL**:
   - Go to your Supabase dashboard
   - Click "Connect" button
   - Choose "URI" format
   - Copy the **Transaction mode** connection string (best for Vercel)
   - Should look like: `postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`

3. **Add to Vercel**:
   ```bash
   vercel env add DATABASE_URL
   # Paste your connection string when prompted
   ```

### 2. Authentication Setup (Google OAuth)

1. **Google Cloud Console**:
   - Go to [console.cloud.google.com](https://console.cloud.google.com)
   - Create new project or select existing
   - Enable "Google+ API" (in APIs & Services)

2. **Create OAuth Credentials**:
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: "House Hunt Platform"
   - Authorized redirect URIs: `https://your-vercel-url.vercel.app/api/auth/callback/google`

3. **Add to Vercel**:
   ```bash
   vercel env add GOOGLE_CLIENT_ID
   # Enter your client ID
   
   vercel env add GOOGLE_CLIENT_SECRET  
   # Enter your client secret
   ```

### 3. NextAuth Configuration

1. **Generate Secret**:
   ```bash
   openssl rand -base64 32
   ```

2. **Add to Vercel**:
   ```bash
   vercel env add NEXTAUTH_SECRET
   # Paste the generated secret
   
   vercel env add NEXTAUTH_URL
   # Enter: https://your-vercel-url.vercel.app
   ```

### 4. Deploy with Environment Variables

```bash
# Deploy to production
vercel --prod

# Or redeploy existing
vercel --prod --force
```

## Family Access Control

The platform includes role-based access:

- **Admin**: Full access (Ben)
- **Editor**: Can add/edit properties (Parents) 
- **Viewer**: Read-only access (Overseas family)

Configure family member emails in the deployed app's admin panel.

## Features Overview

Your deployed platform includes:

### 🏠 Property Management
- Add properties via realestate.com.au or domain.com.au URLs
- Automatic data extraction and deal-breaker detection
- Status tracking (Researching → Interested → Viewing → Purchased)
- Family collaboration with notes and discussions

### 📊 Suburb Intelligence  
- Comprehensive suburb research (crime, schools, flood risk)
- Northern Adelaide focus with council area mapping
- Market analysis and price comparisons
- Evidence-based recommendations with citations

### 🤖 AI-Powered Analysis
- Deal-breaker validation against family requirements
- Property value estimation vs listing price  
- Market trend analysis and comparable sales
- Risk assessment (flood zones, traffic, etc.)

### 👥 Family Collaboration
- Real-time notes and comments
- @mention system for family members
- Status consensus (not individual decisions)
- Complete audit trail of all decisions

## Budget and Requirements Enforcement

The platform automatically enforces your family requirements:

- **Budget**: Under $900k (auto-reject if over)
- **Stories**: Single story only (auto-reject 2-story)
- **Bathrooms**: Minimum 2 bathrooms required
- **Living Areas**: Minimum 2 living areas required
- **Parking**: Must accommodate 2+ cars
- **Solar**: Solar panels required
- **Flood Risk**: Auto-flags Angle Vale and high-risk areas
- **Dog Friendly**: Backyard must be suitable for dogs

## Troubleshooting

### Common Issues

1. **"Internal Server Error"** - Check DATABASE_URL is correct
2. **"Sign in failed"** - Verify Google OAuth credentials and redirect URLs
3. **Build fails** - Ensure all environment variables are set

### Getting Help

Check the Vercel deployment logs:
```bash
vercel logs --follow
```

### Support Files

- `setup-vercel-env.sh` - Automated environment setup
- `vercel.json` - Deployment configuration
- `CLAUDE.md` - Complete project documentation
- `DATABASE.md` - Database schema details

## Success Checklist

- [ ] Database connected (Supabase)
- [ ] Google OAuth configured
- [ ] Environment variables set
- [ ] Deployed to production
- [ ] Family members can sign in
- [ ] Property addition works
- [ ] Deal-breaker detection active
- [ ] Suburb research functional

## Next Steps After Deployment

1. **Test the full workflow**:
   - Sign in with Google
   - Add a test property URL
   - Verify deal-breaker detection
   - Test family collaboration

2. **Configure family access**:
   - Add family member emails
   - Set appropriate roles
   - Test multi-user collaboration

3. **Add real properties**:
   - Start with 2-3 Northern Adelaide properties
   - Review automated analysis
   - Use family notes for decisions

Your House Hunt Platform is now ready to help your family make evidence-based property decisions! 🎉