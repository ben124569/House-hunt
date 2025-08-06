# 🚀 House Hunt Platform - Fresh Session Initialization Prompt

Copy and paste this entire prompt into a new Claude Code session to initialize your house hunt platform:

---

# 🏡 House Hunt Platform - Initial Setup & Build

You are about to build a family property research platform for house hunting in Northern Adelaide suburbs. This prompt will guide you through the complete initial setup using existing documentation and specialized AI agents.

## CRITICAL FIRST STEP: Read All Documentation

Before doing ANYTHING else, you MUST read these documentation files in order to understand the complete project requirements:

1. `/Users/benjaminmerritt/Code/Projects/house-hunt/docs/REQUIREMENTS.md` - Family requirements and criteria
2. `/Users/benjaminmerritt/Code/Projects/house-hunt/docs/FEATURES.md` - Complete feature specifications
3. `/Users/benjaminmerritt/Code/Projects/house-hunt/docs/DATABASE.md` - Database schema details
4. `/Users/benjaminmerritt/Code/Projects/house-hunt/docs/AGENTS.md` - Available AI agents
5. `/Users/benjaminmerritt/Code/Projects/house-hunt/docs/SETUP.md` - Technical setup guide
6. `/Users/benjaminmerritt/Code/Projects/house-hunt/CLAUDE.md` - Project-specific instructions

## PROJECT CONTEXT

