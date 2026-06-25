import { useState } from 'react'
import { useImageExists } from '../hooks/useImageExists'

interface SafeImageProps {
  src: string
  alt: string
  className?: string
  fallback?: React.ReactNode
}

export function SafeImage({ src, alt, className = '', fallback = null }: SafeImageProps) {
  const exists = useImageExists(src)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (exists === false || error) {
    return fallback ? <>{fallback}</> : null
  }

  return (
    <>
      {exists === null && (
        <div
          className={`animate-pulse bg-gold/10 ${className}`}
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${exists === null || !loaded ? 'hidden' : ''}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
      />
    </>
  )
}
