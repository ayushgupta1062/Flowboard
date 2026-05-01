const AVATAR_COLORS = [
  { bg: '#EEF0FF', text: '#6C63FF' },
  { bg: '#FFF4ED', text: '#F97316' },
  { bg: '#ECFDF5', text: '#22C55E' },
  { bg: '#FFFBEB', text: '#F59E0B' },
  { bg: '#FEF2F2', text: '#EF4444' },
  { bg: '#F0F4FF', text: '#3B82F6' },
  { bg: '#FDF4FF', text: '#A855F7' },
  { bg: '#F0FDF9', text: '#14B8A6' },
]

export const getAvatarColor = (name) => {
  if (!name) return AVATAR_COLORS[0]
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

export const getInitials = (name) => {
  if (!name) return '?'
  return name
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
