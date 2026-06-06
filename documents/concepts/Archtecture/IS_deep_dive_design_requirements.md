# IS Deep Dive — Interactive Diagram: Design Requirements

## Purpose
A self-contained, single-file HTML diagram that gives developers and architects a clear,
interactive visual reference for the SAP Integration Suite (IS) architecture — showing all
key components, how they connect, and the step-by-step sequence for both the **deploy flow**
and the **trigger (HTTPS) flow**.

---

## Files

| File | Description |
|---|---|
| `is_deep_dive_interactive.html` | Primary deliverable — interactive diagram |
| `is_deep_dive_v3.svg` | Raw SVG version (non-interactive) |
| `IS_deep_dive_design_requirements.md` | This file — design decisions and requirements |

---

## Visual Design Requirements

### 1. Dark background
- Page background: `#0d1117` (GitHub-style dark)
- Panel background: `#161b22`
- All borders: `#30363d`
- Primary text: `#e6edf3`
- Secondary/description text: `#8b949e`

### 2. Layout — two-column, resizable
- **Left column (initial 55% of viewport):** SVG diagram panel — resizable by dragging the divider. Contains a `#diagram-scroll` inner container that handles overflow/scrollbars. SVG fits on load (`width:100%; height:auto`); scrollbars appear when zoomed.
- **Resizer (5px strip):** `#resizer` div between the two columns — `cursor:col-resize`, highlights blue on hover/drag. JS tracks `mousedown/mousemove/mouseup` to update `#diagram-area` flex width. Min widths: 280px each panel.
- **Right column (flex remaining):** Detail panel, splits into header / flow strip / body. Min-width 280px.

### 3. Typography
- Boundary headings (IS Tenant, Worker Node, CF Env etc.): `16px, font-weight:700`
- Box action titles (e.g. "Sender Adapter (HTTPS)"): `13px, font-weight:700`
- Box description lines: `11px, fill:#8b949e`
- Detail panel title: `16px, font-weight:700`
- Detail panel description: `12.5px, line-height:1.65`
- Connection items: `11.5px`

### 4. Colour coding by component type
| Type | Fill | Stroke |
|---|---|---|
| IS Tenant boundary | `none` | `#1d9e75` (teal dashed) |
| CF Env/Space boundary | `none` | `#3b6d11` (green dashed) |
| Worker Node | `#0d1f38` | `#185fa5` (blue) |
| TMN | `#0a1f18` | `#0f6e56` (teal) |
| Monitoring section | `#130e28` | `#534ab7` (purple) |
| Integration Engine | `#0d2040` | `#185fa5` |
| Sender / Receiver Adapter | `#0d1b35` | `#185fa5` |
| Processing Steps | `#140f2a` | `#534ab7` |
| Deploy Action | `#2a1500` | `#ba7517` (amber) |
| XSUAA Instance | `#0d1b35` | `#185fa5` |
| Destination Instance | `#0d2010` | `#3b6d11` |
| Connectivity Instance | `#2a0d08` | `#993c1d` |
| Target System / External Caller | `#1a1f28` | `#5f5e5a` (gray) |
| PI Runtime Instance | `#130e28` | `#534ab7` |

### 5. Step badges (inside each relevant box, top-left corner)
- **Deploy (D1–D6):** amber pill — `fill:#ba7517`, white text
- **Trigger (T1–T8):** teal pill — `fill:#0f6e56`, white text
- Size: `22×14px`, `border-radius:3px`, `font-size:8px, font-weight:700`
- **No floating arrows or separate legend** — step badges in boxes replace them

### 6. Scrollbar colour coding
| Scrollbar | Colour | Hover | Rationale |
|---|---|---|---|
| Diagram — vertical | `#1d6e5a` | `#1d9e75` (teal) | Matches IS Tenant boundary colour |
| Diagram — horizontal | `#185fa5` | `#378add` (blue) | Matches Worker Node / adapter colour |
| Diagram track & corner | `#161b22` | — | Slightly lighter than background so track is visible |
| Flow strip — horizontal | `#ba7517` | `#f0a442` (amber) | Matches Deploy (D) step badges |
| Detail body — vertical | `#4a9ee6` | `#7ba7ff` (blue) | Matches connector arrow colour |

