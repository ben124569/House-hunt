# 🤖 House Hunt Platform - Complete Agent Collection

All agents are now created and ready to use for building your family property research platform. Here's the complete collection organized by phase:

## Phase 1: Essential Foundation Agents ✅

### 1. **t3-stack-architect** 
- **Purpose**: Initialize T3 stack with Next.js 14, TypeScript, tRPC, Prisma
- **When to use**: Setting up the entire application foundation
- **Tools**: Write, Edit, Read, Bash, LS, Glob, MultiEdit

### 2. **database-engineer**
- **Purpose**: Prisma schemas, Supabase integration, database optimization
- **When to use**: Database design, migrations, and performance tuning
- **Tools**: Write, Edit, Read, Bash, Glob, MultiEdit, LS

### 3. **deal-breaker-validator**
- **Purpose**: Auto-validate properties against family criteria and deal breakers
- **When to use**: First-line property screening before detailed analysis
- **Tools**: WebSearch, WebFetch, Read, Write, Grep, Glob, TodoWrite

### 4. **web-scraper-specialist**
- **Purpose**: Extract comprehensive data from Australian real estate websites
- **When to use**: Scraping realestate.com.au and Domain.com.au listings
- **Tools**: WebFetch, WebSearch, Write, Read, Bash, Grep, Glob, TodoWrite

## Phase 2: Core Feature Agents ✅

### 5. **ui-component-specialist**
- **Purpose**: Build React components with TypeScript and Tailwind CSS
- **When to use**: Creating property cards, analysis dashboards, collaboration interfaces
- **Tools**: Write, Edit, Read, MultiEdit, Glob, LS

### 6. **api-architect**
- **Purpose**: Design tRPC APIs, authentication, and real-time features
- **When to use**: Backend API development, Supabase integration, security
- **Tools**: Write, Edit, Read, MultiEdit, Bash, Glob, LS

### 7. **adelaide-local-expert**
- **Purpose**: Adelaide-specific market insights, suburb analysis, local regulations
- **When to use**: Northern suburbs research, flood zone analysis, local market knowledge
- **Tools**: WebSearch, WebFetch, Read, Grep, Glob

### 8. **comparable-sales-analyst**
- **Purpose**: Find and analyze comparable property sales for valuation
- **When to use**: Price analysis, overpricing detection, market comparisons
- **Tools**: WebFetch, WebSearch, Read, Write, Bash, Grep, Glob

## Phase 3: Enhancement Agents ✅

### 9. **family-collaboration-manager**
- **Purpose**: Real-time collaboration, notes, consensus-based decisions
- **When to use**: Family coordination features, @mentions, status updates
- **Tools**: Write, Edit, Read, MultiEdit, WebFetch, Bash

### 10. **report-generator**
- **Purpose**: Create comprehensive property reports and PDF exports
- **When to use**: Professional documentation for family, banks, or agents
- **Tools**: Write, Edit, Read, MultiEdit, WebFetch, Bash, Glob

### 11. **suburb-profiler**
- **Purpose**: Build comprehensive, reusable suburb intelligence profiles
- **When to use**: Creating detailed area analysis (demographics, schools, risks)
- **Tools**: WebFetch, WebSearch, Read, Write, Bash, Grep, Glob

### 12. **risk-assessor**
- **Purpose**: Comprehensive property risk evaluation (flood, market, infrastructure)
- **When to use**: Risk analysis for Northern Adelaide properties, hazard assessment
- **Tools**: WebFetch, WebSearch, Read, Write, Grep, Glob, TodoWrite

## Phase 4: Polish Agents ✅

### 13. **deployment-specialist**
- **Purpose**: Deploy platform to Vercel with production optimizations
- **When to use**: Production deployment, monitoring, security configuration
- **Tools**: Write, Edit, Read, Bash, WebFetch, MultiEdit

### 14. **data-importer**
- **Purpose**: Import existing research from Claude artifacts, Messenger, saved searches
- **When to use**: Migrating historical property data into the platform
- **Tools**: Read, Write, Edit, MultiEdit, Bash, Glob, Grep

