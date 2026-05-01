import React from 'react'

const Badge = ({ children, variant = 'neutral', className = '' }) => {
  const variants = {
    primary: 'bg-[#EEF0FF] text-[#6C63FF]',
    accent: 'bg-[#FFF4ED] text-[#F97316]',
    success: 'bg-[#ECFDF5] text-[#22C55E]',
    warning: 'bg-[#FFFBEB] text-[#F59E0B]',
    danger: 'bg-[#FEF2F2] text-[#EF4444]',
    neutral: 'bg-[#F3F4F6] text-[#6B6884]'
  }

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}

export default Badge
