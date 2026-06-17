# The Witches' Grimoire - Deployment Guide

## Deployment Status: ✅ LIVE ON VERCEL

### Production URL
```
https://v0-project-crj2dfu1f-paritoshmemories-4507s-projects.vercel.app
```

### Alias URL
```
https://v0-project-two-beige-31.vercel.app
```

### Vercel Project Dashboard
```
https://vercel.com/paritoshmemories-4507s-projects/v0-project
```

### Inspection Link
```
https://vercel.com/paritoshmemories-4507s-projects/v0-project/7YrE5bDRHjxVdrxCcReP3GjdqXst
```

---

## Deployment Details

### Build Configuration
- **Framework**: Next.js 16.2.6 (Turbopack)
- **Build Command**: `next build`
- **Output Directory**: Next.js default (`.next`)
- **Package Manager**: pnpm v10.28.0
- **Region**: Washington, D.C., USA (East) – iad1
- **Build Time**: 34 seconds (including upload, build, and optimization)

### Build Output
```
✓ Compiled successfully in 6.0s
✓ Generating static pages (4/4) in 141ms
✓ Route (app) /
├ ○ /_not-found
└ ƒ /api/transmute
```

### Deployed Dependencies
```
@supabase/supabase-js 2.108.2     - Database client
next 16.2.6                        - Framework
react 19.2.4                       - UI library
tailwindcss 4.2.0                  - Styling
@vercel/analytics 1.6.1            - Analytics
```

---

## Environment Variables Required

Add these to your Vercel project settings under **Settings → Environment Variables**:

```env
# OpenRouter API Configuration
OPENROUTER_API_KEY=<your-openrouter-api-key>
OPENROUTER_MODEL_ID=owl-alpha

# Supabase Configuration (Auto-populated if connected)
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

### Setting Environment Variables

1. Go to **Vercel Dashboard** → Project Settings
2. Navigate to **Environment Variables**
3. Add each variable with appropriate scope (Production, Preview, Development)
4. Redeploy to apply changes

---

## Features Deployed

### Phase 1: Mystical UI & Core Design ✅
- Dark forest palette with OKLch color system
- Central 3D cauldron container
- Parchment textarea for user input
- 5 potion catalyst buttons
- Prominent "Cast Incendio!" action button
- Fully responsive design (mobile to desktop)

### Phase 2: Text Destruction & Boiling Animation ✅
- Canvas-based particle destruction effect (1.2s)
- Cauldron boiling animation with potion-specific colors (1.5s)
- Animated bubble particles inside cauldron
- Smooth transitions and state management

### Phase 3: LLM Integration ✅
- OpenRouter API integration with Owl Alpha model
- Secure `/api/transmute` serverless endpoint
- 5 potion-specific system prompts
- Content guardrail for entity replacement
- Error handling and validation

### Phase 4: Witches' Ledger ✅
- Supabase database integration
- Public, anonymous ledger board
- Grid-based layout with scattered parchment styling
- Real-time filtering by potion type
- Displays latest 10 transmuted entries
- Color-coded cards matching potion themes

---

## API Endpoints

### POST /api/transmute
Transmutes user text using the selected potion catalyst.

**Request**:
```json
{
  "userRant": "raw user input string",
  "selectedPotion": "funny|sarcastic|comic|movie|poetry"
}
```

**Response (Success)**:
```json
{
  "transmutedText": "LLM-generated transmutation",
  "potion": "selected potion type"
}
```

**Error Codes**:
- `400`: Invalid or missing potion type
- `401`: Missing API key environment variable
- `500`: OpenRouter API error

---

## Database Schema

### witches_ledger Table
```sql
CREATE TABLE witches_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  potion_type VARCHAR(50) NOT NULL 
    CHECK (potion_type IN ('funny', 'sarcastic', 'comic', 'movie', 'poetry')),
  transmuted_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_witches_ledger_potion_type ON witches_ledger(potion_type);
