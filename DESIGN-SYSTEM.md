# Job Notification App — Design System

Design system foundation only. No product features. B2C-grade, calm, intentional.

## Usage

Link the single entry file in every page:

```html
<link rel="stylesheet" href="css/design-system.css" />
```

## Color System (4 colors)

| Token | Value | Use |
|-------|--------|-----|
| `--color-bg` | `#F7F6F3` | Background (off-white) |
| `--color-text` | `#111111` | Primary text |
| `--color-accent` | `#8B0000` | Primary actions, links, focus |
| `--color-success` | `#4A5D4A` | Success states |
| `--color-warning` | `#8B7355` | Warning states |

No gradients, glassmorphism, or neon.

## Spacing Scale

Use only: **8px, 16px, 24px, 40px, 64px**

- `--space-1` = 8px  
- `--space-2` = 16px  
- `--space-3` = 24px  
- `--space-4` = 40px  
- `--space-5` = 64px  

Never use arbitrary values (e.g. 13px, 27px).

## Typography

- **Headings:** Serif (Source Serif 4), large, confident. Max width 720px.
- **Body:** Sans (Source Sans 3), 16–18px, line-height 1.6–1.8.
- **Text blocks:** Max width `--text-max-width` (720px).

## Global Layout (every page)

1. **Top Bar** — App name (left), Progress “Step X / Y” (center), Status badge (right).
2. **Context Header** — One large serif headline, one-line subtext.
3. **Main content** — **Primary workspace** (70%) + **Secondary panel** (30%).
4. **Proof Footer** — Checklist: □ UI Built, □ Logic Working, □ Test Passed, □ Deployed.

Classes: `.topbar`, `.context-header`, `.main-content`, `.workspace`, `.panel`, `.proof-footer`.

## Components

- **Primary button:** `.btn .btn-primary` — solid `#8B0000`.
- **Secondary button:** `.btn .btn-secondary` — outlined.
- **Inputs:** `.input`, `.textarea` — clean border, focus uses accent.
- **Cards:** `.card` — subtle border, no drop shadow.
- **Copyable box:** `.prompt-box` — for prompts/snippets in panel.
- **Badge:** `.badge`, `.badge-success`, `.badge-warning`, `.badge-neutral`.

Same border radius everywhere: `--radius` (6px).

## Interaction

- Transitions: 150–200ms, ease-in-out. No bounce, no parallax.

## Errors & empty states

- **Errors:** Explain what went wrong and how to fix it. Never blame the user.
- **Empty states:** Guide next action. No blank screens.

Classes: `.error-state`, `.empty-state` (with `__title`, `__message`, `__action`).
