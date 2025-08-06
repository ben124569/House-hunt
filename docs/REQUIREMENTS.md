# 🏡 House Hunt Platform - Detailed Requirements

## Family Context
- **Users**: Ben, Mum (overseas), Dad (software engineer)
- **Budget**: Under $900k (sold previous house for $823k)
- **Location**: Northern suburbs of Adelaide
- **Current Process**: Manual searching on realestate.com.au → Facebook Messenger group chat → Inspections

## Core Criteria & Deal Breakers

### Must Haves
- Under $900k
- 2 living areas
- 2 bathrooms
- Can fit 2 cars
- Single story (no 2-story houses)
- Dog-friendly backyard
- Solar panels

### Nice to Have
- Potential for value growth over 5 years (home to live in, not investment)

### Deal Breakers
- Flood zones (especially Angle Vale area)
- 2-story properties
- No car accommodation
- Non-dog-friendly yards
- No solar panels
- Main roads with heavy traffic
- Power lines overhead

## Target Suburbs
- Northern suburbs of Adelaide
- Need research on which suburbs are good vs have bad reputations
- Use existing saved searches on realestate.com.au as baseline

## Core Features (Phase 1 Priority)

### 1. Automatic Property Research
**User Action**: Paste realestate.com.au URL
**System Response**: 
- Scrape all property details
- Find comparable recent sales (last 6 months, similar beds/baths)
- Calculate estimated actual sale price vs listing price
- Identify overpricing with evidence
- Check for deal breakers automatically
- All data properly cited with source links

### 2. Suburb Intelligence Profiles
**Purpose**: Research once, use forever
**Content**:
- Crime statistics (government sources)
- School ratings and catchments
- Flood risk mapping
- Distance to Adelaide CBD (actual commute times)
- Suburb median prices and historical trends
- Local reputation research
- Future development plans

### 3. Overpricing Detection
**Display**: Simple visual comparison
```
Listing Price: $850,000
Est. Sale Price: $780,000
Assessment: ⚠️ Overpriced by $70,000 (+9%)
```
Click to see supporting evidence and comparable sales.

## Platform Requirements

### Family Dashboard
- Show 3-5 active properties at once
- Visual indicators for overpricing, deal breakers, flood risks
- Upcoming inspection calendar
- Archive of rejected properties (permanent storage)
- Easy status updates (researching → viewing → rejected/purchased)

### Property Detail Pages
**Design**: Professional layout similar to existing site.html example
**Tabs**:
- Overview (stats, photos, key details)
- Price Analysis (comparables, estimated value, evidence)
- Suburb Intelligence (area research, risks, amenities)  
- Family Notes (collaborative discussion)
- Red Flags (automated warnings with citations)

### Data Requirements
- **Historical tracking**: Previous sale prices, price changes over time
- **Citation system**: Every fact must have a verifiable source with URL
- **Data freshness**: Flag when information is outdated
- **Evidence-based**: Click any claim to see supporting data

### Collaboration Features
- Real-time family notes and comments
- Consensus-based property status (not individual decisions)
- Beautiful presentation for sharing with family overseas
- Professional reports to show research quality

## Technical Specifications

### Architecture
- T3 Stack (Next.js, TypeScript, Prisma, tRPC, NextAuth, Tailwind)
- Deployed on Vercel
- PostgreSQL database (Supabase)
- Web scraping via Puppeteer
- No mobile optimization required (desktop-focused)

### Workflow Integration
- **No automatic notifications** - just a web application
- **Claude Code integration**: Simple prompts to add properties
- **Manual property addition**: Via Claude Code + URL, not fully automated
- **Evidence presentation**: Priority over automation complexity

### Data Sources
- realestate.com.au (primary)
- Domain.com.au (secondary)
- Government flood mapping
- ABS crime statistics
- SA education department (school data)
- Council websites (development plans)

## User Workflow

### Current State
1. Manual search on realestate.com.au
2. Share interesting properties in Facebook Messenger
3. Discuss in group chat
4. Schedule inspections if promising
5. Research suburbs manually when needed

### Future State with Platform
1. **Property Discovery**: Continue using realestate.com.au saved searches
2. **Property Addition**: Paste URL into platform via Claude Code
3. **Automated Research**: Agents scrape data, analyze pricing, check risks
4. **Family Review**: All research presented beautifully with citations
5. **Decision Making**: Evidence-based discussion with proper documentation
6. **Inspection Management**: Calendar view of upcoming inspections
7. **Historical Tracking**: Archive decisions and outcomes

## Quality Standards

### Research Quality
- Every numerical claim must have a source
- All links must be active and verified
- Data freshness indicated (last updated dates)
- Confidence levels for estimates
- Multiple sources preferred for important claims

### Presentation Quality
- Clean, professional design (impress software engineer dad)
- Mobile-friendly for overseas family access
- Fast loading times
- Clear visual hierarchy
- Evidence easily accessible (click to verify)

### Decision Support
- Clear price analysis with supporting evidence
- Risk assessment with severity levels
- Suburb context automatically applied to all properties
- Historical comparison to actual sale prices
- Deal breaker identification and alerts

## Success Metrics

### Primary Goals
1. **Evidence-based decisions**: All choices backed by research
2. **Family inclusion**: Mum can participate fully despite being overseas
3. **Time efficiency**: Reduce time spent presenting information to parents
4. **Quality research**: Comprehensive suburb analysis reused across properties
5. **Decision confidence**: Know exactly why a property is/isn't suitable

### Technical Goals
1. **Professional appearance**: Impressive to software engineer dad
2. **Reliable data**: All claims properly cited and verifiable
3. **Historical tracking**: Learn from past decisions and outcomes
4. **Efficient workflow**: Easy property addition via Claude Code

## Implementation Notes

### Claude Code Integration
- Simple CLAUDE.md instructions for adding properties
- No complex context required for future Claude sessions
- Standardized prompts for property research
- Clear workflow documentation

### Deployment Strategy
- Vercel hosting (simple, reliable)
- Supabase for database and real-time features
- Environment variables for API keys
- Git-based deployment workflow

### Future Considerations
- Import existing research from Claude artifacts
- Integration with existing realestate.com.au saved searches
- Potential agent contact tracking
- Enhanced suburb reputation research