import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

// ── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 40, startDelay = 400) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(delay);
  }, [text]);
  return { displayed, done };
}

export default function Home() {
  const { displayed: heroLine, done: heroDone } = useTypewriter(
    'Observe seu negócio. Não apenas sua infra.',
    38,
    300
  );

  return (
    <Layout
      title="Business Observability para Aplicações Modernas"
      description="Observe seu negócio. Não apenas sua infraestrutura. Transforme execução em significado com EchoTrace.">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <header className={styles.heroSection}>
        <div className={styles.container}>

          {/* Badge */}
          <div className={styles.badge}>
            <span className={styles.pulseDot}></span>
            Open Source · Spring Boot · Zero Config
          </div>

          {/* Typewriter headline */}
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTyped}>{heroLine}</span>
            {!heroDone && <span className={styles.cursor}>|</span>}
          </h1>

          <p className={styles.heroSubtitle}>
            Uma anotação transforma qualquer método Spring Boot em um evento de negócio estruturado.
            Sem agentes. Sem mudanças de infra. Só dados que o seu time realmente usa.
          </p>

          <div className={styles.heroCtas}>
            <Link className={`${styles.btn} ${styles.btnPrimary}`} to="/docs/intro">
              Instalar em 2 minutos →
            </Link>
            <Link className={`${styles.btn} ${styles.btnSecondary}`} to="https://github.com/tluizp/echotrace">
              ⭐ Ver no GitHub
            </Link>
          </div>
        </div>

        {/* ── Hero: code + quick-install side by side ── */}
        <div className={`${styles.container} ${styles.heroGrid}`}>

          {/* Java snippet */}
          <div className={styles.codeWindow}>
            <div className={styles.windowHeader}>
              <span className={styles.dot} style={{ background: '#FF5F56' }}></span>
              <span className={styles.dot} style={{ background: '#FFBD2E' }}></span>
              <span className={styles.dot} style={{ background: '#27C93F' }}></span>
              <span className={styles.windowTitle}>PedidoController.java</span>
              <span className={styles.liveBadge}>● live</span>
            </div>
            <div className={styles.codeScrollWrapper}>
              <pre className={styles.idePre}>
<code>
<span className={styles.jAnnotation}>@EchoTrace</span><span className={styles.jPunct}>(</span><span className={styles.jProp}>name</span> <span className={styles.jOp}>=</span> <span className={styles.jString}>"pedido.request"</span><span className={styles.jPunct}>,</span>{"\n"}
<span className={styles.jPunct}>{"         "}</span><span className={styles.jProp}>capture</span><span className={styles.jOp}>=</span><span className={styles.jPunct}>{"{"}</span><span className={styles.jString}>"pedido.id"</span><span className={styles.jPunct}>{"}"}</span><span className={styles.jPunct}>,</span> <span className={styles.jProp}>captureReturn</span> <span className={styles.jOp}>=</span> <span className={styles.jKeyword}>true</span><span className={styles.jPunct}>)</span>{"\n"}
<span className={styles.jKeyword}>public</span> <span className={styles.jType}>PedidoResponse</span> <span className={styles.jMethod}>criarPedido</span><span className={styles.jPunct}>(</span><span className={styles.jAnnotation}>@RequestBody</span> <span className={styles.jType}>PedidoRequest</span> pedido<span className={styles.jPunct}>) {'{'}</span>{"\n"}
{"\n"}
{"  "}<span className={styles.jComment}>// Enriqueça o evento em qualquer ponto do fluxo</span>{"\n"}
{"  "}<span className={styles.jType}>Telemetry</span><span className={styles.jPunct}>.</span><span className={styles.jMethod}>capture</span><span className={styles.jPunct}>(</span><span className={styles.jString}>"valor_gasto"</span><span className={styles.jPunct}>,</span> pedido<span className={styles.jPunct}>.</span><span className={styles.jMethod}>getValor</span><span className={styles.jPunct}>());</span>{"\n"}
{"\n"}
{"  "}<span className={styles.jType}>PedidoResponse</span> response <span className={styles.jOp}>=</span> <span className={styles.jKeyword}>new</span> <span className={styles.jType}>PedidoResponse</span><span className={styles.jPunct}>();</span>{"\n"}
{"  "}<span className={styles.jType}>Telemetry</span><span className={styles.jPunct}>.</span><span className={styles.jMethod}>capture</span><span className={styles.jPunct}>(</span><span className={styles.jString}>"expectativa_entrega"</span><span className={styles.jPunct}>,</span> response<span className={styles.jPunct}>.</span><span className={styles.jMethod}>getHorarioExpectativaEntrega</span><span className={styles.jPunct}>());</span>{"\n"}
{"\n"}
{"  "}<span className={styles.jKeyword}>return</span> response<span className={styles.jPunct}>;</span>{"\n"}
<span className={styles.jPunct}>{'}'}</span>
</code>
              </pre>
            </div>
            <div className={styles.codeWindowFooter}>
              <span className={styles.pulseDot}></span>
              EchoTrace intercepted → evento emitido em <strong>0.4ms</strong>
            </div>
          </div>
        </div>
      </header>

      {/* ── PROBLEM vs SOLUTION ───────────────────────────────────────────── */}
      <section className={styles.sectionContrast}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>O problema</span>
            <h2>Você vê a CPU.<br /><span className={styles.mutedHeading}>Não vê o negócio.</span></h2>
          </div>
          <div className={styles.grid2Col}>
            <div className={styles.painCard}>
              <div className={styles.cardLabel} style={{ color: 'var(--et-red)' }}>✗ Sem EchoTrace</div>
              <ul className={styles.painList}>
                <li>CPU a 12%, memória ok — mas os pedidos estão completando?</li>
                <li>p99 estável — onde os usuários estão desistindo?</li>
                <li>Serviço retornou 200 — foi realmente um sucesso de negócio?</li>
                <li>3 microsserviços envolvidos — qual causou a falha?</li>
              </ul>
            </div>
            <div className={styles.solutionCard}>
              <div className={styles.cardLabel} style={{ color: 'var(--et-accent)' }}>✓ Com EchoTrace</div>
              <ul className={styles.solutionList}>
                <li>Cada tentativa de pedido emite um evento estruturado com contexto completo.</li>
                <li>Etapas da jornada capturadas como eventos de negócio nomeados.</li>
                <li>Outcome real — sucesso, parcial, falha — em cada payload.</li>
                <li>Trace ID propagado pelo grafo inteiro de microsserviços.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>O que você ganha</span>
            <h2>Construído para engenheiros.<br />Usado pelo negócio.</h2>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureTag}>@EchoTrace</div>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Uma anotação, payload completo</h3>
              <p>Anote qualquer método e receba nome da classe, assinatura, args, retorno e timing — automaticamente.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureTag}>No lock-in</div>
              <div className={styles.featureIcon}>🔌</div>
              <h3>Publishers plugáveis</h3>
              <p>Envie eventos para console, Kafka, HTTP, Datadog ou Elasticsearch. Escreva seu próprio EventPublisher em minutos.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureTag}>Telemetry.capture()</div>
              <div className={styles.featureIcon}>🔁</div>
              <h3>Enriquecimento dinâmico</h3>
              <p>Adicione chave-valor arbitrário em qualquer ponto do fluxo de execução. Dados de negócio pertencem nos seus eventos.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureTag}>Distribuído</div>
              <div className={styles.featureIcon}>🕸️</div>
              <h3>Rastreio entre serviços</h3>
              <p>Trace IDs estruturados fluem entre os serviços. Audite chains de request inteiras sem sidecar ou agente.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureTag}>Error handling</div>
              <div className={styles.featureIcon}>🔴</div>
              <h3>Captura automática de falhas</h3>
              <p>Exceções são interceptadas automaticamente. Tipo, mensagem e stack trace chegam no payload do evento.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureTag}>Spring Boot starter</div>
              <div className={styles.featureIcon}>🚀</div>
              <h3>Zero mudanças de infra</h3>
              <p>Adicione a dependência, configure duas propriedades. Sem agentes, sem flags de JVM, sem mudanças de infraestrutura.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE ──────────────────────────────────────────────────── */}
      <section className={styles.sectionContrast}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>Arquitetura</span>
            <h2>Interceptar → Enriquecer → Publicar</h2>
            <p>Interceptação via AOP. Dispatch assíncrono. Sua app nunca espera pela observabilidade.</p>
          </div>

          <div className={styles.architectureFlow}>
            <div className={styles.archStep}>
              <strong>Sua App</strong>
              <small>Spring Boot · Métodos anotados</small>
            </div>
            <div className={styles.archArrow}><span className={styles.pulseDot}></span>→</div>
            <div className={styles.archStep}>
              <strong>EchoTrace Starter</strong>
              <small>Interceptor AOP</small>
            </div>
            <div className={styles.archArrow}><span className={styles.pulseDot}></span>→</div>
            <div className={styles.archStep}>
              <strong>Dispatcher Async</strong>
              <small>Fila non-blocking</small>
            </div>
            <div className={styles.archArrow}><span className={styles.pulseDot}></span>→</div>
            <div className={styles.archStep}>
              <strong>Publisher</strong>
              <small>Kafka · HTTP · Console</small>
            </div>
            <div className={styles.archArrow}><span className={styles.pulseDot}></span>→</div>
            <div className={styles.archStep}>
              <strong>Seu Dashboard</strong>
              <small>Datadog · Elastic · Custom</small>
            </div>
          </div>
        </div>
      </section>

      {/* ── PAYLOADS ──────────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>Payloads de evento</span>
            <h2>Estruturado. Pesquisável. Acionável.</h2>
            <p>Todo evento é um schema JSON consistente. Sem parsing. Sem adivinhação.</p>
          </div>

          <div className={styles.codeGrid}>
            {/* Sucesso */}
            <div className={styles.codeCardContainer}>
              <div className={`${styles.ideHeader} ${styles.ideHeaderSuccess}`}>
                <span className={styles.statusDot} style={{ background: '#00E5A0' }}></span>
                Sucesso + Enriquecimento
              </div>
              <div className={styles.codeScrollWrapper}>
                <pre className={styles.idePre}>
