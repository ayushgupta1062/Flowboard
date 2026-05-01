import React from 'react'
import Spinner from './Spinner'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon: Icon,
  disabled,
  onClick,
  type = 'button',
  className = '',
  ...rest
}) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark active:scale-[0.98] font-semibold',
    secondary: 'bg-white text-ink border border-border hover:bg-page active:scale-[0.98] font-medium',
    danger: 'bg-danger-light text-danger hover:bg-red-100 active:scale-[0.98] font-medium',
    ghost: 'bg-transparent text-ink-muted hover:bg-page active:scale-[0.98] font-medium'
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-lg',
    md: 'text-sm px-4 py-2.5 rounded-[10px]',
    lg: 'text-base px-6 py-3 rounded-[10px]'
  }

  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        flex items-center justify-center gap-2 transition-all duration-150
        ${variants[variant]}
        ${sizes[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...rest}
    >
      {loading ? (
        <Spinner size={size === 'sm' ? 14 : 18} color="currentColor" />
      ) : (
        <>
          {Icon && <Icon size={size === 'sm' ? 16 : 18} />}
          {children}
        </>
      )}
    </button>
  )
}

export default Button
