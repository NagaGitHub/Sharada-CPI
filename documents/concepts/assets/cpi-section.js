const pages = [
  { key: "overview", no: "01", label: "Overview", file: "cpi-overview.html" },
  { key: "deployment", no: "02", label: "Deployment", file: "cpi-deployment.html" },
  { key: "components", no: "03", label: "Components", file: "cpi-components.html" },
  { key: "lifecycle", no: "04", label: "iFlow Lifecycle", file: "cpi-iflow-lifecycle.html" },
  { key: "message", no: "05", label: "Message Flow", file: "cpi-message-flow.html" }
];

const scenes = {
  overview: {
    no: "01",
    label: "Overview",
    subtitle: "What CPI is, where it sits in BTP, and the high-level architecture",
    status: "overview.signal.active",
    terms: [
      ["BTP", "SAP Business Technology Platform is the cloud platform layer that hosts Integration Suite capabilities."],
      ["CPI", "SAP CPI is commonly used as the older name for SAP Cloud Integration, a Cloud Integration capability in Integration Suite."],
      ["Suite", "SAP Integration Suite groups Cloud Integration with API Management, Event Mesh, Integration Advisor, and related integration services."],
      ["Tenant", "A tenant is the customer-specific runtime and design allocation used to process integration data."]
    ],
    notes: [
      ["Where it sits", "Cloud Integration is middleware. It sits between SAP, non-SAP, cloud, and on-premise systems."],
      ["What it does", "It models and runs message exchange, transformation, routing, protocol mediation, security handling, and monitoring."],
      ["How to explain it", "In interviews, frame CPI as the Cloud Integration capability of SAP Integration Suite running on SAP BTP."]
    ],
    nodes: [
      { id: "cloud", x: 0.05, y: 0.09, w: 0.9, h: 0.74, label: "SAP BTP", sub: "Cloud platform foundation", type: "zone" },
      { id: "suite", x: 0.12, y: 0.2, w: 0.33, h: 0.22, label: "SAP Integration Suite", sub: "iPaaS services", type: "design" },
      { id: "cpi", x: 0.55, y: 0.2, w: 0.31, h: 0.22, label: "Cloud Integration (CPI)", sub: "iFlow design + runtime", type: "runtime" },
      { id: "sap", x: 0.08, y: 0.58, w: 0.18, h: 0.18, label: "SAP Apps", sub: "S/4HANA, SF, Ariba", type: "connect" },
      { id: "nonsap", x: 0.33, y: 0.58, w: 0.18, h: 0.18, label: "Non-SAP Apps", sub: "CRM, SaaS, APIs", type: "connect" },
      { id: "onprem", x: 0.58, y: 0.58, w: 0.18, h: 0.18, label: "On-Premise", sub: "ERP, files, databases", type: "connect" },
      { id: "ops", x: 0.78, y: 0.58, w: 0.14, h: 0.18, label: "Ops", sub: "MPL, trace, alerts", type: "ops" }
    ],
    links: [
      { from: "suite", to: "cpi", label: "capability" },
      { from: "sap", to: "cpi", label: "messages" },
      { from: "nonsap", to: "cpi", label: "protocols" },
      { from: "onprem", to: "cpi", label: "hybrid" },
      { from: "cpi", to: "ops", label: "evidence" }
    ],
    steps: [
      {
        title: "SAP BTP hosts the integration layer",
        body: "SAP Cloud Integration runs in the SAP BTP ecosystem as part of SAP Integration Suite. It sits between business applications and provides the managed integration layer.",
        log: "BTP foundation identified. Integration layer is placed above application systems.",
        highlight: ["cloud", "suite"],
        activeLinks: ["suite->cpi"]
      },
      {
        title: "Integration Suite groups CPI with adjacent capabilities",
        body: "Cloud Integration is one capability in the suite. API Management, Event Mesh, Integration Advisor, and other capabilities support API-led, event-driven, and B2B scenarios.",
        log: "Integration Suite capability boundary mapped.",
        highlight: ["suite", "cpi"],
        activeLinks: ["suite->cpi"]
      },
      {
        title: "CPI connects SAP, non-SAP, cloud, and on-premise systems",
        body: "The integration flow becomes the controlled path between sender and receiver systems. Adapters mediate protocols and authentication models.",
        log: "External systems connected to the CPI integration layer.",
        highlight: ["sap", "nonsap", "onprem", "cpi"],
        activeLinks: ["sap->cpi", "nonsap->cpi", "onprem->cpi"]
      },
      {
        title: "The architecture separates design, runtime, and operations",
        body: "Developers model and deploy content, worker nodes process messages, and monitoring tools capture runtime evidence for support.",
        log: "Design, runtime, and monitoring separation established.",
        highlight: ["suite", "cpi", "ops"],
        activeLinks: ["cpi->ops"]
      },
      {
        title: "CPI becomes the central integration control point",
        body: "Instead of every system connecting point-to-point, CPI centralizes transformation, routing, security, operational visibility, and reusable content.",
        log: "Centralized integration view completed.",
        highlight: ["cloud", "cpi", "sap", "nonsap", "onprem", "ops"],
        activeLinks: ["sap->cpi", "nonsap->cpi", "onprem->cpi", "cpi->ops"]
      }
    ]
  },
  deployment: {
    no: "02",
    label: "Deployment",
    subtitle: "Multi-tenant SAP BTP Cloud Foundry deployment model",
    status: "deployment.cf.tenant.cluster",
    terms: [
      ["CF", "Cloud Foundry is the BTP environment where the current SAP Integration Suite service is operated."],
      ["TMN", "Tenant Management Node is the management and web UI node for design, admin, monitor, and deployment coordination."],
      ["Worker", "Runtime node where deployed artifacts execute and tenant messages are processed."],
      ["Isolation", "Tenants are isolated by customer resources and data separation, including separate database schemas."]
    ],
    notes: [
      ["Multi-tenant", "SAP operates the platform infrastructure while each customer receives tenant-specific resource allocation."],
      ["Deployment path", "An artifact is designed on the tenant management side and distributed to runtime worker nodes."],
      ["Cloud Foundry", "Current Integration Suite usage is tied to SAP BTP Cloud Foundry subscription and service setup."]
    ],
    nodes: [
      { id: "btp", x: 0.05, y: 0.08, w: 0.9, h: 0.78, label: "SAP BTP - Cloud Foundry", sub: "SAP managed cloud platform", type: "zone" },
      { id: "subaccount", x: 0.11, y: 0.18, w: 0.22, h: 0.18, label: "Subaccount", sub: "Entitlements + subscription", type: "design" },
      { id: "tenant", x: 0.42, y: 0.16, w: 0.45, h: 0.55, label: "Cloud Integration Tenant Cluster", sub: "Customer tenant boundary", type: "zone" },
      { id: "tmn", x: 0.47, y: 0.26, w: 0.18, h: 0.18, label: "TMN", sub: "Design, deploy, monitor", type: "design" },
      { id: "worker1", x: 0.69, y: 0.24, w: 0.18, h: 0.16, label: "Worker Node A", sub: "JVM runtime", type: "runtime" },
      { id: "worker2", x: 0.69, y: 0.47, w: 0.18, h: 0.16, label: "Worker Node B", sub: "iFlow execution", type: "runtime" },
      { id: "db", x: 0.47, y: 0.53, w: 0.18, h: 0.15, label: "Tenant Data", sub: "schema, stores, logs", type: "ops" },
      { id: "internet", x: 0.1, y: 0.58, w: 0.21, h: 0.16, label: "External Access", sub: "users + systems", type: "connect" }
    ],
    links: [
      { from: "subaccount", to: "tenant", label: "provision" },
      { from: "internet", to: "tmn", label: "web UI / API" },
      { from: "tmn", to: "worker1", label: "deploy" },
      { from: "tmn", to: "worker2", label: "deploy" },
      { from: "worker1", to: "db", label: "logs" },
      { from: "worker2", to: "db", label: "logs" }
    ],
    steps: [
      {
        title: "BTP Cloud Foundry provides the hosting environment",
        body: "SAP Integration Suite is subscribed and managed through SAP BTP. In Cloud Foundry, the tenant is reached through service and application URLs.",
        log: "Cloud Foundry hosting layer selected.",
        highlight: ["btp", "subaccount"],
        activeLinks: ["subaccount->tenant"]
      },
      {
        title: "A customer tenant is provisioned inside SAP managed infrastructure",
        body: "The tenant represents customer-allocated resources. SAP Help describes tenant isolation through separate resource allocation and data separation.",
        log: "Tenant boundary and isolation model created.",
        highlight: ["tenant", "db"],
        activeLinks: ["subaccount->tenant"]
      },
      {
        title: "The TMN exposes the management surface",
        body: "The Tenant Management Node represents the web interface for discovery, design workspace, administration, monitoring, and deployment actions.",
        log: "TMN control plane is active.",
        highlight: ["tmn", "internet"],
        activeLinks: ["internet->tmn"]
      },
      {
        title: "Deployment pushes artifacts to worker nodes",
        body: "When an integration flow is deployed, the deployment path moves from the management node to suitable runtime worker nodes in the tenant cluster.",
        log: "Artifact distribution to worker nodes completed.",
        highlight: ["tmn", "worker1", "worker2"],
        activeLinks: ["tmn->worker1", "tmn->worker2"]
      },
      {
        title: "Worker nodes process tenant messages",
        body: "Worker or runtime nodes run the integration engine, execute iFlow logic, and write operational evidence such as processing logs and persisted data.",
        log: "Runtime workers are processing and recording evidence.",
        highlight: ["worker1", "worker2", "db"],
        activeLinks: ["worker1->db", "worker2->db"]
      },
      {
        title: "Operations observe the tenant cluster",
        body: "Monitoring ties design-time artifacts to runtime behavior: deployment status, runtime status, message processing logs, traces, and node-level behavior.",
        log: "Deployment and operations loop closed.",
        highlight: ["tenant", "tmn", "worker1", "worker2", "db"],
        activeLinks: ["tmn->worker1", "tmn->worker2", "worker1->db", "worker2->db"]
      }
    ]
  },
  components: {
    no: "03",
    label: "Components",
    subtitle: "TMN, worker nodes, iFlows, adapters, and integration engine",
    status: "components.runtime.mesh",
    terms: [
      ["TMN", "Control plane node that stores and manages artifacts and gives access to design, admin, and monitoring features."],
      ["iFlow", "Executable integration artifact that defines sender, receiver, adapters, processing steps, and resources."],
      ["Adapter", "Connectivity component that implements protocol-specific sender or receiver communication."],
      ["Engine", "Runtime processing layer that executes routes, mappings, scripts, security steps, and message exchanges."]
    ],
    notes: [
      ["Key split", "TMN supervises and coordinates. Worker nodes execute message processing."],
      ["Artifact types", "Integration packages can contain iFlows, value mappings, script collections, mappings, APIs, and custom adapters."],
      ["Runtime bus", "SAP Help notes Apache Camel as the integration bus used for message processing at runtime."]
    ],
    nodes: [
      { id: "tmn", x: 0.06, y: 0.18, w: 0.19, h: 0.2, label: "Tenant Management Node", sub: "Design, admin, monitor", type: "design" },
      { id: "package", x: 0.07, y: 0.52, w: 0.17, h: 0.17, label: "Integration Package", sub: "Artifacts + resources", type: "design" },
      { id: "worker", x: 0.36, y: 0.15, w: 0.32, h: 0.52, label: "Worker / Runtime Node", sub: "JVM-based runtime", type: "runtime" },
      { id: "engine", x: 0.41, y: 0.25, w: 0.22, h: 0.16, label: "Integration Engine", sub: "Camel routes + exchanges", type: "runtime" },
      { id: "iflow", x: 0.42, y: 0.49, w: 0.2, h: 0.14, label: "Deployed iFlow", sub: "Steps, mappings, scripts", type: "runtime" },
      { id: "senderAdapter", x: 0.74, y: 0.16, w: 0.18, h: 0.16, label: "Sender Adapters", sub: "HTTPS, SOAP, SFTP, IDoc", type: "connect" },
      { id: "receiverAdapter", x: 0.74, y: 0.42, w: 0.18, h: 0.16, label: "Receiver Adapters", sub: "OData, RFC, mail, AS2", type: "connect" },
      { id: "ops", x: 0.74, y: 0.66, w: 0.18, h: 0.14, label: "Stores + Logs", sub: "MPL, queues, data store", type: "ops" }
    ],
    links: [
      { from: "tmn", to: "package", label: "content" },
      { from: "package", to: "iflow", label: "deploy" },
      { from: "iflow", to: "engine", label: "load" },
      { from: "senderAdapter", to: "engine", label: "ingress" },
      { from: "engine", to: "receiverAdapter", label: "egress" },
      { from: "engine", to: "ops", label: "monitor" }
    ],
    steps: [
      {
        title: "TMN is the control plane",
        body: "The Tenant Management Node gives users the web interface for designing, discovering, deploying, monitoring, and administering integration content.",
        log: "TMN control plane component selected.",
        highlight: ["tmn", "package"],
        activeLinks: ["tmn->package"]
      },
      {
        title: "Integration packages hold deployable content",
        body: "Packages organize artifacts such as integration flows, value mappings, message mappings, script collections, APIs, and custom adapters.",
        log: "Design-time package and artifacts identified.",
        highlight: ["package", "iflow"],
        activeLinks: ["package->iflow"]
      },
      {
        title: "Worker nodes host the runtime",
        body: "Worker or runtime nodes execute deployed iFlows. In CPI architecture, this is the processing plane where messages are handled.",
        log: "Runtime worker node highlighted.",
        highlight: ["worker", "engine"],
        activeLinks: ["iflow->engine"]
      },
      {
        title: "Adapters make connectivity protocol-specific",
        body: "Sender and receiver adapters define how systems communicate with the tenant, including endpoint type, protocol, security, polling, and payload handling.",
        log: "Sender and receiver adapters connected.",
        highlight: ["senderAdapter", "receiverAdapter", "engine"],
        activeLinks: ["senderAdapter->engine", "engine->receiverAdapter"]
      },
      {
        title: "The integration engine executes processing logic",
        body: "The engine applies mapping, routing, content modification, scripting, exception handling, and adapter exchange logic during message execution.",
        log: "Integration engine execution path activated.",
        highlight: ["engine", "iflow"],
        activeLinks: ["iflow->engine", "senderAdapter->engine", "engine->receiverAdapter"]
      },
      {
        title: "Operational stores make execution traceable",
        body: "Message Processing Logs, traces, data stores, queues, and monitoring views give support teams evidence after the message has been processed.",
        log: "Runtime evidence captured in stores and logs.",
        highlight: ["ops", "engine", "tmn"],
        activeLinks: ["engine->ops"]
      }
    ]
  },
  lifecycle: {
    no: "04",
    label: "iFlow Lifecycle",
    subtitle: "Design, deploy, execute, monitor, and improve",
    status: "iflow.lifecycle.loop",
    terms: [
      ["Design", "Model sender and receiver participants, adapters, processing steps, resources, security, and error handling."],
      ["Deploy", "Convert design-time content into a runtime artifact and distribute it to worker nodes."],
      ["Execute", "Process messages on the runtime node using the configured iFlow logic."],
      ["Monitor", "Use runtime status, MPL, trace, logs, and alerts to inspect behavior and support issues."]
    ],
    notes: [
      ["Lifecycle principle", "An iFlow is not complete when it is drawn. It becomes useful when it is deployed, tested, monitored, and maintained."],
      ["Runtime status", "Deployment status and runtime status are different signals. A deployed artifact still needs healthy runtime behavior."],
      ["Release discipline", "Treat updates as controlled changes with test evidence and environment-specific configuration checks."]
    ],
    nodes: [
      { id: "discover", x: 0.08, y: 0.2, w: 0.16, h: 0.17, label: "Discover", sub: "Prebuilt content", type: "design" },
      { id: "design", x: 0.31, y: 0.2, w: 0.16, h: 0.17, label: "Design", sub: "iFlow model", type: "design" },
      { id: "configure", x: 0.54, y: 0.2, w: 0.16, h: 0.17, label: "Configure", sub: "Adapters + security", type: "design" },
      { id: "deploy", x: 0.77, y: 0.2, w: 0.16, h: 0.17, label: "Deploy", sub: "Artifact to runtime", type: "runtime" },
      { id: "execute", x: 0.61, y: 0.55, w: 0.18, h: 0.17, label: "Execute", sub: "Worker node processing", type: "runtime" },
      { id: "monitor", x: 0.37, y: 0.55, w: 0.18, h: 0.17, label: "Monitor", sub: "MPL, trace, status", type: "ops" },
      { id: "improve", x: 0.13, y: 0.55, w: 0.18, h: 0.17, label: "Improve", sub: "Fix, version, transport", type: "ops" }
    ],
    links: [
      { from: "discover", to: "design", label: "copy/create" },
      { from: "design", to: "configure", label: "model" },
      { from: "configure", to: "deploy", label: "build" },
      { from: "deploy", to: "execute", label: "start" },
      { from: "execute", to: "monitor", label: "logs" },
      { from: "monitor", to: "improve", label: "diagnose" },
      { from: "improve", to: "design", label: "iterate" }
    ],
    steps: [
      {
        title: "Design starts in packages and workspace",
        body: "Developers discover prebuilt content or create custom packages, then model integration flows with participants, adapters, and processing steps.",
        log: "Design workspace started with package or prebuilt content.",
        highlight: ["discover", "design"],
        activeLinks: ["discover->design"]
      },
      {
        title: "Configuration makes the design executable",
        body: "Adapters, addresses, security material, parameters, mappings, scripts, and exception paths are configured before deployment.",
        log: "Adapters, resources, and security configuration completed.",
        highlight: ["design", "configure"],
        activeLinks: ["design->configure"]
      },
      {
        title: "Deployment creates a runtime artifact",
        body: "The iFlow is deployed from the TMN side to the worker node side. Deployment can surface errors if the runtime cannot accept or start the artifact.",
        log: "iFlow deployed to runtime worker nodes.",
        highlight: ["configure", "deploy"],
        activeLinks: ["configure->deploy"]
      },
      {
        title: "Execution happens on the runtime node",
        body: "Once started, the runtime node processes incoming or scheduled messages according to the deployed iFlow model.",
        log: "Runtime execution started.",
        highlight: ["deploy", "execute"],
        activeLinks: ["deploy->execute"]
      },
      {
        title: "Monitoring connects messages back to the model",
        body: "Message Processing Logs, run steps, trace data, deployment status, and runtime status help locate where processing succeeded or failed.",
        log: "Monitoring evidence collected.",
        highlight: ["execute", "monitor"],
        activeLinks: ["execute->monitor"]
      },
      {
        title: "The lifecycle loops through improvement",
        body: "Operational findings feed back into design changes, versioning, transport, better logging, improved error handling, and safer releases.",
        log: "Improvement loop returned to design.",
        highlight: ["monitor", "improve", "design"],
        activeLinks: ["monitor->improve", "improve->design"]
      }
    ]
  },
  message: {
    no: "05",
    label: "Message Flow",
    subtitle: "How a message travels through CPI step by step",
    status: "message.exchange.in.flight",
    terms: [
      ["Sender", "The system or schedule that triggers the integration flow."],
      ["Exchange", "Runtime message container holding body, headers, properties, attachments, and context."],
      ["Processing", "Mapping, routing, validation, enrichment, scripting, and exception handling."],
      ["MPL", "Message Processing Log, the operational record used to diagnose runtime behavior."]
    ],
    notes: [
      ["Inbound", "The sender adapter validates how a sender reaches the tenant and creates the runtime exchange."],
      ["Processing", "CPI steps transform and route the message according to the iFlow model."],
      ["Outbound", "Receiver adapters convert runtime intent into protocol-specific calls to target systems."]
    ],
    nodes: [
      { id: "sender", x: 0.05, y: 0.36, w: 0.14, h: 0.17, label: "Sender", sub: "App, file, API, event", type: "connect" },
      { id: "inbound", x: 0.24, y: 0.36, w: 0.15, h: 0.17, label: "Sender Adapter", sub: "Endpoint + auth", type: "connect" },
      { id: "exchange", x: 0.44, y: 0.18, w: 0.16, h: 0.15, label: "Message Exchange", sub: "body, headers, properties", type: "runtime" },
      { id: "process", x: 0.43, y: 0.44, w: 0.18, h: 0.2, label: "iFlow Steps", sub: "map, route, enrich, script", type: "runtime" },
      { id: "outbound", x: 0.67, y: 0.36, w: 0.15, h: 0.17, label: "Receiver Adapter", sub: "Protocol conversion", type: "connect" },
      { id: "receiver", x: 0.86, y: 0.36, w: 0.11, h: 0.17, label: "Receiver", sub: "Target system", type: "connect" },
      { id: "monitor", x: 0.43, y: 0.72, w: 0.18, h: 0.14, label: "MPL + Trace", sub: "Status and diagnostics", type: "ops" },
      { id: "error", x: 0.69, y: 0.72, w: 0.18, h: 0.14, label: "Exception Path", sub: "Retry, alert, log", type: "ops" }
    ],
    links: [
      { from: "sender", to: "inbound", label: "request" },
      { from: "inbound", to: "exchange", label: "exchange" },
      { from: "exchange", to: "process", label: "context" },
      { from: "process", to: "outbound", label: "prepare" },
      { from: "outbound", to: "receiver", label: "send" },
      { from: "process", to: "monitor", label: "MPL" },
      { from: "process", to: "error", label: "exception" }
    ],
    steps: [
      {
        title: "A sender triggers the integration flow",
        body: "A sender system can call an endpoint, upload a file, publish a business event, or be picked up by a polling adapter on a schedule.",
        log: "Sender started the message journey.",
        highlight: ["sender", "inbound"],
        activeLinks: ["sender->inbound"]
      },
      {
        title: "The sender adapter accepts and authenticates ingress",
        body: "The inbound adapter handles endpoint addressing, protocol behavior, credentials, certificates, polling metadata, and initial payload acceptance.",
        log: "Ingress adapter accepted the payload and authentication context.",
        highlight: ["inbound", "exchange"],
        activeLinks: ["inbound->exchange"]
      },
      {
        title: "CPI creates a message exchange",
        body: "At runtime, the integration engine works with the message body plus headers, properties, attachments, and context used by later steps.",
        log: "Message exchange created with body, headers, and properties.",
        highlight: ["exchange", "process"],
        activeLinks: ["exchange->process"]
      },
      {
        title: "iFlow steps transform and route the message",
        body: "Mappings, content modifiers, routers, splitters, scripts, validators, and exception subprocesses shape the message for the target.",
        log: "Processing steps transformed and routed the exchange.",
        highlight: ["process"],
        activeLinks: ["exchange->process", "process->monitor"]
      },
      {
        title: "The receiver adapter sends the outbound call",
        body: "The outbound adapter applies target protocol rules, authentication, addressing, and response handling before sending to the receiver.",
        log: "Receiver adapter sent the transformed message.",
        highlight: ["process", "outbound", "receiver"],
        activeLinks: ["process->outbound", "outbound->receiver"]
      },
      {
        title: "Monitoring records the processing result",
        body: "MPL and trace data capture status, timestamps, step evidence, payload snapshots when enabled, and error details for support.",
        log: "Message Processing Log recorded the final state.",
        highlight: ["monitor", "process"],
        activeLinks: ["process->monitor"]
      },
      {
        title: "Exceptions move into controlled error handling",
        body: "If a step or receiver call fails, exception subprocesses, retries, alerts, custom logs, and support processes decide the recovery path.",
        log: "Exception handling path prepared for failure scenarios.",
        highlight: ["error", "process", "monitor"],
        activeLinks: ["process->error", "process->monitor"]
      }
    ]
  }
};

