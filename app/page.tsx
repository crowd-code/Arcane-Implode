'use client'

import { useState } from 'react'
import Cauldron from '@/components/cauldron'
import ParchmentTextarea from '@/components/parchment-textarea'
import PotionCatalyst from '@/components/potion-catalyst'
import CastIncendio from '@/components/cast-incendio'

type PotionType = 'funny' | 'sarcastic' | 'comic' | 'movie' | 'poetry' | null

const POTION_CATALYSTS = [
  { id: 'funny', label: 'Funny' },
  { id: 'sarcastic', label: 'Sarcastic' },
  { id: 'comic', label: 'Comic' },
  { id: 'movie', label: 'Movie' },
  { id: 'poetry', label: 'Poetry' },
]

export default function WitchesGrimoire() {
  const [rawText, setRawText] = useState('')
  const [selectedPotion, setSelectedPotion] = useState<PotionType>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [transmutedText, setTransmutedText] = useState('')

  const handleCastIncendio = async () => {
    if (!rawText.trim() || !selectedPotion) return

    setIsLoading(true)
    try {
      // Simulate processing - in production, this would call an API
      // Raw text is only in memory, never logged or persisted
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Placeholder: transmute text using selected potion catalyst
      const transmuted = `[${selectedPotion.toUpperCase()}] ${rawText.substring(0, 50)}...`
      setTransmutedText(transmuted)

      // Reset form after success
      setRawText('')
      setSelectedPotion(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center py-8 px-4">
      {/* Mystical background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Header */}
      <div className="mb-12 text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary tracking-tight">
          The Witches&apos; Grimoire
        </h1>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
          Transform your raw musings into enchanted texts using ancient potion catalysts.
        </p>
      </div>

      {/* Main Cauldron Section */}
      <Cauldron>
        <div className="w-full space-y-6 flex flex-col items-center justify-center">
          {/* Parchment Textarea */}
          <div className="w-full max-w-md">
            <ParchmentTextarea
              value={rawText}
              onChange={setRawText}
              placeholder="Inscribe your raw musings here..."
            />
          </div>

          {/* Potion Catalysts Row */}
          <div className="flex flex-wrap gap-3 justify-center">
            {POTION_CATALYSTS.map((potion) => (
              <PotionCatalyst
                key={potion.id}
                label={potion.label}
                isActive={selectedPotion === potion.id}
                onClick={() =>
                  setSelectedPotion(selectedPotion === potion.id ? null : (potion.id as PotionType))
                }
              />
            ))}
          </div>
        </div>
      </Cauldron>

      {/* Cast Incendio Button */}
      <div className="mt-12 mb-8">
        <CastIncendio
          onClick={handleCastIncendio}
          isLoading={isLoading}
          disabled={!rawText.trim() || !selectedPotion}
        />
      </div>

      {/* Transmuted Result Display */}
      {transmutedText && (
        <div className="max-w-2xl w-full mx-auto mt-8 p-6 bg-card/50 border-2 border-primary/30 rounded-lg backdrop-blur-sm">
          <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-3">
            Transmuted Essence
          </h2>
          <p className="text-foreground/90 leading-relaxed font-serif text-sm">{transmutedText}</p>
        </div>
      )}

      {/* Footer note */}
      <div className="mt-12 text-center text-xs text-muted-foreground max-w-md">
        <p>
          ✨ All raw musings exist only in your browser&apos;s memory. They are never logged or stored.
          Only enchanted transmutations appear in The Witches&apos; Ledger. ✨
        </p>
      </div>
    </main>
  )
}
