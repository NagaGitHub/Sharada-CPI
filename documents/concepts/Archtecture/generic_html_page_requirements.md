# Generic Requirements — Interactive Diagram HTML Pages

A reusable spec for building self-contained, single-file interactive HTML diagrams.  
Apply these requirements to any future diagram page (architecture, flow, analogy, etc.).

---

## 1. File Format

- **Single `.html` file** — no external CSS or JS files. All styles and scripts inline.
- Self-contained: works offline, no build step needed.

---

## 2. Dark Theme (apply to every page)

| Token | Value |
|---|---|
| Page background | `#0d1117` |
| Panel background | `#161b22` |
| All borders | `#30363d` |
| Primary text | `#e6edf3` |
| Secondary / muted text | `#8b949e` |
| Body text (detail panel) | `#c9d1d9` |

---

## 3. Two-Column Layout

- **Left column (initial ~55–56% width):** Diagram / table / SVG panel.
- **Resizer (5px strip):** Draggable `#resizer` div — `cursor:col-resize`, highlights blue (`#3b82f6`) on hover/drag. JS constrains each column to **min 280px**.
- **Right column (flex remaining):** Sticky detail panel — `background:#161b22; border:1px solid #30363d; border-radius:10px`.
- Right panel structure (top → bottom):
  - **Header zone** — component badge + title (17px bold) + subtitle/role (11px muted)
  - **Flow / sequence strip** — horizontally scrollable pills (always visible)
  - **Description body** — scrollable, `12.5px, line-height:1.7`

```
┌──────────────────────┬─┬──────────────────────┐
│   Diagram / SVG      │▕│  Detail Panel        │
│   (resizable)        │ │  ┌─ Header ─────────┐│
│                      │ │  │ Badge + Title    ││
│                      │ │  │ Subtitle         ││
│                      │ │  └──────────────────┘│
│                      │ │  Flow Strip (scroll) │
│                      │ │  ┌─ Body ───────────┐│
│                      │ │  │ Description      ││
│                      │ │  │ Connections      ││
│                      │ │  └──────────────────┘│
└──────────────────────┴─┴──────────────────────┘
```

---

## 4. Typography

| Element | Size | Weight |
|---|---|---|
| Boundary / section heading | 16px | 700 |
| Box / row title | 13px | 700 |
| Box description lines | 11px | 400 |
| Detail panel title | 16–17px | 700 |
| Detail panel body | 12.5px | 400 |
| Connection items | 11.5px | 400 |
| Step badge labels | 8px | 700 |

---

## 5. Colour Coding by Component Type

Define a colour per component category. Each colour applies to:
- `fill` (box background)
- `stroke` (box border)
- Step badge fill
- Left-border accent in the detail panel

**Suggested default palette:**

| Role | Fill | Stroke / Accent |
|---|---|---|
| Primary boundary | `none` | `#1d9e75` teal dashed |
| Sub-boundary | `none` | `#3b6d11` green dashed |
| Core engine / node | `#0d1f38` | `#185fa5` blue |
| Service / instance | `#0d1b35` | `#185fa5` blue |
| Processing / steps | `#140f2a` | `#534ab7` purple |
| Action / deploy | `#2a1500` | `#ba7517` amber |
| Monitoring | `#130e28` | `#534ab7` purple |
| External actor | `#1a1f28` | `#5f5e5a` gray |

---

## 6. Step / Flow Badges

- Use pill-shaped badges (22×14px, border-radius 3px, font-size 8px bold) placed **inside each box** (top-left corner).
- Assign a letter prefix per flow type:
  - Trigger / runtime flow → **T** prefix, teal fill `#0f6e56`
  - Deploy / setup flow → **D** prefix, amber fill `#ba7517`
  - Use any other letter for additional flows, pick a distinct colour.
- **No floating arrows or separate legend** — badges replace them.

---

## 7. Click Behaviour (boxes / rows)

When any box or row is clicked:

1. Highlight the clicked element: blue left-border accent + `rgba(59,130,246,.07)` background fill.
2. Right detail panel instantly updates — **no animation/transition**:
   - **Component badge** (small coloured chip with component type label)
   - **Title** (17px bold, `#e6edf3`)
   - **Analogy / role description** (left-border in component accent colour)
   - **Explanation body** (`#c9d1d9`, 12.5px, line-height 1.7)
   - **Connections — outbound** ("Calls / Part of"): green left-border `#3b6d11`
   - **Connections — inbound** ("Called by / Works with"): blue left-border `#185fa5`
   - Optional amber caveat/note block

