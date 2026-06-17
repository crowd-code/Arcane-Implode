'use client'

import React, { useEffect, useRef } from 'react'

interface TextDestructionEffectProps {
  text: string
  isActive: boolean
  onComplete: () => void
  duration?: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  size: number
  char: string
  rotation: number
  rotationSpeed: number
}

export default function TextDestructionEffect({
  text,
  isActive,
  onComplete,
  duration = 1500,
}: TextDestructionEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isActive || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match window
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Initialize particles from text
    const initializeParticles = () => {
      particlesRef.current = []

      // Get textarea position - approximate center
      const textareaElement = document.querySelector('textarea')
      const baseX = textareaElement?.getBoundingClientRect().left ?? canvas.width / 2
      const baseY = textareaElement?.getBoundingClientRect().top ?? canvas.height / 3

      // Create particles for each character
      text.split('').forEach((char, index) => {
        for (let i = 0; i < 3; i++) {
          const angle = (Math.random() * Math.PI * 2)
          const speed = 2 + Math.random() * 3
          
          particlesRef.current.push({
            x: baseX + index * 8 + Math.random() * 20,
            y: baseY + Math.random() * 20,
            vx: Math.cos(angle) * speed,
            vy: -2 - Math.random() * 3, // Rise upward
            life: 1,
            size: 2 + Math.random() * 4,
            char,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.2,
          })
        }
      })

      startTimeRef.current = Date.now()
    }

    const animate = () => {
      const now = Date.now()
      const elapsed = startTimeRef.current ? now - startTimeRef.current : 0
      const progress = Math.min(elapsed / duration, 1)

      // Clear canvas with semi-transparent overlay for trails
      ctx.fillStyle = 'rgba(15, 10, 26, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.life -= 1 / (duration / 16)
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.15 // Gravity effect
        particle.rotation += particle.rotationSpeed
        particle.vx *= 0.98 // Air resistance

        if (particle.life <= 0) return false

        // Draw particle with ash color and opacity
        ctx.save()
        ctx.globalAlpha = particle.life * 0.8
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.rotation)

        // Draw ash particle as a small square
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size)
        gradient.addColorStop(0, 'rgba(150, 120, 90, 0.6)')
        gradient.addColorStop(1, 'rgba(60, 50, 40, 0.3)')
        ctx.fillStyle = gradient
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)

        ctx.restore()
        return true
      })

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Animation complete
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current)
        }
        onComplete()
      }
    }

    initializeParticles()
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, text, duration, onComplete])

  if (!isActive) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ background: 'transparent' }}
    />
  )
}
