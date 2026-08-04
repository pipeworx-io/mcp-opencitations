# @pipeworx/opencitations

[OpenCitations](https://opencitations.net) MCP — open-license citation index (COCI + Index APIs). Keyless.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `references(doi)` — DOIs cited BY the given DOI
- `citations(doi)` — DOIs that cite the given DOI
- `citation_count(doi)` — number of incoming citations for a DOI
- `references_count(doi)` — number of outgoing references for a DOI
- `metadata(dois)` — bibliographic metadata for one or more DOIs (comma-sep list, max 50)
- `citation(oci)` — a single citation by Open Citation Identifier

## Data source

`https://opencitations.net/index/coci/api/v1/` (COCI) and `https://opencitations.net/index/api/v1/` (generic Index endpoints).

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

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

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

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