const typeColors = {
  zone: "#344151",
  design: "#63e6d4",
  runtime: "#f0c66e",
  connect: "#7ba7ff",
  ops: "#82d173"
};

const sceneKey = document.body.dataset.scene || "overview";
const currentScene = scenes[sceneKey] || scenes.overview;
const currentPageIndex = pages.findIndex((page) => page.key === sceneKey);
const state = { stepIndex: 0, time: 0 };

const canvas = document.getElementById("architecture-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;
const sectionNav = document.getElementById("section-nav");
const sceneTitle = document.getElementById("scene-title");
const sceneSubtitle = document.getElementById("scene-subtitle");
const stepKicker = document.getElementById("step-kicker");
const stepTitle = document.getElementById("step-title");
const stepBody = document.getElementById("step-body");
const stepCounter = document.getElementById("step-counter");
const canvasStatusText = document.getElementById("canvas-status-text");
const noteList = document.getElementById("note-list");
const componentList = document.getElementById("component-list");
const progressDots = document.getElementById("progress-dots");
const historyList = document.getElementById("history-list");
const prevStep = document.getElementById("prev-step");
const nextStep = document.getElementById("next-step");
const prevPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");

function step() {
  return currentScene.steps[state.stepIndex];
}

function linkKey(link) {
  return link.from + "->" + link.to;
}

function initNav() {
  if (!sectionNav) {
    return;
  }

  sectionNav.innerHTML = pages.map((page) => {
    const current = page.key === sceneKey ? " aria-current=\"page\"" : "";
    return "<a href=\"" + page.file + "\"" + current + "><span>" + page.no + "</span><strong>" + page.label + "</strong></a>";
  }).join("");

  if (prevPage && nextPage && currentPageIndex >= 0) {
    const previous = pages[(currentPageIndex - 1 + pages.length) % pages.length];
    const next = pages[(currentPageIndex + 1) % pages.length];
    prevPage.href = previous.file;
    prevPage.textContent = "< " + previous.no + " " + previous.label;
    nextPage.href = next.file;
    nextPage.textContent = next.no + " " + next.label + " >";
  }
}

function renderUI() {
  const currentStep = step();

  document.title = currentScene.label + " | SAP CPI Architecture";
  sceneTitle.textContent = currentScene.no + " " + currentScene.label;
  sceneSubtitle.textContent = currentScene.subtitle;
  stepKicker.textContent = currentScene.label + " // step " + String(state.stepIndex + 1).padStart(2, "0");
  stepTitle.textContent = currentStep.title;
  stepBody.textContent = currentStep.body;
  stepCounter.textContent = "Step " + (state.stepIndex + 1) + " / " + currentScene.steps.length;
  canvasStatusText.textContent = currentScene.status;
  prevStep.disabled = state.stepIndex === 0;
  nextStep.disabled = state.stepIndex === currentScene.steps.length - 1;

  noteList.innerHTML = currentScene.notes.map((note) => {
    return "<div class=\"note\"><strong>" + escapeHtml(note[0]) + "</strong><span>" + escapeHtml(note[1]) + "</span></div>";
  }).join("");

  componentList.innerHTML = currentScene.terms.map((term) => {
    return "<li><code>" + escapeHtml(term[0]) + "</code><span>" + escapeHtml(term[1]) + "</span></li>";
  }).join("");

  progressDots.innerHTML = currentScene.steps.map((_, index) => {
    const classes = ["dot"];
    if (index < state.stepIndex) {
      classes.push("is-complete");
    }
    if (index === state.stepIndex) {
      classes.push("is-active");
    }
    return "<button class=\"" + classes.join(" ") + "\" type=\"button\" aria-label=\"Go to step " + (index + 1) + "\" data-step=\"" + index + "\"></button>";
  }).join("");

  progressDots.querySelectorAll(".dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      state.stepIndex = Number(dot.dataset.step);
      renderUI();
    });
  });

  historyList.innerHTML = currentScene.steps.slice(0, state.stepIndex + 1).map((item, index) => {
    const activeClass = index === state.stepIndex ? " class=\"is-active\"" : "";
    return "<li" + activeClass + "><span class=\"log-index\">" + String(index + 1).padStart(2, "0") + "</span><span>" + escapeHtml(item.log) + "</span></li>";
  }).join("");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function moveStep(direction) {
  const max = currentScene.steps.length - 1;
  state.stepIndex = Math.max(0, Math.min(max, state.stepIndex + direction));
  renderUI();
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(640, Math.floor(rect.width));
  const height = Math.max(300, Math.floor(rect.height));
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function draw(timestamp) {
  state.time = timestamp || 0;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);
  drawGrid(width, height);
  drawScene(width, height);
  requestAnimationFrame(draw);
}

