'use client'

import React from 'react'

interface PotionCatalystProps {
  label: string
  isActive?: boolean
  onClick?: () => void
}

export default function PotionCatalyst({
  label,
  isActive = false,
  onClick,
}: PotionCatalystProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg font-medium text-sm
        transition-all duration-300 transform
        border-2
        ${
          isActive
            ? 'bg-primary/30 border-primary text-primary shadow-lg shadow-primary/30 scale-105'
            : 'bg-muted/20 border-muted text-foreground/80 hover:border-accent hover:text-accent hover:bg-muted/40 hover:shadow-md hover:shadow-accent/20 hover:scale-105'
        }
      `}
    >
      <span className="block tracking-wide">{label}</span>
    </button>
  )
}
