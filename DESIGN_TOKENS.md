# DESIGN TOKENS
# Extracted from https://hadiza-yusuf.netlify.app/ (HTML/DOM analysis)
# These values are mirrored as CSS custom properties in app/globals.css

## COLOR PALETTE

### Backgrounds
--bg-primary:        #09090f      /* page background */
--bg-secondary:      #111118      /* alternate section bg */
--bg-card:           #14141e      /* card background */
--bg-card-hover:     #181824      /* card hover state */
--bg-nav:            rgba(9,9,15,0.88)  /* sticky nav + backdrop blur */

### Text
--text-primary:      #f0eef8      /* headings, primary body */
--text-secondary:    #a8a3c0      /* body copy, descriptions */
--text-muted:        #64607a      /* captions, meta, footer */

### Accent (Purple)
--accent:            #8b5cf6      /* buttons, active links, dots */
--accent-light:      #a78bfa      /* hover state, links */
--accent-glow:       rgba(139,92,246,0.12)  /* card hover shadow */
--accent-glow-strong: rgba(139,92,246,0.22) /* button shadow */

### Borders
--border:            rgba(255,255,255,0.07)   /* card/section borders */
--border-accent:     rgba(139,92,246,0.35)    /* card hover border */

### Status Labels
--status-current-bg:     rgba(16,185,129,0.12)
--status-current-text:   #34d399
--status-current-border: rgba(16,185,129,0.25)

--status-completed-bg:     rgba(107,114,128,0.12)
--status-completed-text:   #9ca3af
--status-completed-border: rgba(107,114,128,0.25)

--status-accepted-bg:     rgba(245,158,11,0.12)
--status-accepted-text:   #fbbf24
--status-accepted-border: rgba(245,158,11,0.25)

--status-published-bg:     rgba(59,130,246,0.12)
--status-published-text:   #60a5fa
--status-published-border: rgba(59,130,246,0.25)

### Chips / Tags
--chip-bg:     rgba(139,92,246,0.10)
--chip-text:   #c4b5fd
--chip-border: rgba(139,92,246,0.20)

---

## TYPOGRAPHY

Font Family:   Inter (Google Fonts)
URL: https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap

| Element              | Size           | Weight |
|----------------------|----------------|--------|
| Body                 | 16px (1rem)    | 400    |
| Nav links            | 14px           | 500    |
| Name/Logo in nav     | 17px           | 700    |
| Section index #      | 6-10rem (clamp)| 900    |
| Section title (h2)   | 1.75-2.25rem   | 700    |
| Hero name (h1)       | 2.4-3.5rem     | 800    |
| Hero role            | 1-1.2rem       | 400    |
| Card title (h3)      | 15-20px        | 600    |
| Meta / caption       | 12-13px        | 400    |
| Status/chip text     | 11px           | 600    |
| Button               | 14px           | 600    |

Letter spacing: headings -0.02em to -0.04em; chips/status +0.04-0.06em

---

## SPACING

--nav-height:      64px
--section-gap:     96px   (padding-top and padding-bottom)
--content-max-w:   1100px (centered with px-6)
Card padding:      24px
Card gap:          16-20px
Card border-radius: 14px (--radius-card)

---

## COMPONENTS

### Buttons
Primary:   bg=accent, color=white, radius=full, padding=10px 22px, size=14px w600
Outline:   bg=transparent, border=1px solid --border, radius=full, padding=10px 22px
Hover primary: bg=accent-light, translateY(-1px), shadow=glow
Hover outline: border=accent, color=accent-light, bg=accent-glow

### Social Pills (hero)
Background: rgba(255,255,255,0.05)
Border: 1px solid --border
Padding: 7px 16px
Font: 13px w500
Hover: bg=accent-glow, border=border-accent, color=accent-light

### Chips / Tags
Background: --chip-bg
Border: 1px solid --chip-border
Padding: 3px 10px
Font: 11px w500
Border-radius: full (9999px)

### Cards
Background: --bg-card
Border: 1px solid --border
Border-radius: 14px
Padding: 24px
Shadow: 0 4px 24px rgba(0,0,0,0.35)
Hover: translateY(-3px), shadow-accent, border=border-accent, bg=bg-card-hover
Transition: 0.25s ease

### Section Index Numbers
Font-size: clamp(6rem, 12vw, 10rem)
Font-weight: 900
Color: rgba(255,255,255,0.03)
Position: absolute, top=-32px, left=-8px
User-select: none; pointer-events: none

---

## NAV BEHAVIOR

- position: sticky; top: 0; z-index: 50
- Height: 64px
- On scroll: background transitions from transparent → rgba(9,9,15,0.88)
- backdrop-filter: blur(14px) on scroll
- Bottom border: 1px solid var(--border) on scroll
- Active link: color=#a78bfa + underline slide (width 0→100%, 0.25s ease)
- Hover: same as active
- Mobile: hamburger menu → full-screen overlay with all links

---

## ANIMATIONS

Scroll-triggered fade-up:
  - opacity: 0 → 1
  - translateY: 22px → 0
  - Duration: 0.55s
  - Easing: ease
  - Implementation: IntersectionObserver (threshold: 0.08)
  - Fires once per element (unobserves after first trigger)

Stagger delay: i * 60-80ms per card in a list

Card hover: translateY(-3px), box-shadow, border-color (0.25s ease)
Button hover: translateY(-1px), box-shadow glow (0.2s)
Nav link hover: color + underline (0.2s/0.25s)

---

## RESPONSIVE BREAKPOINTS

Desktop:  ≥ 1024px — full 2-column hero, multi-column card grids
Tablet:   768px — nav hamburger, 1-2 column cards
Mobile:   390px — single column everywhere, hero image above text
