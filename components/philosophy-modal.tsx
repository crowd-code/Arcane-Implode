'use client'

import { useState } from 'react'

export default function PhilosophyModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Link at footer */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200 underline cursor-pointer"
      >
        Why Ask the Witch?
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="bg-card border-2 border-primary/40 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 animate-in fade-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary mb-2">Why Ask the Witch?</h2>
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            </div>

            {/* Content */}
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                Emotions are the natural language of the human body and mind. They are not mistakes to be
                corrected, but signals to be acknowledged. Sadness, joy, anger, arousal, jealousy, honor,
                envy—each one carries its own wisdom.
              </p>

              <p>
                When we suppress or deny them, we force the body to store what was meant to move, and that
                stagnation often turns into stress, tension, or even illness.
              </p>

              <p>
                Instead of labeling emotions as "good" or "bad," we can learn to respect them as visitors.
                Let sadness wash through us like rain, let anger burn and fade like fire, let joy expand like
                sunlight. By allowing emotions to flow freely, we give them space to complete their cycle and
                release, leaving us lighter and more balanced.
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-primary/20"></div>

              {/* The Practice */}
              <div>
                <h3 className="text-lg font-semibold text-accent mb-3">The Practice is Simple</h3>
                <ol className="space-y-2 ml-4">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">1.</span>
                    <span>
                      <strong>Notice</strong> what you feel
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">2.</span>
                    <span>
                      <strong>Name</strong> it without judgment
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">3.</span>
                    <span>
                      <strong>Breathe</strong> into it
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">4.</span>
                    <span>
                      <strong>Let</strong> it pass
                    </span>
                  </li>
                </ol>
              </div>

              <p className="italic text-primary/80">In honoring every emotion, we honor our humanity.</p>

              {/* Divider */}
              <div className="my-6 h-px bg-primary/20"></div>

              {/* Modern Application */}
              <div>
                <h3 className="text-lg font-semibold text-accent mb-3">Modern Application</h3>
                <p>
                  Ask AI to analyze your emotions and help you breathe out your inner feelings judgment-free.
                  Transform your raw emotional language into creative expression. In the safe space of
                  anonymity, your authentic voice emerges.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-end gap-4 pt-6 border-t border-primary/20">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary font-medium transition-colors duration-200"
              >
                Close
              </button>
            </div>

            {/* Close Button X */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
