interface EyebrowPillProps {
  icon?: string
  text: string
  color?: 'primary' | 'secondary' | 'tertiary'
}

/** Page heroes and section labels share the primary chip; use secondary/tertiary only for in-section accents. */
const colorMap = {
  primary: 'bg-chip-bg text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  tertiary: 'bg-tertiary/10 text-tertiary',
}

export function EyebrowPill({ icon, text, color = 'primary' }: EyebrowPillProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${colorMap[color]} px-4 py-1.5 rounded-full`}>
      {icon && (
        <span
          className="material-symbols-outlined !text-[16px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      )}
      <span className="text-[14px] font-semibold tracking-wide">{text}</span>
    </div>
  )
}
