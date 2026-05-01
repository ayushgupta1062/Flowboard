import React from 'react'
import { getAvatarColor, getInitials } from '../../utils/colorUtils'

const Avatar = ({ name, size = 36, className = '' }) => {
  const colors = getAvatarColor(name)
  const initials = getInitials(name)

  return (
    <div
      title={name}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: colors.bg,
        color: colors.text,
        fontSize: `${size / 2.5}px`
      }}
      className={`
        flex items-center justify-center rounded-full font-semibold transition-transform duration-200
        ${className}
      `}
    >
      {initials}
    </div>
  )
}

export default Avatar
