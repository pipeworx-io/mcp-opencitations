interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * OpenCitations MCP — citation index (COCI + general Index API).
 *
 * Auth: none. Docs: https://opencitations.net/index/coci/api/v1
 */


const COCI = 'https://opencitations.net/index/coci/api/v1';
const INDEX = 'https://opencitations.net/index/api/v1';
const UA = 'pipeworx-mcp-opencitations/1.0 (+https://pipeworx.io)';

const tools: McpToolExport['tools'] = [
  {
    name: 'references',
    description: 'DOIs cited BY the given DOI.',
    inputSchema: {
      type: 'object',
      properties: { doi: { type: 'string' } },
      required: ['doi'],
    },
  },
  {
    name: 'citations',
    description: 'DOIs that cite the given DOI.',
    inputSchema: {
      type: 'object',
      properties: { doi: { type: 'string' } },
      required: ['doi'],
    },
  },
  {
    name: 'citation_count',
    description: 'Incoming-citation count for a DOI.',
    inputSchema: {
      type: 'object',
      properties: { doi: { type: 'string' } },
      required: ['doi'],
    },
  },
  {
    name: 'references_count',
    description: 'Outgoing-reference count for a DOI.',
    inputSchema: {
      type: 'object',
      properties: { doi: { type: 'string' } },
      required: ['doi'],
    },
  },
  {
    name: 'metadata',
    description: 'Bibliographic metadata for one or more DOIs (comma-sep, ≤50).',
    inputSchema: {
      type: 'object',
      properties: { dois: { type: 'array', items: { type: 'string' }, description: '1-50 DOIs.' } },
      required: ['dois'],
    },
  },
  {
    name: 'citation',
    description: 'Single citation by Open Citation Identifier (OCI).',
    inputSchema: {
      type: 'object',
      properties: { oci: { type: 'string' } },
      required: ['oci'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'references':
      return ocGet(`${COCI}/references/${encodeURIComponent(reqStr(args, 'doi', '"10.1038/nature11247"'))}`);
    case 'citations':
      return ocGet(`${COCI}/citations/${encodeURIComponent(reqStr(args, 'doi', '"10.1038/nature11247"'))}`);
    case 'citation_count':
      return ocGet(`${COCI}/citation-count/${encodeURIComponent(reqStr(args, 'doi', '"10.1038/nature11247"'))}`);
    case 'references_count':
      return ocGet(`${COCI}/references-count/${encodeURIComponent(reqStr(args, 'doi', '"10.1038/nature11247"'))}`);
    case 'metadata': {
      const dois = reqArr(args, 'dois', '["10.1038/nature11247"]').slice(0, 50).join('__');
      return ocGet(`${COCI}/metadata/${encodeURIComponent(dois)}`);
    }
    case 'citation':
      return ocGet(`${INDEX}/citation/${encodeURIComponent(reqStr(args, 'oci', '"<oci>"'))}`);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function ocGet(url: string): Promise<unknown> {
  const res = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': UA } });
  if (res.status === 404) throw new Error('OpenCitations: not found');
  if (!res.ok) throw new Error(`OpenCitations: ${res.status} ${await res.text().then((t) => t.slice(0, 200))}`);
  return res.json();
}

function reqStr(args: Record<string, unknown>, key: string, example: string): string {
  const v = args[key];
  if (typeof v !== 'string' || !v.trim()) {
    throw new Error(`Required argument "${key}" is missing. Pass a string like ${example}.`);
  }
  return v;
}

function reqArr(args: Record<string, unknown>, key: string, example: string): string[] {
  const v = args[key];
  if (!Array.isArray(v) || v.length === 0) {
    throw new Error(`Required argument "${key}" must be a non-empty array, e.g. ${example}.`);
  }
  return v.filter((s): s is string => typeof s === 'string');
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
