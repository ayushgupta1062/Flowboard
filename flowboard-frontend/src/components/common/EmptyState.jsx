import React from 'react'
import Button from './Button'

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 py-12 px-6 text-center ${className}`}>
      {Icon && (
        <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center text-primary mb-2">
          <Icon size={32} />
        </div>
      )}
      
      <div className="max-w-[280px]">
        <h3 className="text-base font-semibold text-ink mb-1">{title}</h3>
        <p className="text-sm text-ink-muted leading-relaxed">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default EmptyState