<code>
<span className={styles.jPunct}>{"{"}</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"event"</span><span className={styles.jPunct}>:</span>   <span className={styles.jsonStr}>"pedido.request"</span><span className={styles.jPunct}>,</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"class"</span><span className={styles.jPunct}>:</span>   <span className={styles.jsonStr}>"PedidoController"</span><span className={styles.jPunct}>,</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"pedido.id"</span><span className={styles.jPunct}>:</span> <span className={styles.jsonStr}>"A12VDf4SDfds5"</span><span className={styles.jPunct}>,</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"valor_gasto"</span><span className={styles.jPunct}>:</span> <span className={styles.jsonNum}>75.87</span><span className={styles.jPunct}>,</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"methodReturn"</span><span className={styles.jPunct}>:</span> <span className={styles.jsonStr}>"PedidoResponse(status=EM ANDAMENTO)"</span><span className={styles.jPunct}>,</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"expectativa_entrega"</span><span className={styles.jPunct}>:</span> <span className={styles.jsonStr}>"19:30"</span><span className={styles.jPunct}>,</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"durationMs"</span><span className={styles.jPunct}>:</span> <span className={styles.jsonNum}>12</span>{"\n"}
<span className={styles.jPunct}>{"}"}</span>
</code>
                </pre>
              </div>
            </div>

            {/* Erro */}
            <div className={styles.codeCardContainer}>
              <div className={`${styles.ideHeader} ${styles.ideHeaderError}`}>
                <span className={styles.statusDot} style={{ background: '#FF6B6B' }}></span>
                Captura Automática de Falhas
              </div>
              <div className={styles.codeScrollWrapper}>
                <pre className={styles.idePre}>
