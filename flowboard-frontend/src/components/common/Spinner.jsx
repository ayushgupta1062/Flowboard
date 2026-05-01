import React from 'react'
import { Loader2 } from 'lucide-react'

const Spinner = ({ size = 20, color = '#6C63FF', className = '' }) => {
  return (
    <Loader2 
      size={size} 
      stroke={color} 
      className={`animate-spin ${className}`} 
    />
  )
}

export default Spinner
