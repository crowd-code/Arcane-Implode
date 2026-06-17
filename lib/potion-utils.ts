import { useMemo } from 'react'

export type PotionType = 'funny' | 'sarcastic' | 'comic' | 'movie' | 'poetry' | null

interface PotionColorMap {
  [key: string]: {
    primary: string
    secondary: string
    glow: string
  }
}

const POTION_COLORS: PotionColorMap = {
  funny: {
    primary: 'from-yellow-400 via-orange-300 to-yellow-400',
    secondary: 'text-yellow-300',
    glow: 'shadow-yellow-400/50',
  },
  sarcastic: {
    primary: 'from-purple-500 via-indigo-400 to-purple-500',
    secondary: 'text-purple-300',
    glow: 'shadow-purple-500/50',
  },
  comic: {
    primary: 'from-pink-400 via-red-300 to-pink-400',
    secondary: 'text-pink-300',
    glow: 'shadow-pink-400/50',
  },
  movie: {
    primary: 'from-cyan-400 via-blue-300 to-cyan-400',
    secondary: 'text-cyan-300',
    glow: 'shadow-cyan-400/50',
  },
  poetry: {
    primary: 'from-emerald-400 via-teal-300 to-emerald-400',
    secondary: 'text-emerald-300',
    glow: 'shadow-emerald-400/50',
  },
}

export function usePotionColors(potionType: PotionType) {
  return useMemo(() => {
    if (!potionType) {
      return {
        primary: 'from-primary via-accent to-primary',
        secondary: 'text-primary',
        glow: 'shadow-primary/50',
      }
    }
    return POTION_COLORS[potionType]
  }, [potionType])
}

export function getBoilingKeyframes(potionType: PotionType) {
  const colors = POTION_COLORS[potionType || 'funny']
  const colorStops = colors.primary.split(' ')
  const fromColor = colorStops[0].replace('from-', '')
  const viaColor = colorStops[2].replace('via-', '')
  const toColor = colorStops[4].replace('to-', '')

  return `
    @keyframes boil-${potionType || 'default'} {
      0% {
        background: linear-gradient(135deg, #0f0a1a 0%, #0f0a1a 100%);
        box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
      }
      25% {
        background: linear-gradient(135deg, rgb(var(--color-${fromColor})) 0%, rgb(var(--color-${viaColor})) 50%, rgb(var(--color-${toColor})) 100%);
        box-shadow: inset 0 0 30px rgba(255, 200, 0, 0.3);
      }
      50% {
        background: linear-gradient(135deg, rgb(var(--color-${toColor})) 0%, rgb(var(--color-${fromColor})) 50%, rgb(var(--color-${viaColor})) 100%);
        box-shadow: inset 0 0 40px rgba(255, 200, 0, 0.5);
      }
      75% {
        background: linear-gradient(135deg, rgb(var(--color-${viaColor})) 0%, rgb(var(--color-${toColor})) 50%, rgb(var(--color-${fromColor})) 100%);
        box-shadow: inset 0 0 30px rgba(255, 200, 0, 0.3);
      }
      100% {
        background: linear-gradient(135deg, #0f0a1a 0%, #0f0a1a 100%);
        box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
      }
    }
  `
}
