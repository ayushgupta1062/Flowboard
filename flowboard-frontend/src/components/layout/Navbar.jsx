import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, ChevronDown, LogOut, User as UserIcon } from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import Avatar from '../common/Avatar'

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [showDropdown, setShowDropdown] = useState(false)

  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/dashboard') return 'Dashboard'
    if (path === '/projects') return 'My Projects'
    if (path.startsWith('/projects/')) return 'Project Detail'
    return 'Flowboard'
  }

  return (
    <header className="h-16 fixed top-0 right-0 left-0 lg:left-60 bg-white/90 backdrop-blur-md border-b border-border z-20 flex items-center justify-between px-6 transition-all">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-ink-muted hover:text-ink hover:bg-page rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-bold text-ink tracking-tight">{getPageTitle()}</h1>
      </div>

      <div className="relative">
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2.5 p-1.5 rounded-full hover:bg-page transition-colors"
        >
          <Avatar name={user?.name} size={32} />
          <div className="hidden sm:block text-left mr-1">
            <p className="text-[13px] font-semibold text-ink leading-none">{user?.name?.split(' ')[0]}</p>
          </div>
          <ChevronDown size={14} className={`text-ink-hint transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {showDropdown && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowDropdown(false)} 
              />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-modal border border-border z-20 overflow-hidden py-1"
              >
                <div className="px-4 py-3 border-b border-border mb-1">
                  <p className="text-sm font-bold text-ink">{user?.name}</p>
                  <p className="text-xs text-ink-muted truncate">{user?.email}</p>
                </div>
                
                <button
                  onClick={() => {
                    setShowDropdown(false)
                    logout()
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-danger-light transition-colors"
                >
                  <LogOut size={16} />
                  <span className="font-medium">Sign out</span>
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Navbar
