# 🤖 House Hunt Platform - AI Agents Directory

## Agent Organization Structure

This directory contains specialized AI agents organized by their functional areas. Each agent has specific expertise and tools to assist with different aspects of the house hunting platform.

## Directory Structure

```
.claude/agents/
├── technical-stack/          # Core platform development
├── property-research/        # Property analysis and research
├── deployment/               # Deployment and data management
├── collaboration/            # Family collaboration features
└── README.md                # This file
```

## Agent Categories

### 🛠️ Technical Stack (`/technical-stack`)
Agents focused on building and maintaining the platform's technical infrastructure.

- **t3-stack-architect.md** - T3 stack setup and configuration expert
- **database-engineer.md** - Database schema and Prisma specialist
- **api-architect.md** - tRPC and API design expert
- **ui-component-specialist.md** - React/Next.js component development
- **web-scraper-specialist.md** - Property website data extraction
- **performance-optimizer.md** - Performance and optimization specialist

### 🏡 Property Research (`/property-research`)
Agents specialized in property analysis, market research, and Adelaide-specific knowledge.

#### Core Analysis (`/core`)
- **property-listing-researcher.md** - Extract property data from listings
- **property-deep-analyzer.md** - Comprehensive property evaluation
- **suburb-intelligence.md** - Suburb research and profiling
- **deal-breaker-validator.md** - Family requirement validation
- **suburb-profiler.md** - Create reusable suburb profiles

#### Market Analysis (`/market-analysis`)
- **market-analysis.md** - Market trends and pricing analysis
- **comparable-sales-analyst.md** - Find and analyze comparable sales

#### Quality Assurance (`/quality-assurance`)
- **fact-checker.md** - Verify all claims and data
- **citation-quality-enforcer.md** - Ensure proper source citations
- **risk-assessor.md** - Identify property and area risks

#### Data Collection (`/data-collection`)
- **document-analyzer.md** - Process property documents
- **inspection-note-organizer.md** - Structure inspection notes

#### Reporting (`/reporting`)
- **report-synthesis-engine.md** - Generate comprehensive reports
- **report-generator.md** - Create family-friendly property reports

#### Adelaide Specialists (`/specialized-adelaide`)
- **adelaide-local-expert.md** - Local Adelaide market knowledge

#### Memory Context (`/memory-context`)
- **memory-context-researcher.md** - Access existing research data

### 🚀 Deployment (`/deployment`)
Agents for deploying and managing the platform.

- **deployment-specialist.md** - General deployment coordination
- **vercel-deployment-specialist.md** - Vercel-specific deployment
- **data-importer.md** - Import existing property data

### 👥 Collaboration (`/collaboration`)
Agents for family collaboration and quality control.

- **family-collaboration-manager.md** - Family decision tracking
- **quality-controller.md** - Overall quality assurance

## Usage Guidelines

### When to Use Each Agent

1. **Starting a new feature**: Use `t3-stack-architect` first
2. **Adding a property**: Start with `property-listing-researcher`
3. **Researching suburbs**: Use `suburb-intelligence` 
4. **Checking requirements**: Always run `deal-breaker-validator`
5. **Deploying to production**: Use `vercel-deployment-specialist`
6. **Generating reports**: Use `report-synthesis-engine`

### Agent Invocation

Agents are invoked using the Task tool with the `subagent_type` parameter:

```typescript
// Example: Research a property
Task({
  subagent_type: "property-listing-researcher",
  description: "Extract property data",
  prompt: "Research this property: [URL]"
})
```

### Best Practices

1. **Use agents proactively** - Don't wait for explicit requests
2. **Chain agents together** - Combine specialists for comprehensive results
3. **Verify with quality agents** - Always fact-check and cite sources
4. **Consider local knowledge** - Use Adelaide specialists for local context
5. **Maintain family focus** - Keep family requirements central

## Agent Capabilities

### Research Agents
- Web scraping from realestate.com.au and Domain
- Suburb demographics and statistics
- Crime data and school ratings
- Flood risk assessment
- Market comparable analysis

### Technical Agents
- T3 stack implementation
- Database design with Prisma
- tRPC API development
- React component creation
- Performance optimization

### Quality Agents
- Fact verification
- Source citation
- Risk assessment
- Deal-breaker validation
- Report generation

## Family Requirements Reference

All property research agents validate against these requirements:
- **Budget**: Under $900k
- **Location**: Northern Adelaide suburbs
- **Type**: Single story only
- **Rooms**: 2+ living areas, 2+ bathrooms
- **Parking**: 2+ car spaces
- **Features**: Solar panels, dog-friendly yard
- **Avoid**: Flood zones, main roads, power lines

## Maintenance Notes

- Agents are version controlled in Git
- Each agent includes tools and color configuration
- Test agents before production deployment
- Update this README when adding new agents
- Remove duplicates to maintain clarity

## Recent Updates

- **2024-01-XX**: Reorganized agents into categorical subfolders
- **2024-01-XX**: Removed duplicate agents
- **2024-01-XX**: Added Vercel deployment specialist
- **2024-01-XX**: Created comprehensive agent structure

---

For questions or improvements, refer to the main project documentation in `/docs`.