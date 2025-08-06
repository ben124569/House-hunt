# 🏡 House Hunt Research Platform - Claude Instructions

## Project Overview

This is a family property research platform for Ben, his parents, and overseas family members. The goal is to make evidence-based house-buying decisions with comprehensive suburb research and automated property analysis.

**Budget**: Under $900k | **Location**: Northern Adelaide suburbs | **Sold previous house for**: $823k

## Core Requirements

### Must-Have Property Features
- Under $900k asking price
- 2 living areas minimum
- 2 bathrooms minimum
- Single story (no 2-story houses)
- Can accommodate 2 cars
- Dog-friendly backyard
- Solar panels installed

### Deal Breakers (Auto-reject)
- Flood zones (especially Angle Vale)
- 2-story properties
- No car accommodation
- Non-dog-friendly yards
- No solar panels
- Heavy traffic roads
- Overhead power lines

## How to Add Properties to the Platform

### Quick Property Addition
When given a realestate.com.au URL, use these agents automatically:

1. **web-scraper-specialist**: Extract all property details, photos, agent info
2. **deal-breaker-validator**: Check family criteria and auto-reject if needed
3. **suburb-profiler** OR **adelaide-local-expert**: Research area intelligence  
4. **comparable-sales-analyst**: Find recent sales, detect overpricing
5. **risk-assessor**: Evaluate flood zones, infrastructure, market risks
6. **quality-controller**: Validate all data and ensure proper citations

### Agent Integration
The platform uses 16 specialized agents (see AGENT_SUMMARY.md for complete list):

**Foundation Agents**: t3-stack-architect, database-engineer, web-scraper-specialist, deal-breaker-validator

**Research Agents**: adelaide-local-expert, suburb-profiler, comparable-sales-analyst, risk-assessor

**Development Agents**: ui-component-specialist, api-architect, family-collaboration-manager

**Quality Agents**: quality-controller, report-generator, performance-optimizer

**Deployment Agents**: deployment-specialist, data-importer

### Research Standards
- **Every fact needs a source URL**
- **Flag data older than 6 months**
- **Provide confidence levels for estimates**
- **Check for deal breakers automatically**
- **Calculate estimated sale price vs listing price**

## Platform Structure

### Database Models (Prisma)
- `Property`: Core property data with status tracking
- `SuburbProfile`: Reusable area intelligence (crime, schools, risks)
- `Note`: Family collaboration and comments
- `Analysis`: Pricing analysis and recommendations
- `Document`: Attachments (contracts, reports)

### Property Status Flow
1. **Researching** → Initial investigation
2. **Interested** → Meets criteria, worth viewing
3. **Viewing** → Inspection scheduled
4. **Rejected** → Family decided against
5. **Purchased** → Successfully bought
6. **Archived** → Historical reference

## Key Features to Implement

### 1. Property Research Dashboard
```typescript
// Display active properties (max 5 at once)
<PropertyCard 
  address="45 Smith St, Smithfield"
  listingPrice="$850,000"
  estimatedPrice="$810,000" 
  status="Fair Value"
  risks={["flood-zone", "main-road"]}
  inspection="Sat 10am"
/>
```

### 2. Suburb Intelligence
```typescript
// Reusable suburb profiles
<SuburbProfile
  name="Angle Vale"
  medianPrice="$680,000"
  crimeRate="Medium"
  floodRisk="HIGH" // Auto-flag
  schools={["Angle Vale Primary", "Trinity College"]}
  commuteTime="45min to Adelaide"
  lastUpdated="2024-01-15"
/>
```

### 3. Price Analysis
```typescript
// Evidence-based pricing
<PriceAnalysis
  listingPrice={850000}
  estimatedValue={810000}
  difference={40000}
  confidence={85}
  comparables={[...recentSales]}
  reasoning="Based on 3 recent sales within 500m"
/>
```

## Technical Implementation

### Stack
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: tRPC + Prisma + PostgreSQL
- **Database**: Supabase (for real-time collaboration)
- **Deployment**: Vercel
- **Scraping**: Puppeteer for realestate.com.au

