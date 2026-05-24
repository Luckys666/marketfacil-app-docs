---
title: Redimensionador de Imagens — Manual interno para agentes
description: Documentação técnica para Claude e outros agentes — arquitetura, padrão de qualidade ML embutido, onde vive no Bubble, como manter/estender
audience: internal-agents
visibility: internal
last_consolidation: 2026-05-06
---

# Redimensionador de Imagens — Manual do agente

> **Audiência:** este documento é para Claude e outros agentes que precisam manter ou estender essa função. NÃO é para usuários finais. O README.md ao lado é o público.

## TL;DR

- Função do app que pega imagens (de anúncio ML via URL/ID, ou upload local), redimensiona pro padrão Mercado Livre e empacota num ZIP de download.
- A lógica de qualidade implementada aqui **É** o padrão canônico do Marketfacil — **não** seguir o manual oficial do ML quando houver conflito.
- Vive numa única página Bubble: `redimensionar-imagem`, num **único elemento HTML consolidado: `bTLKd`**.
- Antes da consolidação (2026-05-06), eram 3 elementos: `bTLKd` (HTML), `bTLKj` (Script), `bTIvZ0` (Text aviso). Os dois últimos foram desativados (stub e invisible-on-page-load) mas preservados como backup.

## O que a função faz (capacidades)

### Entradas aceitas
- **URL completa** do anúncio ML (ex.: `https://produto.mercadolivre.com.br/MLB-...`).
- **ID do anúncio** isolado (ex.: `MLB1234567890`, `MLB-1234567890`).
- **Arquivos de imagem locais** via drag&drop OR clique no botão de upload.

### Operações disponíveis
1. **Buscar imagens do anúncio** — chama scraper interno (mlb-proxy) e popula a galeria.
2. **Reordenar imagens** — drag&drop dentro da galeria.
3. **Remover imagens** — botão `×` no hover do thumbnail.
4. **Selecionar imagens** — checkbox individual ou "Selecionar todas".
5. **Enquadramento manual** — clicar numa imagem abre modal com canvas para pan/zoom em 3 formatos.
6. **Download em lote** das selecionadas em 4 modos:
   - Padrão ML (1200×1540)
   - Retrato (3:4 → 1200×1600)
   - Quadrado (1:1 → 1200×1200)
   - Ambos (3:4 + 1:1 em pastas separadas dentro do ZIP)
7. **Download da principal em ângulos** — pega a imagem 0 e gera 6 rotações: 0°, 30°, 45°, -30°, -45°, 90° em qualquer formato.

### Saídas
- ZIPs gerados client-side via JSZip + FileSaver.js.
- JPEG quality: `1.0` para Padrão ML, `0.95` para 3:4 e 1:1.
- Fundo branco em todos os formatos (canvas pintado antes do desenho).
- **Watermark anti-crop** — 4 pixels cinza claro (`#e5e5e5`) nos 4 cantos (4×4 cada). Função `applyWatermark(ctx)`.

## Padrão de qualidade ML embutido

### Tamanhos finais
- `ml-standard` → 1200×1540 (vertical 13:10 aproximado)
- `3:4`         → 1200×1600
- `1:1`         → 1200×1200

### Threshold de tamanho
- Imagens em modo `ml-standard` que ficam abaixo de **600 KB** geram warning no console (`canvas.toBlob` → check `blob.size < 600 * 1024`). Não bloqueia download.

### Política de scaling
- Função `processImageForZip`: usa `Math.min(width/img.width, height/img.height)` (center-fit, nunca crop). Padding com fundo branco. **Crop manual existe apenas via modal de framing.**
- Função `processImageWithAngle`: rotaciona, recalcula bounds, re-fit center.
- O modal `framingModal` permite pan via mousedown+mousemove e zoom via wheel. Estado: `framingState{image, scale, minScale, offsetX, offsetY, isDragging}`.
- Última escolha de formato é persistida em `localStorage.framingFormat`.

