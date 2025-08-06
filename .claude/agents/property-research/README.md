# Property Research Agents

This directory contains specialized AI agents for automating property research and analysis.

## Directory Structure

### `/core/` - Core Property Research
- **property-listing-researcher** - Extracts property data from real estate websites
- **property-deep-analyzer** - Comprehensive property analysis with investment metrics
- **suburb-intelligence** - Creates reusable suburb profiles with demographics, crime, schools

### `/market-analysis/` - Market Intelligence
- **market-analysis** - Price trends, sales data, market opportunities
- **competitor-analysis** - Property comparisons and value scoring
- **competitor-analysis-agent** - Alternative competitor analysis approach

### `/quality-assurance/` - Data Verification
- **fact-checker** - Multi-source verification of all claims
- **citation-quality-enforcer** - Ensures every fact has proper citations and URLs

### `/reporting/` - Report Generation
- **report-synthesis-engine** - Creates professional PDF and web reports

### `/memory-context/` - Research Management
- **memory-context-researcher** - Prevents duplicate research, maintains consistency

### `/specialized-adelaide/` - Local Expertise
- **adelaide-local-knowledge** - Adelaide-specific market insights and opportunities

### `/data-collection/` - Document Processing
- **inspection-note-organizer** - Structures inspection observations
- **document-analyzer** - Processes contracts and inspection reports

## Usage

Agents are automatically invoked based on task context, or can be explicitly called:
```
> Use the property-listing-researcher agent to analyze this Domain listing
```

## Integration Workflow

1. **property-listing-researcher** → Fetch property details
2. **suburb-intelligence** → Load/create suburb profile
3. **market-analysis** → Gather market context
4. **memory-context-researcher** → Check existing research
5. **fact-checker** → Validate all information
6. **citation-quality-enforcer** → Add proper sources
7. **report-synthesis-engine** → Generate family reports

All research maintains proper citations and evidence backing as per project requirements.