import React from 'react'
import { AlertCircle } from 'lucide-react'

const Input = ({
  label,
  error,
  icon: Icon,
  rightIcon: RightIcon,
  type = 'text',
  register,
  name,
  placeholder,
  className = '',
  required,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-[13px] font-medium text-ink flex items-center gap-0.5">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted group-focus-within:text-primary transition-colors">
            <Icon size={16} />
          </div>
        )}
        
        <input
          type={type}
          placeholder={placeholder}
          className={`
            w-full h-11 px-4 rounded-[10px] border-[1.5px] bg-white text-ink text-sm outline-none transition-all duration-150
            ${Icon ? 'pl-10' : 'pl-4'}
            ${RightIcon ? 'pr-10' : 'pr-4'}
            ${error 
              ? 'border-danger shadow-[0_0_0_3px_rgba(239,68,68,0.10)]' 
              : 'border-border focus:border-primary focus:shadow-[0_0_0_3px_rgba(108,99,255,0.12)]'
            }
            ${className}
          `}
          {...(register ? register(name) : {})}
          {...rest}
        />

        {RightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted">
            <RightIcon size={16} />
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-danger mt-1 flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  )
}

export default Input