Sizing: diagram scrollbars 7×7px; detail body 5px; flow strip 4px.  
Vertical vs horizontal are styled separately using `::-webkit-scrollbar-thumb:vertical` and `::-webkit-scrollbar-thumb:horizontal`.

### 7. Internal connector arrows (within iFlow only)
- Sender → Steps: blue arrow (`#4a9ee6`)
- Steps → Receiver: purple arrow (`#9b91e8`)
- Steps → CF service boxes: short dashed coloured lines (no arrowhead)
- Receiver → Target: gray dashed line

---

## Layout Structure (SVG viewBox: 0 0 1080 980)

```
┌─ CF Env → Space (x=8, w=178, h=385) ──────────────────────┐
│  XSUAA Instance (y=50)                                      │
│  Destination Instance (y=134)                               │
│  Connectivity Instance (y=218)                              │
│  PI Runtime Instance (y=302)                                │
└─────────────────────────────────────────────────────────────┘
  [External actors label]
┌─ External Caller (y=464) ─┐

┌─ IS Tenant boundary (x=198, w=874, h=960) ─────────────────────────────────────────────┐
│  ┌─ Developer (via Browser) — top-centre (x=511, y=32, w=248) ─┐                       │
│  └──────────────────────────────────────────────────────────────┘                       │
│                                                                                          │
│  ┌─ TMN (x=212, y=102, w=248) ──────────┐  ┌─ Worker Node (x=474, y=102, w=588) ─────┐ │
│  │  Integration Package (y=143, D2)     │  │  Integration Engine (y=130, D5+T3)      │ │
│  │  iFlow Artifact (y=221, D3)          │  │  ┌─ Deployed iFlow (y=236) ──────────┐  │ │
│  │  Deploy Action (y=295, D4) [amber]   │  │  │  Sender Adapter (y=262, T2)       │  │ │
│  └──────────────────────────────────────┘  │  │  Processing Steps (y=362, T4)     │  │ │
│                                             │  │  Receiver Adapter (y=500, T5)     │  │ │
│  ┌─ Monitoring (x=212, y=376, w=248) ───┐  │  │                                   │  │ │
│  │  MPL (y=403, T7)                     │  │  │  ┌─ CF Service Instances ──────┐  │  │ │
│  │  Data Store (y=481)                  │  │  │  │  XSUAA ref                 │  │  │ │
│  │  JMS Queue (y=547)                   │  │  │  │  Destination ref           │  │  │ │
│  │  Trace Logs (y=613)                  │  │  │  │  Connectivity ref          │  │  │ │
│  │  Deploy Status (y=679, D6)           │  │  │  └────────────────────────────┘  │  │ │
│  │  Alerts (y=745)                      │  │  │  Target System (y=540, T6)       │  │ │
│  │  Security Monitor (y=811)            │  │  │  MPL Write-back (y=626)          │  │ │
│  └──────────────────────────────────────┘  │  └───────────────────────────────────┘  │ │
│                                             └──────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Flow Sequences

### Trigger Flow (T1 → T8): External HTTPS call through IS
| Step | Box | What happens |
|---|---|---|
| T1 | External Caller | HTTPS POST to iFlow endpoint URL with Bearer token |
| T2 | Sender Adapter | Receives request, calls XSUAA to validate Bearer token |
| T3 | Integration Engine | Routes the message to the correct deployed iFlow Camel route |
| T4 | Processing Steps | Transforms message — calls XSUAA/Destination/Connectivity as needed |
| T5 | Receiver Adapter | Makes outbound API/RFC/OData call to target system |
| T6 | Target System | Target returns HTTP 200 response to Receiver Adapter |
| T7 | MPL | Execution result written to Message Processing Log |
| T8 | External Caller | IS returns final HTTPS response to original caller |

### Deploy Flow (D1 → D6): Developer deploys an iFlow
| Step | Box | What happens |
|---|---|---|
| D1 | Developer | Opens Integration Suite Web UI (TMN) in browser |
| D2 | Integration Package | Developer creates/manages artifact in a package |
| D3 | iFlow Artifact | Developer designs iFlow definition in TMN editor |
| D4 | Deploy Action | Developer clicks Deploy — artifact compiled and pushed to Worker Node |
| D5 | Integration Engine | Engine loads iFlow as a Camel route (status: Started) |
| D6 | Deploy Status | Monitoring shows the iFlow as Started / Error / Undeployed |

---

## Interactive Behaviour Requirements

### Click on any box:
1. Box gets a highlighted border (stroke-width 2.8px)
2. Detail panel shows:
   - **Title** (16px bold) — component name
   - **Subtitle** (11px muted) — role in the flow
   - **Flow sequence strip** (horizontally scrollable) — both Trigger (T) and Deploy (D) strips, with the clicked component highlighted
   - **Description** — what the component is and does
   - **Calls / Refers to** — outbound connections with reason why (green left-border)
   - **Called by / Receives from** — inbound connections with reason why (blue left-border)

### Flow sequence strip:
- Both Trigger (T1→T8) and Deploy (D1→D6) strips always visible
- Current box highlighted in its respective flow colour (teal for T, amber for D)
- Clicking a pill in the strip navigates to that component
- Strip is horizontally scrollable (for use when zoomed)

### Collapse / Expand toggle (presentation mode):
- A toolbar strip (`#diagram-toolbar`) sits above `#diagram-scroll` inside `#diagram-area` — does **not** overlap the SVG content
- Contains a pill with three segments: `← | Overview | →`
  - **←** button: expand — shows all sub-boxes; label changes to "Detailed"
  - **→** button: collapse — shows outer boundary boxes only; label stays "Overview"
  - Active button highlighted teal (`#0a2a1e` bg, `#4fc98f` text)