### 15. **quality-controller**
- **Purpose**: Maintain data quality, validate research accuracy, check citations
- **When to use**: Ensuring all data has proper sources and is up-to-date
- **Tools**: WebFetch, WebSearch, Read, Write, Grep, Glob, TodoWrite

### 16. **performance-optimizer**
- **Purpose**: Optimize performance for overseas family with varying connections
- **When to use**: Speed optimization, mobile performance, caching strategies
- **Tools**: Write, Edit, Read, Bash, WebFetch, Glob, MultiEdit

## Existing Agents from Your Collection

The following agents were already created and documented in your research:

### **property-listing-researcher**
- **Purpose**: Automated property data fetching and fact gathering
- **Integration**: Works with web-scraper-specialist for comprehensive data extraction

### **suburb-intelligence**  
- **Purpose**: Build comprehensive suburb profiles
- **Integration**: Works with suburb-profiler and adelaide-local-expert

### **market-analysis**
- **Purpose**: Real estate market intelligence and trends
- **Integration**: Works with comparable-sales-analyst for pricing analysis

### **citation-quality-enforcer**
- **Purpose**: Ensure all information has proper sources
- **Integration**: Works with quality-controller for data validation

### **report-synthesis-engine**
- **Purpose**: Generate comprehensive reports from research
- **Integration**: Works with report-generator for professional documentation

## Agent Workflow Integration

### Property Addition Workflow
1. **web-scraper-specialist** → Extract listing data
2. **deal-breaker-validator** → Check family criteria
3. **suburb-profiler** → Build/update area intelligence
4. **comparable-sales-analyst** → Calculate fair value
5. **risk-assessor** → Evaluate property risks
6. **quality-controller** → Validate all data and sources

### Family Decision Workflow
1. **family-collaboration-manager** → Enable discussions
2. **report-generator** → Create analysis reports
3. **ui-component-specialist** → Present data beautifully
4. **api-architect** → Handle real-time updates

### Platform Development Workflow
1. **t3-stack-architect** → Initialize application
2. **database-engineer** → Set up data layer
3. **ui-component-specialist** → Build interfaces
4. **api-architect** → Create backend APIs
5. **deployment-specialist** → Deploy to production
6. **performance-optimizer** → Optimize for global usage

## Usage Instructions

### Automatic Delegation
All agents have proactive descriptions that allow Claude to automatically choose the right specialist for each task.

### Manual Invocation
You can explicitly request specific agents:
- "Use the deal-breaker-validator to check this property"
- "Have the adelaide-local-expert research Angle Vale flood risks"
- "Get the comparable-sales-analyst to value this property"

### Agent Collaboration
Multiple agents can work together on complex tasks:
- Property research uses 6+ agents in sequence
- Report generation combines multiple specialists
- Deployment involves several technical agents

## Ready for Implementation

All 16 specialized agents are now created and ready to build your complete house hunt platform. They work together to provide:

✅ **Automated property research** with deal-breaker validation
✅ **Professional presentation** that will impress your software engineer dad  
✅ **Family collaboration** features for overseas participation
✅ **Evidence-based decisions** with proper citations
✅ **Adelaide-specific expertise** for local market conditions
✅ **Production-ready deployment** on Vercel
✅ **Performance optimization** for global family access

You can now use the INITIALIZATION_PROMPT.md to start building the complete platform!

## Agent File Locations

All agents are stored in: `/Users/benjaminmerritt/Code/Projects/house-hunt/.claude/agents/`

```
.claude/agents/
├── t3-stack-architect.md
├── database-engineer.md  
├── deal-breaker-validator.md
├── web-scraper-specialist.md
├── ui-component-specialist.md
├── api-architect.md
├── adelaide-local-expert.md
├── comparable-sales-analyst.md
├── family-collaboration-manager.md
├── report-generator.md
├── suburb-profiler.md
├── risk-assessor.md
├── deployment-specialist.md
├── data-importer.md
├── quality-controller.md
└── performance-optimizer.md
```