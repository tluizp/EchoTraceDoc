---
sidebar_position: 5
---

# Funis de Conversão e Jornadas

Um dos maiores superpoderes do **EchoTrace** é permitir que pessoas não técnicas visualizem a jornada do cliente como um funil comercial em tempo real. 

Em vez de analisar dados frios de cliques em tela, o time de negócios consegue rastrear passos lógicos e profundos que acontecem dentro do backend, identificando exatamente em qual etapa do processo o produto está perdendo dinheiro.

---

## 🌪️ O que é um Funil de Negócio?

Um funil é uma sequência de eventos que um usuário deve realizar para completar um objetivo dentro do sistema. 

Por exemplo, em um e-commerce, o funil clássico de conversão de checkout pode ser modelado mapeando três métodos da sua aplicação:

1. `checkout.iniciado` (Usuário abriu a tela de pagamento)
2. `pagamento.processando` (Usuário enviou os dados do cartão)
3. `venda.finalizada` (Dinheiro capturado e pedido faturado)

Ao enviar esses eventos estruturados, qualquer ferramenta de visualização conectada ao seu coletor HTTP consegue gerar um gráfico de barras decrescentes, expondo gargalos onde os clientes desistem.

---

## 🆔 Rastreabilidade com `traceId` e `spanId`

Para que o time de negócio saiba que o evento de *Aprovação de Pagamento* pertence ao mesmo cliente que *Iniciou o Checkout* dois minutos atrás, o EchoTrace injeta automaticamente dois identificadores de rastreabilidade em cada payload:

* **`traceId`**: Representa a jornada completa (a transação de ponta a ponta). Ele permanece o mesmo durante todo o ciclo de vida daquela operação.
* **`spanId`**: Representa uma etapa específica (o método exato que foi executado naquele instante). Cada método gera o seu próprio `spanId`.

### Como o EchoTrace gerencia isso sob o capô?
Quando um método anotado com `@EchoTrace` inicia, a biblioteca verifica se já existe um `traceId` ativo na thread atual através do contexto `Telemetry`. 
* Se **não existir**, um novo ID universal (UUID) é gerado automaticamente.
* Se **já existir** (porque o método foi chamado dentro de outro fluxo que também estava anotado), o EchoTrace mantém o mesmo `traceId` original, ligando as duas pontas do ecossistema de forma transparente.

---

## 🛠️ Exemplo Prático: Mapeando um Funil no Código

Veja como é simples preparar a sua aplicação para fornecer métricas de funil para o time de produto. Você só precisa anotar os métodos que representam os passos da jornada:

```java
@Service
public class CheckoutService {

    // PASSO 1: Início da jornada do cliente
    @EchoTrace(name = "checkout.iniciado", capture = {"carrinho.id"})
    public void iniciarCheckout(Carrinho carrinho) {
        // lógica para abrir o checkout
    }

    // PASSO 2: Processamento intermediário
    @EchoTrace(name = "pagamento.processando", capture = {"carrinho.id"})
    public void processarPagamento(Carrinho carrinho, CartaoDTO cartao) {
        // lógica de integração com o gateway de pagamento
    }

    // PASSO 3: Sucesso final (Topo de conversão)
    @EchoTrace(name = "venda.finalizada", capture = {"carrinho.id"}, captureReturn = true)
    public PedidoResponse finalizarPedido(Carrinho carrinho) {
        // lógica que encerra e fatura a compra
    }
}
```

### Como o time de dados consome isso?
Como você instruiu o parâmetro **`capture = {"carrinho.id"}`** em todas as etapas, o analista de dados ou a pessoa de negócios pode criar uma query simples ou aplicar um filtro visual agrupando por payload.carrinho.id ordenado por createdAt.

Pronto! O gráfico de funil e a taxa de conversão entre cada etapa do sistema são calculados instantaneamente.

### 📈 Benefícios para o Time de Produto (Product Managers)

**`Análise de Churn Real`**: Descubra se os usuários estão desistindo por fricção na interface ou porque uma API de cupom/frete do backend está demorando muito ou falhando.

**`Mapeamento de Comportamento`**: Entenda quanto tempo o usuário leva, em média, entre tentar pagar (pagamento.processando) e o sistema receber a confirmação de sucesso (venda.finalizada).

**`Visualização Sem Código`**: Permite que analistas de BI criem visões analíticas complexas cruzando metadados capturados (ex: "Taxa de conversão de clientes PREMIUM vs. clientes REGULAR") sem demandar novas tarefas ou queries no banco de dados para a equipe de engenharia.