### Não fazer
- **Não** trocar a quality de `ml-standard` por algo abaixo de `1.0`.
- **Não** trocar a estratégia center-fit por crop automático no `processImageForZip` (perderia área visual).
- **Não** mudar o watermark de `#e5e5e5` (cinza claro) para `#000` (preto): é proposital — o cinza ainda ativa o anti-crop do ML sem ser percebido pelo usuário.
- **Não** importar specs do manual oficial ML como verdade para "alinhar" a função. Ver memória `feedback_redimensionador_eh_padrao.md`.

## Arquitetura

### Localização no Bubble
- **App**: `contatomarketfacil`
- **Página**: `redimensionar-imagem`
- **Elemento ativo**: `bTLKd` (HTML element, "HTML App", style "Standard HTML")
  - Contém TUDO: CSS embutido (`<style>`), HTML estrutural (`<div id="image-tool-pro-app">`), aviso (`mf-warning-callout`), script (`<script id="image-tool-pro-bootstrap-code" type="text/x-marketfacil-script">`), trigger (`<img onerror="...">`).
  - Tamanho aprox.: 43 KB.
- **Elementos legados desativados** (preservados por reversibilidade):
  - `bTLKj` (Script) — conteúdo trocado por stub de comentário (~200 chars).
  - `bTIvZ0` (Text) — visibilidade `false` em "This element is visible on page load".

### Arquivo fonte da consolidação
- Versão local que foi colada no Bubble: `squads-marketfacil-app/tmp_redim_consolidated.html`.
- Builder: `squads-marketfacil-app/tmp_build_redim_consolidated.js` (reconstrói a partir de `tmp_redim_js_clean.js`).
- Para regerar: `node tmp_build_redim_consolidated.js`.

### Fluxo de boot
1. Bubble renderiza o conteúdo do elemento bTLKd via innerHTML na página.
2. Browser parseia mas **não executa** o `<script type="text/x-marketfacil-script">` (type desconhecido = data).
3. O `<img src="x">` falha imediatamente, dispara `onerror`.
4. `onerror` cria um novo `<script>` via `document.createElement` e copia textContent do template para ele.
5. `document.head.appendChild(s)` faz o browser executar o JS.
6. Guard `window.__APP_BOOTED_FN__` previne dupla execução em re-renders.
7. `initImageToolPro()` roda no fim do JS: amarra os event listeners no container `#image-tool-pro-app`.

### Por que o bootstrap é necessário
- Memória `feedback_bubble_innerhtml_script.md`: `<script>` direto em innerHTML não executa (HTML5 spec).
- Workaround `<img onerror>`: o handler é executado pelo browser independente do método de inserção. Padrão consolidado também usado no ML country selector (Minha Conta).

### Dependências externas (carregadas pela página, não pelo elemento)
- **JSZip** — geração de ZIPs no client.
- **FileSaver.js** (`saveAs`) — trigger de download no browser.
- API interna: `https://app.marketfacil.com.br/api/1.1/wf/get-user-id` (POST, JSON, retorna `{response: {user_id}}`).
- Proxy externo: `https://mlb-proxy-fdb71524fd60.herokuapp.com/api/ml-scraper?url=...` (GET, header `x-user-id`).

### Tokens visuais (Light Trading — Proposta U)
Definidos como custom properties em `#image-tool-pro-app`:
- `--mf-blue: #0066ff` (primary)
- `--mf-blue-light: #e8f0ff` (focus/hover)
- `--mf-blue-dark: #0052cc` (active/hover)
- `--mf-green: #00d68f` (success)
- `--mf-red: #ff3b5c` (error)
- `--mf-amber: #f59e0b` (warning)
- `--mf-bg: #f4f6fa`, `--mf-card: #ffffff`, `--mf-navy: #0f172a`
- `--mf-border: #e2e8f0`
- Texto: `--mf-text: #0f172a`, `--mf-text-secondary: #475569`, `--mf-text-muted: #94a3b8`
- Sombras: `--mf-shadow-sm`, `--mf-shadow-md`
- Fonte: `'Geist', 'DM Sans', system`
- Border-radius: 6px (botões/inputs), 10px (cards/containers)

