'use client'

import React, { useState } from 'react'

interface ParchmentTextareaProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function ParchmentTextarea({
  value,
  onChange,
  placeholder = 'Inscribe your raw musings here...',
}: ParchmentTextareaProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative w-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`
          w-full h-40 px-6 py-4 
          bg-gradient-to-b from-amber-50/10 to-amber-100/5
          border-2 rounded-lg 
          text-foreground placeholder-muted-foreground
          font-serif text-sm leading-relaxed
          resize-none
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-primary/50
          ${isFocused 
            ? 'border-primary shadow-lg shadow-primary/20 bg-amber-50/15' 
            : 'border-muted hover:border-muted-foreground'
          }
        `}
      />
      
      {/* Parchment effect overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-lg opacity-5 mix-blend-multiply bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900 via-transparent to-transparent"></div>
    </div>
  )
}
