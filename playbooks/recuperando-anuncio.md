---
title: Recuperando um anúncio que parou de vender
description: Diagnóstico estruturado quando um anúncio bom de repente para de vender — descobrir a causa e agir.
audience: vendedores
feature: playbook
keywords: [recuperação, diagnóstico, anúncio parado, sem visitas, tags negativas]
---

# Playbook: Recuperando um anúncio que parou de vender

Anúncio que vendia bem agora está com poucas visitas ou vendas. Este playbook te dá um **roteiro de diagnóstico** pra encontrar a causa e o plano de ação.

## Passo 1 — Análise de surface (5 min)

**Feature:** [Análise de Anúncios](../analise-de-anuncios/README.md)

1. Cole o link do anúncio → Analisar.
2. Olhe **três indicadores**:
   - **Classe** — caiu de A/B pra C/D?
   - **Visitas** — tendência em queda?
   - **Experiência de Compra** — alguma alerta (amarelo, vermelho)?

3. A lista "O que melhorar" já aponta a maioria dos problemas.

## Passo 2 — Checar Experiência de Compra (2 min)

**Feature:** [Experiência de Compra](../analise-de-anuncios/experiencia-de-compra.md)

Se o indicador estiver em atenção ou crítico:

- É a causa mais comum de queda súbita de vendas.
- Resolva **reclamações abertas** no Mercado Livre imediatamente.
- Verifique se o produto entregue corresponde ao anunciado.

## Passo 3 — Verificar tags penalizantes (10 min)

**Feature:** [Auditoria de Tags](../auditoria-tags/README.md)

1. Rode a Auditoria de Tags na sua conta.
2. Procure tags negativas **neste anúncio específico** (ex: `poor_quality_picture`, `perdendo_exposicao`).
3. Para cada tag, aplique a correção:
   - Foto em baixa qualidade → use [Redimensionar Imagens](../redimensionar-imagens/README.md) + padrão 1200x1540.
   - Perdendo exposição → resolução + talvez Melhorar Resolução do próprio ML.

## Passo 4 — Revisar o título (10 min)

**Feature:** [Agente de Palavras-Chave](../palavras-chave/README.md) + [Palavras-Chave da Categoria](../palavras-chave-categoria/README.md)

Mercado Livre muda tendências — títulos bons ficam obsoletos.

1. Rode o Agente e veja palavras faltantes novas.
2. Rode Palavras-Chave da Categoria — veja o que está em **tendência agora**.
3. Se aparecerem termos novos relevantes, **reescreva o título** incorporando-os.

## Passo 5 — Verificar concorrência (5 min)

**Feature:** [Concorrência de Catálogo](../concorrencia-catalogo/README.md) (se for catálogo)

Se o anúncio está em um catálogo:

1. Analise a concorrência.
2. Seu **preço final** ainda é competitivo?
3. Apareceu um novo líder agressivo?
4. Novos vendedores com Full/Frete Grátis?

## Passo 6 — Plano de ação

Baseado no diagnóstico, decida:

| Problema encontrado | Ação recomendada |
|---------------------|------------------|
| Experiência de Compra crítica | Resolver reclamações + considerar pausar/recriar |
| Tags negativas de foto | Redimensionar imagens + aplicar no ML |
| Título defasado | Reescrever com palavras em tendência |
| Concorrente mais agressivo | Rever preço ou melhorar frete (Full/Flex) |
| Nada obvio | Pequenas melhorias em atributos e descrição; esperar re-indexação (3–7 dias) |

{% hint style="warning" %}
⚠️ Evite mudar tudo de uma vez. Ajuste **um ou dois fatores** e espere 7 dias pra ver o efeito antes de mexer mais. Mudanças em cascata confundem o algoritmo do ML.
{% endhint %}