**What**: Family property research platform for evidence-based house buying decisions
**Budget**: Under $900k
**Location**: Northern Adelaide suburbs
**Previous Sale**: $823k (family's previous house)
**Users**: Ben (tech-savvy), parents (local), overseas family members

### Non-Negotiable Requirements
- Single story only (NO 2-story houses)
- 2+ living areas
- 2+ bathrooms
- Accommodates 2 cars
- Dog-friendly backyard
- Solar panels installed
- NOT in flood zones (especially Angle Vale)
- NOT on heavy traffic roads

## SETUP WORKFLOW - Follow These Steps Exactly

### Step 1: Initialize T3 Stack Application
Use the t3-stack-architect agent to scaffold the project:

```bash
# First, check if project directory exists
cd /Users/benjaminmerritt/Code/Projects/house-hunt

# Use the t3-stack-architect agent to initialize:
# The agent is at: .claude/agents/t3-stack-architect.md
# Initialize with these exact specifications:
# - Next.js 14 with App Router
# - TypeScript (strict mode)
# - tRPC for type-safe API
# - Prisma ORM
# - NextAuth.js with Google provider
# - Tailwind CSS
# - Supabase for database (PostgreSQL)
```

### Step 2: Configure Database Schema
Use the database-engineer agent to set up Prisma schema:

```prisma
# The agent is at: .claude/agents/database-engineer.md
# Create these models based on docs/DATABASE.md:
# - Property (core listing data with status tracking)
# - SuburbProfile (reusable area intelligence)
# - Analysis (pricing and market analysis)
# - Note (family collaboration)
# - Document (attachments)
# - User (family members via NextAuth)
```

### Step 3: Set Up Environment Configuration
Create .env.local with these required variables:

```env
DATABASE_URL="[Supabase PostgreSQL connection string]"
DIRECT_URL="[Supabase direct connection for migrations]"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="[Generate secure secret]"
GOOGLE_CLIENT_ID="[From Google Cloud Console]"
GOOGLE_CLIENT_SECRET="[From Google Cloud Console]"
NEXT_PUBLIC_SUPABASE_URL="[Supabase project URL]"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[Supabase anon key]"
```

### Step 4: Create Core Project Structure

```
src/
├── app/
│   ├── layout.tsx (root layout with providers)
│   ├── page.tsx (dashboard home)
│   ├── properties/
│   │   ├── page.tsx (property listing)
│   │   └── [id]/
│   │       └── page.tsx (property detail)
│   ├── suburbs/
│   │   └── [name]/
│   │       └── page.tsx (suburb profile)
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       └── trpc/[trpc]/route.ts
├── components/
│   ├── property/
│   │   ├── PropertyCard.tsx
│   │   ├── PropertyGrid.tsx
│   │   └── PriceAnalysis.tsx
│   ├── suburb/
│   │   ├── SuburbProfile.tsx
│   │   └── RiskIndicators.tsx
│   └── shared/
│       ├── Navigation.tsx
│       └── CitationLink.tsx
├── server/
│   ├── api/
│   │   ├── routers/
│   │   │   ├── property.ts
│   │   │   ├── suburb.ts
│   │   │   └── analysis.ts
│   │   └── root.ts
│   └── db.ts
└── lib/
    ├── scrapers/
    │   └── realestate.ts
    └── validators/
        └── property.ts
```

### Step 5: Implement Core Components

Create these essential components with TypeScript and proper typing:

1. **PropertyCard** - Display property with auto-flagged risks
2. **SuburbProfile** - Reusable suburb intelligence display
3. **PriceAnalysis** - Show listing vs estimated price with evidence
4. **RiskIndicators** - Visual alerts for deal-breakers
5. **PropertyStatusBadge** - Show current status in workflow

### Step 6: Set Up tRPC Routes

Implement these essential API routes:

```typescript
// property.ts router
- property.create (add new property with validation)
- property.list (get active properties, max 5)
- property.updateStatus (move through workflow)
- property.checkDealBreakers (auto-flag issues)

// suburb.ts router
- suburb.getOrCreate (fetch cached or research new)
- suburb.updateIntelligence (refresh data > 6 months old)

// analysis.ts router  
- analysis.calculateFairValue (estimate based on comparables)
- analysis.findComparables (search recent sales)
```

### Step 7: Implement Deal-Breaker Detection

Create automatic validation that flags properties with:
- Flood zone location (check Angle Vale especially)
- 2-story structure
- No car accommodation
- Missing solar panels
- Heavy traffic road location
- Overhead power lines

### Step 8: Add Property Research Workflow

When adding a property from realestate.com.au URL:
1. Scrape all listing details using web-scraper-specialist agent
2. Auto-check against deal-breakers using deal-breaker-validator agent
3. Research or fetch suburb profile using suburb-intelligence agent
4. Calculate fair value estimate using market-analysis agent
5. Generate comprehensive report with citations using citation-quality-enforcer agent

## SPECIALIZED AGENTS TO USE

Located in `.claude/agents/` directory:
- **t3-stack-architect.md** - T3 stack setup and configuration
- **database-engineer.md** - Database schema and optimization
- **deal-breaker-validator.md** - Property validation against family criteria
- **web-scraper-specialist.md** - Australian real estate website scraping
- **property-listing-researcher.md** - Property data extraction
- **suburb-intelligence.md** - Area research and demographics
- **market-analysis.md** - Pricing and comparables
- **citation-quality-enforcer.md** - Source verification

## VALIDATION CHECKLIST

Before considering setup complete, ensure:
- [ ] T3 stack fully initialized with all packages
- [ ] Database schema matches docs/DATABASE.md exactly
- [ ] Authentication working with Google OAuth
- [ ] Property model includes all required fields
- [ ] Deal-breaker detection implemented and tested
- [ ] Status workflow (Researching → Interested → Viewing → Rejected/Purchased)
- [ ] Basic UI components created with TypeScript
- [ ] tRPC routes functional
- [ ] Environment variables configured
- [ ] Can add a property via URL
- [ ] Suburb profiles are reusable and cached
- [ ] All facts require citation URLs
- [ ] Data freshness indicators implemented

## IMPLEMENTATION PRIORITIES

1. **First**: Get basic T3 stack running with auth
2. **Second**: Implement Property and SuburbProfile models
3. **Third**: Create property listing and detail pages
4. **Fourth**: Add deal-breaker detection with agents
5. **Fifth**: Implement property research workflow

## TESTING THE FOUNDATION

Test with this example workflow:
- Find any realestate.com.au listing under $900k in Smithfield/Munno Para/Elizabeth
- Add property URL to platform
- Verify auto-detection of single/double story
- Check deal-breaker flagging works
- Confirm estimated vs listing price appears
- Validate complete suburb profile generation
- Test family notes and collaboration features

## IMPORTANT REMINDERS

- NEVER create unnecessary documentation files
- ALWAYS use TypeScript with strict typing
- EVERY data point needs a source URL citation
- Flag any data older than 6 months
- Maximum 5 active properties at once
- Family consensus drives status changes
- Professional presentation quality (impress software engineer dad)
- Mobile-responsive (for overseas mum)
- Use specialized agents proactively for their expertise areas

## SUCCESS CRITERIA

You have successfully set up the foundation when:
1. Next.js app runs locally with authentication working
2. Database migrations applied successfully
3. Can create and view properties with full details
4. Deal-breakers auto-flag correctly
5. Suburb profiles load, cache, and display properly
6. Basic UI matches family requirements and expectations
7. Citation system implemented and working
8. Property research workflow functional end-to-end
9. Family collaboration features (notes, status updates) working
10. All specialized agents integrated and functioning

**Begin by reading ALL documentation files listed at the start, then proceed with Step 1 using the appropriate specialized agents for each task.**