- **Page loads in collapsed (Overview) state**
- Outer boxes always visible (both states): CF Env→Space boundary, IS Tenant boundary, TMN boundary, Monitoring boundary, Worker Node boundary, Developer, External Caller
- Sub-boxes hidden in collapsed state (`class="sub-box"` + `.collapsed .sub-box{display:none}`):
  - CF Env children: XSUAA Instance, Destination Instance, Connectivity Instance, PI Runtime Instance
  - TMN children: Integration Package, iFlow Artifact, Deploy Action
  - Monitoring children: MPL, Data Store, JMS Queue, Trace Logs, Deploy Status, Alerts, Security Monitor
  - Worker Node children: Integration Engine, Deployed iFlow boundary, Sender Adapter, Processing Steps, Receiver Adapter, CF Service ref box, XSUAA/Dest/Conn refs, Target System, MPL Write-back, all connector lines

### No animation:
- All transitions are instant (no CSS transitions on the detail panel)
- Box hover: opacity change only (0.82)
- Panel is always visible — content switches on click

### Zoom behaviour (diagram panel):
- SVG uses `width:100%; height:auto` — fills `#diagram-area` width on initial load, no scrollbars
- `#zoom-bar` overlay (top-right of diagram panel, `position:absolute`, `z-index:20`) shows current zoom % and ＋ / － / ↺ buttons
- **Ctrl+scroll** on the diagram panel zooms in/out (`applyZoom()` function); zoom range 40%–400%
- At zoom > 100%: SVG pixel width = `containerWidth × zoomLevel` → overflows `#diagram-scroll` → scrollbars appear automatically
- Reset button (`↺`) returns to 100% fit (SVG back to `width:100%`)
- Resizing the panel while zoomed recalculates SVG pixel width against new container width

---

## Key Architectural Points to Communicate

1. **Developer is inside IS Tenant** — they access the IS Web UI (TMN), which is part of IS
2. **Diego Cells vs K8s** — iFlows run on IS Worker Nodes (K8s pods), NOT on CF Diego Cells
3. **CF service instances** — XSUAA, Destination, Connectivity are CF service instances in the same subaccount's CF Space; IS binds to them at runtime
4. **T6 ≠ T8** — T6 is the target system responding to the Receiver Adapter (internal to IS); T8 is IS responding to the original External Caller
5. **Service Key vs Service Binding** — for CF apps calling IS, the PI Runtime service instance provides credentials via service binding (VCAP_SERVICES)
6. **One CF org per subaccount** — IS subscription is at subaccount level, separate from CF Environment

---

