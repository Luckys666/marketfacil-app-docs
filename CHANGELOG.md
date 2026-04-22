---
title: Changelog
description: Histórico de mudanças na documentação do Marketfacil.
audience: todos
keywords: [changelog, histórico, versões]
---

# Changelog

Todas as mudanças relevantes na documentação ficam aqui, em ordem cronológica inversa. Formato: `YYYY-MM-DD — descrição`.

## 2026-04-22

### Refinamento — Saúde dos Ads, logística ML e medalhas

- **Planejador de Ads**: adicionada explicação do que conta como "alerta crítico" (ROAS geral < 1, dependência de ads muito alta) e "anúncio queimando dinheiro" (gasto acumulado sem venda) — textos que o próprio app já mostra nos filtros.
- **Removidos os pesos numéricos** (+20, +15, +10) da tabela das 7 verificações — mantida só a lista das verificações e alvos. O cálculo exato do score é interno.
- **Busca de Catálogos**: callout explicando que filtros de logística (Full, Flex, ME1, ME2, Places, Coleta, Custom, N/E, Sem Log.) são termos oficiais do Mercado Envios vindos da API do ML.
- **Concorrência de Catálogo**: coluna MED agora explicitamente documentada como "Medalha do Mercado Livre (Gold, Silver, Bronze). Vem direto da API do ML".
- **Glossário** expandido com seções dedicadas a Logística (Custom, Correios, N/E, Sem Log.) e Medalhas do Vendedor — todos marcados como conceitos oficiais do ML.

### Enriquecimento com dados factuais do app

Segunda rodada de observação do app via Playwright para adicionar informação factual:

- **Nova página: Planos e pagamento** (`primeiros-passos/planos-e-pagamento.md`) com preços reais observados em `/pagamento`: Mensal R$ 39,90, Anual R$ 33,90 (cobrança única R$ 406,80/ano), Semestral R$ 37,90. Todos dão acesso completo.
- **Planejador de Ads — Saúde dos Ads**: adicionada seção com as **7 verificações** reais do app, pontuação e alvos: ROAS positivo (+20), Meta de TACOS definida (+10), Dependência de ads saudável (+15), Orçamento não limitando entrega (+15), Sem alertas críticos (+10), Sem anúncios queimando dinheiro (+10), Campanhas batendo meta de ROAS (+10).
- **Planejador de Ads — Onboarding**: documentado o fluxo de 3 perguntas ao abrir pela primeira vez (margem média, meta de TACOS, foco da estratégia: Rentabilidade vs Visibilidade).
- **Entendendo TACOS**: adicionado texto oficial do app sobre o que é TACOS.
- **FAQ atualizado**: preços dos planos, política de reembolso (7 dias), inexistência de limites de uso, email de suporte (contatomarketfacil@gmail.com).
- SUMMARY.md inclui Planos e pagamento na seção Primeiros passos.

### Correção crítica — removidos números e regras inventados dos playbooks

Identificado e removido conjunto amplo de thresholds, prazos e benchmarks que haviam sido inseridos nos playbooks e checklists como "rules of thumb" mas não vieram do app nem foram validados. Exemplos do que foi removido: "TACOS 5-15% saudável" (já corrigido antes), "30 dias sem vendas" como gatilho de reescrita de título, "14 dias de espera pós-mudança", "3-6 horas para re-indexar", "5 fotos mínimas", "descrição 300 caracteres", "CTR ≥ 1%", "CVR < 0.5%", "ROAS > 5x", "orçamento R$ 10-30/dia", "dia 3 / dia 5 / dia 7", "margem ≥ 20%", tempos estimados por passo ("5 min", "20 min"), entre outros. Substituídos por framing qualitativo ("depende do seu negócio", "sem vendas recentes", "dê tempo para o ML re-indexar"). Nova seção 9 adicionada ao DOCS-RULES: "Honestidade — nunca inventar números ou regras". Princípio: documentação é contrato de confiança.

Arquivos ajustados: `playbooks/preparando-campanha-ads.md` (reescrito), `playbooks/otimizando-titulo.md`, `playbooks/recuperando-anuncio.md`, `playbooks/escolhendo-nicho.md` (reescrito), `playbooks/lancando-produto-novo.md`, `playbooks/README.md` (disclaimer honesto), `ajuda/checklists.md` (reescrito), `analise-de-anuncios/entendendo-o-score.md`, `analise-de-anuncios/como-analisar.md`, `ajuda/troubleshooting.md`, `faq-e-suporte.md`, `primeiros-passos/README.md`, `primeiros-passos/criar-conta.md`, `palavras-chave/README.md`, `DOCS-RULES.md`.

## 2026-04-21

### Ajuste — não prescrever faixa "saudável" de TACOS

