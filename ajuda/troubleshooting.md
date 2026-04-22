---
title: Problemas comuns e soluções
description: Troubleshooting — problemas que você pode encontrar no Marketfacil e como resolver.
audience: vendedores
keywords: [troubleshooting, erro, problema, não funciona, solução]
---

# Problemas comuns e soluções

Se algo não está funcionando como esperado, procure a situação abaixo antes de abrir chamado no suporte.

## Análise de Anúncios

### "Erro ao buscar anúncio" / análise não carrega

**Causas possíveis:**
1. Anúncio pausado ou excluído no Mercado Livre
2. Token do ML expirou — vá em [Minha Conta](../minha-conta/README.md) e reconecte
3. Link colado está truncado ou com caracteres a mais

**Solução:** verifique se o anúncio está ativo, reconecte a conta, cole o link novamente.

### Score mudou muito em um dia

**Causas possíveis:**
1. ML atualizou tags do anúncio (novas tags negativas)
2. Anúncio recebeu avaliação ruim / reclamação
3. Queda forte de visitas ou vendas

**Solução:** olhe "O que melhorar" na análise — a causa aparece lá.

### A análise mostra "X campos da categoria faltando" mas eu já preenchi

**Causas possíveis:**
1. Mudou de categoria e os atributos da nova são diferentes
2. ML leva algum tempo pra propagar mudanças de atributos
3. Atributos foram preenchidos com valores inválidos

**Solução:** dê tempo para o ML re-indexar e analise de novo. Se persistir, confira os atributos no editor do ML.

## Busca de Catálogos / Concorrência

### Busca está muito lenta ou travou

**Causas possíveis:**
1. Busca muito ampla (ex: "celular" retorna milhares de catálogos)
2. Horário de pico no Mercado Livre
3. Problema de rede

**Solução:** use termos mais específicos. Se o problema for de rede, feche a aba e abra nova.

### "Carregando vendedores: X/Y" para em um número e não avança

**Causas possíveis:**
1. O Mercado Livre limitou temporariamente as requisições
2. Alguns vendedores bloqueiam consulta pública

**Solução:** os dados carregados já são utilizáveis. Para análise completa, aguarde alguns minutos e tente de novo.

### Não consigo ver preço/frete de um vendedor

**Causa:** o Mercado Livre bloqueia parte dos dados de terceiros em certas situações.

**Solução:** nada a fazer — é limitação do ML. O Marketfacil mostra o que é público.

## Palavras-Chave

### Agente não encontra palavras

**Causas possíveis:**
1. Anúncio com título muito longo e preenchido — já está bem otimizado
2. Categoria com pouca variedade lexical (ex: produtos muito específicos)
3. Scraping do ML falhou

**Solução:** se persistir, tente de novo em alguns minutos. Se o anúncio realmente está ótimo, significa que você não tem muito o que melhorar no título.

### Autocompletar retorna poucas ou zero sugestões

**Causa:** termo raiz muito longo ou específico demais.

**Solução:** use termos mais curtos e genéricos. Ex: "máquina dragão" em vez de "máquina de cortar cabelo dragão profissional".

## Redimensionar Imagens

### "Perdendo exposição" persiste após redimensionar

**Causa:** a imagem original tinha baixa qualidade — o redimensionamento não cria pixels que não existem.

**Solução:** no Mercado Livre, use também **Melhore Sua Foto → Ajustes de Imagem → Melhorar Resolução**. Evite o "Ajuste Automático", que pode recortar.

### Upload da imagem falha

**Causas possíveis:**
1. Arquivo muito grande (acima de 10 MB)
2. Formato não suportado (use JPG ou PNG)
3. Conexão instável

## Análise de Marca

### Marca conhecida não aparece

**Causas possíveis:**
1. Grafia diferente (com/sem acento, espaços)
2. Marca registrada só no exterior (INPI é do Brasil)
3. Marca ainda não teve pedido de registro

**Solução:** tente variações. Se não aparecer, o INPI não tem registro formal — mas **ainda pode existir** propriedade de fato (Google, redes sociais).

### Mostra "Em análise" — posso usar?

**Evite.** Enquanto o pedido está em análise, o titular ainda não tem o registro concedido para acionar BPP — mas, se for concedida, ele pode pedir retirada **retroativa** dos seus anúncios. Além disso, o pedido de marca em si já indica intenção de proteger aquele nome, então o risco legal existe. Considere apenas marcas **sem qualquer registro** no INPI.

## Planejador de Ads

### "Faz X dias que não revisa"

**Causa:** você não abriu o Planejador hoje. Sua sequência pode zerar.

**Solução:** entre todo dia, complete pelo menos 1 tarefa. 2 minutos por dia mantém o ritmo.

### Score de Saúde caiu sem eu fazer nada

**Causas possíveis:**
1. Campanha nova com métricas instáveis (normal nas primeiras 48h)
2. Anúncio entrou em "observação" (problema pós-venda)
3. TACOS estourou a meta

**Solução:** clique em **Ver detalhes** na Saúde dos Ads pra ver qual verificação falhou.

## Gerador de EAN

### EAN gerado recusado pelo Mercado Livre

**Causa provável:** o produto tem catálogo existente com EAN oficial (GS1). Você precisa usar o EAN oficial nesse caso.

**Solução:** verifique se o catálogo já existe no ML. Se sim, use o EAN dele.

## Minha Conta

### "Adicionar Conta" não funciona

**Causas possíveis:**
1. Popup bloqueado pelo navegador
2. Não está logado no Mercado Livre em outra aba
3. Plano não permite mais contas

**Solução:** permita popup, faça login no ML em outra aba, verifique seu plano.

## Problemas gerais

### Tudo está lento hoje

**Causas possíveis:**
1. API do Mercado Livre com latência alta (afeta todo mundo)
2. Você está em rede corporativa/VPN

**Solução:** aguarde, tente em outra rede, ou use outro navegador.

### Aparece "você não tem permissão"

**Causa:** a feature exige plano pago e você está no grátis.

**Solução:** upgrade na página [Minha Conta](../minha-conta/README.md).
