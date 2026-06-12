---
sidebar_position: 1
---

# Introdução

O **EchoTrace** é uma biblioteca de *Business Observability* para ecossistemas Spring Boot projetada para construir uma ponte direta entre o código da sua aplicação e o time de negócio.

Enquanto as ferramentas tradicionais de monitoramento (APM) focam em métricas de infraestrutura — como uso de CPU, memória e latência de rede —, o EchoTrace foca no que realmente importa para a empresa: **o comportamento e o sucesso do produto.**

```md
                    ┌─────────────────────────┐
                    │     Sua Aplicação       │
                    │      Spring Boot        │
                    └────────────┬────────────┘
                                 │
                [ @EchoTrace ] Interceptação transparente
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │    Payload de Negócio   │
                    │ (Estruturado e Limpo)   │
                    └────────────┬────────────┘
                                 │
                                 ▼
          ┌───────────────────────────────────────────────┐
          │            Camada de Visualização             │
          │  (Dashboards de Vendas, Funis, Churn, etc.)   │
          └───────────────────────────────────────────────┘
```

Por que o **EchoTrace**?

Muitas vezes, responder a perguntas simples do dia a dia do negócio se torna um desafio técnico complexo:

- Quanto geramos em vendas nas últimas duas horas?

- Quantos clientes abandonaram o fluxo na última etapa do carrinho?

- O erro que aconteceu no checkout foi técnico ou uma recusa legítima do cartão?

Para obter essas respostas hoje, ou o time de desenvolvimento precisa criar relatórios customizados e queries complexas no banco de dados, ou os analistas de negócio precisam decifrar ferramentas técnicas e densas como Datadog, OpenSearch ou Splunk.

O EchoTrace resolve isso na raiz do problema. Ele intercepta a execução dos seus métodos Java de forma assíncrona, extrai o contexto relevante (IDs, valores, status) e envia esses dados estruturados para onde o seu time de negócio preferir consumir.