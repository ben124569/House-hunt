#!/bin/bash

# House Hunt Platform - Supabase Setup Script
# This script helps you set up your Supabase project for the house hunting platform

echo "🏡 House Hunt Platform - Supabase Setup"
echo "========================================"
echo ""

# Step 1: Environment Setup
echo "📝 Step 1: Environment Setup"
echo "Copy .env.example to .env.local and fill in your Supabase details:"
echo ""
echo "Required values from your Supabase dashboard:"
echo "  - Project Reference ID (from URL)"
echo "  - Database Password (you set during creation)"
echo "  - Project URL (https://[project-id].supabase.co)"
echo "  - Anon Key (from Settings > API)"
echo ""

if [ ! -f .env.local ]; then
    echo "Creating .env.local from template..."
    cp .env.example .env.local
    echo "✅ Created .env.local - please fill in your Supabase details"
else
    echo "⚠️  .env.local already exists - please verify your Supabase settings"
fi

echo ""

# Step 2: Install dependencies
echo "📦 Step 2: Installing dependencies..."
npm install

echo ""

# Step 3: Generate Prisma client
echo "🔧 Step 3: Generating Prisma client..."
npx prisma generate

echo ""

# Step 4: Database setup instructions
echo "🗄️  Step 4: Database Setup"
echo ""
echo "After updating your .env.local file, run these commands:"
echo ""
echo "# Push schema to Supabase (creates tables)"
echo "npm run db:push"
echo ""
echo "# Optional: Seed with sample data"
echo "npm run db:seed"
echo ""
echo "# Open Prisma Studio to view data"
echo "npm run db:studio"
echo ""

# Step 5: Supabase configuration
echo "⚙️  Step 5: Supabase Configuration"
echo ""
echo "In your Supabase dashboard:"
echo "1. Go to Authentication > Settings"
echo "2. Add your domain to 'Site URL': http://localhost:3000"
echo "3. Add to 'Redirect URLs': http://localhost:3000/api/auth/callback/google"
echo "4. Enable Google provider in Authentication > Providers"
echo ""
echo "For production (Vercel):"
echo "5. Add production URLs: https://your-app.vercel.app"
echo "6. Add production callback: https://your-app.vercel.app/api/auth/callback/google"
echo ""

# Step 6: Row Level Security setup
echo "🔒 Step 6: Security Setup"
echo ""
echo "Run these SQL commands in Supabase SQL Editor:"
echo ""
cat << 'EOF'
-- Enable Row Level Security on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Property" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SuburbProfile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Note" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Analysis" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Document" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Activity" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PropertyComparison" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SavedSearch" ENABLE ROW LEVEL SECURITY;

-- Basic policies for family access
-- Users can see their own data and collaborate on properties
CREATE POLICY "Users can view their own profile" ON "User"
    FOR SELECT USING (auth.uid()::text = id);

-- Properties are visible to all authenticated users (family collaboration)
CREATE POLICY "Family members can view all properties" ON "Property"
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Family members can add properties" ON "Property"
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Notes are collaborative
CREATE POLICY "Family members can view all notes" ON "Note"
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Family members can add notes" ON "Note"
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Suburb profiles are read-only for all
CREATE POLICY "Everyone can view suburb profiles" ON "SuburbProfile"
    FOR SELECT USING (true);
EOF

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your Supabase credentials"
echo "2. Run: npm run db:push"
echo "3. Run: npm run db:seed (optional)"
echo "4. Configure authentication in Supabase dashboard"
echo "5. Run: npm run dev"
echo ""
echo "Your House Hunt Platform will be ready at http://localhost:3000"