#!/bin/bash

echo "🏡 House Hunt Platform - Vercel Environment Setup"
echo "================================================"
echo ""

echo "This script will help you configure all required environment variables for Vercel deployment."
echo ""

# Check if vercel CLI is available
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "   npm i -g vercel"
    exit 1
fi

echo "📋 Required Environment Variables:"
echo "1. DATABASE_URL (from Supabase dashboard)"
echo "2. NEXTAUTH_SECRET (random 32-character string)"
echo "3. GOOGLE_CLIENT_ID (from Google Cloud Console)"
echo "4. GOOGLE_CLIENT_SECRET (from Google Cloud Console)"
echo ""

# Function to add environment variable
add_env_var() {
    local var_name="$1"
    local description="$2"
    local example="$3"
    
    echo "⚙️  Setting up: $var_name"
    echo "   Description: $description"
    if [ ! -z "$example" ]; then
        echo "   Example: $example"
    fi
    echo ""
    
    read -p "Enter value for $var_name: " var_value
    
    if [ -z "$var_value" ]; then
        echo "❌ No value provided. Skipping $var_name"
        return 1
    fi
    
    echo "$var_value" | vercel env add "$var_name"
    echo "✅ $var_name configured"
    echo ""
}

# Function to generate random secret
generate_secret() {
    openssl rand -base64 32 | tr -d "=+/" | cut -c1-32
}

echo "🚀 Starting environment variable setup..."
echo ""

# DATABASE_URL
echo "1️⃣ DATABASE_URL Setup"
echo "   To get your DATABASE_URL:"
echo "   - Go to your Supabase dashboard (https://supabase.com/dashboard)"
echo "   - Select your project"
echo "   - Click 'Connect' button"
echo "   - Choose 'URI' format"
echo "   - Copy the connection string (use Transaction mode for serverless)"
echo "   - It should look like: postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres"
echo ""
add_env_var "DATABASE_URL" "PostgreSQL connection string from Supabase" "postgresql://postgres.abc123:your-password@aws-0-us-west-1.pooler.supabase.com:6543/postgres"

# NEXTAUTH_SECRET
echo "2️⃣ NEXTAUTH_SECRET Setup"
echo "   This is a random secret for JWT encryption."
echo "   A secure secret will be generated for you."
echo ""
suggested_secret=$(generate_secret)
echo "   Suggested secret: $suggested_secret"
echo ""
read -p "Use suggested secret? (y/n): " use_suggested

if [ "$use_suggested" = "y" ] || [ "$use_suggested" = "Y" ]; then
    echo "$suggested_secret" | vercel env add "NEXTAUTH_SECRET"
    echo "✅ NEXTAUTH_SECRET configured with generated secret"
else
    add_env_var "NEXTAUTH_SECRET" "Random 32-character secret for NextAuth.js" "abc123def456ghi789..."
fi
echo ""

# GOOGLE_CLIENT_ID
echo "3️⃣ GOOGLE_CLIENT_ID Setup"
echo "   To get your Google OAuth credentials:"
echo "   - Go to Google Cloud Console (https://console.cloud.google.com/)"
echo "   - Create a new project or select existing one"
echo "   - Enable Google+ API"
echo "   - Go to 'Credentials' → 'Create Credentials' → 'OAuth 2.0 Client IDs'"
echo "   - Application type: 'Web application'"
echo "   - Authorized redirect URIs: https://your-app.vercel.app/api/auth/callback/google"
echo ""
add_env_var "GOOGLE_CLIENT_ID" "Google OAuth Client ID" "123456789-abc123def456.apps.googleusercontent.com"

# GOOGLE_CLIENT_SECRET
echo "4️⃣ GOOGLE_CLIENT_SECRET Setup"
echo "   This is the client secret from the same Google OAuth app."
echo ""
add_env_var "GOOGLE_CLIENT_SECRET" "Google OAuth Client Secret" "ABC123def456GHI789jkl012"

# Set production environment variables
echo "🔧 Setting additional production configuration..."
echo ""

# NEXTAUTH_URL
echo "Setting NEXTAUTH_URL to your Vercel deployment URL..."
vercel_url=$(vercel ls | grep "house-hunt" | head -n 1 | awk '{print $2}')
if [ ! -z "$vercel_url" ]; then
    echo "https://$vercel_url" | vercel env add "NEXTAUTH_URL"
    echo "✅ NEXTAUTH_URL set to: https://$vercel_url"
else
    echo "⚠️  Could not auto-detect Vercel URL. Please set NEXTAUTH_URL manually:"
    add_env_var "NEXTAUTH_URL" "Your Vercel app URL" "https://house-hunt-abc123.vercel.app"
fi
echo ""

# NODE_ENV
echo "production" | vercel env add "NODE_ENV"
echo "✅ NODE_ENV set to production"
echo ""

# SKIP_ENV_VALIDATION (for build)
echo "1" | vercel env add "SKIP_ENV_VALIDATION"
echo "✅ SKIP_ENV_VALIDATION configured for build process"
echo ""

echo "🎉 Environment setup complete!"
echo ""
echo "Next steps:"
echo "1. Deploy your app: vercel --prod"
echo "2. Test the deployment at your Vercel URL"
echo "3. Set up Google OAuth redirect URLs in Google Cloud Console"
echo ""
echo "Your app should now be fully functional on Vercel! 🚀"