'use client'

import React from 'react'

interface CastIncendioProps {
  isLoading?: boolean
  onClick?: () => void
  disabled?: boolean
}

export default function CastIncendio({
  isLoading = false,
  onClick,
  disabled = false,
}: CastIncendioProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        relative px-8 py-3 font-bold text-lg
        rounded-lg overflow-hidden
        transition-all duration-300 transform
        ${
          disabled || isLoading
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:scale-105 active:scale-95 cursor-pointer'
        }
      `}
    >
      {/* Glowing background gradient */}
      <div
        className={`
          absolute inset-0 
          bg-gradient-to-r from-primary via-accent to-primary
          ${isLoading ? 'animate-pulse' : 'opacity-80'}
          rounded-lg
        `}
      ></div>

      {/* Animated shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer rounded-lg"></div>

      {/* Shadow glow */}
      <div
        className={`
          absolute inset-0 rounded-lg blur-lg 
          bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40
          opacity-60 -z-10 transition-all duration-300
          ${isLoading ? 'animate-pulse' : ''}
        `}
      ></div>

      {/* Text content */}
      <span className="relative z-10 text-foreground tracking-widest drop-shadow-lg">
        {isLoading ? 'CASTING...' : 'CAST INCENDIO!'}
      </span>
    </button>
  )
}
