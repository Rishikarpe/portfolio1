import { useEffect, useId, useMemo, useRef } from 'react'

const UNICORN_SRC =
  'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.2/dist/unicornStudio.umd.js'

function loadUnicornStudioScript() {
  if (typeof window === 'undefined') return Promise.resolve(null)

  if (window.UnicornStudio?.isInitialized) return Promise.resolve(window.UnicornStudio)

  const existing = document.querySelector(`script[src="${UNICORN_SRC}"]`)
  if (existing) {
    return new Promise((resolve) => {
      existing.addEventListener('load', () => resolve(window.UnicornStudio), { once: true })
      if (window.UnicornStudio?.init) resolve(window.UnicornStudio)
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = UNICORN_SRC
    script.async = true
    script.onload = () => resolve(window.UnicornStudio)
    script.onerror = reject
    ;(document.head || document.body).appendChild(script)
  })
}

export default function UnicornStudioEmbed({
  projectId,
  width = 1440,
  height = 900,
  className = '',
  style,
  startWhenVisible = false,
}) {
  const internalId = useId()
  const containerRef = useRef(null)

  const mergedStyle = useMemo(
    () => ({
      width,
      height,
      ...style,
    }),
    [width, height, style],
  )

  useEffect(() => {
    let cancelled = false
    let didInit = false
    let visibilityObserver = null

    const initForThisEmbed = (us) => {
      if (didInit) return
      didInit = true

      if (!us.isInitialized) {
        us.init?.()
        us.isInitialized = true
        return
      }

      // Re-scan DOM for newly mounted embeds
      us.init?.()
    }

    loadUnicornStudioScript()
      .then((us) => {
        if (cancelled) return
        if (!us) return

        if (!startWhenVisible) {
          initForThisEmbed(us)
          return
        }

        const el = containerRef.current
        if (!el) {
          initForThisEmbed(us)
          return
        }

        visibilityObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              initForThisEmbed(us)
              visibilityObserver?.disconnect()
              visibilityObserver = null
            }
          },
          { threshold: 0.15 },
        )

        visibilityObserver.observe(el)
      })
      .catch(() => {
        // Fail silently; embed is non-critical.
      })

    return () => {
      cancelled = true
      visibilityObserver?.disconnect()
    }
  }, [startWhenVisible])

  if (!projectId) return null

  return (
    <div
      id={`unicorn-${internalId}`}
      className={`unicorn-embed ${className}`.trim()}
      data-us-project={projectId}
      style={mergedStyle}
      ref={containerRef}
    />
  )
}
