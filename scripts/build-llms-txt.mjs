#!/usr/bin/env node
import { readFile, readdir, writeFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = decodeURIComponent(new URL('..', import.meta.url).pathname).replace(/^\/([A-Z]:)/, '$1');
const OUT = join(ROOT, 'llms-full.txt');

const SKIP = new Set(['node_modules', '.git', 'assets', 'scripts', '.gitbook',
  // material interno — existe no disco mas é gitignored; NUNCA pode entrar no llms-full.txt público
  'catalog-audit', '.claude', '.claude-flow', '.codebase-memory']);
// arquivos internos por nome (manuais de agente, specs técnicos)
const SKIP_FILES = [/^AGENT-MANUAL.*\.md$/i, /-SPEC\.md$/i];

async function walk(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (SKIP.has(e.name)) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      await walk(full, acc);
    } else if (e.name.endsWith('.md') && !SKIP_FILES.some((rx) => rx.test(e.name))) {
      acc.push(full);
    }
  }
  return acc;
}

const files = (await walk(ROOT)).sort();

let out = '# Marketfacil — Manual do vendedor (conteúdo completo)\n\n';
out += `> Arquivo concatenado para consumo por LLMs. Gerado em ${new Date().toISOString().slice(0, 10)}.\n\n`;
out += '---\n\n';

for (const f of files) {
  const rel = relative(ROOT, f).replace(/\\/g, '/');
  const content = await readFile(f, 'utf8');
  out += `## File: ${rel}\n\n${content}\n\n---\n\n`;
}

await writeFile(OUT, out, 'utf8');
console.log(`Wrote ${OUT} (${files.length} files)`);
