import React from 'react'

interface CauldronProps {
  children?: React.ReactNode
}

export default function Cauldron({ children }: CauldronProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto perspective">
      {/* Mystical glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-accent/10 rounded-full blur-3xl opacity-60 -z-10 animate-pulse"></div>

      {/* Outer cauldron rim */}
      <div className="relative bg-gradient-to-b from-slate-600 to-slate-800 rounded-t-3xl rounded-b-full p-8 shadow-2xl border-4 border-slate-700 min-h-96">
        {/* Inner cauldron surface */}
        <div className="absolute inset-4 bg-gradient-to-b from-slate-800 via-slate-900 to-black rounded-t-2xl rounded-b-full opacity-80"></div>

        {/* Magical shimmer effect */}
        <div className="absolute inset-4 rounded-t-2xl rounded-b-full bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-40 animate-pulse"></div>

        {/* Content container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-80 gap-6">
          {children}
        </div>

        {/* Bottom glow ring */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-16 bg-gradient-to-t from-primary/20 to-transparent rounded-full blur-2xl -z-10"></div>
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
