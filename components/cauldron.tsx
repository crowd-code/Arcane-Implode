'use client'

import React from 'react'
import type { PotionType } from '@/lib/potion-utils'

interface CauldronProps {
  children?: React.ReactNode
  isBoiling?: boolean
  potionType?: PotionType
}

export default function Cauldron({ 
  children, 
  isBoiling = false,
  potionType 
}: CauldronProps) {
  // Map potion types to boiling gradient colors
  const boilingColorMap: { [key: string]: string } = {
    funny: 'from-yellow-500/40 via-orange-400/50 to-yellow-500/40',
    sarcastic: 'from-purple-600/40 via-indigo-500/50 to-purple-600/40',
    comic: 'from-pink-500/40 via-red-400/50 to-pink-500/40',
    movie: 'from-cyan-500/40 via-blue-400/50 to-cyan-500/40',
    poetry: 'from-emerald-500/40 via-teal-400/50 to-emerald-500/40',
  }

  const boilingGradient = potionType && boilingColorMap[potionType] 
    ? boilingColorMap[potionType]
    : 'from-primary/40 via-accent/50 to-primary/40'

  return (
    <div className="relative w-full max-w-2xl mx-auto perspective">
      {/* Mystical glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-accent/10 rounded-full blur-3xl opacity-60 -z-10 animate-pulse"></div>

      {/* Outer cauldron rim */}
      <div className="relative bg-gradient-to-b from-slate-600 to-slate-800 rounded-t-3xl rounded-b-full p-8 shadow-2xl border-4 border-slate-700 min-h-96">
        {/* Inner cauldron surface - boiling state */}
        <div 
          className={`absolute inset-4 rounded-t-2xl rounded-b-full opacity-80 transition-all duration-300 ${
            isBoiling 
              ? `bg-gradient-to-b ${boilingGradient} animate-pulse`
              : 'bg-gradient-to-b from-slate-800 via-slate-900 to-black'
          }`}
        ></div>

        {/* Boiling particle effect overlay */}
        {isBoiling && (
          <>
            <div className="absolute inset-4 rounded-t-2xl rounded-b-full bg-gradient-to-t from-transparent via-white/5 to-transparent opacity-60 animate-pulse"></div>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full opacity-40 animate-pulse"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${40 + Math.random() * 20}%`,
                  width: '8px',
                  height: '8px',
                  background: `radial-gradient(circle, rgba(255,255,255,0.8), transparent)`,
                  animationDelay: `${i * 0.1}s`,
                }}
              ></div>
            ))}
          </>
        )}

        {/* Magical shimmer effect */}
        <div className="absolute inset-4 rounded-t-2xl rounded-b-full bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-40 animate-pulse"></div>

        {/* Content container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-80 gap-6">
          {children}
        </div>

        {/* Bottom glow ring */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-16 rounded-full blur-2xl -z-10 transition-all duration-300 ${
          isBoiling 
            ? `bg-gradient-to-t ${boilingGradient.split(' ').slice(0, 3).join(' ')}`
            : 'bg-gradient-to-t from-primary/20 to-transparent'
        }`}></div>
      </div>

      {/* Cauldron legs */}
      <div className="flex justify-between gap-4 mt-4 px-8">
        <div className="w-3 h-8 bg-gradient-to-b from-slate-600 to-slate-800 rounded-full shadow-lg"></div>
        <div className="w-3 h-8 bg-gradient-to-b from-slate-600 to-slate-800 rounded-full shadow-lg"></div>
        <div className="w-3 h-8 bg-gradient-to-b from-slate-600 to-slate-800 rounded-full shadow-lg"></div>
      </div>
    </div>
  )
}