<code>
<span className={styles.jPunct}>{"{"}</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"event"</span><span className={styles.jPunct}>:</span>     <span className={styles.jsonStr}>"pedido.request"</span><span className={styles.jPunct}>,</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"class"</span><span className={styles.jPunct}>:</span>     <span className={styles.jsonStr}>"PedidoController"</span><span className={styles.jPunct}>,</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"errorType"</span><span className={styles.jPunct}>:</span> <span className={styles.jsonErr}>"RuntimeException"</span><span className={styles.jPunct}>,</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"pedido.id"</span><span className={styles.jPunct}>:</span> <span className={styles.jsonStr}>"A12VDf4SDfds5"</span><span className={styles.jPunct}>,</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"errorStack"</span><span className={styles.jPunct}>: [</span>{"\n"}
{"    "}<span className={styles.jsonStr}>"PedidoController.java:51"</span><span className={styles.jPunct}>,</span>{"\n"}
{"    "}<span className={styles.jsonStr}>"CglibAopProxy.proceed(..)"</span>{"\n"}
{"  "}<span className={styles.jPunct}>],</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"valor_gasto"</span><span className={styles.jPunct}>:</span> <span className={styles.jsonNum}>75.87</span><span className={styles.jPunct}>,</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"errorMessage"</span><span className={styles.jPunct}>:</span> <span className={styles.jsonErr}>"Erro no pedido"</span>{"\n"}
<span className={styles.jPunct}>{"}"}</span>
</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTALL STEPS ─────────────────────────────────────────────────── */}
      <section className={styles.sectionContrast}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>Get started</span>
            <h2>Funcionando em 4 passos</h2>
          </div>

          <div className={styles.installSteps}>
            <div className={styles.installStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepBody}>
                <div className={styles.stepTitle}>Adicione a dependência Maven</div>
                <div className={styles.terminalBlock}>
                  <div className={styles.terminalHeader}>
                    <span className={styles.dot} style={{ background: '#FF5F56' }}></span>
                    <span className={styles.dot} style={{ background: '#FFBD2E' }}></span>
                    <span className={styles.dot} style={{ background: '#27C93F' }}></span>
                    <span className={styles.windowTitle}>pom.xml</span>
                  </div>
                  <pre className={styles.terminalPre}>
                    <span className={styles.termMuted}>{"<dependency>"}</span>{"\n"}
                    <span className={styles.termMuted}>{"  <groupId>"}</span><span className={styles.termAccent}>io.echotrace</span><span className={styles.termMuted}>{"</groupId>"}</span>{"\n"}
                    <span className={styles.termMuted}>{"  <artifactId>"}</span><span className={styles.termAccent}>echotrace-spring-boot-starter</span><span className={styles.termMuted}>{"</artifactId>"}</span>{"\n"}
                    <span className={styles.termMuted}>{"  <version>"}</span><span className={styles.termAmber}>1.0.0</span><span className={styles.termMuted}>{"</version>"}</span>{"\n"}
                    <span className={styles.termMuted}>{"</dependency>"}</span>
                  </pre>
                </div>
              </div>
            </div>

            <div className={styles.installStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepBody}>
                <div className={styles.stepTitle}>Anote seu primeiro método</div>
                <div className={styles.terminalBlock}>
                  <div className={styles.terminalHeader}>
                    <span className={styles.dot} style={{ background: '#FF5F56' }}></span>
                    <span className={styles.dot} style={{ background: '#FFBD2E' }}></span>
                    <span className={styles.dot} style={{ background: '#27C93F' }}></span>
                    <span className={styles.windowTitle}>OrderController.java</span>
                  </div>
                  <pre className={styles.terminalPre}>
                    <span className={styles.termComment}># Anote qualquer método — pronto. Eventos chegam automaticamente.</span>{"\n"}
                    <span className={styles.termPrompt}>$ </span><span className={styles.termAccent}>@EchoTrace</span><span className={styles.termText}>(name = "order-create", capture="req.id", captureReturn = true)</span>{"\n"}
                    <span className={styles.termPrompt}>$ </span><span className={styles.termText}>public OrderResponse createOrder(OrderRequest req) {'{ ... }'}</span>{"\n"}
                    <span className={styles.termSuccess}>✓ Evento emitido: {'{ "event": "order.create", ... }'}</span>
                  </pre>
                </div>
              </div>
            </div>

            <div className={styles.installStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepBody}>
                <div className={styles.stepTitle}>Configure o destino HTTP</div>
                <div className={styles.terminalBlock}>
                  <div className={styles.terminalHeader}>
                    <span className={styles.dot} style={{ background: '#FF5F56' }}></span>
                    <span className={styles.dot} style={{ background: '#FFBD2E' }}></span>
                    <span className={styles.dot} style={{ background: '#27C93F' }}></span>
                    <span className={styles.windowTitle}>application.properties</span>
                  </div>
                  <pre className={styles.terminalPre}>
                    <span className={styles.termComment}># Defina a URL do collector para o envio automático de payloads</span>{"\n"}
                    <span className={styles.termAccent}>echotrace.collector-url</span><span className={styles.termMuted}>=</span><span className={styles.termText}>http://localhost:8080</span>
                  </pre>
                </div>
              </div>
            </div>

            <div className={styles.installStep}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepBody}>
                <div className={styles.stepTitle}>Pronto!!</div>
                <div className={styles.terminalBlock}>
                  <pre className={styles.terminalPre}>
                  <div className={styles.codeScrollWrapper}>
                <pre className={styles.idePre}>
