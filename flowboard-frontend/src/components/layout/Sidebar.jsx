import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  FolderKanban, 
  LogOut,
  ChevronRight
} from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import Avatar from '../common/Avatar'

const Sidebar = () => {
  const { user, logout } = useAuth()

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'My Projects', icon: FolderKanban, path: '/projects' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { x: -16, opacity: 0 },
    show: { x: 0, opacity: 1 }
  }

  return (
    <div className="h-full bg-white border-r border-border flex flex-col overflow-hidden">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
          <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current">
            <circle cx="8" cy="16" r="4" />
            <circle cx="24" cy="8" r="4" />
            <circle cx="24" cy="24" r="4" />
            <path d="M12 16 L20 10 M12 16 L20 22" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <span className="text-lg font-bold text-ink tracking-tight">Flowboard</span>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 px-3 py-2 overflow-y-auto">
        <div className="px-3 mb-2 text-[10px] font-bold text-ink-hint uppercase tracking-widest">
          Workspace
        </div>
        
        <motion.nav 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-1"
        >
          {navItems.map((item) => (
            <motion.div key={item.path} variants={itemVariants}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  flex items-center justify-between gap-3 px-3 py-2.5 rounded-[10px] transition-all group
                  ${isActive 
                    ? 'bg-primary-light text-primary font-semibold border-l-[3px] border-primary rounded-l-none' 
                    : 'text-ink-muted hover:bg-page hover:text-ink'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} />
                  <span className="text-[14px]">{item.label}</span>
                </div>
                <ChevronRight 
                  size={14} 
                  className={`transition-transform duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5`} 
                />
              </NavLink>
            </motion.div>
          ))}
        </motion.nav>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4 px-2">
          <Avatar name={user?.name} size={36} />
          <div className="min-w-0">
            <p className="text-[14px] font-medium text-ink truncate">{user?.name}</p>
            <p className="text-[11px] text-ink-muted truncate">{user?.email}</p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-danger hover:bg-danger-light transition-colors text-sm font-medium"
        >
          <LogOut size={14} />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