Removidas todas as menções a faixas numéricas fixas de TACOS como "saudável" ou "compromete margem" (ex: "5–15% é saudável", "acima de 20% compromete margem", "meta padrão de 15%"). Cada vendedor tem uma margem, nicho e estratégia diferente — não existe número universal. A documentação agora orienta o vendedor a definir a própria meta e comparar com a própria margem. Arquivos: `planejador-de-ads/entendendo-tacos.md`, `planejador-de-ads/README.md`, `playbooks/preparando-campanha-ads.md`.

### Correção crítica — nunca modificar título de anúncio que já vende

Adicionada em todos os arquivos a regra de ouro: **alterar título de anúncio com vendas derruba a exposição do Mercado Livre** (reseta indexação). A otimização de título serve apenas para anúncios novos ou sem vendas há 30+ dias. Para anúncios vendendo com score técnico baixo, o vendedor deve trabalhar outros pontos (fotos, atributos, descrição, preço, frete) — nunca o título. Arquivos atualizados: `playbooks/otimizando-titulo.md`, `palavras-chave/README.md`, `playbooks/recuperando-anuncio.md`, `analise-de-anuncios/entendendo-o-score.md`, `ajuda/checklists.md`, `faq-e-suporte.md`.

### Correção crítica — classes de serviço do INPI não são "risco baixo"

Removida em todos os arquivos a narrativa de que marcas em classes 35–45 do INPI são de "risco baixo". A classificação anterior estava incompleta: classes de serviço impedem o BPP do Mercado Livre, mas o titular ainda pode acionar legalmente (notificação, processo judicial, indenização). Recomendação atualizada em `analise-de-marca/README.md`, `GLOSSARIO.md`, `playbooks/lancando-produto-novo.md` e `playbooks/escolhendo-nicho.md`: **evitar usar marca com qualquer registro no INPI**.

### GIFs animados nas features principais

- 3 GIFs gerados via Playwright + ffmpeg mostrando o fluxo completo (input → ação → resultado):
  - `analise-marca.gif` — busca INPI por "Nike" com resultado Risco Alto
  - `analise-anuncios.gif` — análise de MLB com score 81 (Classe A)
  - `busca-catalogos.gif` — busca "máquina de cortar cabelo" com resultado
- Pasta `assets/gifs/` criada
- GIFs substituem screenshots estáticos nas READMEs das 3 features principais

### Enriquecimento — playbooks, troubleshooting e checklists

- **5 Playbooks** end-to-end criados (`playbooks/`):
  - Lançando um produto novo
  - Recuperando um anúncio que parou de vender
  - Escolhendo um novo nicho
  - Otimizando um título
  - Preparando uma campanha de Ads
- **Seção Ajuda** criada (`ajuda/`):
  - Checklists reutilizáveis (anúncio otimizado, lançamento, pré-campanha, revisão mensal, SOS)
  - Troubleshooting completo (problemas e soluções por feature)
- FAQ expandido em **6 seções temáticas** (conta, conexão ML, features, score, dados, pagamento)
- Links cruzados entre features, playbooks e checklists
- `llms.txt` reorganizado em 4 camadas (orientação, playbooks, features, ajuda)
- SUMMARY.md e README.md atualizados

### Expansão major — 13 features documentadas

- **Reescrita completa** do manual com base em navegação real no app via Playwright.
- Todos os nomes de features alinhados com a UI oficial:
  - "Buscador de Catálogos" → **Busca de Catálogos**
  - "Busca INPI" → **Análise de Marca** (URL `/busca-inpi`)
  - "Product Ads" → **Planejador de Ads (Beta)**
- **Novas páginas**:
  - Auditoria de Tags
  - Redimensionar Imagens
  - Palavras-Chave do Autocompletar
  - Palavras-Chave da Categoria
  - Gerador de EAN
  - Minha Conta
- **Screenshots reais** capturados do app em produção e inseridos em todas as páginas principais (22 imagens).
- Exemplos didáticos de análise com score contrastante (Classe A vs Classe C).
- Regra adicionada ao DOCS-RULES: **não revelar "o ouro"** — fórmulas, algoritmos e pesos internos ficam de fora da doc pública.

### Criação inicial
- Estrutura base: Primeiros passos, Análise de Anúncios, Análise de Marca, Busca/Concorrência de Catálogos, Palavras-Chave, Planejador de Ads.
- Glossário com termos MLB/MLBU/Catálogo, ACOS/TACOS/ROAS, BPP/INPI, EAN, tags, logística.
- `llms.txt` e `llms-full.txt` para consumo por agentes de IA.
- `DOCS-RULES.md` com padrões de escrita, grafia e segurança.
- Segurança do repo: secret scanning, push protection e Dependabot habilitados.
