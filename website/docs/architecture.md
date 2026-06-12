---
sidebar_position: 3
---

# Arquitetura do Sistema

O **EchoTrace** foi projetado seguindo princípios rígidos de alta performance, desacoplamento e isolamento de escopo. A premissa central é que **a observabilidade de negócio nunca deve impactar a latência ou a estabilidade da sua aplicação**.

---

## 🏗️ Visão Geral dos Módulos

O ecossistema é dividido logicamente em três responsabilidades principais:

* **Core:** Contém as definições do modelo de dados (`EventPayload`), a estrutura base de contratos (`EventPublisher`) e o contexto em memória (`Telemetry`). Não possui dependências com o ecossistema Spring.
* **Interceptor (Engine AOP):** Monitora a execução dos métodos anotados com `@EchoTrace`, gerencia o tempo de resposta, captura exceções e extrai parâmetros dinamicamente por reflexão.
* **Auto-Configuration (Starter):** Gerencia a injeção automática de dependências condicional com base no estado e nas propriedades do arquivo `application.properties`.

---

## 🔄 Fluxo de Execução do Evento

O ciclo de vida de um evento capturado pelo EchoTrace segue o fluxo assíncrono e isolado ilustrado abaixo:



1. **A Requisição Chega:** O usuário executa um fluxo e atinge um método anotado com `@EchoTrace`.
2. **Ativação do Aspecto (`@Around`):** O `BusinessEventInterceptor` assume o controle, captura o carimbo de data/hora inicial (`Instant.now()`) e inicia a contagem de nanossegundos.
3. **Execução do Método Original:** O método da aplicação é executado normalmente (`pjp.proceed()`). Se houver uma falha, ela é capturada, tratada para o payload e lançada adiante sem mascarar o comportamento da aplicação.
4. **Extração e Enriquecimento:** No bloco `finally`, o interceptor combina os dados capturados automaticamente via reflexão profunda (`FIELD_CACHE`) com o estado em memória populado manualmente via `Telemetry.capture()`.
5. **Criação do Payload Unificado:** É gerado o `EventPayload`, contendo os metadados contextuais (`serviceName`, `environment`, `traceId`, `spanId`).
6. **Despache Assíncrono:** O `EventPublisher` ativo recebe o objeto e realiza o disparo em background sem prender a thread principal do usuário.

---

## 🧠 Componentes Chave por Dentro do Código

### 1. Interceptação Dinâmica (`BusinessEventInterceptor`)
Utilizando **Spring AOP**, o EchoTrace cria proxies em torno dos métodos anotados. Para evitar degradação de performance por reflexão contínua em ambientes de produção agressivos, a biblioteca implementa uma estrutura de cache concorrente (`FIELD_CACHE`) baseada em `ConcurrentHashMap`. Uma vez mapeada a árvore de propriedades do argumento (ex: `pedido.usuario.documento`), os acessos subsequentes ocorrem em tempo de execução com custo de processamento quase zero.

### 2. Isolamento de Contexto Concorrente (`Telemetry`)
Para permitir que você adicione informações ao evento a partir de qualquer ponto do fluxo de execução (como camadas internas de Services ou Validadores), o EchoTrace utiliza `ThreadLocal`:

```java
private static final ThreadLocal<Map<String, Object>> context = 
        ThreadLocal.withInitial(HashMap::new);
```

Isso garante isolamento absoluto de dados: a telemetria de uma requisição concorrente da Thread A nunca vazará ou se misturará com os dados da Thread B.

### 3. Envio Assíncrono Não-Bloqueante (AsyncHttpEventPublisher)

Ao optar por enviar os dados para um servidor centralizado usando a propriedade echotrace.collector-url, o disparo é delegado ao mecanismo nativo e assíncrono do Java (HttpClient.sendAsync).

```java
client.sendAsync(request, HttpResponse.BodyHandlers.ofString());
```

Esse design garante que mesmo se o servidor de dashboards ou o coletor HTTP apresentar instabilidade ou lentidão na rede, a sua aplicação Spring Boot continuará respondendo o cliente final instantaneamente, sem retenção de threads do Tomcat.

#### ⚙️ Mecanismo de Inicialização Condicional

O EchoTrace Starter utiliza os mecanismos @Conditional do Spring Boot para garantir que a biblioteca funcione de forma inteligente e segura sem exigir códigos complexos de inicialização:

| Tipo de Configuração | Publisher Ativado | Comportamento Interno |
| :--- | :---: | ---: |
| echotrace.collector-url presente | AsyncHttpEventPublisher | Ativa o envio HTTP assíncrono de payloads JSON para a URL indicada. |
| Nenhuma propriedade definida | LogEventPublisher | Comportamento padrão de segurança; imprime os eventos estruturados direto no Console. |
| Bean EventPublisher declarado | Customizado pelo Usuário | Ignora os publishers padrões e entrega os payloads para a infraestrutura da sua escolha (Kafka, RabbitMQ, etc.). |
