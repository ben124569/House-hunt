# MCP (Model Context Protocol) Setup for Property Research

## Overview

This platform uses several MCP servers to enable powerful research capabilities. MCPs allow Claude to interact with external services and APIs for property research, web scraping, and data analysis.

## Essential MCPs for Property Research

### 1. **Firecrawl MCP** (Web Scraping)
**Purpose**: Scrape property listings, suburb information, and real estate data
**Installation**:
```bash
npm install -g @modelcontextprotocol/server-firecrawl
```
**Usage**: Auto-scrapes property details from URLs

### 2. **Brave Search MCP** (Web Search)  
**Purpose**: Search for property information, local businesses, crime stats
**Installation**:
```bash
npm install -g @modelcontextprotocol/server-brave-search
```
**API Key Required**: Get free key at https://brave.com/search/api/

### 3. **Tavily MCP** (Advanced Web Search)
**Purpose**: Deep web research with extraction capabilities
**Installation**:
```bash
git clone https://github.com/tavily/tavily-mcp
cd tavily-mcp
npm install
npm run build
```
**API Key Required**: Get key at https://tavily.com

### 4. **Filesystem MCP** (File Management)
**Purpose**: Read/write property data files, manage research documents
**Installation**: Usually built-in with Claude Desktop

### 5. **Neo4j Memory MCP** (Knowledge Graph)
**Purpose**: Store and query property research in a graph database
**Installation**:
```bash
pip install mcp-neo4j-memory
```

### 6. **Time MCP** (Date/Time Operations)
**Purpose**: Track inspection times, calculate days on market
**Installation**:
```bash
npx -y @yokingma/time-mcp
```

## Configuration

Add these to your `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "firecrawl-mcp": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-firecrawl"],
      "env": {
        "FIRECRAWL_API_KEY": "YOUR_API_KEY"
      }
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "YOUR_API_KEY"
      }
    },
    "tavily": {
      "command": "node",
      "args": ["/path/to/tavily-mcp/build/index.js"],
      "env": {
        "TAVILY_API_KEY": "YOUR_API_KEY"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/benjaminmerritt/code/projects/property-research-platform"
      ]
    },
    "time-mcp": {
      "command": "npx",
      "args": ["-y", "@yokingma/time-mcp"]
    }
  }
}
```

## API Keys Required

1. **Firecrawl**: https://firecrawl.dev (Free tier available)
2. **Brave Search**: https://brave.com/search/api/ (Free tier: 2000 queries/month)
3. **Tavily**: https://tavily.com (Free tier available)

## MCP Usage in Property Research

### Property Listing Research
```javascript
// Firecrawl scrapes listing details
mcp__firecrawl-mcp__firecrawl_scrape({
  url: "https://www.realestate.com.au/property-123",
  formats: ["markdown"],
  onlyMainContent: true
})
```

### Suburb Crime Statistics
```javascript
// Brave Search finds crime data
mcp__brave-search__brave_local_search({
  query: "Andrews Farm crime statistics 2024",
  count: 10
})
```

### Market Analysis
```javascript
// Tavily extracts recent sales
mcp__tavily__tavily-extract({
  urls: ["domain.com.au/sold/andrews-farm"],
  extract_depth: "advanced"
})
```

### Property Comparison
```javascript
// Filesystem stores comparison data
mcp__filesystem__write_file({
  path: "comparisons/mawson-vs-andrews.json",
  content: JSON.stringify(comparisonData)
})
```

## Testing MCPs

After configuration, restart Claude Desktop and test:

1. **Test Brave Search**:
   "Search for properties in Mawson Lakes Adelaide"

2. **Test Firecrawl**:
   "Scrape this property: [paste any realestate.com.au URL]"

3. **Test Filesystem**:
   "Create a test property file"

## Troubleshooting

### MCP Not Available
- Restart Claude Desktop after adding to config
- Check API keys are valid
- Verify npm/node installation

### Permission Errors
Add to `.claude/settings.local.json`:
```json
{
  "permissions": {
    "allow": [
      "mcp__firecrawl-mcp__*",
      "mcp__brave-search__*",
      "mcp__tavily__*",
      "mcp__filesystem__*"
    ]
  }
}
```

### Rate Limits
- Brave: 2000/month free
- Firecrawl: Check your plan
- Tavily: 1000/month free

## Property-Specific MCP Workflows

### 1. Add New Property
```
URL → Firecrawl (scrape) → Filesystem (save) → Neo4j (store)
```

### 2. Research Suburb
```
Suburb name → Brave (search) → Tavily (extract) → Analysis
```

### 3. Compare Properties
```
Multiple properties → Filesystem (load) → Analysis → Report
```

### 4. Track Price Changes
```
Time-MCP (schedule) → Firecrawl (check) → Alert if changed
```

## Security Notes

- Store API keys in environment variables
- Don't commit API keys to git
- Use `.env` file for local development
- Rotate keys periodically

## Support

- MCP Documentation: https://modelcontextprotocol.io
- Claude Desktop: https://claude.ai/download
- Issues: Check individual MCP repositories on GitHub