import { useEffect, useState } from 'react'

export function useImageExists(src: string): boolean | null {
  const [exists, setExists] = useState<boolean | null>(null)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (!cancelled) setExists(true)
    }
    img.onerror = () => {
      if (!cancelled) setExists(false)
    }
    img.src = src

    return () => {
      cancelled = true
    }
  }, [src])

  return exists
}

export function useImagesExist(sources: string[]): boolean | null {
  const [allExist, setAllExist] = useState<boolean | null>(null)

  useEffect(() => {
    let cancelled = false
    let loaded = 0
    let anyFailed = false

    if (sources.length === 0) {
      setAllExist(false)
      return
    }

    sources.forEach((src) => {
      const img = new Image()
      img.onload = () => {
        loaded += 1
        if (!cancelled && loaded === sources.length) {
          setAllExist(!anyFailed)
        }
      }
      img.onerror = () => {
        anyFailed = true
        loaded += 1
        if (!cancelled && loaded === sources.length) {
          setAllExist(false)
        }
      }
      img.src = src
    })

    return () => {
      cancelled = true
    }
  }, [sources])

  return allExist
}
