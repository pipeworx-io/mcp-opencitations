# mcp-opencitations

OpenCitations COCI — open-license citation index by DOI

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 250+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `references` | DOIs cited BY the given DOI. |
| `citations` | DOIs that cite the given DOI. |
| `citation_count` | Incoming-citation count for a DOI. |
| `references_count` | Outgoing-reference count for a DOI. |
| `metadata` | Bibliographic metadata for one or more DOIs (comma-sep, ≤50). |
| `citation` | Single citation by Open Citation Identifier (OCI). |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "opencitations": {
      "url": "https://gateway.pipeworx.io/opencitations/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 250+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Opencitations data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