### Environment Variables
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
NEXT_PUBLIC_SUPABASE_URL="..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
```

## Research Workflow

### When Adding a New Property
1. **Scrape Property Data**: Extract all details from listing
2. **Check Deal Breakers**: Auto-flag any issues
3. **Research Suburb**: Get/create suburb profile with all data
4. **Analyze Pricing**: Find comparables, estimate fair value
5. **Generate Report**: Beautiful presentation with all evidence
6. **Cite Everything**: Every claim needs a source URL

### Suburb Research Checklist
- [ ] Crime statistics (SA Police data)
- [ ] School ratings and catchment zones
- [ ] Flood risk mapping (especially Gawler River)
- [ ] Demographics and income levels
- [ ] Distance/commute times to Adelaide CBD
- [ ] Recent sale prices and trends
- [ ] Future development plans (council websites)
- [ ] Local amenities (shopping, healthcare)

## Family Collaboration

### Notes System
- Real-time collaborative notes
- Consensus-based status updates (not individual)
- @mention system for family members
- Discussion threads per property
- Decision audit trail

### Presentation Requirements
- Clean, professional design (impress software engineer dad)
- Mobile-friendly (for overseas mum)
- All research properly cited
- Evidence easily clickable
- Historical tracking of decisions

## Common Prompts

### Add Property
"Add this property to our house hunt platform: [URL]. Make sure to check all our deal breakers and provide a complete suburb analysis with proper citations."

### Update Property Status
"Mark [address] as Rejected because [reason]. Archive it but keep all research for future reference."

### Generate Report
"Create a comprehensive family report for [address] including price analysis, suburb intelligence, and risk assessment."

### Suburb Research
"Research [suburb name] and create a reusable profile covering crime, schools, flood risk, and market trends. Cite all sources."

## Agent Workflow Examples

### Property Research Workflow
```
URL Input → web-scraper-specialist → deal-breaker-validator → 
suburb-profiler → comparable-sales-analyst → risk-assessor → 
quality-controller → report-generator
```

### Platform Development Workflow  
```
t3-stack-architect → database-engineer → api-architect → 
ui-component-specialist → family-collaboration-manager → 
deployment-specialist
```

## Common Prompts for Agents

### Property Analysis
- "Analyze this property for deal breakers: [URL]" (→ deal-breaker-validator)
- "Research [suburb name] comprehensively" (→ suburb-profiler + adelaide-local-expert)
- "Find comparable sales for [address]" (→ comparable-sales-analyst)
- "Assess risks for [property]" (→ risk-assessor)

### Development Tasks
- "Create property card component" (→ ui-component-specialist)
- "Set up tRPC routes for properties" (→ api-architect)  
- "Deploy to Vercel production" (→ deployment-specialist)
- "Optimize performance for mobile" (→ performance-optimizer)

## Code Standards & Preferences

### TypeScript
- Use strict mode with explicit types
- Prefer interfaces over types for object definitions
- Use Zod for runtime validation
- Export type definitions from separate files

### React Components
- Use functional components with hooks
- Prefer composition over inheritance
- Use TypeScript for all props interfaces
- Follow single responsibility principle

### Styling
- Use Tailwind CSS utility classes
- Match site.html color scheme (red/teal gradients)
- Mobile-first responsive design
- Professional, clean aesthetic

### Database
- Use Prisma for type-safe database access
- Follow naming conventions: camelCase for fields, PascalCase for models
- Include proper indexes for performance
- Use transactions for data integrity

### API Design
- Use tRPC for type-safe APIs
- Implement proper error handling
- Use middleware for authentication/authorization
- Include input validation with Zod schemas

## File Structure Reference
```
house-hunt/
├── docs/
│   ├── REQUIREMENTS.md - Detailed family requirements
│   ├── FEATURES.md - Complete feature specifications  
│   ├── AGENTS.md - AI agent documentation
│   ├── SETUP.md - Installation and deployment
│   ├── DATABASE.md - Schema and data models
│   └── *.md - Additional documentation
├── CLAUDE.md - This file (project instructions)
├── AGENT_SUMMARY.md - Complete agent overview
├── INITIALIZATION_PROMPT.md - Fresh session startup prompt
└── .claude/agents/ - All 16 specialized agents
```

## Success Metrics
- **Evidence-based decisions**: All choices backed by research with citations
- **Time efficiency**: Automated research reduces manual work by 80%+
- **Family inclusion**: Overseas mum can fully participate in decisions
- **Quality research**: Professional-grade suburb profiles and analysis
- **Technical excellence**: Impress software engineer dad with clean code
- **Data accuracy**: >95% of claims have verifiable sources
- **Performance**: <2s load times for overseas family on mobile

## Important Reminders
- NEVER create documentation files unless explicitly requested
- ALWAYS use specialized agents for their expertise areas
- PREFER editing existing files over creating new ones
- USE proper TypeScript typing throughout
- ENSURE every fact has a source URL citation
- MAINTAIN professional presentation quality
- OPTIMIZE for overseas family mobile experience
- FOLLOW family consensus for all property decisions