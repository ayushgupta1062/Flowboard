import { format, isToday, isTomorrow, isYesterday, isPast, differenceInDays, parseISO } from 'date-fns'

export const formatDueDate = (dateStr) => {
  if (!dateStr) return null
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr
  if (isToday(date)) return 'Today'
  if (isTomorrow(date)) return 'Tomorrow'
  if (isYesterday(date)) return 'Yesterday'
  const diff = differenceInDays(date, new Date())
  if (diff < 0) return `${Math.abs(diff)}d overdue`
  if (diff <= 7) return `In ${diff}d`
  return format(date, 'MMM d, yyyy')
}

export const isOverdue = (dateStr, status) => {
  if (!dateStr || status === 'DONE') return false
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr
  return isPast(date) && !isToday(date)
}

export const formatDateTime = (dateStr) => {
  if (!dateStr) return ''
  return format(new Date(dateStr), 'MMM d, yyyy · h:mm a')
}
