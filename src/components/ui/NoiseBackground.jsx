import React from 'react'

export function NoiseBackground({
  children,
  gradientColors = [
    'rgb(255, 100, 150)',
    'rgb(100, 150, 255)',
    'rgb(255, 200, 100)',
  ],
  containerClassName = '',
  style,
}) {
  const gradient = `linear-gradient(90deg, ${gradientColors.join(', ')})`

  return (
    <div
      className={`noise-bg ${containerClassName}`.trim()}
      style={{
        ...(style || {}),
        ['--noise-gradient']: gradient,
      }}
    >
      {children}
    </div>
  )
}