## Conversation history
This HTML was iteratively designed through the following requirements:
- Initial: deep-dive IS architecture diagram with deploy + trigger flows
- Added: CF service instances shown as separate column, IS Worker calling them
- Added: Developer box moved to top-centre of IS Tenant boundary
- Added: Dark background, step labels inside boxes, no flow arrows, bold titles
- Added: Horizontal scroll on diagram and detail panel flow strip
- Added: Increased font sizes for readability
- Fixed: Added `-webkit-scrollbar` styles to `#diagram-scroll` so scrollbars are always visible (width/height 6px, matches dark theme)
- Added: Purpose heading chip ("RUNTIME SERVICE HOST") inside the CF Env → Space box to explain why the section exists — sits between the box title and the XSUAA instance, styled as a green filled chip with descriptor line "IS binds these CF instances at startup"
- Added: Draggable `#resizer` div between diagram and detail panels — col-resize cursor, blue highlight on drag, JS constrains width to 280px–(viewport−310px)
- Changed: SVG from fixed `1080×980px` to `width:100%; height:auto` inside `#diagram-scroll` wrapper — full diagram fits on load without scrollbars
- Added: `#zoom-bar` overlay with Ctrl+scroll zoom (40%–400%), ＋/－/↺ buttons — scrollbars appear automatically when zoom > 100%
- Added: Collapse/expand toggle — toolbar strip above diagram (← expand, → collapse); loads in Overview state; sub-boxes tagged with class="sub-box"; Developer and External Caller always visible
- Removed: D1 badge from Developer; T1/T8 badges from External Caller — text re-centred in boxes
- Fixed: CF Env header spacing — more padding between title/chip/descriptor; all 4 children shifted +18px; rect h=385→403
- Fixed: IS Tenant header spacing — title y=27, subtitle y=42 for more breathing room
- Fixed: TMN title overflow — bnd(16px)→ttl(13px) to fit 248px box; subtitle split 2 lines; children shifted +15px
- Fixed: Monitoring subtitle overflow — split 2 lines; all 7 children shifted +12px
- Fixed: Worker Node title overflow — bnd(16px)→ttl(13px) to fit 588px box
- Added: Colour-coded scrollbars — diagram vertical=teal, horizontal=blue (matching diagram component colours); flow strip=amber; detail body=blue; all thumbs visible against dark background using `:vertical`/`:horizontal` pseudo-selectors
- Removed: "Why:" prefix from all 4 boundary subtitle lines (IS Tenant, TMN, Monitoring, Worker Node) — text reads more naturally without the label
- Fixed: Worker Node subtitle (y=130) was hidden by Integration Engine rect starting at same y — shifted Integration Engine +12px (y=142)
- Fixed: Monitoring subtitle (y=405) was hidden by MPL rect starting at y=403 — shifted all 7 Monitoring children +15px; Monitoring rect height 588→603; IS Tenant height 960→975; SVG viewBox height 980→1000
- Pattern: **Two-column layout with sticky right detail panel** — table/diagram on left (fixed width or `flex:0 0 56%`), sticky detail card on right (`background:#161b22; border:1px solid #30363d; border-radius:10px`). Clicking a row/box highlights it (blue left-border accent + `rgba(59,130,246,.07)` fill) and instantly populates the detail panel. Panel shows: component badge → title (17px bold `#e6edf3`) → analogy/description box (left-border in component accent colour) → explanation body (`#c9d1d9`, 12.5px, line-height 1.7) → optional amber caveat block.
- Pattern: **Colored scrollbars** — apply to any scrollable container inside dark panels. Track: `#161b22`. Thumb: `#3b82f6` (blue). Thumb hover: `#60a5fa`. Size: `6px` width/height, `border-radius:3px`. Use both `-webkit-scrollbar` rules (Chrome/Edge/Safari) and `scrollbar-color` / `scrollbar-width:thin` (Firefox). Scope via element ID or wrapper class to avoid polluting the parent page.
- Applied: All IS design patterns applied to `btp_school_analogy.html` — draggable `#btp-resizer` (JS constrained to 280px min each side), `min-width:280px` on both columns, `font-weight:700` on concept name cells, **Part of** (green left-border) and **Works with** (blue left-border) connection sections in detail panel mirroring the IS "Calls/Refers to" / "Called by" pattern. JS data-driven: all 19 concepts carry `partof[]` and `workswith[]` arrays rendered dynamically on row click.
