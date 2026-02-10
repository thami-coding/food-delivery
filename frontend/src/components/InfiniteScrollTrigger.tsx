import { useEffect, useRef } from "react"

type InfiniteScrollTriggerProps = {
  onIntersect: () => void
  disabled?: boolean
  rootMargin?: string
  threshold?: number
}

export function InfiniteScrollTrigger({
  onIntersect,
  disabled = false,
  rootMargin = "1px",
  threshold = 1,
}: InfiniteScrollTriggerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (disabled || !ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect()
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [onIntersect, disabled, rootMargin, threshold])

  return <div ref={ref} />
}
