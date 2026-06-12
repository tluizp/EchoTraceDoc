---
sidebar_position: 4
---

# Modelagem de Eventos de Negócio

No **EchoTrace**, um evento de negócio não é apenas um log de texto. É um registro estruturado, padronizado e rico em contexto que traduz a execução técnica de um método Java em um marco compreensível para toda a empresa.

Abaixo, detalhamos os mecanismos disponíveis para capturar, extrair e enriquecer os seus dados.

---

## 🔍 A Anotação `@EchoTrace`

A forma mais simples e direta de gerar um evento é decorando o método com a anotação `@EchoTrace`. Ela possui três propriedades fundamentais:

```java
@EchoTrace(
    name = "venda.finalizada", 
    capture = {"pedido.id", "pedido.cliente.tipo"}, 
    captureReturn = true
)
```

### Propriedades Detalhadas:

**1 - name (Obrigatório)**: Define o identificador único do evento de negócio. Este nome preencherá o campo "event" no JSON final. Escolha nomes claros e focados em produto (ex: usuario.cadastro, pagamento.falha, carrinho.abandono).

**2 - capture (Opcional)**: Um array de strings que instrui a biblioteca a inspecionar os argumentos recebidos pelo método e extrair seus valores.

    * Notação de Pontos: Suporta navegação profunda em objetos aninhados (ex: pedido.cliente.endereco.cep).

    * Alta Performance: A engine de reflexão possui cache concorrente interno, garantindo que o mapeamento das propriedades aconteça de forma ultra rápida.

**3 - captureReturn (Opcional - Padrão: false)**: Quando definido como true, o EchoTrace captura o objeto retornado pelo método e o serializa dentro do campo "methodReturn". Por padrão ele é desligado para evitar a exposição acidental de dados sensíveis ou payloads excessivamente grandes.

## 🔁 Enriquecimento Dinâmico com Telemetry

Muitas vezes, os dados mais valiosos para o time de negócio não estão disponíveis nos parâmetros de entrada do método e nem no seu retorno, mas são calculados durante a execução da lógica. Para resolver isso, utilize a classe Telemetry.

Basta invocar o método estático **Telemetry.capture(chave, valor)** em qualquer ponto do seu código:

```java
import io.echotrace.telemetry.Telemetry;

@EchoTrace(name = "checkout.processado")
public void processarCheckout(CheckoutRequest request) {
    
    // ... lógica de validação ...
    
    double taxaCalculada = financeiroService.calcularTaxa(request);
    
    // Captura um dado dinâmico calculado no meio do método
    Telemetry.capture("taxa_operacao", taxaCalculada);
    
    // ... lógica de persistência ...
}
```

#### Por que isso é seguro?
Como a classe Telemetry usa o mecanismo ThreadLocal por baixo dos panos, o mapa de dados fica restrito unicamente à thread que está processando aquela requisição específica. Não há qualquer risco de vazamento de informações ou concorrência entre usuários.

## 🔴 Captura Automática de Falhas

Se o método anotado lançar qualquer tipo de exceção (Throwable), o interceptor do EchoTrace captura o erro automaticamente antes de relançá-lo para a aplicação.

O status do evento passa a ser "ERROR" e os seguintes metadados são adicionados de forma automática:

* errorType: O nome simples da classe da exceção (ex: PaymentException, NullPointerException).

* errorMessage: A mensagem amigável contida no erro.

* errorStack: Um array contendo as 10 primeiras linhas do Stack Trace para fácil auditoria pelo time técnico, sem poluir o armazenamento com stacks infinitos.

### 📋 Anatomia do Schema JSON Final

Independentemente do método anotado, o EchoTrace consolida as informações em um contrato JSON previsível e consistente. Veja a estrutura real gerada pela biblioteca:

#### Exemplo: Sucesso com Enriquecimento Dinâmico

```java
{
  "eventName": "venda.finalizada",
  "serviceName": "ecommerce-api",
  "environment": "production",
  "status": "SUCCESS",
  "durationMs": 184,
  "traceId": "c8b3294c-83b6-4fd2-bd5a-938b8125cf12",
  "spanId": "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
  "createdAt": "2026-06-12T19:00:00Z",
  "payload": {
    "class": "PedidoService",
    "method": "finalizarPedido(..)",
    "pedido.id": "PED-7762",
    "pedido.cliente.tipo": "PREMIUM",
    "taxa_operacao": 4.50,
    "methodReturn": "PedidoResponse(status=COMPLETO, total=150.0)"
  }
}
```

#### Exemplo: Captura de Falha de Negócio

```java
{
  "eventName": "venda.finalizada",
  "serviceName": "ecommerce-api",
  "environment": "production",
  "status": "ERROR",
  "durationMs": 12,
  "traceId": "c8b3294c-83b6-4fd2-bd5a-938b8125cf12",
  "spanId": "f9e8d7c6-b5a4-3f2e-1d0c-9b8a7f6e5d4c",
  "createdAt": "2026-06-12T19:05:22Z",
  "payload": {
    "class": "PedidoService",
    "method": "finalizarPedido(..)",
    "pedido.id": "PED-7763",
    "errorType": "SaldoInsuficienteException",
    "errorMessage": "Cartão de crédito recusado por falta de limite",
    "errorStack": [
      "io.echotrace.example.PedidoService.finalizarPedido(PedidoService.java:42)",
      "io.echotrace.example.PedidoController.criar(PedidoController.java:18)"
    ]
  }
}
```