function drawGrid(width, height) {
  ctx.save();
  ctx.fillStyle = "#070a0d";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += 24) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += 24) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(99,230,212,0.025)";
  ctx.fillRect(0, 0, width, 52);
  ctx.restore();
}

function drawScene(width, height) {
  const currentStep = step();
  const nodes = new Map(currentScene.nodes.map((node) => [node.id, node]));

  currentScene.links.forEach((link) => {
    const active = currentStep.activeLinks.includes(linkKey(link));
    drawLink(nodes.get(link.from), nodes.get(link.to), link.label, active, width, height);
  });

  currentScene.nodes.forEach((node) => {
    const active = currentStep.highlight.includes(node.id);
    drawNode(node, active, width, height);
  });

  drawPacket(width, height);
}

function nodeBox(node, width, height) {
  return {
    x: node.x * width,
    y: node.y * height,
    w: node.w * width,
    h: node.h * height
  };
}

function drawNode(node, active, width, height) {
  const box = nodeBox(node, width, height);
  const color = typeColors[node.type] || "#63e6d4";
  ctx.save();

  if (node.type === "zone") {
    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = active ? "rgba(99,230,212,0.62)" : "rgba(160,178,194,0.24)";
    ctx.fillStyle = active ? "rgba(99,230,212,0.055)" : "rgba(255,255,255,0.018)";
    roundRect(box.x, box.y, box.w, box.h, 10);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = active ? "#dffcf8" : "#8f9eab";
    ctx.font = "600 13px IBM Plex Mono, monospace";
    ctx.fillText(node.label, box.x + 16, box.y + 24);
    ctx.fillStyle = "#748292";
    ctx.font = "12px IBM Plex Mono, monospace";
    ctx.fillText(node.sub, box.x + 16, box.y + 42);
    ctx.restore();
    return;
  }

  if (active) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;
  }

  ctx.fillStyle = active ? tint(color, 0.18) : "rgba(17,24,32,0.94)";
  ctx.strokeStyle = active ? color : "rgba(120,140,158,0.35)";
  ctx.lineWidth = active ? 2 : 1;
  roundRect(box.x, box.y, box.w, box.h, 8);
  ctx.fill();
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.fillStyle = color;
  ctx.fillRect(box.x, box.y, box.w, 3);

  ctx.fillStyle = active ? "#f6fbff" : "#d7e0e8";
  ctx.font = "600 13px IBM Plex Sans, Arial, sans-serif";
  wrapText(node.label, box.x + 12, box.y + 27, box.w - 24, 15, 2);

  ctx.fillStyle = active ? "#cbd7df" : "#95a5b2";
  ctx.font = "12px IBM Plex Mono, monospace";
  wrapText(node.sub, box.x + 12, box.y + Math.min(box.h - 34, 61), box.w - 24, 14, 2);
  ctx.restore();
}

