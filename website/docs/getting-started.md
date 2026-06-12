---
sidebar_position: 2
---

# Primeiros Passos

Este guia vai ajudar você a integrar o **EchoTrace** na sua aplicação Spring Boot e disparar seu primeiro evento de negócio em menos de 2 minutos.

## 1. Pré-requisitos

Antes de começar, certifique-se de que seu projeto atende aos seguintes requisitos:
* **Java 17** ou superior.
* **Spring Boot 3.x** ou superior.

---

## 2. Adicionar a Dependência

Adicione o starter do EchoTrace ao gerenciador de dependências do seu projeto.

### Maven (`pom.xml`)
```xml
<dependency>
    <groupId>io.echotrace</groupId>
    <artifactId>echotrace-spring-boot-starter</artifactId>
    <version>1.0.0</version>
</dependency>
```

### Gradle (build.gradle)

```grovy
implementation 'io.echotrace:echotrace-spring-boot-starter:1.0.0'
```

## 3. Configurar o Destino dos Dados

No arquivo de propriedades do seu projeto (application.properties ou application.yml), informe para onde os eventos gerados devem ser enviados (o endpoint que o seu time de negócio ou dashboard vai consumir).

#### application.properties

```
# URL do coletor/API que vai receber os payloads JSON dos eventos
echotrace.collector-url=[http://api.seu-dashboard-de-negocio.com/v1/events]
```

#### application.yml

```
echotrace:
  collector-url: [http://api.seu-dashboard-de-negocio.com/v1/events](http://api.seu-dashboard-de-negocio.com/v1/events)
```

## 4. Anotar o seu Primeiro Método

```
import io.echotrace.annotation.EchoTrace;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @PostMapping
    @EchoTrace(name = "venda.realizada", capture = {"req.id"}, captureReturn = true)
    public PedidoResponse criarPedido(@RequestBody PedidoRequest req) {
        // Sua lógica de negócio continua exatamente igual
        return pedidoService.processar(req);
    }
}
```

## O que acabou de acontecer aqui?

- **name = "venda.realizada"**: Dá um nome amigável e puramente comercial para o evento (perfeito para quem for montar o gráfico filtrar por "venda.realizada").

- **capture = {"req.id"}**: Instrui a biblioteca a extrair o ID do pedido de dentro do objeto de requisição recebido.

- **captureReturn = true**: Captura automaticamente o objeto retornado (PedidoResponse), incluindo status, valores e payloads finais.


## 5. Validando o Resultado

Ao executar o fluxo acima, o EchoTrace interceptará a execução de forma assíncrona (sem travar a requisição do usuário) e enviará um payload estruturado para a URL configurada. O JSON recebido pelo seu servidor de dashboards terá uma estrutura parecida com esta:

```
{
  "event": "venda.realizada",
  "timestamp": "2026-06-12T18:31:19Z",
  "durationMs": 142,
  "metadata": {
    "class": "PedidoController",
    "method": "criarPedido",
    "req.id": "PED-99823",
    "methodReturn": {
      "status": "APROVADO",
      "total": 250.00,
      "itens": 3
    }
  },
  "traceId": "f8d088d7-cb83-49a1-949b-7cb3b65710dc"
}
```

* Com esse JSON padronizado chegando na ponta, qualquer pessoa do time de produto ou operações consegue mapear os campos e criar gráficos em tempo real!