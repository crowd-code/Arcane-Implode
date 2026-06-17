'use client';

import { useState } from 'react';

type PotionType = 'funny' | 'sarcastic' | 'poetry' | 'movie';

interface PotionOption {
  id: PotionType;
  name: string;
  description: string;
}

const potions: PotionOption[] = [
  {
    id: 'funny',
    name: 'Funny',
    description: 'Cauldron of Slapstick',
  },
  {
    id: 'sarcastic',
    name: 'Sarcastic',
    description: 'Court Jester',
  },
  {
    id: 'poetry',
    name: 'Poetry',
    description: 'Gothic Wizard Poet',
  },
  {
    id: 'movie',
    name: 'Movie',
    description: 'Cinematic Narrator',
  },
];

export default function Home() {
  const [text, setText] = useState('');
  const [selectedPotion, setSelectedPotion] = useState<PotionType>('funny');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCastIncendio = async () => {
    if (!text.trim()) {
      setError('Please enter some text to transform');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/cast-spell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          potion: selectedPotion,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to cast spell');
      }

      const data = await res.json();
      setResponse(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f1e', color: '#fff', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
          Arcane Implode
        </h1>
        <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '2rem' }}>
          Transform your rants into magical spells
        </p>

        <div style={{ backgroundColor: '#1a1a2e', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>
            Your Rant:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your frustration or rant here..."
            style={{
              width: '100%',
              minHeight: '150px',
              padding: '1rem',
              backgroundColor: '#0f0f1e',
              color: '#fff',
              border: '1px solid #444',
              borderRadius: '4px',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          />

          <label style={{ display: 'block', marginTop: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>
            Select Potion:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            {potions.map((potion) => (
              <button
                key={potion.id}
                onClick={() => setSelectedPotion(potion.id)}
                style={{
                  padding: '1rem',
                  backgroundColor: selectedPotion === potion.id ? '#7c3aed' : '#2a2a3e',
                  color: '#fff',
                  border: selectedPotion === potion.id ? '2px solid #a78bfa' : '1px solid #444',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  transition: 'all 0.2s',
                }}
              >
                <div>{potion.name}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{potion.description}</div>
              </button>
            ))}
          </div>

          <button
            onClick={handleCastIncendio}
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: loading ? '#444' : '#7c3aed',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            {loading ? 'Casting Incendio...' : 'Cast Incendio!'}
          </button>
        </div>

        {error && (
          <div style={{ backgroundColor: '#7f1d1d', padding: '1rem', borderRadius: '4px', marginBottom: '2rem', color: '#fca5a5' }}>
            {error}
          </div>
        )}

        {response && (
          <div style={{ backgroundColor: '#1a1a2e', padding: '2rem', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: '1rem', color: '#a78bfa' }}>Transformed Spell:</h2>
            <div style={{ backgroundColor: '#0f0f1e', padding: '1rem', borderRadius: '4px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
