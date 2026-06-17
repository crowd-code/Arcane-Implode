'use client'

import { useState } from 'react'
import Cauldron from '@/components/cauldron'
import ParchmentTextarea from '@/components/parchment-textarea'
import PotionCatalyst from '@/components/potion-catalyst'
import CastIncendio from '@/components/cast-incendio'
import TextDestructionEffect from '@/components/text-destruction-effect'
import LedgerDisplay from '@/components/ledger-display'
import PhilosophyModal from '@/components/philosophy-modal'
import type { PotionType } from '@/lib/potion-utils'

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
  const [isDestructing, setIsDestructing] = useState(false)
  const [isBoiling, setIsBoiling] = useState(false)
  const [textToDestroy, setTextToDestroy] = useState('')
  const [ledgerFilter, setLedgerFilter] = useState<PotionType>(null)
  const [ledgerRefresh, setLedgerRefresh] = useState(0)

  const handleDestructionComplete = async () => {
    setIsDestructing(false)
    
    // Clear textarea and show boiling animation
    setRawText('')
    setIsBoiling(true)

    // Boil for 1.5 seconds
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsBoiling(false)

    // Begin text transmutation via API
    setIsLoading(true)
    try {
      const response = await fetch('/api/transmute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userRant: textToDestroy,
          selectedPotion,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('[v0] Transmutation failed:', errorData)
        setTransmutedText(
          'The transmutation failed. The spirits were not ready. Please try again.'
        )
        return
      }

      const data = await response.json()
      setTransmutedText(data.transmutedText)

      // Trigger ledger refresh
      setLedgerRefresh((prev) => prev + 1)

      // Reset state
      setTextToDestroy('')
      setSelectedPotion(null)
    } catch (error) {
      console.error('[v0] Transmutation error:', error)
      setTransmutedText(
        'An error occurred during transmutation. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleCastIncendio = () => {
    if (!rawText.trim() || !selectedPotion) return

    // Initiate text destruction effect
    setTextToDestroy(rawText)
    setIsDestructing(true)
  }

  return (
    <main className="min-h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center py-8 px-4">
      {/* Text destruction effect overlay */}
      <TextDestructionEffect
        text={textToDestroy}
        isActive={isDestructing}
        onComplete={handleDestructionComplete}
        duration={1200}
      />

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
      <Cauldron isBoiling={isBoiling} potionType={selectedPotion}>
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
                onClick={() => {
                  const newPotion = selectedPotion === potion.id ? null : (potion.id as PotionType)
                  setSelectedPotion(newPotion)
                  // Sync ledger filter with potion selection
                  setLedgerFilter(newPotion)
                }}
              />
            ))}
          </div>
        </div>
      </Cauldron>

      {/* Cast Incendio Button */}
      <div className="mt-12 mb-8">
        <CastIncendio
          onClick={handleCastIncendio}
          isLoading={isLoading || isDestructing || isBoiling}
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
      <div className="mt-12 text-center text-xs text-muted-foreground max-w-md mb-8">
        <p>
          ✨ All raw musings exist only in your browser&apos;s memory. They are never logged or stored.
          Only enchanted transmutations appear in The Witches&apos; Ledger. ✨
        </p>
      </div>

      {/* The Witches' Ledger */}
      <LedgerDisplay filterPotion={ledgerFilter} refreshTrigger={ledgerRefresh} />

      {/* Philosophy Link Footer */}
      <div className="mt-16 text-center">
        <PhilosophyModal />
      </div>
    </main>
  )
}
