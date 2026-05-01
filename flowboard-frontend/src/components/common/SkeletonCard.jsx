import React from 'react'

const SkeletonCard = ({ lines = 3, height = 120, className = '' }) => {
  return (
    <div 
      className={`bg-white rounded-xl border border-border p-5 shadow-card ${className}`}
      style={{ minHeight: `${height}px` }}
    >
      <div className="skeleton h-5 w-3/5 mb-4 rounded-md" />
      
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, idx) => (
          <div 
            key={idx} 
            className="skeleton h-3 rounded-md" 
            style={{ width: `${100 - idx * 15}%` }}
          />
        ))}
      </div>

      <div className="mt-5 flex gap-2">
        <div className="skeleton h-5 w-16 rounded-full" />
        <div className="skeleton h-5 w-20 rounded-full" />
      </div>
    </div>
  )
}

export default SkeletonCard
