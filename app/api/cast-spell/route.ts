import { generateText } from 'ai';

type PotionType = 'funny' | 'sarcastic' | 'poetry' | 'movie';

const potionSpellbooks: Record<PotionType, string> = {
  funny:
    "You are the Cauldron of Slapstick. Transform the user's rant into a funny, chaotic, over-the-top scenario. Use medieval or wizard terminology.",
  sarcastic:
    'You are a cynical, dry-witted court jester. Reframe the user\'s frustration with biting, aristocratic sarcasm. Make it witty and sharp.',
  poetry:
    "You are a brooding, gothic wizard poet. Condense the user's anger into a dark, rhythmic 3-line haiku or short rhyming stanza.",
  movie:
    'You are an epic cinematic narrator. Transform this minor real-world inconvenience into a high-stakes, dramatic Hollywood movie trailer script.',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, potion } = body;

    if (!text || !potion) {
      return Response.json(
        { error: 'Missing text or potion parameter' },
        { status: 400 }
      );
    }

    if (!potionSpellbooks[potion as PotionType]) {
      return Response.json(
        { error: 'Invalid potion type' },
        { status: 400 }
      );
    }

    const systemPrompt = potionSpellbooks[potion as PotionType];

    const result = await generateText({
      model: 'openai/gpt-4o-mini',
      system: systemPrompt,
      prompt: text,
      maxTokens: 500,
    });

    return Response.json({
      result: result.text,
      potion,
    });
  } catch (error) {
    console.error('Error casting spell:', error);
    return Response.json(
      { error: 'Failed to cast spell' },
      { status: 500 }
    );
  }
}