## Como mexer com segurança

### Para alterar **CSS**
1. Editar a seção `<style>` no início de `tmp_redim_consolidated.html` (ou direto no Bubble via CodeMirror).
2. Manter todo CSS escopado em `#image-tool-pro-app` (escapa de conflitos com a página Bubble).
3. Reusar custom properties `--mf-*` em vez de cores hardcoded.

### Para alterar **lógica JS**
1. Editar `tmp_redim_js_clean.js` (versão limpa do script, sem wrapper `<script>`).
2. Rodar o builder: `node tmp_build_redim_consolidated.js` → regenera o `tmp_redim_consolidated.html`.
3. Copiar para clipboard: `Get-Content -Encoding UTF8 ... | Set-Clipboard`.
4. No Bubble: bTLKd → "HTML editor" → Ctrl+A → Ctrl+V → Save.

### Para alterar **HTML estrutural**
1. Editar o template literal `html = ...` em `tmp_build_redim_consolidated.js`.
2. Rebuild + paste como acima.

### Para alterar o **aviso (warning callout)**
- Está dentro do template `html` no builder, dentro de `<div class="mf-warning-callout">`. **Lucas deixou esse aviso intencionalmente** — é um fallback prático real (memória `feedback_redimensionador_eh_padrao.md` cobre o porquê).

### Verificação após qualquer mudança
1. Bubble editor → "Saved" indicator confirma persistência no dev.
2. Antes de Deploy Live: pedir aprovação explícita ao Lucas (memória `feedback_aprovar_antes_deploy.md`).
3. version-test exige login na live (memória `reference_version_test_needs_live_login.md`).

## Riscos conhecidos

### Bubble pode re-renderizar o elemento
Em alguns workflows o Bubble re-monta o conteúdo do HTML element. O guard `__APP_BOOTED_FN__` previne re-execução do init mas **não** previne perda de event listeners se o DOM interno for substituído. Se isso vier a acontecer: implementar event delegation no `document` ou observar mutations no container.

### `</script>` literal no JS body
O HTML parser fecha `<script>` no primeiro `</script>` que vê, independente do contexto. Se algum dia o JS body conter literal `</script>` (em strings ou regex), o parser quebra TUDO. Mitigação: o builder pode escapar via `js.replace(/<\/script/gi, '<\\/script')`. Hoje o JS não tem nenhuma ocorrência (verificado em build time).

### Limites de tamanho da clipboard PowerShell
Funcionou com 43 KB. Memória `feedback_clipboard_volatil.md` alerta: clipboard pode ser sobrescrito durante deploy — sempre validar `getValue().length === fileLength` após paste antes de salvar.

### CSS duplicado (page header + elemento)
O page HTML header **ainda contém** a CSS antiga do redimensionador. Não há conflito visível porque a CSS do elemento vem depois no DOM e ganha por ordem de cascata (mesma especificidade). Limpeza opcional do page header pode ser feita futuramente — hoje é redundância benigna.

## Onde fica cada coisa

| O quê | Onde |
|---|---|
| Doc público (vendedor) | `marketfacil-app-docs/redimensionar-imagens/README.md` |
| Manual interno (este) | `marketfacil-app-docs/redimensionar-imagens/AGENT-MANUAL.md` |
| Builder do consolidado | `squads-marketfacil-app/tmp_build_redim_consolidated.js` |
| JS limpo (sem `<script>`) | `squads-marketfacil-app/tmp_redim_js_clean.js` |
| HTML consolidado final | `squads-marketfacil-app/tmp_redim_consolidated.html` |
| HTML original (backup) | `squads-marketfacil-app/tmp_redim_bTLKd_html.html` |
| Elemento ativo no Bubble | App `contatomarketfacil` → page `redimensionar-imagem` → element `bTLKd` |

## Histórico

- **2026-05-06**: Consolidação 3→1 elemento. Aplicação dos tokens Light Trading. Bootstrap via `<img onerror>`. Manual criado.
