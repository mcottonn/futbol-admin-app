"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Banner {
  id: number
  title: string
  subtitle: string
}

const banners: Banner[] = [
  { id: 1, title: "Banner", subtitle: "Publicidad / Anuncio" },
  { id: 2, title: "Banner", subtitle: "Publicidad / Anuncio" },
  { id: 3, title: "Banner", subtitle: "Publicidad / Anuncio" },
]

export function BannerCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % banners.length)
  const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-2xl">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="w-full flex-shrink-0 bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-2xl min-h-[150px] flex flex-col justify-center items-center"
            >
              <h3 className="text-2xl font-bold">{banner.title}</h3>
              <p className="text-sm mt-2">{banner.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight size={20} />
      </button>

      <div className="flex justify-center gap-2 mt-4">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${idx === current ? "bg-primary" : "bg-border"}`}
            aria-label={`Ir a banner ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
