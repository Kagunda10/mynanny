interface IconChipProps {
  icon: string
  label: string
  color?: 'primary' | 'secondary' | 'tertiary' | 'green'
}

const colorMap = {
  primary: 'bg-primary-fixed text-primary',
  secondary: 'bg-secondary-fixed text-secondary',
  tertiary: 'bg-tertiary-fixed text-tertiary',
  green: 'bg-green-50 text-verified-green',
}

export function IconChip({ icon, label, color = 'primary' }: IconChipProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${colorMap[color]}`}>
      <span className="material-symbols-outlined !text-[14px]">{icon}</span>
      {label}
    </span>
  )
}