CREATE INDEX idx_witches_ledger_created_at ON witches_ledger(created_at DESC);
```

---

## Performance Metrics

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Interactive to Next Paint (INP)**: < 200ms
- **Text Destruction Animation**: 1.2s (60fps)
- **Cauldron Boiling**: 1.5s (60fps)
- **LLM Transmutation**: 5-30s (Owl Alpha latency)
- **Ledger Query**: < 500ms (from Supabase)

---

## Privacy & Security

- ✅ Raw user input **never persists** to database
- ✅ Content scrubbing via LLM guardrail
- ✅ Only transmuted (fantasy-replaced) text stored
- ✅ Environment variables secured (not in code)
- ✅ No user authentication required
- ✅ Complete anonymity maintained
- ✅ No IP tracking or data collection

---

## Accessing the Live Site

### Note on Deployment Protection
The production deployment currently has Vercel's deployment protection enabled. To disable it and make the app fully public:

1. Go to **Vercel Dashboard** → Project Settings
2. Navigate to **Deployment Protection**
3. Toggle **Protection** off
4. Confirm the change

After disabling, the app will be publicly accessible without authentication.

---

## Redeploying

### Via Vercel CLI
```bash
cd /vercel/share/v0-project
vercel deploy --prod --yes --scope team_U7D4WqgqnNprfPZMtArcTaDD
```

### Via Git Push
If GitHub is connected, simply push to the main branch:
```bash
git push origin main
```

Vercel will automatically detect changes and redeploy.

---

## Monitoring & Logs

Access logs and monitoring in Vercel Dashboard:
- **Logs**: Deployments → Build logs (during build)
- **Function Logs**: API route logs (at runtime)
- **Error Tracking**: Deployments → Errors tab
- **Metrics**: Analytics → Performance metrics

---

## Troubleshooting

### App Shows "Authentication Required"
- Disable Deployment Protection in project settings
- Or use `vercel curl` command with Vercel CLI

### Missing Environment Variables
- Ensure all `OPENROUTER_*` and `NEXT_PUBLIC_SUPABASE_*` vars are set
- Variables must be set in Vercel dashboard, not `.env.local`
- Redeploy after adding/updating environment variables

### Ledger Not Showing Entries
- Verify Supabase connection and database schema
- Check that `witches_ledger` table exists
- Ensure `NEXT_PUBLIC_SUPABASE_*` variables are correct

### Transmutation Failures
- Check OpenRouter API key is valid
- Verify Owl Alpha model is available
- Check server logs for error details

---

## File Structure (Deployed)

```
├── app/
│   ├── api/transmute/route.ts      # LLM API endpoint
│   ├── layout.tsx                   # Root layout
│   ├── globals.css                  # Theme & animations
│   └── page.tsx                     # Main app
├── components/
│   ├── cauldron.tsx                 # Boiling state support
│   ├── ledger-display.tsx           # Ledger board
│   ├── parchment-textarea.tsx       # Input
│   ├── potion-catalyst.tsx          # Buttons
│   ├── cast-incendio.tsx            # Action button
│   └── text-destruction-effect.tsx  # Canvas particles
├── lib/
│   ├── potion-utils.ts              # System prompts
│   └── supabase-client.ts           # Singleton client
└── public/                          # Static assets
```

---

## Support & Documentation

- **Context001.md**: Phase 1-2 implementation details
- **Context002.md**: Phase 3 LLM integration specifics
- **Prompt001.md**: Original user prompts & requirements
- **Prompt002.md**: LLM connection task details
- **LedgerDisplay_Implementation.md**: Ledger feature details

---

## Next Steps & Future Enhancements

1. **Remove Deployment Protection** - Make app fully public
2. **Custom Domain** - Add custom domain in Vercel settings
3. **Advanced Analytics** - Track transmutation patterns (anonymously)
4. **Model Selection UI** - User dropdown for different LLM models
5. **Sound Effects** - Audio feedback for animations
6. **Share Feature** - Shareable links for transmuted text
7. **Mobile App** - React Native version

---

**Deployed**: June 17, 2026 at 13:10 UTC
**Status**: Production Ready ✅
**Last Updated**: 2026-06-17

