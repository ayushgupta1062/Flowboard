import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SkeletonCard from '../common/SkeletonCard'

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'primary', 
  trend, 
  loading 
}) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (loading || value === undefined) return

    let start = 0
    const end = parseInt(value)
    if (start === end) {
      setDisplayValue(end)
      return
    }

    const duration = 800
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.floor(easeProgress * end)
      
      setDisplayValue(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, loading])

  if (loading) return <SkeletonCard height={100} />

  const colorClasses = {
    primary: 'bg-primary-light text-primary',
    accent: 'bg-accent-light text-accent',
    success: 'bg-success-light text-success',
    danger: 'bg-danger-light text-danger'
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-xl border border-border p-5 shadow-card hover:shadow-card-hover transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wider font-bold text-ink-hint mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-ink">
            {displayValue}
          </h3>
          {trend && (
            <p className="text-[12px] text-ink-muted mt-1">
              {trend}
            </p>
          )}
        </div>
        
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  )
}

export default StatCard