function drawLink(fromNode, toNode, label, active, width, height) {
  if (!fromNode || !toNode) {
    return;
  }

  const from = nodeBox(fromNode, width, height);
  const to = nodeBox(toNode, width, height);
  const p1 = anchorPoint(from, to);
  const p2 = anchorPoint(to, from);
  const dx = Math.abs(p2.x - p1.x);
  const curve = Math.max(32, Math.min(120, dx * 0.45));
  const c1 = { x: p1.x + (p2.x > p1.x ? curve : -curve), y: p1.y };
  const c2 = { x: p2.x - (p2.x > p1.x ? curve : -curve), y: p2.y };
  const color = active ? "#63e6d4" : "rgba(139,155,169,0.32)";

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = active ? 2 : 1;
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, p2.x, p2.y);
  ctx.stroke();
  drawArrowHead(p1, c1, c2, p2, active ? "#63e6d4" : "rgba(139,155,169,0.46)");

  if (active) {
    for (let i = 0; i < 3; i += 1) {
      const t = ((state.time / 1500) + i / 3) % 1;
      const point = cubicPoint(p1, c1, c2, p2, t);
      ctx.fillStyle = i === 0 ? "#f0c66e" : "#63e6d4";
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (label && active) {
    const mid = cubicPoint(p1, c1, c2, p2, 0.5);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(5,6,8,0.78)";
    ctx.strokeStyle = "rgba(99,230,212,0.3)";
    ctx.lineWidth = 1;
    const textWidth = Math.min(180, Math.max(84, ctx.measureText(label).width + 18));
    roundRect(mid.x - textWidth / 2, mid.y - 14, textWidth, 24, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#c9f8f3";
    ctx.font = "11px IBM Plex Mono, monospace";
    ctx.textAlign = "center";
    ctx.fillText(label, mid.x, mid.y + 4);
    ctx.textAlign = "left";
  }

  ctx.restore();
}

function drawPacket(width, height) {
  const currentStep = step();
  if (!currentStep.activeLinks.length) {
    return;
  }

  const activeLinkKey = currentStep.activeLinks[Math.floor((state.time / 1700) % currentStep.activeLinks.length)];
  const link = currentScene.links.find((item) => linkKey(item) === activeLinkKey);
  if (!link) {
    return;
  }

  const nodes = new Map(currentScene.nodes.map((node) => [node.id, node]));
  const from = nodeBox(nodes.get(link.from), width, height);
  const to = nodeBox(nodes.get(link.to), width, height);
  const p1 = anchorPoint(from, to);
  const p2 = anchorPoint(to, from);
  const curve = Math.max(32, Math.min(120, Math.abs(p2.x - p1.x) * 0.45));
  const c1 = { x: p1.x + (p2.x > p1.x ? curve : -curve), y: p1.y };
  const c2 = { x: p2.x - (p2.x > p1.x ? curve : -curve), y: p2.y };
  const point = cubicPoint(p1, c1, c2, p2, (state.time / 1900) % 1);

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.fillStyle = "rgba(240,198,110,0.22)";
  ctx.strokeStyle = "#f0c66e";
  ctx.shadowColor = "#f0c66e";
  ctx.shadowBlur = 18;
  roundRect(-18, -10, 36, 20, 5);
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#fff0c8";
  ctx.font = "600 9px IBM Plex Mono, monospace";
  ctx.textAlign = "center";
  ctx.fillText("MSG", 0, 4);
  ctx.restore();
}

function anchorPoint(a, b) {
  const ac = { x: a.x + a.w / 2, y: a.y + a.h / 2 };
  const bc = { x: b.x + b.w / 2, y: b.y + b.h / 2 };
  const dx = bc.x - ac.x;
  const dy = bc.y - ac.y;
  if (Math.abs(dx) > Math.abs(dy)) {
    return { x: dx > 0 ? a.x + a.w : a.x, y: ac.y };
  }
  return { x: ac.x, y: dy > 0 ? a.y + a.h : a.y };
}

function cubicPoint(p0, p1, p2, p3, t) {
  const inv = 1 - t;
  return {
    x: inv * inv * inv * p0.x + 3 * inv * inv * t * p1.x + 3 * inv * t * t * p2.x + t * t * t * p3.x,
    y: inv * inv * inv * p0.y + 3 * inv * inv * t * p1.y + 3 * inv * t * t * p2.y + t * t * t * p3.y
  };
}

function drawArrowHead(p1, c1, c2, p2, color) {
  const start = cubicPoint(p1, c1, c2, p2, 0.95);
  const angle = Math.atan2(p2.y - start.y, p2.x - start.x);
  ctx.save();
  ctx.translate(p2.x, p2.y);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-9, -5);
  ctx.lineTo(-9, 5);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function roundRect(x, y, w, h, radius) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(text, x, y, maxWidth, lineHeight, maxLines) {
  const words = String(text).split(" ");
  let line = "";
  let lines = 0;
  for (let i = 0; i < words.length; i += 1) {
    const testLine = line ? line + " " + words[i] : words[i];
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y + lines * lineHeight);
      line = words[i];
      lines += 1;
      if (lines >= maxLines) {
        return;
      }
    } else {
      line = testLine;
    }
  }
  if (line && lines < maxLines) {
    ctx.fillText(line, x, y + lines * lineHeight);
  }
}

function tint(hex, amount) {
  const color = hex.replace("#", "");
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);
  return "rgba(" + r + "," + g + "," + b + "," + amount + ")";
}

if (ctx) {
  initNav();
  prevStep.addEventListener("click", () => moveStep(-1));
  nextStep.addEventListener("click", () => moveStep(1));
  document.addEventListener("keydown", (event) => {
    const tag = document.activeElement ? document.activeElement.tagName : "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveStep(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveStep(-1);
    }
  });
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  renderUI();
  requestAnimationFrame(draw);
}