3. Right panel scrolls to top on each new click.
4. All steps descriptions **stay permanently visible** in the lower half of the right panel.

---

## 8. Flow Sequence Strip

- Both strips (all flow types) always visible in the right panel.
- Pills are clickable — clicking a pill navigates to that component.
- Highlighted pill = currently selected component (teal for T, amber for D).
- Strip is **horizontally scrollable** with amber scrollbar thumb (`#ba7517`).

---

## 9. Collapse / Expand Toggle (Presentation Mode)

- Toolbar strip (`#diagram-toolbar`) sits **above** the diagram — does not overlap SVG content.
- Three-segment pill: `← | Label | →`
  - `←` (expand) — shows all sub-boxes; label → "Detailed"
  - `→` (collapse) — shows outer boundaries only; label → "Overview"
  - Active segment: `#0a2a1e` bg, `#4fc98f` teal text
- **Page loads in collapsed (Overview) state.**
- Sub-boxes tagged `class="sub-box"`. CSS: `.collapsed .sub-box { display:none }`.
- Outer/boundary boxes always visible in both states.

---

## 10. Zoom (Diagram Panel)

- SVG uses `width:100%; height:auto` — no scrollbars on initial load.
- `#zoom-bar` overlay (top-right, `position:absolute`, `z-index:20`): shows zoom % + ＋ / － / ↺ buttons.
- **Ctrl+scroll** zooms in/out — range 40%–400%.
- At zoom > 100%: SVG pixel width = `containerWidth × zoomLevel` → scrollbars appear automatically.
- Reset (↺) returns to 100% fit.
- Panel resize while zoomed → recalculate SVG pixel width.

---

## 11. Colour-Coded Scrollbars

Apply to every scrollable container:

| Container | Thumb | Hover | Size |
|---|---|---|---|
| Diagram — vertical | `#1d6e5a` teal | `#1d9e75` | 7px |
| Diagram — horizontal | `#185fa5` blue | `#378add` | 7px |
| Flow strip | `#ba7517` amber | `#f0a442` | 4px |
| Detail body — vertical | `#4a9ee6` blue | `#7ba7ff` | 5px |

Track colour: `#161b22`. Use both `-webkit-scrollbar` (Chrome/Edge/Safari) and `scrollbar-color` / `scrollbar-width:thin` (Firefox). Scope per container ID to avoid inheritance.

---

## 12. Image Section (Collapsible, at Bottom)

- Collapsible image gallery section at the bottom of the page.
- Toggle button to expand / collapse.
- Accepts user-uploaded images displayed as thumbnails.
- Clicking any thumbnail → opens full image in a new browser tab.

---

## 13. Hover Behaviour

- Box/row hover: `opacity: 0.82` only — no other transition.
- No CSS transitions anywhere (all changes instant).

---

## 14. SVG Layout Principles

- `viewBox="0 0 W H"` — pick W×H to fit the content, not the screen.
- Use SVG `<rect>` for boxes, `<text>` for labels.
- Connector lines: solid or dashed `<line>`/`<path>` with matching stroke colour — no arrowheads on dashed lines.
- Arrowhead markers defined in `<defs>` — one per colour.
- Boundary boxes: dashed stroke, `fill:none`, large `border-radius` (rx/ry ~6–8).

---

## 15. Data Architecture (JS)

- All component data in a single JS object/array at the top of the `<script>` block.
- Each entry carries:
  - `id`, `title`, `subtitle`, `type`, `description`
  - `calls[]` / `calledBy[]` — or `partOf[]` / `worksWith[]` for analogy pages
  - `deployStep` (D1–DN) and/or `triggerStep` (T1–TN) if applicable
- Click handlers read from this data object — no hardcoded HTML strings.

---

## 16. Checklist Before Shipping Any New Page

- [ ] Single `.html` file, no external dependencies
- [ ] Dark theme tokens applied (`#0d1117` background)
- [ ] Two-column resizable layout with 280px min-widths
- [ ] Click populates right panel instantly (no transition)
- [ ] Step badges inside boxes (not floating arrows)
- [ ] Flow strips horizontally scrollable with correct thumb colours
- [ ] Collapse/expand loads in Overview state
- [ ] Ctrl+scroll zoom with zoom-bar overlay
- [ ] Colour-coded scrollbars per container
- [ ] Collapsible image section at bottom
- [ ] All data JS-driven (not hardcoded in event handlers)
- [ ] Tested at 100%, 150%, 200% zoom for layout breakage
