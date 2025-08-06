#!/bin/bash

echo "Checking Claude Code MCP servers..."
echo "===================================="
claude mcp list

echo ""
echo "MCP Configuration File:"
echo "======================="
cat ~/.config/claude-code/.mcp.json | jq '.mcpServers | keys' 2>/dev/null || echo "jq not installed, showing raw keys:"
grep '"[^"]*": {' ~/.config/claude-code/.mcp.json | cut -d'"' -f2 | sort

echo ""
echo "Total MCPs configured: $(grep '"[^"]*": {' ~/.config/claude-code/.mcp.json | wc -l | tr -d ' ')"