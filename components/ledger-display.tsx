'use client'

import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase-client'
import type { PotionType } from '@/lib/potion-utils'

interface LedgerEntry {
  id: string
  potion_type: string
  transmuted_text: string
  created_at: string
}

interface LedgerDisplayProps {
  filterPotion?: PotionType
  refreshTrigger?: number
}

const POTION_COLORS: Record<string, string> = {
  funny: 'border-yellow-500/50 bg-yellow-500/5 shadow-yellow-500/20',
  sarcastic: 'border-purple-500/50 bg-purple-500/5 shadow-purple-500/20',
  comic: 'border-pink-500/50 bg-pink-500/5 shadow-pink-500/20',
  movie: 'border-cyan-500/50 bg-cyan-500/5 shadow-cyan-500/20',
  poetry: 'border-emerald-500/50 bg-emerald-500/5 shadow-emerald-500/20',
}

const POTION_TEXT_COLORS: Record<string, string> = {
  funny: 'text-yellow-300',
  sarcastic: 'text-purple-300',
  comic: 'text-pink-300',
  movie: 'text-cyan-300',
  poetry: 'text-emerald-300',
}

export default function LedgerDisplay({ filterPotion, refreshTrigger }: LedgerDisplayProps) {
  const [entries, setEntries] = useState<LedgerEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseAnonKey) {
          setError('Supabase configuration missing')
          return
        }

        const supabase = getSupabaseClient()

        let query = supabase
          .from('witches_ledger')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false })
          .limit(10)

        // Filter by potion type if specified
        if (filterPotion) {
          query = query.eq('potion_type', filterPotion)
        }

        const { data, error: fetchError } = await query

        if (fetchError) {
          console.error('[v0] Ledger fetch error:', fetchError)
          setError('Failed to load ledger entries')
          return
        }

        setEntries(data || [])
      } catch (err) {
        console.error('[v0] Ledger fetch exception:', err)
        setError('An error occurred while loading the ledger')
      } finally {
        setIsLoading(false)
      }
    }

    fetchLedger()
  }, [filterPotion, refreshTrigger])

  return (
    <section className="w-full max-w-6xl mx-auto mt-16 mb-12 px-4">
      {/* Section Header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
          The Witches&apos; Ledger
        </h2>
        <p className="text-muted-foreground text-sm">
          {filterPotion
            ? `Transmutations by ${filterPotion.charAt(0).toUpperCase() + filterPotion.slice(1)}`
            : 'Ancient scrolls of transmuted essence'}
        </p>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground mt-2">Retrieving ancient scrolls...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-center text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && entries.length === 0 && (
        <div className="text-center py-12 bg-card/30 border border-primary/20 rounded-lg">
          <p className="text-muted-foreground">
            {filterPotion
              ? 'No transmutations found for this potion type'
              : 'The Ledger awaits its first entries. Cast your first Incendio to begin!'}
          </p>
        </div>
      )}

      {/* Ledger Grid */}
      {!isLoading && !error && entries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
          {entries.map((entry, idx) => (
            <div
              key={entry.id}
              className={`p-4 rounded-lg border-2 backdrop-blur-sm transition-all hover:shadow-lg ${
                POTION_COLORS[entry.potion_type] || POTION_COLORS['funny']
              }`}
              style={{
                transform: `rotate(${-2 + Math.random() * 4}deg) scale(${0.95 + Math.random() * 0.1})`,
                transitionDelay: `${idx * 50}ms`,
              }}
            >
              {/* Potion Badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
                    POTION_TEXT_COLORS[entry.potion_type] || POTION_TEXT_COLORS['funny']
                  }`}
                >
                  {entry.potion_type}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(entry.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>

              {/* Transmuted Text */}
              <p className="text-sm text-foreground/80 leading-relaxed font-serif line-clamp-5">
                {entry.transmuted_text}
              </p>

              {/* Decorative element */}
              <div className="mt-3 pt-3 border-t border-current/20 text-xs text-muted-foreground flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-current/40"></div>
                <span>Scroll Entry</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