<code>
<span className={styles.jPunct}>{"{"}</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"event"</span><span className={styles.jPunct}>:</span>   <span className={styles.jsonStr}>"order-create"</span><span className={styles.jPunct}>,</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"class"</span><span className={styles.jPunct}>:</span>   <span className={styles.jsonStr}>"OrderController"</span><span className={styles.jPunct}>,</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"req.id"</span><span className={styles.jPunct}>:</span> <span className={styles.jsonStr}>"A12VDf4SDfds5"</span><span className={styles.jPunct}>,</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"methodReturn"</span><span className={styles.jPunct}>:</span> <span className={styles.jsonStr}>"OrderResponse(id=A12VDf4SDfds5, status=EM ANDAMENTO)"</span><span className={styles.jPunct}>,</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"expectativa_entrega"</span><span className={styles.jPunct}>:</span> <span className={styles.jsonStr}>"19:30"</span><span className={styles.jPunct}>,</span>{"\n"}
{"  "}<span className={styles.jsonKey}>"durationMs"</span><span className={styles.jPunct}>:</span> <span className={styles.jsonNum}>78</span>{"\n"}
<span className={styles.jPunct}>{"}"}</span>
</code>
                </pre>
              </div>
                  </pre>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className={styles.finalCtaSection}>
        <div className={styles.container}>
          <div className={styles.ctaComment}>{'// Seu sistema já gera os dados.'}</div>
          <h2>Comece a ouvir o que<br /><span className={styles.gradientText}>seu negócio diz.</span></h2>
          <p>Open source. Sem vendor lock-in. Funciona com todos os microsserviços da sua stack.</p>
          <div className={styles.heroCtas}>
            <Link className={`${styles.btn} ${styles.btnPrimary}`} to="/docs/intro">
              Instalar EchoTrace →
            </Link>
            <Link className={`${styles.btn} ${styles.btnSecondary}`} to="https://github.com/tluizp/echotrace">
              Ver código no GitHub
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
