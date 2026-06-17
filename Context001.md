# Context001.md - The Witches' Grimoire Development Log

## Project Overview
The Witches' Grimoire is a mystical single-page application designed to transform raw user input into enchanted transmuted texts while maintaining absolute anonymity and ephemeral data handling.

## Core Architectural Principles

### 1. Absolute Anonymity & Data Privacy
- Raw text exists **only in active browser memory** or temporary serverless execution memory
- No user logins, IP addresses, names, or raw un-scrubbed rants are stored
- Data is destroyed immediately after processing
- Only transmuted (processed) fantasy-text results appear in persistent storage ("The Witches' Ledger")
- Uses lightweight, public serverless data rows for final results only

### 2. Data Processing Pipeline
- **Volatile In-Memory Stage**: Raw input captured and held only in React state/browser memory
- **Aggressive Data Scrubbing**: System replaces real names, entities, and brands with fictional fantasy alternatives (e.g., "Google" → "The High Scrying Guild")
- **Static No-Overhead Persistence**: Only the transmuted, fantasy-text versions are stored in public persistence layer

## Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 with OKLch color system
- **Fonts**: Geist (sans), Geist Mono (monospace)
- **Design System**: Dark mystical theme (deep plums, ink blacks, glowing emeralds/purples)
- **Animation**: CSS animations + HTML5 Canvas for particle effects

## Color Palette (OKLch-based)
- **Background**: `oklch(0.08 0.05 280)` - Deep ink black
- **Foreground**: `oklch(0.92 0.02 280)` - Light lavender
- **Primary**: `oklch(0.55 0.25 290)` - Vibrant purple
- **Accent**: `oklch(0.52 0.24 130)` - Glowing emerald green
- **Muted**: `oklch(0.25 0.04 280)` - Dark slate

## Component Architecture

### Core Components

#### 1. **Cauldron** (`components/cauldron.tsx`)
- Central stylized vessel with 3D depth and metallic gradient rim
- Supports dynamic boiling state with potion-specific color gradients
- Animated bubble particles during boiling
- Decorative cauldron legs
- Props: `children`, `isBoiling`, `potionType`

#### 2. **Parchment Textarea** (`components/parchment-textarea.tsx`)
- Elegant input field with amber paper texture overlay
- Focus states with glowing borders
- Semantic styling for accessibility
- Props: `value`, `onChange`, `placeholder`

#### 3. **Potion Catalyst Buttons** (`components/potion-catalyst.tsx`)
- 5 interactive buttons: Funny, Sarcastic, Comic, Movie, Poetry
- Active/hover states with glowing effects and scale transforms
- Props: `label`, `isActive`, `onClick`

#### 4. **Cast Incendio Button** (`components/cast-incendio.tsx`)
- Prominent large button with animated gradient background
- Shimmering effect and pulsing glow
- Loading state with "CASTING..." label
- Props: `onClick`, `isLoading`, `disabled`

#### 5. **Text Destruction Effect** (`components/text-destruction-effect.tsx`)
- Canvas-based particle system for burning text animation
- Creates 3 ash particles per character
- Particles rise upward with gravity and air resistance
- 1.2-second animation duration with smooth fade-out
- Props: `text`, `isActive`, `onComplete`, `duration`

### Utility Layer

#### **Potion Utils** (`lib/potion-utils.ts`)
- `PotionType` type definition
- Boiling color mappings for each potion:
  - **Funny**: Yellow/Orange (`from-yellow-500/40 via-orange-400/50 to-yellow-500/40`)
  - **Sarcastic**: Purple/Indigo (`from-purple-600/40 via-indigo-500/50 to-purple-600/40`)
  - **Comic**: Pink/Red (`from-pink-500/40 via-red-400/50 to-pink-500/40`)
  - **Movie**: Cyan/Blue (`from-cyan-500/40 via-blue-400/50 to-cyan-500/40`)
  - **Poetry**: Emerald/Teal (`from-emerald-500/40 via-teal-400/50 to-emerald-500/40`)

## User Interaction Flow

### Standard Workflow
1. User enters raw text in Parchment Textarea
2. User selects a Potion Catalyst (one of 5 buttons)
3. User clicks Cast Incendio button
4. **Destruction Phase** (1.2s):
   - Canvas overlay appears over textarea
   - Text visually "catches fire" with ash particle effects
   - Particles rise and fade out
   - Raw text is cleared from textarea
5. **Boiling Phase** (1.5s):
   - Cauldron interior transitions to boiling state
   - Background color matches selected potion type
   - Animated bubble particles pulse inside cauldron
   - Glow effects intensify
6. **Transmutation Phase** (1.5s):
   - Boiling animation completes
   - Transmuted (scrubbed/fantasy) text is generated
   - Results displayed in "Transmuted Essence" card below

### Animation Timing Breakdown
- **Text Destruction**: 1.2 seconds (canvas particles rising)
- **Cauldron Boiling**: 1.5 seconds (color pulse + bubble animation)
- **Transmutation Processing**: 1.5 seconds (simulated backend processing)
- **Total Sequence**: ~4.2 seconds

## Key Features Implemented

### Text Destruction Mechanism
- HTML5 Canvas overlay capturing textarea bounds
- Particle generation: 3 particles per text character
- Physics simulation: gravity effect, air resistance, rotation
- Visual effect: particles fade from opaque to transparent while rising
- Cleanup: canvas destroyed after animation completes

### Dynamic Boiling Animation
- Tailwind gradient backgrounds applying potion-specific colors
- Pulsing opacity animation on boiling state
- Decorative bubble particles with individual animation delays
- Bottom glow ring transitions to match potion color

### Responsive Design
- Mobile-first approach with flexbox layouts
- Breakpoint-responsive typography:
  - Mobile: `text-4xl` heading
  - Desktop (md+): `text-5xl` heading
- Touch-friendly button sizing and spacing
- Tested on 375px (mobile) to 1920px (desktop) viewports

### Privacy & Security Features
- Raw text never transmitted during development
- User-facing messaging communicates anonymity
- Form clears after successful animation sequence
- Only transmuted results persist

## State Management (React Hooks)
```typescript
- rawText: string              // Current textarea input
- selectedPotion: PotionType   // Active potion choice (or null)
- isLoading: boolean           // API/transmutation in progress
- isDestructing: boolean       // Text destruction animation active
- isBoiling: boolean           // Cauldron boiling animation active
- transmutedText: string       // Final transmuted result
- textToDestroy: string        // Text being destroyed (for canvas)
```

## Responsive Breakpoints
- **Mobile**: 375px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1920px+

## Accessibility Considerations
- Semantic HTML structure
- ARIA-friendly interactive elements
- Screen reader support with sr-only text where needed
- Keyboard-navigable buttons and form inputs
- Color contrast maintained (dark theme with bright text)
- Focus states clearly visible

## Future Enhancement Opportunities
1. Backend API integration for real text transmutation
2. "Witches' Ledger" public display board for transmuted results
3. User rate limiting and moderation system
4. Additional potion types/transformation styles
5. Sound effects for destruction and boiling animations
6. Theme customization options
7. Share/export transmuted texts
8. Analytics on transmutation patterns (anonymized)

## Development Notes
- Keep code minimal and lightweight per Cohort 2 guidelines
- All animations optimized for 60fps performance
- Canvas particle system designed for low memory footprint
- No external animation libraries; pure CSS and Canvas API
- Modular component structure for maintainability
