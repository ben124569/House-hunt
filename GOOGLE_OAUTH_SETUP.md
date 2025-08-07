# Google OAuth Setup for House Hunt Platform

## Quick Setup Steps

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "New Project" or select existing project
3. Name: "House Hunt Platform"
4. Click "Create"

### 2. Enable Google+ API

1. In your project, go to "APIs & Services" > "Library"
2. Search for "Google+ API" 
3. Click on it and press "Enable"

### 3. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure OAuth consent screen first:
   - User Type: "External" (or Internal if G Suite)
   - App name: "House Hunt Platform"
   - User support email: Your email
   - Developer contact: Your email
   - Add scopes: `../auth/userinfo.email`, `../auth/userinfo.profile`
   - Add test users: Your family members' emails

4. Create OAuth client ID:
   - Application type: "Web application"
   - Name: "House Hunt Platform"
   
### 4. Configure Authorized URIs

**For Development:**
- Authorized JavaScript origins: `http://localhost:3000`
- Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

**For Production (Vercel):**
- Authorized JavaScript origins: `https://your-app.vercel.app`
- Authorized redirect URIs: `https://your-app.vercel.app/api/auth/callback/google`

### 5. Get Your Credentials

After creation, you'll see:
- **Client ID**: Something like `123456789-abc123def456.apps.googleusercontent.com`
- **Client Secret**: Something like `ABC123def456GHI789jkl012`

⚠️ **Important**: As of 2025, you can only see the client secret ONCE when it's created. Download it immediately!

## Environment Variables Format

```env
GOOGLE_CLIENT_ID="123456789-abc123def456.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="ABC123def456GHI789jkl012"
```

## Vercel Domain Setup

When your app is deployed to Vercel:

1. Note your Vercel URL (e.g., `house-hunt-abc123.vercel.app`)
2. Go back to Google Cloud Console > Credentials
3. Edit your OAuth client
4. Add production URIs:
   - Origin: `https://house-hunt-abc123.vercel.app`
   - Redirect: `https://house-hunt-abc123.vercel.app/api/auth/callback/google`

## Family Member Access

Add these emails as test users in OAuth consent screen:
- Your email
- Parents' emails  
- Overseas family members' emails

This allows them to sign in before app review (if using External user type).

## Troubleshooting

**Common Errors:**
- `origin_mismatch`: Check authorized JavaScript origins
- `redirect_uri_mismatch`: Check authorized redirect URIs
- `access_denied`: User not added as test user

**Testing:**
- Test locally first with localhost URLs
- Then test production with Vercel URLs
- Ensure HTTPS for production (HTTP only allowed for localhost)