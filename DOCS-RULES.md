---
title: Regras de documentação
description: Padrões de escrita, grafia, tom e estrutura para todas as páginas deste repositório.
audience: editores
keywords: [regras, estilo, tom, padrão, documentação]
---

# Regras de documentação

Estas regras valem para **toda página** deste repositório. Qualquer pessoa (ou IA) que edite conteúdo deve segui-las.

## 1. Grafia da marca

- Sempre **Marketfacil** — tudo junto, "f" minúsculo, **sem acento**.
- ❌ Errado: MarketFácil, Market Fácil, marketFacil, Marketfácil, market facil.
- ✅ Certo: Marketfacil.

## 2. Público-alvo

O público é **vendedor do Mercado Livre**, não desenvolvedor. Regras:

- Use português brasileiro direto, frases curtas.
- Evite jargão técnico. Quando precisar usar (MLB, TACOS, BPP, etc.), linke para o [Glossário](GLOSSARIO.md) na primeira menção da página.
- Prefira "seu anúncio" a "o item", "sua conta" a "a instância do usuário".
- Exemplos concretos > definições abstratas.

## 3. Escrita para humanos **e** IAs

A documentação é consumida tanto por vendedores quanto por agentes de IA (RAG, chatbots, assistentes). Regras:

- **Texto autossuficiente**: toda imagem ou vídeo deve ter descrição textual do que mostra. IA não vê o print — se a info só existe na imagem, a IA fica cega.
- **Frontmatter YAML obrigatório** em cada `.md`: `title`, `description`, `audience`, `keywords`. Opcional: `feature`, `related`.
- **Headings hierárquicos**: H1 único por página, nunca pule de H1 para H3.
- **URLs canônicas estáveis**: não renomeie slugs de páginas já publicadas. Se precisar renomear, adicione redirect em `.gitbook.yaml`.
- **Seção "Perguntas frequentes"** no final de cada página sobre feature, em formato Q&A curto — ajuda RAG.
- **Datas absolutas** (não "semana passada", "recentemente"): escreva `2026-04-21`.

## 4. Screenshots e vídeos

- **Screenshots**: PNG, no máx 1600px de largura, em `assets/screenshots/`.
- **Nome**: `feature-acao-vN.png` — ex: `analise-score-v1.png`.
- **Alt text obrigatório**: descreva o que está na tela. Ex: `![Tela de análise com score 82 destacado em verde](../assets/screenshots/analise-score-v1.png)`.
- **Parágrafo descritivo** acima OU abaixo de cada print — explica o print em texto corrido.
- **Vídeos**: embute do YouTube (unlisted) ou Loom. Máximo 90 segundos. Sempre acompanhe de um resumo escrito do que o vídeo mostra.

## 5. Callouts padronizados

Use os hints nativos do GitBook:

```
{% hint style="info" %} 💡 Dica: texto curto de recomendação. {% endhint %}
{% hint style="warning" %} ⚠️ Atenção: cuidado importante. {% endhint %}
{% hint style="danger" %} 🚫 Bloqueio: evite fazer isso. {% endhint %}
{% hint style="success" %} ✅ Boa prática: padrão recomendado. {% endhint %}
```

## 6. Estrutura padrão de página de feature

```markdown
---
title: ...
description: ...
feature: ...
audience: vendedores
keywords: [...]
---

# Título da feature

Parágrafo de abertura: o que é + pra que serve (1–2 frases).

## Quando usar

Bullets de casos de uso concretos.

## Passo a passo

1. Ação 1 — com print
2. Ação 2 — com print
3. Ação 3 — com resultado esperado

## O que você vê na tela

Descrição textual de cada seção/painel da feature.

## Perguntas frequentes

**P: ...?**
R: ...

## Veja também

- [Link](...)
```

## 7. Changelog

Toda mudança relevante entra em [`CHANGELOG.md`](CHANGELOG.md) com data ISO (`YYYY-MM-DD`). Assim a IA sabe se a info é fresca.

## 8. Segurança

- **Nunca** coloque tokens, API keys, URLs privadas de proxy, IDs internos do Bubble, nomes de elementos técnicos (bTKMH, bTKbr etc.) em páginas públicas.
- Prints **não podem** mostrar: emails de outros usuários, tokens, sessões, dados de pagamento. Borre antes de subir.
- Em dúvida: **não publique**. Pergunte antes.

## 9. Honestidade — nunca inventar números ou regras

**Regra absoluta:** toda afirmação na doc pública precisa ser **factualmente verificável**. Nunca invente thresholds, prazos, quantidades, benchmarks ou regras que "parecem razoáveis".

### ✅ Pode escrever
- Textos literais do app observados em produção
- Comportamentos observados (fluxos, botões, campos)
- Limites públicos oficiais do Mercado Livre (título 60/200 caracteres, etc.)
- Termos oficiais do ML
- Classificações do próprio app (Classe A-F, níveis)
- Exemplos numéricos para explicar fórmulas
- Tempos medidos em uso real

### ❌ Nunca escrever
- Thresholds de "saudável" sem base (ex: "TACOS 5-15% saudável")
- Prazos específicos não observados (ex: "espere 6 horas", "30 dias sem vendas")
- Quantidades mínimas não oficiais (ex: "5 fotos", "descrição 300 caracteres")
- Schedule de acompanhamento ("dia 3 checar X")
- Tempo estimado por passo ("5 min", "20 min")
- Benchmarks de e-commerce genéricos apresentados como regra do ML

### Framing correto quando não há base factual
- "Depende do seu negócio"
- "Use seu julgamento"
- "O ML leva cerca de 1 hora para incluir palavras novas nas buscas" (confirmado pelo user)
- "Sem vendas recentes" (sem especificar quantos dias)

**Princípio:** documentação é contrato de confiança. Número inventado que não funcionar na prática destrói a credibilidade.

## 10. Sem "ouro" — esconder diferenciais competitivos

Esta é uma **doc pública**, acessível também pelos concorrentes. Explique **o que a feature faz e como usar**, sem expor os internals que dão vantagem competitiva ao Marketfacil.

### ❌ NÃO revelar:
- Fórmulas exatas de score ("−15 pontos se título < 40 chars")
- Pesos e thresholds específicos dos algoritmos
- Categorias internas da IA ("7 categorias: Sinônimos, Pesquisa, Utilidades…")
- Quais endpoints do proxy são usados
- Lógica exata de ranking ou de "sinal de oportunidade"
- Número exato de requests por operação
- Modelos de IA usados (gpt-5-mini, gpt-4o-mini, etc.)
- Retry counts, timeouts, rate limits específicos

### ✅ OK revelar:
- O que a feature faz em alto nível
- Quando e por que usar
- Tipos de input aceitos
- Como ler/interpretar o output **qualitativamente** (sem pesos)
- Dicas de uso baseadas em experiência
- Faixas qualitativas ("score alto = bom, baixo = ruim")
- Limites públicos da API do Mercado Livre
- Termos do próprio ML (ACOS, TACOS, BPP, tags, níveis)

**Regra de ouro:** se um concorrente leria o texto e saberia replicar a feature, removeu "ouro" demais. O texto deve ajudar o **vendedor a usar**, não ensinar a **construir**.
