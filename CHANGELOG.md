---
title: Changelog
description: Histórico de mudanças na documentação do Marketfacil.
audience: todos
keywords: [changelog, histórico, versões]
---

# Changelog

Todas as mudanças relevantes na documentação ficam aqui, em ordem cronológica inversa. Formato: `YYYY-MM-DD — descrição`.

## 2026-04-21

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
