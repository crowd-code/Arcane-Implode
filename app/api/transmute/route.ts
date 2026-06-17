import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-client'

// System prompt dictionary for each potion type
const POTION_PROMPTS: Record<string, string> = {
  funny:
    "Cauldron of Slapstick. Turn this modern problem into an absurd, medieval theater comedy. Make it ridiculous, over-the-top, and laugh-out-loud funny.",
  sarcastic:
    "Cynical Court Jester. Reframe this frustration with biting, dry, aristocratic sarcasm. Be witty, condescending, and deliciously sarcastic.",
  comic:
    "Graphic Caricature Panel. Reframe this situation into vivid, highly expressive, frame-by-frame text scenes. Use dramatic descriptions and visual language.",
  movie:
    "Epic Cinematic Narrator. Turn this minor real-world inconvenience into a massive Hollywood movie trailer script. Make it sound like a blockbuster epic.",
  poetry:
    "Gothic Wizard Poet. Condense the anger into a dark, rhythmic 3-line haiku or verse. Use mystical, poetic language with rhythm and meter.",
}

// Data scrubbing guardrail
const DATA_SCRUBBING_GUARDRAIL = `Analyze the following text. Instantly erase any real-world human names, modern corporations, or specific locations, replacing them with generic fantasy archetypes (e.g., "Google" → "The High Scrying Guild", "John" → "The Wanderer"). Transmute it according to your system personality:`

export async function POST(request: NextRequest) {
  try {
    const { userRant, selectedPotion } = await request.json()

    // Validate inputs
    if (!userRant || typeof userRant !== 'string' || !userRant.trim()) {
      return NextResponse.json(
        { error: 'userRant is required and must be a non-empty string' },
        { status: 400 }
      )
    }

    if (!selectedPotion || !POTION_PROMPTS[selectedPotion]) {
      return NextResponse.json(
        {
          error: `selectedPotion must be one of: ${Object.keys(POTION_PROMPTS).join(', ')}`,
        },
        { status: 400 }
      )
    }

    // Check for API key
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      console.error('[v0] OPENROUTER_API_KEY is not configured')
      return NextResponse.json(
        { error: 'LLM service is not configured' },
        { status: 500 }
      )
    }

    // Build the system prompt
    const systemPrompt = POTION_PROMPTS[selectedPotion]

    // Build the user message with guardrail
    const userMessage = `${DATA_SCRUBBING_GUARDRAIL}\n\n"${userRant}"`

    console.log('[v0] Calling OpenRouter API with potion:', selectedPotion)

    // Call OpenRouter API
    const modelId = process.env.OPENROUTER_MODEL_ID || 'meta-llama/llama-3.1-8b-instruct'
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': request.headers.get('referer') || 'https://witches-grimoire.vercel.app',
        'X-Title': 'Witches Grimoire',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelId,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        temperature: 0.8,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('[v0] OpenRouter API error:', errorData)
      return NextResponse.json(
        {
          error: 'Failed to transmute text. Please try again.',
          details: errorData.error?.message || 'Unknown error',
        },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Extract the transmuted text from the response
    const transmutedText = data.choices?.[0]?.message?.content || ''

    if (!transmutedText) {
      console.error('[v0] No content in OpenRouter response:', data)
      return NextResponse.json(
        { error: 'No transmutation result received' },
        { status: 500 }
      )
    }

    console.log('[v0] Transmutation successful')

    // Insert into Supabase ledger (fire and forget - don't block response)
    try {
      const supabase = getSupabaseClient()

      // Insert without awaiting to avoid blocking the response
      supabase
        .from('witches_ledger')
        .insert({
          potion_type: selectedPotion,
          transmuted_text: transmutedText,
        })
        .then(() => {
          console.log('[v0] Ledger entry saved successfully')
        })
        .catch((err) => {
          console.error('[v0] Failed to save ledger entry:', err)
        })
    } catch (ledgerError) {
      console.error('[v0] Ledger insert error (non-blocking):', ledgerError)
      // Don't fail the main request if ledger insert fails
    }

    return NextResponse.json({
      transmutedText,
      potion: selectedPotion,
    })
  } catch (error) {
    console.error('[v0] API route error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error during transmutation',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
