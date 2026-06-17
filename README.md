# The Witches' Grimoire

A privacy-first, LLM-powered text transformation application with enchanted UI animations. Transform your raw emotions and thoughts into creative, themed transmutations while maintaining complete anonymity.

## Live Demo

**[Visit The Witches' Grimoire](https://v0-project-crj2dfu1f-paritoshmemories-4507s-projects.vercel.app)**

---

## Features

### 🔥 Text Destruction Animation
Watch your raw thoughts literally catch fire and dissolve into ash particles as the cauldron boils with color.

### 🧪 5 Potion Catalysts
Choose how your emotions are transformed:
- **Funny** - Absurd medieval theater comedy
- **Sarcastic** - Biting, dry aristocratic wit
- **Comic** - Vivid, expressive graphic scenes
- **Movie** - Epic cinematic narration
- **Poetry** - Dark, rhythmic verse

### 📜 The Witches' Ledger
A public, anonymous board displaying the latest transmutations. Click any potion button to filter by type.

### 🔐 Complete Privacy
- Raw input exists only in browser memory
- Never logged or stored
- Only transmuted (fantasy-replaced) text persists
- Aggressive entity scrubbing (names, corporations, locations → fantasy archetypes)
- Zero personal data collection

### ✨ Mystical Design
Dark forest palette with glowing emeralds, deep purples, and animated particle effects. Fully responsive from mobile to desktop.

---

## Technology Stack

- **Frontend**: Next.js 16 with React 19, Tailwind CSS v4
- **Backend**: Serverless functions on Vercel
- **LLM**: Owl Alpha model via OpenRouter
- **Database**: Supabase PostgreSQL
- **Animations**: HTML5 Canvas + CSS (60fps)

---

## Getting Started

### Prerequisites
```bash
Node.js 18+
pnpm v10+
```

### Installation
```bash
git clone <repository>
cd v0-project
pnpm install
```

### Environment Variables
```env
OPENROUTER_API_KEY=your-api-key
OPENROUTER_MODEL_ID=owl-alpha
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
```

### Development
```bash
pnpm dev
# Open http://localhost:3000
```

### Production Build
```bash
pnpm build
pnpm start
```

---

## Philosophy

### Emotions as Wisdom

Emotions are the natural language of the human body and mind. They are not mistakes to be corrected, but signals to be acknowledged. Sadness, joy, anger, arousal, jealousy, honor, envy—each one carries its own wisdom.

When we suppress or deny emotions, we force the body to store what was meant to move. That stagnation often turns into stress, tension, or even illness.

Instead of labeling emotions as "good" or "bad," we can learn to respect them as visitors. Let sadness wash through like rain, let anger burn and fade like fire, let joy expand like sunlight. By allowing emotions to flow freely, we give them space to complete their cycle and release.

### The Practice

The practice is simple but profound:
1. **Notice** what you feel
2. **Name** it without judgment
3. **Breathe** into it
4. **Let** it pass

In honoring every emotion, we honor our humanity.

### Modern Application

Ask AI to analyze your emotions and help you breathe out your inner feelings judgment-free. Transform your raw emotional language into creative expression. In the safe space of anonymity, your authentic voice emerges.

---

## Project Structure

```
├── app/
│   ├── api/transmute/          # LLM API endpoint
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Theme & animations
│   └── page.tsx                # Main application
├── components/
│   ├── cauldron.tsx            # Boiling container
│   ├── ledger-display.tsx      # Public ledger board
│   ├── parchment-textarea.tsx  # Input field
│   ├── potion-catalyst.tsx     # 5 potion buttons
│   ├── cast-incendio.tsx       # Action button
│   └── text-destruction-effect.tsx  # Particle system
├── lib/
│   ├── potion-utils.ts         # System prompts
│   └── supabase-client.ts      # Database client
└── [documentation & config files]
```

---

## API Documentation

### POST /api/transmute

Transmute raw emotional input using a potion catalyst.

**Request:**
```json
{
  "userRant": "your raw emotions here",
  "selectedPotion": "funny|sarcastic|comic|movie|poetry"
}
```

**Response:**
```json
{
  "transmutedText": "LLM-generated creative output",
  "potion": "selected potion type"
}
```

---

## Database Schema

The `witches_ledger` table stores transmuted entries:

```sql
id              UUID PRIMARY KEY
potion_type     VARCHAR(50) -- funny, sarcastic, comic, movie, poetry
transmuted_text TEXT        -- LLM output only (never raw input)
created_at      TIMESTAMP   -- Entry creation time
```

**Privacy Note**: Raw user input is never stored, only transmuted text.

---

## Performance

- **First Contentful Paint**: < 1.5s
- **Animation Frame Rate**: 60fps
- **Text Destruction**: 1.2s
- **Cauldron Boiling**: 1.5s
- **LLM Processing**: 5-30s (Owl Alpha model)
- **Ledger Query**: < 500ms

---

## Security & Privacy

✅ Raw input stored only in browser memory
✅ Content automatically scrubbed of real-world entities
✅ Only transmuted (fantasy-replaced) text persists
✅ Environment keys secured via Vercel project settings
✅ No user authentication or tracking
✅ Complete anonymity maintained

---

## Documentation

- **[Context001.md](./Context001.md)** - Phase 1-2 implementation details
- **[Context002.md](./Context002.md)** - Phase 3 LLM integration
- **[Prompt001.md](./Prompt001.md)** - Original UI requirements
- **[Prompt002.md](./Prompt002.md)** - LLM integration specs
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete overview

---

## Future Enhancements

- Custom domain setup
- Advanced privacy analytics
- Sound effects & audio feedback
- Share/export functionality
- Mobile app (React Native)
- Additional model selection
- Offline support
- Theme customization

---

## Support

For questions or issues, refer to the comprehensive documentation files in the repository root.

---

## License

Created with v0 by Vercel.

---

*Last deployed: June 17, 2026*
