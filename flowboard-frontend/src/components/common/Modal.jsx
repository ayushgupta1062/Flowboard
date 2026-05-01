import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Button from './Button'

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[20px] shadow-modal w-full max-w-md mx-auto relative z-10 overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h3 className="text-[17px] font-semibold text-ink">{title}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="!p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-page transition-colors"
            >
              <X size={18} />
            </Button>
          </div>
          
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  )
}

export default Modal
