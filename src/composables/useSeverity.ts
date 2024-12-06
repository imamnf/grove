type SeverityType = 'success' | 'danger' | 'warning' | 'info'

const severityColors: Record<SeverityType, string[]> = {
  success: ['bg-emerald-100 dark:bg-emerald-400/10', 'text-emerald-500'],
  danger: ['bg-rose-100 dark:bg-rose-400/10', 'text-rose-500'],
  warning: ['bg-amber-100 dark:bg-amber-400/10', 'text-amber-500'],
  info: ['bg-sky-100 dark:bg-sky-400/10', 'text-sky-500'],
}

export function useSeverity<T extends Record<string, SeverityType>>(
  mapping: T,
): Record<keyof T, string[]> {
  const result: Record<keyof T, string[]> = {} as any

  for (const key in mapping) {
    const severity = mapping[key]
    result[key] = severityColors[severity] ?? []
  }

  return result
}
